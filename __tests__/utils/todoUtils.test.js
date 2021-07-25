const fs = require('fs');
const todoUtils = require('../../utils/todoUtils');
const sinon = require('sinon');
const fetch = require('node-fetch')
describe('Test todo utils', function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });
  afterEach(() => {
      sinon.verifyAndRestore();
  });
    it('save todo test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/todo.json');
      const todo = JSON.parse(rawdata);
      const responseObject = {"status":'201',json: () => { return todo }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await todoUtils.saveTodo('https://zzz.com');    
      expect(data.userId).toEqual(1);
    });
  });