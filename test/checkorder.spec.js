const fs = require('fs');

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
        const result = checkOrder(['./test/UNORDERED.md']);
        expect(process.exit).toHaveBeenCalledWith(1);
        expect(result).toBeFalsy();

    })
})