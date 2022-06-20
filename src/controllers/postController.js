const CustomError = require('../helpers/CustomError');
const postService = require('../services/postService');

const create = async (req, res, next) => {
  try {
    const post = await postService.create(req.body, req.user);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await postService.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await postService.getOne(id);

    if (post.length === 0) {
      throw new CustomError(404, 'Post does not exist');
    }

    res.status(200).json(post[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
};