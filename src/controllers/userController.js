const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const token = await userService.register(req.body);
  
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};