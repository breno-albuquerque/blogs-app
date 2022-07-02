const likeService = require('../services/likeService');

const post = async (req, res, next) => {
  try {
    const { id } = req.user;
    await likeService.post(id);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  post,
};
