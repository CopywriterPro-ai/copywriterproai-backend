const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router
  .route('/')
  // .get(auth('getPurchaseInfo'), validate(paymentValidation.getPurchaseInfo), paymentController.getPurchaseInfo)
  .get(auth(), validate(paymentValidation.getPurchaseInfo), paymentController.getPurchaseInfo)
  // .post(auth('managePurchase'), validate(paymentValidation.storePurchaseInfo), paymentController.storePurchaseInfo);
  .post(auth(), paymentController.storePurchaseInfo);

module.exports = router;
