const express = require('express');

const auth = require('../../middlewares/auth');
const { subscriberController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { subscriberValidation } = require('../../validations');

const router = express.Router();

router.route('/me').get(auth(), subscriberController.getOwnSubscribe);

// router.route('/update').patch(auth(), subscriberController.updateOwnSubscribe);

router.route('/copycounter').patch(auth(), subscriberController.updateOwnCopyCounter);

router.route('/generate-update').patch(auth(), subscriberController.generateUpdate);

router
  .route('/sub-switcher')
  .post(auth(), validate(subscriberValidation.subscriberSwitcher), subscriberController.subscriberSwitcher);

module.exports = router;
