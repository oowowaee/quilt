import $ from 'jquery';
import Grid from './Grid';
import paper from 'paper';

export default class {
  constructor(canvas, widthInBlocks, heightInBlocks) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
  }

  setup() {
    paper.setup(document.getElementById('block_canvas'));
    this.drawBorder();
    this.grid = new Grid(this.width, this.height, this.widthInBlocks, this.heightInBlocks);
    paper.view.draw();
  }

  drawBorder() {
    var rect = new paper.Path.Rectangle(0, 0, this.width, this.height);
    rect.strokeColor = 'black';
  }

  createSquares() {
    console.log('creating');
  }
}