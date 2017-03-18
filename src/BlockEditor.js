import $ from 'jquery';
import BlockSquare from './BlockSquare';
import Grid from './Grid';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR} from './Constants';

const offset = 1;
const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 5
};

export default class {
  constructor(canvas, palette, widthInBlocks, heightInBlocks) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.squareWidth = this.width / widthInBlocks;
  }

  setup() {
    paper.setup(document.getElementById('block_canvas'));
    this.createSquares();
    paper.view.draw();

    var hitTool = new paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = function(event) {
      var hitResult = paper.project.hitTest(event.point, hitOptions);

      if (hitResult.item.wasFilled) 
        hitResult.item.fillColor = EMPTYCOLOR;      
      else {
        hitResult.item.fillColor = FILLCOLOR;
      }

      hitResult.item.wasFilled = !hitResult.item.wasFilled;
    }
  }

  drawGrid() {
  }

  createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        var square = new BlockSquare(this.squareWidth, this.squareWidth * i + offset, this.squareWidth * j + offset);
      }
    }  
  }
}