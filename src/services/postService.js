const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
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
    //  Cria coluna no BlogPost:
    const post = await BlogPost.create({
      title,
      content,
      categoryIds,
      userId: id,
    }, { transaction: t });

    //  Cria coluna(s) no postCategory:
    await PostCategory.bulkCreate(
      categoryIds.map((categoryId) => ({
        categoryId,
        postId: post.dataValues.id,
      })), { transaction: t },
    );
  });

  //  Retorna dados do post criado:
  const fullPost = await BlogPost.findOne({ where: { title } });
  return fullPost.dataValues;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

const getOne = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  
  return post;
};

const update = async (postId, { id }, { title, content }) => {
  //  Verifica se o post existe e se pertence ao usuário:
  const post = await getOne(postId);
  if (!post) throw new CustomError(404, 'Post does not exist');
  if (post.dataValues.userId !== id) throw new CustomError(401, 'Unauthorized user');

  await BlogPost.update({
    title,
    content,
  }, { where: { id: postId } });
};

const remove = async (postId, { id }) => {
  //  Verifica se o post existe e se pertence ao usuário:
  const post = await getOne(postId);
  if (!post) throw new CustomError(404, 'Post does not exist');
  if (post.dataValues.userId !== id) throw new CustomError(401, 'Unauthorized user');

  //  Deleta de BlogPost e PostCategory (onDelete: 'CASCADE')
  await BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};