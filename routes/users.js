const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUserInfo);
usersRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);
usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
}), updateAvatar);

module.exports = usersRoutes;
