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
        it('increments the caretPosition by length of char', () => {
            const initPos = textBuffer.getCaretPosition();
            const char = 'apple';
            textBuffer.putChar(char)
            const newPos = textBuffer.getCaretPosition();
            expect(newPos).to.equal(initPos + char.length);
        });

        it('adds it\'s argument at the current caretPosition', () => {
            const currentLineNumber = textBuffer.getCurrentLineNumber();
            const lineBeforeEdit = textBuffer.getLines(currentLineNumber);
            const arg = 'a';
            textBuffer.putChar(arg)
            expect(textBuffer.getLines(currentLineNumber)).to.equal(lineBeforeEdit + arg);
        });

        it('inserts it\'s argument at the current caretPosition', () => {
           const lineBeforeEdit = 'This is  line of text';
           const lineAfterEdit = 'This is a line of text';
           const lineNumber = 0;
           textBuffer.putLine(lineBeforeEdit, lineNumber);
           textBuffer.setCaretPosition(8);
           textBuffer.setCurrentLine(lineNumber);
           textBuffer.putChar('a');
           expect(textBuffer.getLines(lineNumber)).to.equal(lineAfterEdit);
        });
    });

    describe('.putLine(line, num)', () => {
        it('inserts a line at a given line number', () => {
            const copyOfLines = textBuffer.getLines().slice(); // make a copy
            const newLineContent = 'new line zero';
            copyOfLines.splice(0, 0, newLineContent)
            textBuffer.putLine(newLineContent, 0);
            expect(textBuffer.getLines(0)).to.equal(copyOfLines[0]);
            expect(textBuffer.getLines(1)).to.equal(copyOfLines[1]);
        })
    });

    describe('.newLine()', () => {
        
    });

    describe('.deleteLineBackwards(int=1)', () => {
        
    });

    describe('.deleteBackwards(int=1)', () => {
        
    });

    describe('.getLines(begining, ending)', () => {
        
    });

    describe('.getCaretPosition()', () => {
        
    });

    describe('.getCurrentLineNumber()', () => {
        
    });

    describe('.putline(line, lineNumber)', () => {
        
    });

});
