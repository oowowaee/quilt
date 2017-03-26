import $ from 'jquery';
import BlockSquare from './BlockSquare';
import BlockItemWithGrid from '../BlockItemWithGrid';
import paper from 'paper';
import _ from 'underscore';

import {FILLCOLOR, EMPTYCOLOR, OFFSET} from '../Constants';

const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 0
};

export default class extends BlockItemWithGrid {
  constructor(scope, canvas, widthInBlocks, heightInBlocks, palette) {
    super(canvas, widthInBlocks, heightInBlocks, palette);
    this.scope = scope;
    this.state = 'large';

    var hitTool = new this.scope.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  /*
    An object with colors as keys, whose values are all the shapes in the pattern matching that color. 
  */
  get colorComponents() {
    let colors = {};

    this.squares.forEach((square) => {
      let components = square.componentsByColor;

      if (!_.isEmpty(components)) {
        for (let color in components) {
          if (_.has(colors, color)) {
            colors[color] = colors[color].concat(components[color]);
          } else {
            colors[color] = components[color];
          }
        };
      }
    });

    return colors;
  }

  _createSquare(i, j) {
    return new BlockSquare(this.squareWidth,
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

    let hitResult = this.scope.project.hitTest(e.point, hitOptions);
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
      this.layer.scale(0.2, new paper.Point(0, 0));
    } else {
      this.state = 'large';
      this.layer.scale(5, new paper.Point(0, 0));      
    }

    this.canvas.width = this.layer.bounds.width;
    this.canvas.height = this.layer.bounds.height;
  }

  _toArray() {
    let rep = [];

    this.squares.forEach((square) => {
      rep.push(square.toArray());
    });

    return rep;
  }
}