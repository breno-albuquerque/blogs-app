const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../database/models');
const CustomError = require('../helpers/CustomError');
const config = require('../database/config/config.js');

const sequelize = new Sequelize(config.development);

async function verifyCategories(categories) {
  const categoryPromise = [];
  categories.forEach((category) => {
    categoryPromise.push(Category.findOne({
      where: { id: category },
    }));
  });
  const resolvedCategories = await Promise.all(categoryPromise);

  if (resolvedCategories.some((category) => category === null)) {
    throw new CustomError('400', '"categoryIds" not found');
  }
}

const create = async ({ title, content, categoryIds }, { id }) => {
  // Verifica se categorias existem:
  await verifyCategories(categoryIds);

  // Transaction:
  await sequelize.transaction(async (t) => {
    //  Cria coluna no BlogPost
    const post = await BlogPost.create({
      title,
      content,
      categoryIds,
      userId: id,
    }, { transaction: t });

    //  Cria coluna(s) no postCategory
    const categories = await PostCategory.bulkCreate(
      categoryIds.map((categoryId) => ({
        categoryId,
        postId: id,
      })), { transaction: t },
    );
  });

  const fullPost = await BlogPost.findOne({ where: { title } });
  return fullPost.dataValues;
};

module.exports = {
  create,
};