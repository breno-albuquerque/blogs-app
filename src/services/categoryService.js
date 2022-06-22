const { Category } = require('../database/models');
const CustomError = require('../helpers/CustomError');

const create = async (name) => {
  //  Verifica se categoria já existe:
  const rows = await Category.findAll({
    where: { name },
  });

  if (rows.length !== 0) throw new CustomError(409, 'Category already exists');

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