const express = require('express');

const Router = express.Router();

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');

Router.use('/login', loginRouter);
Router.use('/user', userRouter);

module.exports = Router;