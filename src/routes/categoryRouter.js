const express = require('express');

const Router = express.Router();

const categoryController = require('../controllers/categoryController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.validateToken, categoryController.create);
Router.get('/', middlewares.validateToken, categoryController.get);

module.exports = Router;