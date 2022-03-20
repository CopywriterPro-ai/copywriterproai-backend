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

const getSubscriptions = {
  query: Joi.object().keys({
    status: Joi.string()
      .valid('active', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'all', 'ended')
      .required(),
  }),
};

const updateSubscriptionPlan = {
  body: Joi.object().keys({
    subscriptionId: Joi.string().required(),
    bool: Joi.boolean().required(),
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
  updateSubscriptionPlan,
  updateSubscription,
  invoicePreview,
  getSubscriptions,
};
