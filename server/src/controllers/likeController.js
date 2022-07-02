const likeService = require('../services/likeService');

const post = async (req, res, next) => {
  try {
    const { id } = req.params;
    await likeService.post(id, req.user.id);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  post,
};
