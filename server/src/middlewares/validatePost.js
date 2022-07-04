const CustomError = require('../helpers/CustomError');

function validatePost(req, _res, next) {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || categoryIds === undefined) {
    throw new CustomError('400', 'Some required fields are missing');
  }

  if (title.length > 255 || content.length > 255) {
    throw new CustomError('400', 'The max number of characters is 255');
  }

  next();
}

module.exports = validatePost;
