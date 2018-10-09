const checkOrder = require('../checkorder');

describe('checkorder', () => {
    beforeEach(() => {
        jest.spyOn(process, 'exit').mockImplementationOnce(() => true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should idenitfy ordered list links as ordered', () => {
        const result = checkOrder(['./test/ORDERED.md']);
        expect(result).toBeTruthy();
    });

    it('should identify unordered list links as unordered', () => {
        spyOn(console, 'log');
        spyOn(console, 'error');
        checkOrder(['./test/UNORDERED.md']);
        expect(console.log).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(process.exit).toHaveBeenCalledWith(1);
    })
})
