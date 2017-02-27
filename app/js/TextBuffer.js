function TextBuffer() {
    var caretPosition = 0;
    var currentLine = 0;
    var lines = [''];
    return {

        line: function() {
          return lines[ currentLine];
        },

        // add a single character at current caret position and incriment caret
        putChar: function(char) {
            lines[currentLine] = lines[currentLine].slice(0, caretPosition) + char + lines[currentLine].slice(caretPosition);
            caretPosition++;
            console.log(this);
        },

        // insert new empty line below current line
        newLine: function() {
            var newLine = document.createElement('div');
            newLine.innerHTML = '';
            newLine.setAttribute('class', 'line');
            newLine.addEventListener("click", updateCaretByClick, false)
            main.appendChild(newLine);
            lines[currentLine + 1] = lines[currentLine].slice(caretPosition, -1);
            lines[currentLine] = lines[currentLine].slice(0, caretPosition);
            currentLine += 1;
            caretPosition = 0;
        },

        deleteBackwards: function(int) {
            lines[currentLine] = lines[currentLine].slice(0, caretPosition - int) + lines[currentLine].slice(caretPosition)
            caretPosition -= int;
        },

        getLines: function(begining, ending) {
            if (arguments.length === 0) {
                return lines;
            } else if (Array.isArray(begining)) {
                let returningLines = {};
                begining.forEach( lineNumber => returningLines[lineNumber] = lines[lineNumber] )
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
        }

    }
}

module.exports = TextBuffer;
