import $ from 'jquery';
import paper from 'paper';
import {EMPTYCOLOR} from './Constants';

export default class {
  constructor(widthInPixels, x, y) {
    this.x = x;
    this.y = y;
    this.width = widthInPixels;
    this.drawTriangles();
  }

  drawTriangles() {
    var triangle = new paper.Path({
      segments: [[this.x, this.y],
                 [(this.x +  Math.floor(this.width / 2)), this.y + Math.floor(this.width / 2)],
                 [this.x, this.y + this.width]]
    });

    triangle.fillColor = 'purple';
    triangle.strokeColor = 'black';

    var newt = triangle.clone();
    newt.rotate(90);
    newt.position = new paper.Point(this.x + this.width / 2 , this.y + this.width / 4);
    newt.fillColor = 'blue';

    var newt2 = triangle.clone();
    newt2.rotate(180);
    newt2.position = new paper.Point(this.x + this.width * 3/4, this.y + this.width / 2);
    newt2.fillColor = 'black';

    var newt3 = triangle.clone();
    newt3.rotate(270);
    newt3.position = new paper.Point(this.x + this.width / 2, this.y + this.width * 3 / 4);
    newt3.fillColor = 'red';

    this.group = new paper.Group([triangle, newt, newt2, newt3]);
    this.group.fillColor = EMPTYCOLOR;
    this.group.strokeColor = EMPTYCOLOR;
    this.group.strokeWidth = 1;
  }
}