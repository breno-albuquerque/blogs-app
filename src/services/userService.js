const { User } = require('../database/models');
const { generateToken } = require('../helpers/JwtToken');

const register = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({
    displayName, email, password, image,
  });

  const token = generateToken(newUser.dataValues);

  return token;
};

module.exports = {
  register,
};