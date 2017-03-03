const Observer = require('./SubjectObserver/observer');
const Subject = require('./SubjectObserver/subject');
const TextBuffer = require('./TextBuffer');
const extend = require('./extend');
const input = require('./input');
const Caret = require('./DOM/caret' );

var main = document.querySelector('#main');


var textBuffer = new TextBuffer();
window.textBuffer = textBuffer;
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
window.addEventListener('keydown', input.keyboard.handle) ;


/////////////////////

var paragraphs = document.getElementsByClassName("line");
for (i = 0; i < paragraphs.length; i++) {
    paragraphs[i].addEventListener("click", input.click.updateCaret, false);
}
var caret = new Caret(textBuffer);
caret.update();



function updateCaretByClick(e) {
    var range = document.caretRangeFromPoint(e.clientX, e.clientY);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    textBuffer.caretPosition = offset;
    caret.update();
}
