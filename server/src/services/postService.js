const Sequelize = require('sequelize');
const { formatDistanceToNowStrict } = require('date-fns');
const {
  BlogPost, PostCategory, Category, User,
} = require('../database/models');
const CustomError = require('../helpers/CustomError');
//  const config = require('../database/config/config');

//  const sequelize = new Sequelize(config.development);
const { Op } = Sequelize;

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

  // Transaction Comentada Por motivos de TimeOut no Heroku:

  // await sequelize.transaction(async (t) => {
  //  Cria coluna no BlogPost:
  const post = await BlogPost.create({
    title,
    content,
    categoryIds,
    userId: id,
  }/* , { transaction: t } */);

  //  Cria coluna(s) no postCategory:
  await PostCategory.bulkCreate(categoryIds.map((categoryId) => ({
    categoryId,
    postId: post.dataValues.id,
  }))/* , { transaction: t } */);

  // });

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
        model: User,
        as: 'usersWhoLiked',
        attributes: ['id'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  const postsFormat = posts.map((post) => ({
    ...post.dataValues,
    distance: formatDistanceToNowStrict(post.published),
    likes: post.usersWhoLiked.length,
  }));

  return postsFormat;
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

  if (!post) throw new CustomError(404, 'Post does not exist');
  return post;
};

const update = async (postId, { id }, { title, content }) => {
  //  Verifica se o post existe e se pertence ao usuário:
  const post = await getOne(postId);
  if (post.dataValues.userId !== id) throw new CustomError(401, 'Unauthorized user');

  await BlogPost.update({
    title,
    content,
  }, { where: { id: postId } });
};

const remove = async (postId, { id }) => {
  //  Verifica se o post existe e se pertence ao usuário:
  const post = await getOne(postId);
  if (post.dataValues.userId !== id) throw new CustomError(401, 'Unauthorized user');

  //  Deleta de BlogPost e PostCategory (onDelete: 'CASCADE')
  await BlogPost.destroy({ where: { id: postId } });
};

const getByQuery = async (query) => {
  // WHERE title LIKE %query.q% OR content LIKE %query.q%
  const posts = await await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query.q}%` } }, { content: { [Op.like]: `%${query.q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'usersWhoLiked', attributes: ['id'] },
    ],

  });

  const postsFormat = posts.map((post) => (
    {
      ...post.dataValues,
      distance: formatDistanceToNowStrict(post.published),
      likes: post.usersWhoLiked.length,
    }));

  return postsFormat;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getByQuery,
};
