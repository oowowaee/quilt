import $ from 'jquery';
import Grid from './Grid';
import paper from 'paper';

export default class BlockItemWithGrid {
  constructor(canvas, widthInBlocks, heightInBlocks, palette, width, height) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = width || canvas.offsetWidth;
    this.height = height || canvas.offsetHeight;
    this.palette = palette;
    this.squareWidth = Math.floor(this.width / widthInBlocks);
    this.squares = [];

    if (this.squareWidth % 2 != 0) {
      this.squareWidth++;
    }

    this._addGrid();
  }

  _createSquare(i, j) {
    throw new Error("Not implemented.");
  }

  _addGrid() {
    this.layer = new paper.Layer();

    this._createSquares();
    this.grid = new Grid(this.width, this.height, this.widthInBlocks, this.heightInBlocks);
    this.layer.addChild(this.grid);
  }

  /*
    Draw the individual grid squares to our block editor.
   */
  _createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        this.squares.push(this._createSquare(i, j));
      }
    }

    this.layer.addChildren(this.squares);
  }
}