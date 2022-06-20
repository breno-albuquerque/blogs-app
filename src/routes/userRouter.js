const express = require('express');

const Router = express.Router();

const userController = require('../controllers/userController');
const middlewares = require('../middlewares');

Router.post('/',
  middlewares.validateFieldsPresence,
  middlewares.validadeFieldsRules,
  userController.register);

module.exports = Router;