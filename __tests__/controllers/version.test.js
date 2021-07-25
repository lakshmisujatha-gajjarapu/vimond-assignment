const constants = require('../../constants/apiconstants');
const controller = require('../../controllers/version');
describe('health controller test', () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });
    it('should test the node version number', async () => {
        const mReq = {};
        const mRes = { send: jest.fn(), status: jest.fn().mockReturnThis() }; 
        await controller.getNodeVersion(mReq,mRes);
        expect(mRes.send).toBeCalledWith(constants.CURRENT_NODE_VERSION + process.version);
    });
});
