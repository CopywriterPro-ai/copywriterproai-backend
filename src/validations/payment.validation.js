const Joi = require('joi');

const createCheckoutSession = {
  body: Joi.object().keys({
    customerId: Joi.string().required(),
    priceId: Joi.string().required(),
  }),
};

const checkoutSession = {
  query: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
};

const cancelSubscription = {
  body: Joi.object().keys({
    subscriptionId: Joi.string().required(),
  }),
};

const updateSubscription = {
  body: Joi.object().keys({
    subscriptionId: Joi.string().required(),
    newPriceId: Joi.string().required(),
  }),
};

const invoicePreview = {
  body: Joi.object().keys({
    subscriptionId: Joi.string().required(),
    priceId: Joi.string().required(),
    customerId: Joi.string().required(),
  }),
};

module.exports = {
  createCheckoutSession,
  checkoutSession,
  cancelSubscription,
  updateSubscription,
  invoicePreview,
};
