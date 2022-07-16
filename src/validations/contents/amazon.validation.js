const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { amazonValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const amazonProductListings = (subscription) => {
  const { task, productName, productCategories, productFeatures, numberOfSuggestions } = getLimits(
    amazonValidation.amazonProductListings,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productCategories: Joi.string().min(productCategories.min).max(productCategories.max).required(),
      productFeatures: Joi.string().min(productFeatures.min).max(productFeatures.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  amazonProductListings,
};
