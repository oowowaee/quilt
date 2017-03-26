import $ from 'jquery';
import QuiltBlockTemplate from './QuiltBlockTemplate';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR, OFFSET} from '../Constants';

const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 0
};

export default class extends paper.Layer {
  constructor(width, height) {
    super();
    this.controlRect = new paper.Path.Rectangle(0, 0, this.width, this.height);
    this.controlRect.fillColor = 'grey';
  }

  get lastPos() {
    return this.lastChild.position || new paper.Point(0, 0);
  }

  addBlock(block) {
    this.activate();
    let newBlock = new QuiltBlockTemplate(block);
    newBlock.position = new paper.Point(this.lastPos.x + 5, this.lastPos.y + 5);
  }

  // /*
  //   When we click inside the editor, color the corresponding triangle or square.
  //  */
  // fillSquare(e) {
  //   let hitResult = this.scope.project.hitTest(e.point, hitOptions);
  //   let newColor;
  //   let item = hitResult.item;

  //   if (item.currentColor != this.palette.currentFillColor()) {
  //     newColor = this.palette.currentFillColor();
  //   } else {
  //     newColor = EMPTYCOLOR;
  //   }

  //   if (item.outsideRange(e.point)) {
  //     item.parent.changeColors(newColor);
  //   } else {
  //     item.changeColor(newColor);
  //   }
  // }
}