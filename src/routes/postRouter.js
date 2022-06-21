const express = require('express');

const Router = express.Router();

const postController = require('../controllers/postController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.validateToken, middlewares.validatePost, postController.create);
Router.get('/', middlewares.validateToken, postController.getAll);
Router.get('/:id', middlewares.validateToken, postController.getOne);
Router.put('/:id', middlewares.validateToken, postController.update);
Router.delete('/:id', middlewares.validateToken, postController.remove);

module.exports = Router;