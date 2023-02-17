const express = require('express');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', validateCreateMovie, createMovie);
moviesRoutes.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = moviesRoutes;
