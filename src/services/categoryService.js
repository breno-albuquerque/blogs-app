const { Category } = require('../database/models');

const create = async (name) => {
  const category = await Category.create({
    name,
  });

  return category;
};

const get = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  create,
  get,
};