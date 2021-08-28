const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.get('/product-prices', paymentController.priceList);
router.get('/subscriptions', auth(), paymentController.getSubscriptions);
router.post('/create-customer', auth(), paymentController.createCustomer);
router.post(
  '/create-checkout-session',
  auth(),
  validate(paymentValidation.createCheckoutSession),
  paymentController.createCheckoutSessions
);
router.get('/checkout-session', auth(), validate(paymentValidation.checkoutSession), paymentController.checkoutSessions);
router.get('/subscription-invoice', auth(), validate(paymentValidation.invoicePreview), paymentController.invoicePreview);
router.post(
  '/cancel-subscription',
  auth(),
  validate(paymentValidation.cancelSubscription),
  paymentController.cancelSubscription
);
router.post(
  '/update-subscription',
  auth(),
  validate(paymentValidation.updateSubscription),
  paymentController.updateSubscription
);
router.post('/payment-webhook', express.raw({ type: 'application/json' }), paymentController.paymentWebhook);

module.exports = router;
