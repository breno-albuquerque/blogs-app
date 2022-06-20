const loginValidation = require('./loginValidation');
const errorMiddleware = require('./errorMiddleware');
const { validateFieldsPresence, validadeFieldsRules } = require('./registerValidation');

module.exports = {
  loginValidation,
  errorMiddleware,
  validateFieldsPresence,
  validadeFieldsRules,
};