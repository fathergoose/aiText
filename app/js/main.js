const observer = require('./SubjectObserver/observer');
const Subject = require('./SubjectObserver/subject');
const TextBuffer = require('./TextBuffer');
const extend = require('./extend');

var main = document.querySelector('#main');


var textBuffer = new TextBuffer();
extend(textBuffer, new Subject())


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
