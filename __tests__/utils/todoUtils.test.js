const fs = require('fs');
const todoUtils = require('../../utils/todoUtils');
const sinon = require('sinon');
const fetch = require('node-fetch')
const fileUtils = require('../../utils/fileUtils');
const { json } = require('body-parser');
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

    it('write todo test new file', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/todo.json');
      const todo = JSON.parse(rawdata);
      const statfile = sinon.stub(fileUtils, 'statFile').returns(false);
      const mkDir = sinon.stub(fileUtils, 'mkDir').returns();
      const writeFile = sinon.stub(fileUtils, 'writeFile').returns();
      await todoUtils.writeToFile(todo); 
      sinon.assert.calledOnce(statfile);  
      sinon.assert.calledOnce(mkDir);   
      sinon.assert.calledOnce(writeFile);   
    });

    it('write todo test existing file', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/todos.json');
      const todos = JSON.parse(rawdata);
      const statfile = sinon.stub(fileUtils, 'statFile').returns(true);
      const readFile = sinon.stub(fileUtils, 'readFile').returns(JSON.stringify(todos));
      const writeFile = sinon.stub(fileUtils, 'writeFile').returns();
      await todoUtils.writeToFile(todos); 
      sinon.assert.calledOnce(statfile);  
      sinon.assert.calledOnce(readFile);   
      sinon.assert.calledOnce(writeFile);   
    });


    it('get todo test existing file', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/todos.json');
      const todos = JSON.parse(rawdata);
      const statfile = sinon.stub(fileUtils, 'statFile').returns(true);
      const readFile = sinon.stub(fileUtils, 'readFile').returns(JSON.stringify(todos));
      const data = await todoUtils.getTodos(); 
      sinon.assert.calledOnce(statfile);  
      sinon.assert.calledOnce(readFile);  
      expect(data.length).toEqual(1);
    });


    it('get todo test existing file', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/todos.json');
      const todos = JSON.parse(rawdata);
      const statfile = sinon.stub(fileUtils, 'statFile').returns(false);
      const data = await todoUtils.getTodos(); 
      sinon.assert.calledOnce(statfile);  
      expect(data.length).toEqual(0);
    });
  });