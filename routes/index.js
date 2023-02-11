const express = require('express');
const { createUser, login } = require('../../copy/controllers/users');
const { validateCreateUser, validateLogin } = require('../../copy/middlewares/validation');
const auth = require('../../copy/middlewares/auth');
const NotFoundError = require('../../copy/errors/NotFoundError');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const routes = express.Router();

routes.post('/signup', validateCreateUser, createUser);

routes.post('/signin', validateLogin, login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = routes;
