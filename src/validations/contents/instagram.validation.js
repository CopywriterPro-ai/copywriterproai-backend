const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { instagramValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const instagramAdTexts = (subscription) => {
  const { task, platformType, context, numberOfSuggestions } = getLimits(
    instagramValidation.instagramAdTexts,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // platformType: Joi.string().min(platformType.min).max(platformType.max).required(),
      // context: Joi.string().min(context.min).max(context.max).required(),
      platformType: Joi.string().max(platformType.max).required(),
      context: Joi.string().max(context.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  instagramAdTexts,
};
