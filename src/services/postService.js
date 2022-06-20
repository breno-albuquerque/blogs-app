const { BlogPost, PostCategory } = require('../database/models');

const create = async ({ title, content, categoryIds }) => {
  const post = await BlogPost.create({
    title, content, categoryIds,
  });
};

module.exports = {
  create,
};