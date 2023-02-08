const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { headlineValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const catchyHeadline = (subscription) => {
  const { task, content, numberOfSuggestions } = getLimits(headlineValidation.catchyHeadline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // content: Joi.string().min(content.min).max(content.max).required(),
      content: Joi.string().max(content.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const attentionGrabbingHeadline = (subscription) => {
  const { task, content, numberOfSuggestions } = getLimits(
    headlineValidation.attentionGrabbingHeadline,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // content: Joi.string().min(content.min).max(content.max).required(),
      content: Joi.string().max(content.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const newspaperHeadline = (subscription) => {
  const { task, content, numberOfSuggestions } = getLimits(headlineValidation.newspaperHeadline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // content: Joi.string().min(content.min).max(content.max).required(),
      content: Joi.string().max(content.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const resumeHeadline = (subscription) => {
  const { task, profession, numberOfSuggestions } = getLimits(headlineValidation.resumeHeadline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // profession: Joi.string().min(profession.min).max(profession.max).required(),
      profession: Joi.string().max(profession.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  catchyHeadline,
  attentionGrabbingHeadline,
  newspaperHeadline,
  resumeHeadline,
};
