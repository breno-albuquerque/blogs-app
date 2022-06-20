const express = require('express');

const Router = express.Router();

const postController = require('../controllers/postController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.validateToken, postController.create);

module.exports = Router;