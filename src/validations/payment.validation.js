const Joi = require('joi');

const getPurchaseInfo = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const storePurchaseInfo = {
  body: Joi.object().keys({
    plan: Joi.string().valid('Monthly', 'Annual').required(),
    amount: Joi.number().required(),
    paidAt: Joi.date().iso().required(),
  }),
};

module.exports = {
  getPurchaseInfo,
  storePurchaseInfo,
};
