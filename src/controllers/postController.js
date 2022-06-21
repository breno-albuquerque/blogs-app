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
  try {
    const { id } = req.params;
    const post = await postService.getOne(id);

    if (!post) {
      throw new CustomError(404, 'Post does not exist');
    }

    res.status(200).json(post.dataValues);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      throw new CustomError(400, 'Some required fields are missing');
    }

    await postService.update(id, req.user, req.body);
    const post = await postService.getOne(id);
    res.status(200).json(post.dataValues);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};