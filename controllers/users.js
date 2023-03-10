const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');
const {
  CreatedCode, badRequestErrorMessage, conflictErrorMessage, notFoundErrorMessage,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.status(CreatedCode).send({
        email,
        name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError(conflictErrorMessage),
        );
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestErrorMessage));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredantials(email, password)
    .then((user) => {
      const { JWT_SECRET = 'some-secret-key' } = process.env;
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 1100) {
        return next(new ConflictError(conflictErrorMessage));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateProfile,
};
