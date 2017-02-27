const Observer = require('./SubjectObserver/observer');
const Subject = require('./SubjectObserver/subject');
const TextBuffer = require('./TextBuffer');
const extend = require('./extend');

var main = document.querySelector('#main');


var textBuffer = new TextBuffer();
extend(textBuffer, new Subject());

var firstLine = document.createElement('div');
firstLine.setAttribute('class', 'line');
main.appendChild(firstLine);
var linesOnScreen = document.getElementsByClassName('line');

textBuffer.addObserver(linesOnScreen)
linesOnScreen.update = function() {
    textBuffer.getLines().forEach(function(line, i) {
      linesOnScreen[i].innerText = line;
    });
};
/* Insert Mode */
window.addEventListener('keydown', function(event) {
    var T = textBuffer;
    switch (event.which) {
        case 8: // backspace
            T.deleteBackwards(1);
            T.notify();
            break;
        case 13: // enter
            T.newLine();
            T.notify();
            break;
        case 16: // shift
            break;
        default:
            T.putChar(event.key)
            T.notify();
    }

});



/////////////////////

var paragraphs = document.getElementsByClassName("line");
for (i = 0; i < paragraphs.length; i++) {
    paragraphs[i].addEventListener("click", updateCaretByClick, false);
}
var caret = document.createElement('div');
caret.setAttribute('id', 'caret');
extend(caret, new Observer());
textBuffer.addObserver(caret);

caret.update = function() {
    this.setAttribute('style', 'height: 100%; width: .6em; position: absolute; display: inline; top: 0; border-left: 1px; opacity: 1; animation: fade 1s ease-in-out infinite;');
    var pos
    if (linesOnScreen[textBuffer.getCurrentLine()].firstChild != null) {
        pos = linesOnScreen[textBuffer.getCurrentLine()].firstChild.splitText(textBuffer.getCaretPosition());
        linesOnScreen[textBuffer.getCurrentLine()].insertBefore(caret, pos)
    } else {
        console.log(linesOnScreen[textBuffer.getCurrentLine()]);
        linesOnScreen[textBuffer.getCurrentLine()].appendChild(caret);
    }
};

function updateCaretByClick(e) {
    var range = document.caretRangeFromPoint(e.clientX, e.clientY);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    textBuffer.caretPosition = offset;
    caret.update();
}
