var extend = require('../extend');
var Observer = require('../SubjectObserver/observer');
var caret = document.createElement('div');
caret.setAttribute('id', 'caret');
extend(caret, new Observer());
textBuffer.addObserver(caret);

caret.update = function() {
    this.setAttribute('style', 'height: 100%; width: .6em; position: absolute; display: inline; top: 0; border-left: 1px; opacity: 1; animation: fade 1s ease-in-out infinite;');
    var pos
    if (linesOnScreen[textBuffer.currentLine].firstChild != null) {
        pos = linesOnScreen[textBuffer.currentLine].firstChild.splitText(textBuffer.caretPosition);
        linesOnScreen[textBuffer.currentLine].insertBefore(caret, pos)
    } else {
        console.log(linesOnScreen[textBuffer.currentLine]);
        linesOnScreen[textBuffer.currentLine].appendChild(caret);
    }
};

function updateCaretByClick(e) {
    var range = document.caretRangeFromPoint(e.clientX, e.clientY);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    textBuffer.caretPosition = offset;
    caret.update();
}