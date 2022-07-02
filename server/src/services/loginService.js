const { User } = require('../database/models');
const CustomError = require('../helpers/CustomError');
const { generateToken } = require('../helpers/JwtToken');

const login = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['id', 'displayName', 'email'],
    where: { email, password },
  });

  if (!user) throw new CustomError(400, 'Invalid fields');

  const token = generateToken(user.dataValues);

  return token;
};

module.exports = {
  login,
};
