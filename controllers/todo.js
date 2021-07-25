const toDoUtils = require('../utils/todoUtils');
const exceptions = require('../exceptions/apiExceptions')
const { requestValidator } = require('../utils/validation');

/**
 * @typedef todo
 * @property {integer} userId
 * @property {integer} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * Endpoint to saved todo 
 * @route POST /todo
 * @param {todo.model} todo.body.required - the new todo 
 * @returns {todo.model}  todo
 * @returns {response.model}   400 Bad Request
 * @returns {response.model}   500 Internal Exception
 */
const saveTodo = async(req, res, next) => {
    const errors = requestValidator(req);
    if (errors.length > 0) 
    return exceptions.argumentException(req,res,errors);
    try {
        const todo = await toDoUtils.saveTodo(req?.body);
        res.locals.data = todo;
        res.status(201).json(todo);

        return next();
    }catch(e) {
        console.log(e)
        return exceptions.internalServerException(req,res,e);  
    }
};

module.exports = {
    saveTodo,
};