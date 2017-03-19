import $ from 'jquery';
import BlockEditor from './BlockEditor';
import ColorPalette from './ColorPalette';
require("./style.css");

const numBlocksWide = 2;
const numBlocksHigh = 2;

var currentFillColor = 'purple';

window.onload = function() {
  const blockCanvas = document.getElementById('block_canvas');
  const paletteCanvas = document.getElementById('palette_canvas');

  var colorPalette = new ColorPalette(paletteCanvas);
  var blockEditor = new BlockEditor(blockCanvas, numBlocksWide, numBlocksHigh, colorPalette);
  blockEditor.setup();
  $('#resize_link').on('click', (e) => blockEditor.resize(e));
  $('#clear_link').on('click', (e) => blockEditor.empty(e));

  //paper.setup($('#block_canvas'));
  //paper.setup(document.getElementById('block_canvas'));
}
