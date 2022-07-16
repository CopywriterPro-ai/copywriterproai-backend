const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { salesValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const problemAgitateSolution = (subscription) => {
  const { task, productName, productDescription, numberOfSuggestions } = getLimits(
    salesValidation.problemAgitateSolution,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const problemAgitateSolutionOutcome = (subscription) => {
  const { task, productName, productDescription, numberOfSuggestions } = getLimits(
    salesValidation.problemAgitateSolutionOutcome,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const attentionInterestDesireAction = (subscription) => {
  const { task, productName, productDescription, numberOfSuggestions } = getLimits(
    salesValidation.attentionInterestDesireAction,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  problemAgitateSolution,
  problemAgitateSolutionOutcome,
  attentionInterestDesireAction,
};
