const categoryService = require('../services/categoryService');

const create = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  try {
    const category = await categoryService.create(name);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};