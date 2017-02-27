function TextBuffer() {
    var caretPosition = 0;
    var currentLine = 0;
    return {
        lines: [''],

        line: function() {
          return this.lines[this.currentLine];
        },

        // add a single character at current caret position and incriment caret
        putChar: function(char) {
            var ln = this.lines[this.currentLine]
            this.lines[this.currentLine] = this.lines[this.currentLine].slice(0, this.caretPosition) + char + this.lines[this.currentLine].slice(this.caretPosition);
            this.caretPosition++;
            console.log(this);
        },

        // insert new empty line below current line
        newLine: function() {
            var newLine = document.createElement('div');
            newLine.innerHTML = '';
            newLine.setAttribute('class', 'line');
            newLine.addEventListener("click", updateCaretByClick, false)
            main.appendChild(newLine);
            this.lines[this.currentLine + 1] = this.lines[this.currentLine].slice(this.caretPosition, -1);
            this.lines[this.currentLine] = this.lines[this.currentLine].slice(0, this.caretPosition);
            this.currentLine += 1;
            this.caretPosition = 0;
        },

        deleteBackwards: function(int) {
            this.lines[this.currentLine] = this.lines[this.currentLine].slice(0, this.caretPosition - int) + this.lines[this.currentLine].slice(this.caretPosition)
            this.caretPosition -= int;
        }
    }
}

module.exports = TextBuffer;
