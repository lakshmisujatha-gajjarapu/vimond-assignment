const fetch = require('node-fetch');
const routesNames = require('../constants/route-names');
const config = require('./config');
const fs = require('fs');
const fsPromises = fs.promises;
const { todos } = require('../constants/route-names');
const fileUtils = require('../utils/fileUtils');

const saveTodo = async(todo) => {
    const todoResponse = await fetch(`${config.TYPICODE_URL}${routesNames.todos}`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {'Content-Type': 'application/json'}
    });
    
    return await todoResponse.json();
}

module.exports = {
    saveTodo,
};