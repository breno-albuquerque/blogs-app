const { User } = require('../database/models');
const CustomError = require('../helpers/CustomError');
const { generateToken } = require('../helpers/JwtToken');

const register = async ({ displayName, email, password, image }) => {
  //  Verifica se usuário já existe:
  const rows = await User.findAll({
    attributes: ['email'],
    where: { email },
  });
  if (rows.length !== 0) throw new CustomError(409, 'User already registered');

  const newUser = await User.create({
    displayName, email, password, image,
  });
  const token = generateToken({
    id: newUser.dataValues.id,
    displayName: newUser.dataValues.displayName,
    email: newUser.dataValues.email,
   });

  return token;
};

const get = async (id) => {
  if (!id) {
    const users = await User.findAll({
      attributes: { exclude: 'password' },
    });
  
    return users;
  }

  const user = await User.findOne({
    attributes: { exclude: 'password' },
    where: { id },
  });
  if (!user) throw new CustomError('404', 'User does not exist');

  return user;
};

const remove = async ({ id }) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  register,
  get,
  remove,
};