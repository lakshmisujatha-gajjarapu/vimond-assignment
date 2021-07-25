const constants = require('../../constants/apiconstants');
const controller = require('../../controllers/health');
describe('health controller test', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });
    it('should return pong', async () => {
        const mReq = {};
        const mRes = { send: jest.fn(), status: jest.fn().mockReturnThis() }; 
        await controller.getHealth(mReq,mRes);
        expect(mRes.send).toBeCalledWith(constants.PONG);
    });
});
