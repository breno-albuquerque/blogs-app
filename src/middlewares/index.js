const { validateFieldsPresence, validadeFieldsRules } = require('./registerValidation');
const loginValidation = require('./loginValidation');
const errorMiddleware = require('./errorMiddleware');
const validateToken = require('./validateToken');

module.exports = {
  loginValidation,
  errorMiddleware,
  validateFieldsPresence,
  validadeFieldsRules,
  validateToken,
};