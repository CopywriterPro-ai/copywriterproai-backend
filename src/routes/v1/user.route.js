const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const { userController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  // .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/:userId/update/info')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserInfo), userController.updateUser);

router
  .route('/:userId/update/bookmarks')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserBookmarks), userController.updateUserBookmarks);

module.exports = router;
