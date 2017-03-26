import $ from 'jquery';
import paper from 'paper';
import _ from 'underscore';
import {EMPTYCOLOR} from '../Constants';

/*
  Represents one grid square in our quilt block, which is made up of
  four triangles.
 */
export default class QuiltBlockTemplate extends paper.Group {
  constructor(blockPattern) {
    super();
    this.colorLayers = {};
    this.copyBlock(blockPattern);
  }

  copyBlock(pattern) {
    let colors = pattern.colorComponents;
    console.log(colors);
  }
}