import $ from 'jquery';
import BlockEditor from './BlockEditor';
import ColorPalette from './ColorPalette';

const numBlocksWide = 4;
const numBlocksHigh = 4;

window.onload = function() {
  const blockCanvas = document.getElementById('block_canvas');
  //const paletteCanvas = document.getElementById('palette_canvas');

  var blockEditor = new BlockEditor(blockCanvas, numBlocksWide, numBlocksHigh);
  blockEditor.setup();
  //paper.setup($('#block_canvas'));
  //paper.setup(document.getElementById('block_canvas'));
}