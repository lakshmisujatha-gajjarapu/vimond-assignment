const request = require('supertest');
const fs = require('fs');
const imageUtils = require('../utils/imageUtils');
const userUtils = require('../utils/userUtils');
const todoUtils = require('../utils/todoUtils');
const sinon = require('sinon');
const fetch = require('node-fetch');
describe('loading express', function () {
  let server;
  beforeEach(function () {
    server = require('../server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /ping', (done) => {
  request(server)
    .get('/ping')
    .expect(200, done);
  });

  it('responds to /version', (done) => {
    request(server)
      .get('/version')
      .expect(200, done);
    });

  it('responds to /images', (done) => {
    const rawdata = fs.readFileSync('./__tests__/testData/images.json');
    const photos = JSON.parse(rawdata);
    sinon.stub(imageUtils, 'getPhotos').returns(photos)
    request(server)
      .get('/images')
      .expect(200, done);
    });
  
  it('responds to /Nicholas', (done) =>{
      const userRawdata = fs.readFileSync('./__tests__/testData/user.json');
      const postsRawdata = fs.readFileSync('./__tests__/testData/posts.json');
      const user = JSON.parse(userRawdata);
      const posts = JSON.parse(postsRawdata);
      sinon.stub(userUtils, 'getUserById').returns(user);
      sinon.stub(userUtils, 'getPostsForUser').returns(posts);
      request(server)
        .get('/Nicholas')
        .expect(200, done);
  }); 
  
  it('responds to /Romaguera', (done) =>{
    const usersRawdata = fs.readFileSync('./__tests__/testData/users.json');
    const postsRawdata = fs.readFileSync('./__tests__/testData/posts.json');
    const users = JSON.parse(usersRawdata);
    const posts = JSON.parse(postsRawdata);
    sinon.stub(userUtils, 'getUsersByCompanyName').returns(users);
    sinon.stub(userUtils, 'getPosts').returns(posts);
    request(server)
      .get('/Romaguera')
      .expect(200, done);
});  
it('responds to /sorted-users', (done) =>{
  const usersRawdata = fs.readFileSync('./__tests__/testData/users.json');
  const users = JSON.parse(usersRawdata);
  sinon.stub(userUtils, 'getSortedUsers').returns(users);
  request(server)
    .get('/Romaguera')
    .expect(200, done);
});  

it('responds to post /todo', (done) =>{
  const todoRawdata = fs.readFileSync('./__tests__/testData/todo.json');
  const todo = JSON.parse(todoRawdata);
  sinon.stub(todoUtils, 'saveTodo').returns(todo);
  request(server)
    .post('/todo').send(todo)
    .expect(201, done);
});  
   
  it('404 everything get', (done) =>{
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});