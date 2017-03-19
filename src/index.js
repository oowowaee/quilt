import $ from 'jquery';
import BlockEditor from './BlockEditor';
import ColorPalette from './ColorPalette';
import Quilt from './Quilt';
require("./style.css");

const editorBlocksWide = 4;
const editorBlocksHigh = 4;

const quiltBlocksWide = 4;
const quiltBlocksHigh = 4;

window.onload = function() {
  const blockCanvas = document.getElementById('block_canvas');
  const paletteCanvas = document.getElementById('palette_canvas');
  const quiltCanvas = document.getElementById('quilt_canvas');

  var colorPalette = new ColorPalette(paletteCanvas);
  var blockEditor = new BlockEditor(blockCanvas, editorBlocksWide, editorBlocksHigh, colorPalette);
  blockEditor.resize();

  var quilt = new Quilt(quiltCanvas, quiltBlocksWide, quiltBlocksHigh, colorPalette);

  $('#resize_link').on('click', (e) => {
    blockEditor.resize(e);
    $(quiltCanvas).toggle();
  });

  //$('#clear_link').on('click', (e) => blockEditor.empty(e));

  //paper.setup($('#block_canvas'));
  //paper.setup(document.getElementById('block_canvas'));
}