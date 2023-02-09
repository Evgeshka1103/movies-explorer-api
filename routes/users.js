const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);

usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

module.exports = usersRoutes;
