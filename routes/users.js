const express = require('express');
const { validateUpdateProfile } = require('../middlewares/validation');

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);

usersRoutes.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRoutes;