const fs = require('fs');
const controller = require('../../controllers/userpost');
const userUtils = require('../../utils/userUtils');
const sinon = require('sinon');
describe('user controller Nicholas endpoint test', () => {
    beforeEach(function () {
      jest.clearAllMocks();
    });
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        sinon.verifyAndRestore();
    });

    it('Check 500 Nicholas error', async () =>{
      sinon.stub(userUtils, 'getUserById').throws();
      const mReq = {};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.getNicholas(mReq,mRes);
      expect(mRes.status).toBeCalledWith(500);
    });  
    it('should test get Nicholas', async () => {
        const userdata = fs.readFileSync('./__tests__/testData/user.json');
        const user = JSON.parse(userdata);
        const postsData = fs.readFileSync('./__tests__/testData/posts.json');
        const posts = JSON.parse(postsData);
        jest.spyOn(userUtils, 'getUserById').mockResolvedValueOnce(user);
        jest.spyOn(userUtils, 'getPostsForUser').mockResolvedValueOnce(posts);   
        const userPosts = {user: user, posts: posts}    
        const mReq = {userPosts};
        const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), locals:{data:""} }; 
        await controller.getNicholas(mReq,mRes);
        expect(mRes.json).toBeCalledWith(userPosts);
    });
});
