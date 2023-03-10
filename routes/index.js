const express = require('express');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { notFoundErrorMessage } = require('../utils/constants');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const routes = express.Router();

routes.post('/signup', validateCreateUser, createUser);

routes.post('/signin', validateLogin, login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

module.exports = routes;
