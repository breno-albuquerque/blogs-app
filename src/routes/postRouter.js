const express = require('express');

const Router = express.Router();

const postController = require('../controllers/postController');
const middlewares = require('../middlewares');

/* Router.post('/', middlewares.loginValidation, postController.login); */

module.exports = Router;