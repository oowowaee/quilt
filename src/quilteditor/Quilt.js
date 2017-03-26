import $ from 'jquery';
import QuiltBlock from './QuiltBlock';
import BlockItemWithGrid from '../BlockItemWithGrid';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR, OFFSET} from '../Constants';

export default class extends BlockItemWithGrid {
  set position(point) {
    this.layer.position = point;
  }

  _createSquare(i, j) {
    return new QuiltBlock(this.squareWidth,
                          this.squareWidth * j + OFFSET,
                          this.squareWidth * i + OFFSET);
  }
}