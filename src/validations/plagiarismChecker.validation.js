const Joi = require('joi');

const searchContent = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

module.exports = {
  searchContent,
};