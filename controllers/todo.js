const toDoUtils = require('../utils/todoUtils');
const exceptions = require('../exceptions/apiExceptions')
const { requestValidator } = require('../utils/validation');
const fs = require('fs');
const nodeCache = require('node-cache');
const newTodoCache = new nodeCache();

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
const saveTodo = async(req, res) => {
    const errors = requestValidator(req);
    if (errors.length > 0) 
    return exceptions.argumentException(req,res,errors);
    try {
        const todo = await toDoUtils.saveTodo(req?.body);
        await toDoUtils.writeToFile(todo);
        res.status(201).json(todo);

    }catch(e) {
        console.log(e)
        return exceptions.internalServerException(req,res,e);  
    }
};

/**
 * Endpoint to get new saved todos 
 * @route GET /new-todos 
 * @returns {todo.model}  todo
 * @returns {Response.model}   500 Internal Exception
 */
const getTodos = async(req, res) => {
    try {
        const todos = await toDoUtils.getTodos();
        res.status(200).json(todos);

    }catch(e) {
        console.log(e)
        return exceptions.internalServerException(req,res,e);  
    }
};

module.exports = {
    saveTodo,
    getTodos
};