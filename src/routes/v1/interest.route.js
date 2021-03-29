const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { interestValidation } = require('../../validations');
const { interestController } = require('../../controllers');

const router = express.Router();

router
  .route('/:userId')
  .patch(auth('updateUserInfo'), validate(interestValidation.updateInterests), interestController.updateInterests);

module.exports = router;
