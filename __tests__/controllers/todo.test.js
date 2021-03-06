const fs = require('fs');
const controller = require('../../controllers/todo');
const todoUtils = require('../../utils/todoUtils');
const sinon = require('sinon');
const request = require('supertest');
describe('todo controller save todo test', () => {
    let server;
    beforeEach(function () {
      jest.clearAllMocks();
      server = require('../../server');
    });
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
        sinon.verifyAndRestore();
        server.close();
    });

    it('Check 500 save todo error', async () =>{
      sinon.stub(todoUtils, 'saveTodo').throws();
      const mReq = {};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.saveTodo(mReq,mRes);
      expect(mRes.status).toBeCalledWith(500);
    }); 


    it('Check 400 save todo error', async() => {
      sinon.stub(todoUtils, 'saveTodo').throws();
      request(server)
      .post('/todo')
          .send({})
          .expect(400);
    });

    it('should test save todo', async () => {
        const todoData = fs.readFileSync('./__tests__/testData/todo.json');
        const todo = JSON.parse(todoData);
        jest.spyOn(todoUtils, 'saveTodo').mockResolvedValueOnce(todo);  
        const mReq = {todo};
        const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), locals:{data:""} }; 
        await controller.saveTodo(mReq,mRes);
        expect(mRes.json).toBeCalledWith(todo);
    });

});
