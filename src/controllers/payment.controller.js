const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { stripeCustomer, createSubscription } = require('../services/payment.service');

const getPurchaseInfo = catchAsync(async (req, res) => {
  const customer = await stripeCustomer({ user: req.user });
  res.status(httpStatus.OK).json({ status: httpStatus.OK, customer });
});

const storePurchaseInfo = catchAsync(async (req, res) => {
  const { paymentMethodId, customerId, priceId } = req.body;
  const subscription = await createSubscription({
    paymentMethodId,
    customerId,
    priceId,
  });
  res.status(httpStatus.OK).json({ status: httpStatus.OK, subscription });
});

module.exports = {
  getPurchaseInfo,
  storePurchaseInfo,
};
