const checkOrder = require('../checkorder');

describe('checkorder', () => {
    beforeEach(() => {
        jest.spyOn(process, 'exit').mockImplementationOnce(() => true);
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should identify ordered list links as ordered', () => {
        const result = checkOrder(['./test/ORDERED.md']);
        expect(result).toBeTruthy();
    });

    it('should identify unordered list links as unordered', () => {
        checkOrder(['./test/UNORDERED.md']);
        expect(console.log).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(process.exit).toHaveBeenCalledWith(1);
    })
})
