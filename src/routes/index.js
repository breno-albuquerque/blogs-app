const express = require('express');

const Router = express.Router();

const loginRouter = require('./loginRouter');

Router.use('/login', loginRouter);

module.exports = Router;