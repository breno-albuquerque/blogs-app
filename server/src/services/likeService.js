const { Like } = require('../database/models');
const CustomError = require('../helpers/CustomError');

const post = async (postId, userId) => {
  // Verifica se esse usuário ainda não curtiu esse post
  const rows = await Like.findAll({ where: { postId, userId } });
  if (rows.length !== 0) throw new CustomError(409, 'User already liked this post');

  const result = await Like.create({ postId, userId });
  return result;
};

module.exports = {
  post,
};
