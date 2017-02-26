const observer = require('./observer');
const Subject = require('./subject');
const extend = require('./extend');

var main = document.querySelector('#main');


/* Insert Mode */

window.addEventListener('keydown', function (event) {
  switch (event.which) {
    case 8: // backspace
      main.innerText = main.innerText.slice(0, -1)
      break;
    case 16: // shift
      // do nothing with shift
      break;
    default:
      main.innerText += event.key;
  }

});

function TextBuffer() {
    this.lines = [ 'hi al', 'boo index 1'];
}

TextBuffer.prototype.getLine = function (lineNumber) {
    return this.lines[lineNumber];
};

TextBuffer.prototype.putLine = function (line) {
    this.lines.push(line)
    return this.lines.length;
};


window.appTextBuffer = TextBuffer;
