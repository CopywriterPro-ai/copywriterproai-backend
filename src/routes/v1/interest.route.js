const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { interestController } = require('../../controllers');

const router = express.Router();

router
  .route('/:userId/like')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserInterest), interestController.updateLikes);

router
  .route('/:userId/dislike')
  .patch(auth('updateUserInfo'), validate(userValidation.updateUserInterest), interestController.updateDislikes);

module.exports = router;
