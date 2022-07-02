const express = require('express');

const Router = express.Router();

const likeController = require('../controllers/likeController');
const middlewares = require('../middlewares');

Router.post('/', middlewares.validateToken);

module.exports = Router;