const { validateFieldsPresence, validadeFieldsRules } = require('./registerValidation');
const loginValidation = require('./loginValidation');
const errorMiddleware = require('./errorMiddleware');
const validateToken = require('./validateToken');
const validatePost = require('./validatePost');

module.exports = {
  loginValidation,
  errorMiddleware,
  validateFieldsPresence,
  validadeFieldsRules,
  validateToken,
  validatePost,
};