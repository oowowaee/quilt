import $ from 'jquery';
import paper from 'paper';
import {FILLCOLOR} from './Constants';

const spacing = 2;
const colors = ['lavender', 'thistle', 'plum', 'violet', 'orchid', 'magenta',
                'mediumorchid', 'mediumpurple', 'rebeccapurple', 'darkorchid', 'purple',
                'indigo', 'slateblue', 'darkslateblue',
                'black', 'white',
                'grey', 'lightcyan', 'paleturquoise', 'darkturquoise', 'cadetblue', 'lightsteelblue',
                'powderblue', 'lightblue', 'skyblue'];

const hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 2
};

const palette = new paper.PaperScope();

export default class {
  constructor(canvas, colorSize = 20) {
    this.fillColor = FILLCOLOR;
    this.canvas = canvas;

    palette.setup(canvas);
    this.buildColors(colorSize);
    palette.view.draw();

    var hitTool = new palette.Tool();
    hitTool.activate();

    hitTool.onMouseDown = (e) => { this.changeColor(e) };
  }

  currentFillColor() {
    return this.fillColor;
  }

  changeColor(e) {
    var hitResult = palette.project.hitTest(e.point, hitOptions);

    this.fillColor = hitResult.item.colorName;
    console.log('setting fillcolor to ' + this.fillColor);
  }

  buildColors(colorSize) {
    let maxPerCol = Math.floor(this.canvas.offsetHeight / (spacing + colorSize));

    colors.forEach((value, idx) => {
      let row = (idx % maxPerCol);
      let y = ((spacing + colorSize) * row) + spacing;
      let cols = Math.floor(idx / maxPerCol);
      let x = spacing * (cols + 1) + (colorSize * cols);

      let rect = new palette.Path.Rectangle(x, y, colorSize, colorSize);
      rect.fillColor = value;
      rect.colorName = value;
    });
  }
}