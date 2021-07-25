const fs = require('fs');
const controller = require('../../controllers/userpost');
const userUtils = require('../../utils/userUtils');
const sinon = require('sinon');
describe('user controller Romeguara endpoint test', () => {
    beforeEach(function () {
      jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        sinon.verifyAndRestore();
    });
    it('Check 500 Romaguera error', async () =>{
      sinon.stub(userUtils, 'getUsersByCompanyName').throws();
      const mReq = {};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.getRomaguera(mReq,mRes);
      expect(mRes.status).toBeCalledWith(500);
  });  
    it('should test get Romaguera', async () => {
        const userdata = fs.readFileSync('./__tests__/testData/users_romaguera.json');
        const users = JSON.parse(userdata);
        const postsData = fs.readFileSync('./__tests__/testData/posts.json');
        const posts = JSON.parse(postsData);
        const postsRomagueraData = fs.readFileSync('./__tests__/testData/posts_romaguera.json');
        const postsRomaguera = JSON.parse(postsRomagueraData);
        jest.spyOn(userUtils, 'getUsersByCompanyName').mockResolvedValueOnce(users);
        jest.spyOn(userUtils, 'getPosts').mockResolvedValueOnce(posts);   
        const mReq = {posts};
        const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
        await controller.getRomaguera(mReq,mRes);
        expect(mRes.json).toBeCalledWith(postsRomaguera);
    });

});
