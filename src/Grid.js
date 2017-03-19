import $ from 'jquery';
import paper from 'paper';

export default class Grid extends paper.Layer {
  constructor(height, width, numColumns, numRows) {
    super();

    let verticalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(0, height));
    let horizontalLine = new paper.Path.Line(new paper.Point(0, 0),
                                           new paper.Point(width, 0));

    let squareWidth = width / numColumns;

    horizontalLine.strokeColor = 'gray';
    verticalLine.strokeColor = 'gray';

    let horizontalLineSymbol = new paper.Symbol(verticalLine);
    for (var i = 1; i < numRows; i++) {
      let point = new paper.Point(i * squareWidth, height / 2);
      this.addChild(horizontalLineSymbol.place(point));
    }

    let verticalLineSymbol = new paper.Symbol(horizontalLine);
    for (var i = 1; i < numColumns; i++) {
      let point = new paper.Point(width / 2, i * squareWidth);
      this.addChild(verticalLineSymbol.place(point));
    }
  }
}
