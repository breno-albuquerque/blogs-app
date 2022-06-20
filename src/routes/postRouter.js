const express = require('express');

const Router = express.Router();

const postController = require('../controllers/postController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.validateToken, middlewares.validatePost, postController.create);
Router.get('/', middlewares.validateToken, postController.get);

module.exports = Router;