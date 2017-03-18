import $ from 'jquery';
import BlockSquare from './BlockSquare';
import Grid from './Grid';
import paper from 'paper';
import {FILLCOLOR, EMPTYCOLOR} from './Constants';

const offset = 0;
const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 0
};

export default class {
  constructor(canvas, widthInBlocks, heightInBlocks, palette) {
    this.canvas = canvas;
    this.widthInBlocks = widthInBlocks;
    this.heightInBlocks = heightInBlocks;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.palette = palette;
    this.squareWidth = Math.floor(this.width / widthInBlocks);
    if (this.squareWidth % 2 != 0) {
      this.squareWidth++;
    }
  }

  setup() {
    paper.setup(document.getElementById('block_canvas'));
    this.createSquares();
    this.drawGrid();
    paper.view.draw();

    var hitTool = new paper.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.fillSquare(e) };
  }

  drawGrid() {
    let gridLayer = new paper.Layer();

    let verticalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(0, this.height));
    let horizontalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(this.width, 0));
    horizontalLine.strokeColor = 'gray';
    verticalLine.strokeColor = 'gray';

    let horizontalLineSymbol = new paper.Symbol(verticalLine);
    for (var i = 1; i < this.widthInBlocks; i++) {
      let point = new paper.Point(i * this.squareWidth, this.height / 2);
      let line = gridLayer.addChild(horizontalLineSymbol.place(point));
    }

    let verticalLineSymbol = new paper.Symbol(horizontalLine);
    for (var i = 1; i < this.heightInBlocks; i++) {
      let point = new paper.Point(this.width / 2, i * this.squareWidth);
      let line = gridLayer.addChild(verticalLineSymbol.place(point))
    }
  }

  fillSquare(e) {
    let hitResult = paper.project.hitTest(e.point, hitOptions);
    let newColor;
    let item = hitResult.item;
    let fillAll = this.fillAll(e.point, item);

    if (item.currentColor != this.palette.currentFillColor()) {
      newColor = this.palette.currentFillColor();
    } else {
      newColor = EMPTYCOLOR;
    }

    if (fillAll) {
      item.parent.children.forEach((path) => {
        path.fillColor = newColor;
        path.currentColor = newColor;
      });
    } else {
      item.fillColor = newColor;
      item.currentColor = newColor;
    }
  }

  fillAll(point, item) {
    switch(item._index) {
      case 0:
        return point.x > item.position.x;
      case 1:
        return point.y > item.position.y;
      case 2:
        return point.x < item.position.x;
      case 3:
        return point.y < item.position.y;
    }
  }

  createSquares() {
    for (var i = 0; i < this.widthInBlocks; i++) {
      for (var j = 0; j < this.heightInBlocks; j++) {
        let block = new BlockSquare(this.squareWidth,
                        this.squareWidth * i + offset,
                        this.squareWidth * j + offset);
      }
    }
  }
}