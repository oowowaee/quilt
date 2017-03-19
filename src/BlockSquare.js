import $ from 'jquery';
import paper from 'paper';
import {EMPTYCOLOR} from './Constants';
import Triangle from './Triangle';

/*
  Represents one grid square in our quilt block, which is made up of
  four triangles.
 */
export default class BlockSquare extends paper.Group {
  constructor(widthInPixels, x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = widthInPixels;
    this.drawTriangles();
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
    var triangle = new Triangle({
      segments: [[this.x, this.y],
                 [(this.x +  Math.floor(this.width / 2)), this.y + Math.floor(this.width / 2)],
                 [this.x, this.y + this.width]]
    });

    var newt = triangle.clone();
    newt.rotate(90);
    newt.position = new paper.Point(this.x + this.width / 2 , this.y + this.width / 4);

    var newt2 = triangle.clone();
    newt2.rotate(180);
    newt2.position = new paper.Point(this.x + this.width * 3/4, this.y + this.width / 2);

    var newt3 = triangle.clone();
    newt3.rotate(270);
    newt3.position = new paper.Point(this.x + this.width / 2, this.y + this.width * 3 / 4);

    this.addChildren([triangle, newt, newt2, newt3]);
    this.fillColor = EMPTYCOLOR;
    this.strokeColor = EMPTYCOLOR;
    this.strokeWidth = 1;
  }
}