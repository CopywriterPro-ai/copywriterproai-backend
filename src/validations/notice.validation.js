const Joi = require('joi');

const updateNotice = {
  body: Joi.object().keys({
    active: Joi.boolean().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    expiryTime: Joi.date().required(),
  }),
};

module.exports = { updateNotice };
