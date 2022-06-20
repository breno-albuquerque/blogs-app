const { User } = require('../database/models');
const CustomError = require('../helpers/CustomError');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user.password !== password) {
    throw new CustomError(400, 'Invalid fields');
  }

  return user;
};

module.exports = {
  login,
};