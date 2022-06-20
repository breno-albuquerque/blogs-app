const express = require('express');

const Router = express.Router();

const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');

Router.use('/login', loginRouter);
Router.use('/user', userRouter);
Router.use('/categories', categoryRouter);

module.exports = Router;