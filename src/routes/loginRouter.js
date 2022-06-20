const express = require('express');

const Router = express.Router();

const loginController = require('../controllers/loginController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.loginValidation, loginController.login);

module.exports = Router;