const Observer = require('../SubjectObserver/observer');
const extend = require('../extend');

function Caret(buffer) {
    this.textBuffer = buffer;
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'cursor');
    extend(this, new Observer());
    buffer.addObserver(this);

    this.update = function () {
        var linesOnScreen = document.getElementsByClassName('line');
        var textBuffer = this.textBuffer;
        this.element.setAttribute('style', 'height: 100%; width: .6em; position: absolute; display: inline; top: 0; border-left: 1px; opacity: 1; animation: fade 1s ease-in-out infinite;');
        var pos
        if (linesOnScreen[textBuffer.getCurrentLineNumber()].firstChild != null) {
            pos = linesOnScreen[textBuffer.getCurrentLineNumber()].firstChild.splitText(textBuffer.getCaretPosition());
            linesOnScreen[textBuffer.getCurrentLineNumber()].insertBefore(this.element, pos)
        } else {
            console.log(linesOnScreen[textBuffer.getCurrentLineNumber()]);
            linesOnScreen[textBuffer.getCurrentLineNumber()].appendChild(this.element);
        }
    };
}

module.exports = Caret;
