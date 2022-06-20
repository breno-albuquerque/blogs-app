const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  algorithm: 'HS256',
};

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

function verifyToken(token) {
  jwt.verify(token, SECRET, jwtConfig);
}

module.exports = {
  generateToken,
  verifyToken,
};