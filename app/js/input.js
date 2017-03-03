exports.keyboard = {
    handle: function(event) {
        var buffer = this.textBuffer;
        switch (event.which) {
            case 8: // backspace
                buffer.deleteBackwards(1);
                buffer.notify();
                break;
            case 13: // enter
                buffer.newLine();
                buffer.notify();
                break;
            case 16: // shift
                break;
            default:
                buffer.putChar(event.key)
                buffer.notify();
        }
    }
};

exports.click =  {
    updateCaret: function (e) {
        var range = document.caretRangeFromPoint(e.clientX, e.clientY);
        var textNode = range.startContainer;
        var offset = range.startOffset;
        window.textBuffer.setCaretPosition(offset);
        window.textBuffer.notify();
    }
};
