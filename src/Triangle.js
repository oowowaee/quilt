import $ from 'jquery';
import paper from 'paper';

const tolerance = 10;

export default class Triangle extends paper.Path {
  changeColor(newColor) {
    this.fillColor = newColor;
    this.currentColor = newColor;
  }

  /*
    Returns true if the point is within the part of the triangle which represents "the middle"
   */
  outsideRange(point) {
    switch(this._index) {
      case 0:
        return point.x > this.position.x + tolerance;
      case 1:
        return point.y > this.position.y + tolerance;
      case 2:
        return point.x < this.position.x - tolerance;
      case 3:
        return point.y < this.position.y - tolerance;
    }
  }
}