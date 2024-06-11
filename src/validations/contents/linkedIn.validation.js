const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { linkedinValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const linkedinAdTexts = (subscription) => {
  const { task, companyName, businessType, benefits, numberOfSuggestions } = getLimits(
    linkedinValidation.linkedinAdTexts,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // companyName: Joi.string().min(companyName.min).max(companyName.max).required(),
      // businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      // benefits: Joi.string().min(benefits.min).max(benefits.max).required(),
      companyName: Joi.string().max(companyName.max).required(),
      businessType: Joi.string().max(businessType.max).required(),
      benefits: Joi.string().max(benefits.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  }
};

const linkedInSummary = (subscription) => {
  const { task, profession, skills, numberOfSuggestions } = getLimits(
    linkedinValidation.linkedInSummary,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // profession: Joi.string().min(profession.min).max(profession.max).required(),
      // skills: Joi.string().min(skills.min).max(skills.max).required(),
      profession: Joi.string().max(profession.max).required(),
      skills: Joi.string().max(skills.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  }
};

module.exports = {
  linkedinAdTexts,
  linkedInSummary,
};
