const express = require('express');
const healthController = require('../controllers/health');
const versionController = require('../controllers/version');
const imagesController = require('../controllers/images');
const userController = require('../controllers/userpost');
const todoController = require('../controllers/todo');
const {imageValidator, todoValidator} = require('../utils/validation');
const router = express.Router(); // eslint-disable-line

router.get('/ping', healthController.getHealth);
router.get('/version', versionController.getNodeVersion);
router.get('/nicholas', userController.getNicholas);
router.get('/romaguera', userController.getRomaguera);
router.get('/sorted-users', userController.getSortedUsers);
router.get('/images',imageValidator(), imagesController.getImages); 
router.post('/todo',todoValidator(), todoController.saveTodo); 
router.get('/new-todos', todoController.getTodos);

module.exports = router;
