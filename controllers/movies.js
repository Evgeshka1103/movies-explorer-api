const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const {
  OK, CreatedCode, notFoundErrorMessage, forbiddenErrorMessage, badRequestErrorMessage,
} = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(CreatedCode).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(badRequestErrorMessage),
        );
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(notFoundErrorMessage);
    })
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      } else {
        return movie.delete()
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
