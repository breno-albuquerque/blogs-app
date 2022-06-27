const express = require('express');

const Router = express.Router();

const userController = require('../controllers/userController');
const middlewares = require('../middlewares');

Router.post('/',
  middlewares.validateFieldsPresence,
  middlewares.validadeFieldsRules,
  userController.register);

Router.get('/', middlewares.validateToken, userController.get);
Router.get('/:id', middlewares.validateToken, userController.get);
Router.delete('/me', middlewares.validateToken, userController.remove);

module.exports = Router;