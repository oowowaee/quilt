import $ from 'jquery';
import Quilt from './Quilt';
import QuiltBlockList from './QuiltBlockList';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR, OFFSET} from '../Constants';

const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 0
};

export default class {
  constructor(scope, canvas, widthInBlocks, heightInBlocks, palette, quiltWidth) {
    this.scope = scope;
    this.palette = palette;
    this.canvas = canvas;
    this.height = this.canvas.offsetHeight;
    this.controlWidth = this.canvas.offsetWidth - quiltWidth;

    this.quilt = new Quilt(canvas, widthInBlocks, heightInBlocks, palette, quiltWidth);
    this.quilt.position = new paper.Point(this.controlWidth + quiltWidth / 2, this.height / 2);
    this.blockList = new QuiltBlockList(this.controlWidth, this.height);
  }

  addEvents() {
    var hitTool = new this.scope.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  addBlock(block) {
    this.blockList.addBlock(block);
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