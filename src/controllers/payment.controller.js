const httpStatus = require('http-status');
const Stripe = require('stripe');
const chalk = require('chalk');
const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const config = require('../config/config');

const stripe = new Stripe(config.stripe.stripeSecretKey);

const createCustomer = catchAsync(async (req, res) => {
  const customer = await paymentService.stripeCustomer({ user: req.user });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, customer });
});

const createCheckoutSessions = catchAsync(async (req, res) => {
  const customerEmail = req.user.email;
  const { customerId, priceId } = req.body;
  const { session } = await paymentService.createCheckoutSessions({ customerEmail, customerId, priceId });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, session });
});

const checkoutSessions = catchAsync(async (req, res) => {
  const { sessionId } = req.query;
  const { session } = await paymentService.checkoutSession({ sessionId });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, session });
});

const createSubscription = catchAsync(async (req, res) => {
  const { customerId, priceId } = req.body;
  const { subscriptionId, clientSecret } = await paymentService.createSubscription({ customerId, priceId });
  await paymentService.paymentUpdate({ customerId, subscriptionId });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscriptionId, clientSecret });
});

const priceList = catchAsync(async (req, res) => {
  const { prices } = await paymentService.PricesList();
  res.status(httpStatus.OK).send({ status: httpStatus.OK, prices });
});

const cancelSubscription = catchAsync(async (req, res) => {
  const { subscription } = await paymentService.cancelSubscription(req.body.subscriptionId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscription });
});

const updateSubscription = catchAsync(async (req, res) => {
  const { subscriptionId, newPriceId } = req.body;
  const { subscription } = await paymentService.updateSubscription({ subscriptionId, newPriceId });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscription });
});

const invoicePreview = catchAsync(async (req, res) => {
  const { customerId, priceId, subscriptionId } = req.body;
  const { invoice } = await paymentService.invoicePreview({ customerId, priceId, subscriptionId });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, invoice });
});

const paymentWebhook = catchAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webHookSecretKey);
  } catch (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: httpStatus.BAD_REQUEST, message: 'Webhook signature verification failed.' });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      paymentService.handlePaymentIntentSucceeded(paymentIntent);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      paymentService.handlePaymentIntentFailed(paymentIntent);
      break;
    }

    default:
      console.log(`Unhandled event type ${chalk.black.bgWhite(event.type)}`);
      break;
  }

  res.json({ received: true });
});

module.exports = {
  createCustomer,
  createCheckoutSessions,
  checkoutSessions,
  createSubscription,
  priceList,
  cancelSubscription,
  updateSubscription,
  invoicePreview,
  paymentWebhook,
};
