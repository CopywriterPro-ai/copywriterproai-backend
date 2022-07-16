const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { googleValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const googleAdHeadlines = (subscription) => {
  const { task, name, businessType, numberOfSuggestions } = getLimits(
    googleValidation.googleAdHeadlines,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      name: Joi.string().min(name.min).max(name.max).required(),
      businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const googleAdDescriptions = (subscription) => {
  const { task, businessName, productCategories, uniqueness, promotions, keywords, numberOfSuggestions } = getLimits(
    googleValidation.googleAdDescriptions,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      businessName: Joi.string().min(businessName.min).max(businessName.max).required(),
      productCategories: Joi.string().min(productCategories.min).max(productCategories.max).required(),
      uniqueness: Joi.string().min(uniqueness.min).max(uniqueness.max).required(),
      promotions: Joi.string().min(promotions.min).max(promotions.max).required(),
      keywords: Joi.string().min(keywords.min).max(keywords.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  googleAdHeadlines,
  googleAdDescriptions,
};
