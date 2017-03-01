const expect = require('chai').expect;
const TextBuffer = require('../app/js/TextBuffer');


describe('TextBuffer', () => {
    let textBuffer;

    beforeEach(() => {
        textBuffer = new TextBuffer(); 
    });

    it('returns an object', () => {
        expect(textBuffer).to.be.an("object");
    });

    describe('.putChar(c)', () => {
        it('increments the caretPosition by 1', () => {
            const initPos = textBuffer.getCaretPosition();
            textBuffer.putChar('a')
            const newPos = textBuffer.getCaretPosition();
            expect(newPos).to.equal(initPos + 1);
        });

        it('adds it\'s argument at the current caretPosition', () => {
            const currentLineNumber = textBuffer.getCurrentLineNumber();
            const lineBeforeEdit = textBuffer.getLines(currentLineNumber);
            const arg = 'a';
            textBuffer.putChar(arg)
            expect(textBuffer.getLines(currentLineNumber)).to.equal(lineBeforeEdit + arg);
        });

        it('inserts it\'s argument at the current caretPosition', () => {
           const lineBeforeEdit = 'This  is line of text';
           const lineNumber = 0;
           textBuffer.putLine(lineBeforeEdit, lineNumber);
           textBuffer.setCaretPosition(5);
           textBuffer.setCurrentLine(lineNumber);
           textBuffer.putChar('a');
           expect(textBuffer.getLines(lineNumber)).to.equal('This is a line of FAIL');
        });
    });

});
