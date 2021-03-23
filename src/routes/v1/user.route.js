const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

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
  .route('/update/info')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserInfo), userController.updateUserInfo);

router
  .route('/update/bookmarks')
  .patch(auth('updateUserBookmarks'), validate(userValidation.updateUserInterest), userController.updateUserBookmarks);

router
  .route('/update/likes')
  .patch(auth('updateUserLikes'), validate(userValidation.updateUserInterest), userController.updateUserLikes);

router
  .route('/update/dislikes')
  .patch(auth('updateUserDislikes'), validate(userValidation.updateUserInterest), userController.updateUserDislikes);

module.exports = router;
