import $ from 'jquery';
import BlockSquare from './BlockSquare';
import BlockItemWithGrid from './BlockItemWithGrid';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR, OFFSET} from './Constants';

const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 0
};

export default class extends BlockItemWithGrid {
  constructor(canvas, widthInBlocks, heightInBlocks, palette) {
    super(canvas, widthInBlocks, heightInBlocks, palette);
    this.state = 'large';
    this.addEvents();
  }

  addEvents() {
    var hitTool = new this.paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  createSquare(i, j) {
    return new BlockSquare(this.paper,
                           this.squareWidth,
                           this.squareWidth * i + OFFSET,
                           this.squareWidth * j + OFFSET);
  }

  /*
    When we click inside the editor, color the corresponding triangle or square.
   */
  fillSquare(e) {
    if (this.state === 'small') {
      return;
    }

    let hitResult = this.paper.project.hitTest(e.point, hitOptions);
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
      this.group.scale(0.25, new this.paper.Point(0, 0));
    } else {
      this.state = 'large';
      this.group.scale(4, new this.paper.Point(0, 0));      
    }

    this.canvas.width = this.group.bounds.width;
    this.canvas.height = this.group.bounds.height;
  }
}