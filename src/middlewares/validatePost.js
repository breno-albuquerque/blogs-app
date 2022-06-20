const CustomError = require('../helpers/CustomError');

function validatePost(req, _res, next) {
  const { title, content, categotyIds } = req.body;

  if (!title || !content || !categotyIds) {
    throw new CustomError('400', 'Some required fields are missing');
  }

  next();
}

module.exports = validatePost;