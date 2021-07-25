const fs = require('fs');
const usersUtils = require('../../utils/userUtils');
const sinon = require('sinon');
const fetch = require('node-fetch')
describe('Test users utils', function () {
  afterEach(()=> { sinon.verifyAndRestore(); })
    it('getUserById test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/user.json');
      const user = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return user }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await usersUtils.getUserById('https://zzz.com');    
      expect(data.id).toEqual(8);
    });
    it('getUsersByCompanyName test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/users.json');
      const users = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return users }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await usersUtils.getUsersByCompanyName('Romaguera');    
      expect(data.length).toEqual(2);
      expect(data[0].company.name).toMatch('Romaguera');
      expect(data[1].company.name).toMatch('Romaguera');
    });

    it('getPostsForUser test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/userPosts.json');
      const posts = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return posts }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await usersUtils.getPostsForUser({id:8});    
      expect(data.length).toEqual(10);
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({userId: 8}),
        ])
      );
    });
    it('getPosts test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/posts.json');
      const posts = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return posts }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await usersUtils.getPosts();    
      expect(data.length).toEqual(100);
    });

    it('getSortedUsers test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/users.json');
      const users = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return users }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await usersUtils.getSortedUsers();    
      expect(data.length).toEqual(5);
    });
  });