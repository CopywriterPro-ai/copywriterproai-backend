const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');

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

module.exports = { createCustomer, createSubscription, priceList, cancelSubscription, updateSubscription, invoicePreview };
