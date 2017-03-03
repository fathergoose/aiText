var Caret = require('./DOM/caret');

/**
 * The most interesting class around, this is where the magic happens 
 * 
 * @returns {Object}
 */
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
            caretPosition = caretPosition + char.length;
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
 
        deleteLineBackwards: function (int=1) {
            console.log(this)
            lines.splice(currentLine, int);
            currentLine -= int;
            caretPosition = lines[currentLine].length;
        },

        deleteBackwards: function (int=1) {
            lines[currentLine] = lines[currentLine].slice(0, caretPosition - int) + lines[currentLine].slice(caretPosition);
            if (caretPosition > 0) caretPosition -= int;
            else this.deleteLineBackwards();
        },

        /**
         * Retrieves lines a.k.a content from the TextBuffer object 
         * 
         * @param {(number|number[])} begining 
         * @param {number} ending 
         * @returns {Object|Array|String} Object[lineNumber] = String for specific lists or range requests
         * when no arguments are passed an array of all lines is returned if a single line is requested,
         * just that line is returned as a string
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
            } else if (begining || begining === 0) {
                return lines[begining]
            } else {
                throw new Error('Inproper use of TextBuffer.getLines()')
            }
        },

        getCaretPosition: function () {
            return caretPosition;
        },

        getCurrentLineNumber: function () {
            return currentLine;
        },

        /**
         * 
         * 
         * @param {string} line 
         * @param {number} whereToInsert 
         * @returns {number} new length of lines object
         */
        putLine: function (line, whereToInsert) {
            lines.splice(whereToInsert, 0, line)
            return lines.length;
        },

        /**
         * Set the caret position, does not affect currentLine 
         * 
         * @param {number} newPositionForCaret 
         */
        setCaretPosition: function (newPositionForCaret) {
            caretPosition = newPositionForCaret;
        },

        setCurrentLine: function (newActiveLineNumber) {
            currentLine = newActiveLineNumber;
        }

    }
}

module.exports = TextBuffer;
