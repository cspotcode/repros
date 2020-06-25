describe('mysuite', () => {
    beforeEach(() => {
        if(process.env.FAIL) throw new Error('failure');
    });
    it('mycase', () => {});
});