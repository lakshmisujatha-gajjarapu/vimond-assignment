const config = require('../utils/config');
const imageUtils = require('../utils/imageUtils');
const exceptions = require('../exceptions/apiExceptions')
const routesNames = require('../constants/route-names');
const nodeCache = require('node-cache');
const imageCache = new nodeCache();
const { requestValidator } = require('../utils/validation');

/**
 * @typedef image
 * @property {integer} albumId
 * @property {integer} id
 * @property {string} title
 * @property {string} url - image url
 * @property {string} thumbnailUrl - thumbnail url
 */

/**
 * Endpoint to return the images 
 * @route GET /images
 * @param {integer} size.query.optional - szie of the images to be returned
 * @param {integer} offset.query.optional - lets a user select an offset of the previous size.
 * @returns {Array.<image>}  images
 * @returns {response.model}   400 Bad Request
 * @returns {response.model}   500 Internal Exception
 */

const getImages = async(req, res, next) => {
        const errors = requestValidator(req);
        if(errors.length > 0) return exceptions.argumentException(req,res,errors);
        try{
            let url = `${config.TYPICODE_URL}${routesNames.photos}`;
            const size = parseInt(req.query?.size, 0);
            const offset = parseInt(req.query?.offset, 0);
            switch (true) {
                case size > 0 && offset > 0:
                    url = url + `?_start=${size*offset}&_limit=${size}`;
                    break;
                case offset > 0 :
                    url = url + `?_limit=${offset}`;
                    break;
                case size > 0 :
                    url = url + `?_limit=${size}`;                   
                    break;
            }
            const data = await imageUtils.getPhotos(url);
            res.locals.data = data;
            res.status(200).json(data); 
            return next();
        }catch (e) {
            console.log(e);
            return exceptions.internalServerException(req,res,e);  
        }
};

module.exports = {
    getImages
};