const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const token = await userService.register(req.body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await userService.get(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await userService.remove(req.user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  get,
  remove,
};
