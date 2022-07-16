const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { websiteValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const websiteShortDescription = (subscription) => {
  const { task, businessName, industryType, numberOfSuggestions } = getLimits(
    websiteValidation.websiteShortDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      businessName: Joi.string().min(businessName.min).max(businessName.max).required(),
      industryType: Joi.string().min(industryType.min).max(industryType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const keywordsFromText = (subscription) => {
  const { task, primaryText, numberOfSuggestions } = getLimits(websiteValidation.keywordsFromText, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      primaryText: Joi.string().min(primaryText.min).max(primaryText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const seoFriendlyBlogIdeas = (subscription) => {
  const { task, content, desiredOutcome, industry, targetAudience, numberOfSuggestions } = getLimits(
    websiteValidation.seoFriendlyBlogIdeas,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      content: Joi.string().min(content.min).max(content.max).required(),
      desiredOutcome: Joi.string().min(desiredOutcome.min).max(desiredOutcome.max).required(),
      industry: Joi.string().min(industry.min).max(industry.max).required(),
      targetAudience: Joi.string().min(targetAudience.min).max(targetAudience.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const landingPageHeadline = (subscription) => {
  const { task, businessType, numberOfSuggestions } = getLimits(
    websiteValidation.landingPageHeadline,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  }
};

module.exports = {
  websiteShortDescription,
  keywordsFromText,
  seoFriendlyBlogIdeas,
  landingPageHeadline,
};
