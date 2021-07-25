const fs = require('fs');
const imageUtils = require('../../utils/imageUtils');
const sinon = require('sinon');
const fetch = require('node-fetch')
describe('Test image utils', function () {
    it('getImages test', async () => {
      const rawdata = fs.readFileSync('./__tests__/testData/images.json');
      const photos = JSON.parse(rawdata);
      var responseObject = {"status":'200',json: () => { return photos }};
      sinon.stub(fetch, 'Promise').returns(responseObject);
      const data = await imageUtils.getPhotos('https://zzz.com');    
      expect(data.length).toEqual(2);
    });
  });