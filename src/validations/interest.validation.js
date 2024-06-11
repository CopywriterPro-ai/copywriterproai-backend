const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateInterests = {
  query: Joi.object().keys({
    action: Joi.string().required().valid('like', 'dislike'),
  }),
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    contentId: Joi.string().custom(objectId).required(),
    index: Joi.number().required(),
  }),
};

module.exports = {
  updateInterests,
};
