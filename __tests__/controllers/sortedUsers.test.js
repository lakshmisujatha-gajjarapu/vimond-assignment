const fs = require('fs');
const controller = require('../../controllers/userpost');
const userUtils = require('../../utils/userUtils');
const sinon = require('sinon');
const fetch = require('node-fetch');
const request = require('supertest');
describe('user controller sorted users test', () => {
    
    beforeEach(function () {
      jest.clearAllMocks();  
    });
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        sinon.verifyAndRestore();
    });

    it('Check 500 sorted-users error', async () =>{
      sinon.stub(userUtils, 'getSortedUsers').throws();
      const mReq = {};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.getSortedUsers(mReq,mRes);
      expect(mRes.status).toBeCalledWith(500);
    });  
    it('should test get sorted users', async () => {
        const userdata = fs.readFileSync('./__tests__/testData/sortedUsers.json');
        const sortedUsers = JSON.parse(userdata);
        jest.spyOn(userUtils, 'getSortedUsers').mockResolvedValueOnce(sortedUsers);  
        const mReq = {sortedUsers};
        const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), locals:{data:""}}; 
        await controller.getSortedUsers(mReq,mRes);
        expect(mRes.json).toBeCalledWith(sortedUsers);
    });
});
