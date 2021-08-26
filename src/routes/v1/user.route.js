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
  .get(auth('getUserInfo'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser);
  // .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/:userId/update/info')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserInfo), userController.updateUser);

router
  .route('/:userId/bookmarks')
  .get(auth('getUserInfo'), validate(userValidation.getUserBookmarks), userController.getUserBookmarks)
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserBookmarks), userController.updateUserBookmarks);

router
  .route('/:userId/contents')
  .patch(auth('manageContent'), validate(userValidation.updateUserContent), userController.updateUserContent);

router
  .route('/:userId/favourite-tools')
  .get(auth('getUserInfo'), validate(userValidation.getUserFavouriteTools), userController.getUserFavouriteTools)
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserFavouriteTools), userController.updateUserFavouriteTools);

router.route('/:userId/copycounter').patch(auth('updateUserInfo'), userController.updateUserCopyCounter);

module.exports = router;
