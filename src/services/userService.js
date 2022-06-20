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
    displayName: newUser.dataValues.displayName,
    email: newUser.dataValues.email,
   });

  return token;
};

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  register,
  getAll,
};