const Observer = require('../SubjectObserver/observer');
const extend = require('../extend');

function Caret(buffer) {
    this.textBuffer = buffer;
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'caret');
    extend(this, new Observer());
    buffer.addObserver(this);

    this.update = function () {
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
