const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { facebookValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const campaignPostIdeaFromBusinessType = (subscription) => {
  const { task, platformType, numberOfSuggestions } = getLimits(
    facebookValidation.campaignPostIdeaFromBusinessType,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      platformType: Joi.string().min(platformType.min).max(platformType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const facebookAdPrimaryTexts = (subscription) => {
  const { task, companyName, businessType, benefits, numberOfSuggestions } = getLimits(
    facebookValidation.facebookAdPrimaryTexts,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      companyName: Joi.string().min(companyName.min).max(companyName.max).required(),
      businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      benefits: Joi.string().min(benefits.min).max(benefits.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const facebookAdHeadlines = (subscription) => {
  const { task, productName, businessType, customerBenefit, numberOfSuggestions } = getLimits(
    facebookValidation.facebookAdHeadlines,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      customerBenefit: Joi.string().min(customerBenefit.min).max(customerBenefit.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const facebookAdLinkDescription = (subscription) => {
  const { task, companyName, platformType, numberOfSuggestions } = getLimits(
    facebookValidation.facebookAdLinkDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      companyName: Joi.string().min(companyName.min).max(companyName.max).required(),
      platformType: Joi.string().min(platformType.min).max(platformType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const facebookAdsFromProductDescription = (subscription) => {
  const { task, product, numberOfSuggestions } = getLimits(
    facebookValidation.facebookAdsFromProductDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      product: Joi.string().min(product.min).max(product.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  campaignPostIdeaFromBusinessType,
  facebookAdPrimaryTexts,
  facebookAdHeadlines,
  facebookAdLinkDescription,
  facebookAdsFromProductDescription,
};
