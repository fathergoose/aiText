const Observer = require('../SubjectObserver/observer');
const extend = require('../extend');

function Caret(buffer) {
    this.textBuffer = buffer;
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'caret');
    extend(this, new Observer());
    buffer.addObserver(this);

    this.update = function () {
        console.log('CCCCAAAARRTT')
        var linesOnScreen = document.getElementsByClassName('line');
        var textBuffer = this.textBuffer;
        this.element.setAttribute('style', 'height: 100%; width: .6em; position: absolute; display: inline; top: 0; border-left: 1px; opacity: 1; animation: fade 1s ease-in-out infinite;');
        var pos
        if (linesOnScreen[textBuffer.getCurrentLine()].firstChild != null) {
            pos = linesOnScreen[textBuffer.getCurrentLine()].firstChild.splitText(textBuffer.getCaretPosition());
            linesOnScreen[textBuffer.getCurrentLine()].insertBefore(this.element, pos)
        } else {
            console.log(linesOnScreen[textBuffer.getCurrentLine()]);
            linesOnScreen[textBuffer.getCurrentLine()].appendChild(this.element);
        }
    };
}

module.exports = Caret;






















// var extend = require('../extend');
// var Observer = require('../SubjectObserver/observer');
// var caret = document.createElement('div');
// caret.setAttribute('id', 'caret');
// extend(caret, new Observer());
// textBuffer.addObserver(caret);

// caret.update = function() {
//     this.setAttribute('style', 'height: 100%; width: .6em; position: absolute; display: inline; top: 0; border-left: 1px; opacity: 1; animation: fade 1s ease-in-out infinite;');
//     var pos
//     if (linesOnScreen[textBuffer.currentLine].firstChild != null) {
//         pos = linesOnScreen[textBuffer.currentLine].firstChild.splitText(textBuffer.caretPosition);
//         linesOnScreen[textBuffer.currentLine].insertBefore(caret, pos)
//     } else {
//         console.log(linesOnScreen[textBuffer.currentLine]);
//         linesOnScreen[textBuffer.currentLine].appendChild(caret);
//     }
// };

// function updateCaretByClick(e) {
//     var range = document.caretRangeFromPoint(e.clientX, e.clientY);
//     var textNode = range.startContainer;
//     var offset = range.startOffset;
//     textBuffer.caretPosition = offset;
//     caret.update();
// }