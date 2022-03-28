const Joi = require('joi');

const subscriberSwitcher = {
  body: Joi.object().keys({
    subscriptionId: Joi.string().required(),
  }),
};

module.exports = { subscriberSwitcher };
