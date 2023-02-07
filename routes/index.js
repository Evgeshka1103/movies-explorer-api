const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const validateURL = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

const routes = express.Router();

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = routes;
