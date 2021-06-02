const httpStatus = require('http-status');
const Stripe = require('stripe');
const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const config = require('../config/config');

const stripe = new Stripe(config.stripe.stripeSecretKey);

const createCustomer = catchAsync(async (req, res) => {
  const customer = await paymentService.stripeCustomer({ user: req.user });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, customer });
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

  console.log('req.originalUrl', req.originalUrl);
  console.log('req.headers', req.headers);
  console.log('sig', sig);

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webHookSecretKey);
  } catch (err) {
    console.log('Webhook Error', err);
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: httpStatus.BAD_REQUEST, message: 'Webhook signature verification failed.' });
  }

  const dataObject = event.data.object;

  console.log('dataObject', dataObject);

  res.json({ received: true });
});

const apps = {
  connection: 'upgrade',
  host: 'api.ilovedevops.xyz',
  'content-length': '5281',
  'accept-encoding': 'gzip',
  'cf-ipcountry': 'US',
  'x-forwarded-for': '54.187.174.169',
  'cf-ray': '6588b4269f843b4c-SIN',
  'x-forwarded-proto': 'https',
  'cf-visitor': '{"scheme":"https"}',
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-cache',
  'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
  accept: '*/*; q=0.5, application/xml',
  'stripe-signature':
    't=1622553252,v1=571a0076b98822fb3699dd828b6c0b5e63f967fe48193dfa9e7b94f5b170d690,v0=9f31c356af3983de3300f5ca63ae707fca753e881f2710efc0001f7888725102',
  'cf-connecting-ip': '54.187.174.169',
  'cdn-loop': 'cloudflare',
  'cf-request-id': '0a694eec1c00003b4cdc13a000000001',
};

module.exports = {
  createCustomer,
  createSubscription,
  priceList,
  cancelSubscription,
  updateSubscription,
  invoicePreview,
  paymentWebhook,
};
