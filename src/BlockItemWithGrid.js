import $ from 'jquery';
import paper from 'paper';
import Grid from './Grid';

export default class BlockItemWithGrid {
  constructor(canvas, widthInBlocks, heightInBlocks, palette) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.palette = palette;
    this.squareWidth = Math.floor(this.width / widthInBlocks);
    this.squares = [];

    if (this.squareWidth % 2 != 0) {
      this.squareWidth++;
    }

    this.initPaper();
  }

  createSquare(i, j) {
    throw new Error("Not implemented.");
  }

  initPaper() {
    this.paper = new paper.PaperScope();
    this.paper.setup(this.canvas);
    this.group = new this.paper.Layer();

    this.createSquares();
    this.grid = new Grid(this.width, this.height, this.widthInBlocks, this.heightInBlocks);
    this.group.addChild(this.grid);
  }

  /*
    Draw the individual grid squares to our block editor.
   */
  createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        this.squares.push(this.createSquare(i, j));
      }
    }

    this.group.addChildren(this.squares);
  }
}