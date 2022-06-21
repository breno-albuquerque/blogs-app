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

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.remove(id, req.user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getByQuery = async (req, res, next) => {
  try {
    console.log(req.query);
    const posts = await postService.getByQuery(req.query);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getByQuery,
};