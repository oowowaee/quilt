import $ from 'jquery';
import BlockSquare from './BlockSquare';
import Grid from './Grid';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR} from './Constants';

const offset = 0;
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
    this.squareWidth = Math.floor(this.width / widthInBlocks);
    this.state = 'large';
    this.squares = [];

    if (this.squareWidth % 2 != 0) {
      this.squareWidth++;
    }
  }

  setup() {
    paper.setup(document.getElementById('block_canvas'));
    this.group = new paper.Layer();

    this.createSquares();
    this.grid = new Grid(this.width, this.height, this.widthInBlocks, this.heightInBlocks);
    this.group.addChild(this.grid);

    var hitTool = new paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  /*
    When we click inside the editor, color the corresponding triangle or square.
   */
  fillSquare(e) {
    let hitResult = paper.project.hitTest(e.point, hitOptions);
    let newColor;
    let item = hitResult.item;

    if (item.currentColor != this.palette.currentFillColor()) {
      newColor = this.palette.currentFillColor();
    } else {
      newColor = EMPTYCOLOR;
    }

    if (item.outsideRange(e.point)) {
      item.parent.changeColors(newColor);
    } else {
      item.changeColor(newColor);
    }
  }

  /*
    Wipe all pattern from the grid squares.
   */
  empty(e) {
    this.squares.forEach((square) => {
      square.reset();
    });
  }

  /*
    Toggle the block editor between two sizes - small and large.
   */
  resize(e) {
    if (this.state === 'large') {
      this.state = 'small';
      this.group.scale(0.25, new paper.Point(0, 0));
    } else {
      this.state = 'large';
      this.group.scale(4, new paper.Point(0, 0));      
    }

    this.canvas.width = this.group.bounds.width;
    this.canvas.height = this.group.bounds.height;
  }

  /*
    Draw the individual grid squares to our block editor.
   */
  createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        this.squares.push(new BlockSquare(this.squareWidth,
                            this.squareWidth * i + offset,
                            this.squareWidth * j + offset));
      }
    }

    this.group.addChildren(this.squares);
  }
}