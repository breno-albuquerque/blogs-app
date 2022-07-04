//  https://www.w3resource.com/javascript/form/email-validation.php
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const CustomError = require('../helpers/CustomError');

function validateFieldsPresence(req, _res, next) {
  const {
    displayName, email, password, image,
  } = req.body;

  if (!displayName || !email || !password || !image) {
    throw new CustomError(400, 'Some required fields are missing');
  }

  next();
}

function validadeFieldsRules(req, _res, next) {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    throw new CustomError(400, '"displayName" length must be at least 8 characters long');
  }

  if (!emailRegex.test(email)) {
    throw new CustomError(400, '"email" must be a valid email');
  }

  if (password.length < 6) {
    throw new CustomError(400, '"password" length must be at least 6 characters long');
  }

  next();
}

module.exports = {
  validateFieldsPresence,
  validadeFieldsRules,
};
