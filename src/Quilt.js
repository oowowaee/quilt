import $ from 'jquery';
import QuiltBlock from './QuiltBlock';
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
    //this.addEvents();
  }

  addEvents() {
    var hitTool = new this.paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  createSquare(i, j) {
    return new QuiltBlock(this.paper,
                          this.squareWidth,
                          this.squareWidth * i + OFFSET,
                          this.squareWidth * j + OFFSET);
  }

  /*
    When we click inside the editor, color the corresponding triangle or square.
   */
  fillSquare(e) {
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
}