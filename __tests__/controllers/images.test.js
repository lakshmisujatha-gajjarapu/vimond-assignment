const fs = require('fs');
const controller = require('../../controllers/images');
const imageUtils = require('../../utils/imageUtils');
const sinon = require('sinon');
const fetch = require('node-fetch');
const request = require('supertest');
const { response } = require('express');
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe('image controller test', () => {
    let server;
    beforeEach(function () {
      server = require('../../server');
      jest.clearAllMocks();
    });
    afterEach(() => {
        server.close();
        sinon.verifyAndRestore();
    });

    it('Check 500 get images error', async () =>{
      sinon.stub(imageUtils, 'getPhotos').throws();
      const mReq = {};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.getImages(mReq,mRes);
      expect(mRes.status).toBeCalledWith(500);
    }); 

    it('should test the photos', async () => {
        const rawdata = fs.readFileSync('./__tests__/testData/images.json');
        const photos = JSON.parse(rawdata);
        jest.spyOn(imageUtils, 'getPhotos').mockResolvedValueOnce(photos);
        const mReq = {query:{
          size: "1",
          offset: "10"
        }};
        const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
        await controller.getImages(mReq,mRes);
        expect(mRes.json).toBeCalledWith(photos);
    });


    it('should test the photos with size and offset', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/images.json');
      const photos = JSON.parse(rawdata);
      jest.spyOn(imageUtils, 'getPhotos').mockResolvedValueOnce(photos);
      const mReq = {query:{
        size: "1",
        offset: "10"
      }};
      const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
      await controller.getImages(mReq,mRes);
      expect(mRes.json).toBeCalledWith(photos);
  });


  it('should test the photos with size', async () => {
    const rawdata = fs.readFileSync('./__tests__/testData/images.json');
    const photos = JSON.parse(rawdata);
    jest.spyOn(imageUtils, 'getPhotos').mockResolvedValueOnce(photos);
    const mReq = {query:{
      size: "1"
    }};
    const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
    await controller.getImages(mReq,mRes);
    expect(mRes.json).toBeCalledWith(photos);
});

it('should test the photos with offset', async () => {
  const rawdata = fs.readFileSync('./__tests__/testData/images.json');
  const photos = JSON.parse(rawdata);
  jest.spyOn(imageUtils, 'getPhotos').mockResolvedValueOnce(photos);
  const mReq = {query:{
    offset: "10"
  }};
  const mRes = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 
  await controller.getImages(mReq,mRes);
  expect(mRes.json).toBeCalledWith(photos);
});

    it('should test 400 server response', () => {
        const rawdata = fs.readFileSync('./__tests__/testData/images.json');
        const photos = JSON.parse(rawdata);
        sinon.stub(imageUtils, 'getPhotos').returns(photos);
        request(server)
          .get('/images?size=-1&offset=-1')
          .expect(400);
    });

  
});
