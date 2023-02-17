const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { unauthorizedErrorMessage } = require('../utils/constants');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(unauthorizedErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }

  req.user = payload;
  next();
};
