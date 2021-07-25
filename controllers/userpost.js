const exceptions = require('../exceptions/apiExceptions');
const userUtils = require('../utils/userUtils');
const nodeCache = require('node-cache');
const userpostCache = new nodeCache();
/**
 * @typedef user
 * @property {integer} id
 * @property {string} name
 * @property {string} email
 * @property {addres.model} address
 * @property {string} phone 
 * @property {string} website 
 * @property {string} company 
 */

/**
 * @typedef address
 * @property {string} street
 * @property {string} suite
 * @property {string} city
 * @property {string} zipcode 
 * @property {geo.model} geo 
 */

/**
 * @typedef geo
 * @property {string} lat
 * @property {string} lng 
 */

/**
 * @typedef post
 * @property {integer} userId
 * @property {integer} id
 * @property {string} title
 * @property {string} body 
 */

/**
 * @typedef userposts
 * @property {user.model} user.required 
 * @property {Array.<post>} posts.required 
 */

/**
 * @typedef response
 * @property {[string]} method
 * @property {[integer]} status  - error status code
 * @property {error.model} error  -- error object with array of error message
 */

/**
 * @typedef error
 * @property {[string]} value - input param value
 * @property {[string]} msg.required  - error msg
 * @property {[string]} param  - input param name
 * @property {[string]} location  -- error location (values -> param | body)
 */

/**
 * Endpoint to aggregation of the user and his posts for userId 8(Nicholas) along with all his posts,
 * @route GET /Nicholas
 * @returns {userposts.model}  Aggregation of the user and Nicholas posts
*  @returns {response.model}   500 Internal Exception
 */

const getNicholas = (async (req, res, next) => {
    try {
        const user = await userUtils.getUserById(8);
        const posts = await userUtils.getPostsForUser(user);
        const userposts = {
            'user' : user,
            'posts' : posts
        };
        res.locals.data = userposts;
        res.status(200).json(userposts); 
        
        return next();
    } catch (e) {
        console.log(e);
        exceptions.internalServerException(req,res, e);
    }

})

/**
 * Endpoint to return all the posts created by users that workfor Romaguera group
 * @route GET /Romaguera
 * @returns {Array.<post>}  posts created by users that workfor Romaguera group
*  @returns {response.model}   500 Internal Exception
 */

const getRomaguera = (async (req, res, next) => {
    try {
        const users = await userUtils.getUsersByCompanyName('Romaguera');
        const allPosts = await userUtils.getPosts();
        let posts = [];
        users.forEach(user => {
                posts = posts.concat(allPosts.filter(post=> post.userId === user.id));
            }
        )
        res.locals.data = posts;
        res.status(200).json(posts); 
        
        return next();
    } catch (e) {
        console.log(e);
        exceptions.internalServerException(req, res, e);
    }
})

/**
 * Endpoint to return all the posts created by users that workfor Romaguera group
 * @route GET /sorted-users
 * @returns {Array.<user>}  posts created by users that workfor Romaguera group
*  @returns {response.model}   500 Internal Exception
 */

const getSortedUsers = (async (req, res, next) => {
    try{
        const sortedUsers = await userUtils.getSortedUsers();
        res.locals.data = sortedUsers;
        res.status(200).json(sortedUsers);
        
        return next();
    } catch (e) {
        console.log(e);
        exceptions.internalServerException(req, res, e);
    }
})

module.exports = {
    getNicholas,
    getRomaguera,
    getSortedUsers
}