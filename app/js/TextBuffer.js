var Caret = require('./DOM/caret');

function TextBuffer() {
    var caretPosition = 0;
    var currentLine = 0;
    var lines = [''];
    return {

        line: function () {
            return lines[currentLine];
        },

        // add a single character at current caret position and incriment caret
        putChar: function (char) {
            lines[currentLine] = lines[currentLine].slice(0, caretPosition) + char + lines[currentLine].slice(caretPosition);
            caretPosition++;
        },

        // insert new empty line below current line
        newLine: function () {
            var newLine = document.createElement('div');
            newLine.innerHTML = '';
            newLine.setAttribute('class', 'line');
            newLine.addEventListener("click", Caret.updateCaretByClick, false)
            main.appendChild(newLine);
            lines[currentLine + 1] = lines[currentLine].slice(caretPosition, -1);
            lines[currentLine] = lines[currentLine].slice(0, caretPosition);
            currentLine += 1;
            caretPosition = 0;
        },

        deleteBackwards: function (int) {
            lines[currentLine] = lines[currentLine].slice(0, caretPosition - int) + lines[currentLine].slice(caretPosition)
            caretPosition -= int;
        },

        /**
         * Retrieves lines a.k.a content from the TextBuffer object 
         * 
         * @param {(number|number[])} begining 
         * @param {number} ending 
         * @returns {Object|Array} Object[lineNumber] = String for specific lists or range requests
         * when no arguments are passed an array of all lines is returned 
         */
        getLines: function (begining, ending) {
            if (arguments.length === 0) {
                return lines
            } else if (Array.isArray(begining)) {
                let returningLines = {};
                begining.forEach(lineNumber => returningLines[lineNumber] = lines[lineNumber])
                return returningLines;
            } else if (begining && ending) {
                let returningLines = {};
                for (let i = begining; i < ending; i++) {
                    returningLines[i] = lines[i];
                }
                return returningLines;
            } else {
                throw new Error('Inproper use of TextBuffer.getLines()')
            }
        },

        getCaretPosition: function () {
            return caretPosition;
        },

        getCurrentLine: function () {
            return currentLine;
        }

    }
}

module.exports = TextBuffer;
