const { verifyToken } = require('../helpers/JwtToken');
const CustomError = require('../helpers/CustomError');

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) throw new CustomError('401', 'Token not found');
  
  try {
    const decrypted = verifyToken(token);
    req.user = decrypted;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
}

module.exports = validateToken;