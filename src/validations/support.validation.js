const Joi = require('joi');

const featureRequest = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    feature: Joi.string().max(1000).required(),
  }),
};

const bugReport = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    report: Joi.string().max(1000).required(),
  }),
};

const userMessage = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    message: Joi.string().max(1000).required(),
  }),
};

module.exports = {
  featureRequest,
  bugReport,
  userMessage,
};
