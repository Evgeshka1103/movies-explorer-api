const express = require('express');
const { validateUpdateProfile } = require('../../copy/middlewares/validation');

const {
  getUserInfo,
  updateProfile,
} = require('../../copy/controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRoutes;
