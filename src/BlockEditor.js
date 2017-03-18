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
  tolerance: 0
};

export default class {
  constructor(canvas, widthInBlocks, heightInBlocks, palette) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.palette = palette;
    this.squareWidth = this.width / widthInBlocks;
  }

  setup() {
    paper.setup(document.getElementById('block_canvas'));
    this.createSquares();
    this.drawGrid();
    paper.view.draw();

    var hitTool = new paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  drawGrid() {
    let gridLayer = new paper.Layer();

    let verticalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(0, this.height));
    let horizontalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(this.width, 0));
    horizontalLine.strokeColor = 'gray';
    verticalLine.strokeColor = 'gray';

    let horizontalLineSymbol = new paper.Symbol(verticalLine);
    for (var i = 1; i < this.widthInBlocks; i++) {
      let point = new paper.Point(i * this.squareWidth, this.height / 2);
      let line = gridLayer.addChild(horizontalLineSymbol.place(point));
    }

    let verticalLineSymbol = new paper.Symbol(horizontalLine);
    for (var i = 1; i < this.heightInBlocks; i++) {
      let point = new paper.Point(this.width / 2, i * this.squareWidth);
      let line = gridLayer.addChild(verticalLineSymbol.place(point))
    }
  }

  fillSquare(e) {
    var hitResult = paper.project.hitTest(e.point, hitOptions);

    if (hitResult.item.currentColor != this.palette.currentFillColor()) {
      hitResult.item.fillColor = this.palette.currentFillColor();
      hitResult.item.currentColor = this.palette.currentFillColor();
    } else {
      hitResult.item.fillColor = EMPTYCOLOR;
      hitResult.item.currentColor = EMPTYCOLOR
    }
  }

  createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        let block = new BlockSquare(this.squareWidth,
                        this.squareWidth * i + offset,
                        this.squareWidth * j + offset);
      }
    }
  }
}