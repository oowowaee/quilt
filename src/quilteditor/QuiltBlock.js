import $ from 'jquery';
import paper from 'paper';
import {EMPTYCOLOR} from '../Constants';

/*
  Represents one grid square in our quilt block, which is made up of
  four triangles.
 */
export default class QuiltBlock extends paper.Group {
  constructor(widthInPixels, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = widthInPixels;
    this.drawTriangles();
  }

  copyBlock(pattern) {

  }

  /*
    Change the color of all child triangles to new color.
   */
  changeColors(newColor) {
    this.children.forEach((path) => {
      path.fillColor = newColor;
      path.currentColor = newColor;
    });
  }

  /*
    Change all child triangles back to the empty color.
   */
  reset() {
    this.changeColors(EMPTYCOLOR);
  }

  /*
    Draw four triangles into this block.
   */
  drawTriangles() {
  }
}