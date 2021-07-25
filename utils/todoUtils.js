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

const writeToFile = async(todo) => {
    const fileexists = await fileUtils.statFile('./storedTodos/todo.json');
    if(fileexists){
        const data = await fileUtils.readFile('./storedTodos/todo.json');
        console.log('data :>> ', data);
        let todos = JSON.parse(data);
        todos = todos.concat(todo);
        await fileUtils.writeFile('./storedTodos/todo.json', JSON.stringify(todos));
    }else{
        await fileUtils.mkDir('./storedTodos');
        await fileUtils.writeFile('./storedTodos/todo.json', JSON.stringify([todo]));
    }
}

const getTodos = async() => {
    const fileexists = await fileUtils.statFile('./storedTodos/todo.json');
    if(fileexists){
        const data = await fileUtils.readFile('./storedTodos/todo.json');
        return JSON.parse(data);
    }else{
        return [];
    }
}

module.exports = {
    saveTodo,
    writeToFile,
    getTodos,
};