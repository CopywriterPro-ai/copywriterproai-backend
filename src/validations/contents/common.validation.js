const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { commonValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const imageIdeasFromAdText = (subscription) => {
  const { task, product, adText, numberOfSuggestions } = getLimits(
    commonValidation.imageIdeasFromAdText,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      product: Joi.string().min(product.min).max(product.max).required(),
      adText: Joi.string().min(adText.min).max(adText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  imageIdeasFromAdText,
};
