const express = require('express');
const healthController = require('../controllers/health');
const versionController = require('../controllers/version');
const imagesController = require('../controllers/images');
const userController = require('../controllers/userpost');
const todoController = require('../controllers/todo');
const {imageValidator, todoValidator} = require('../utils/validation');
const router = express.Router();
const cache = require('../middlewares/cache');

router.get('/ping', healthController.getHealth);
router.get('/version', versionController.getNodeVersion);
router.get('/nicholas', cache.get,userController.getNicholas, cache.set);
router.get('/romaguera', cache.get,userController.getRomaguera, cache.set);
router.get('/sorted-users', cache.get, userController.getSortedUsers, cache.set);
router.get('/images',imageValidator(), cache.get,imagesController.getImages, cache.set); 
router.post('/todo',todoValidator(), todoController.saveTodo, cache.setAppend); 
router.get('/new-todos', cache.getAll);

module.exports = router;
