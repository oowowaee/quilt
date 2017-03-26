import $ from 'jquery';
import paper from 'paper';
import BlockEditor from './blockeditor/BlockEditor';
import ColorPalette from './ColorPalette';
import QuiltEditor from './quilteditor/QuiltEditor';
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

  const blockEditorScope = new paper.PaperScope();
  blockEditorScope.setup(blockCanvas);

  var blockEditor = new BlockEditor(blockEditorScope, blockCanvas, editorBlocksWide, editorBlocksHigh, colorPalette);
  //blockEditor.resize();

  const quiltScope = new paper.PaperScope();
  quiltScope.setup(quiltCanvas);

  var quiltEditor = new QuiltEditor(quiltScope, quiltCanvas, quiltBlocksWide, quiltBlocksHigh, colorPalette, 500);

  /*
    When clicking the resize link, toggle the size of the block editor, and hide/show the quilt itself.
   */
  $('#resize_link').on('click', (e) => {
    blockEditor.resize(e);
    $(quiltCanvas).toggle();
    return false;
  });

  $('#clear_link').on('click', (e) => blockEditor.empty(e));

  $('#build_link').on('click', (e) => {
    quiltEditor.addBlock(blockEditor);
    return false;
  });
}