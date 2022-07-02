const express = require('express');

const Router = express.Router();

const likeController = require('../controllers/likeController');
const middlewares = require('../middlewares');

Router.post('/:id', middlewares.validateToken, likeController.post);

module.exports = Router;
