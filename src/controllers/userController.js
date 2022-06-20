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
  const { id } = req.params;

  try {
    const users = await userService.get(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  get,
};