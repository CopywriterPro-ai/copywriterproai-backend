const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { emailValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const emailMarketingCampaignSubject = (subscription) => {
  const { task, productDescription, numberOfSuggestions } = getLimits(
    emailValidation.emailMarketingCampaignSubject,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const emailMarketingCampaignBody = (subscription) => {
  const { task, productDescription, about, subjectLine, numberOfSuggestions } = getLimits(
    emailValidation.emailMarketingCampaignBody,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      about: Joi.string().min(about.min).max(about.max).required(),
      subjectLine: Joi.string().min(subjectLine.min).max(subjectLine.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const generateEmailBody = (subscription) => {
  const { task, about, to, tone, numberOfSuggestions } = getLimits(emailValidation.emailBody, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      about: Joi.string().min(about.min).max(about.max).required(),
      to: Joi.string().min(to.min).max(to.max).required(),
      tone: Joi.string()
        .required()
        .valid(...tone),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const generatedSubjectFromBody = (subscription) => {
  const { task, emailBody, numberOfSuggestions } = getLimits(
    emailValidation.generatedSubjectFromBody,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      emailBody: Joi.string().min(emailBody.min).max(emailBody.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  emailMarketingCampaignSubject,
  emailMarketingCampaignBody,
  generateEmailBody,
  generatedSubjectFromBody,
};
