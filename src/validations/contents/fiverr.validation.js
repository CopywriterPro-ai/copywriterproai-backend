const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { fiverrValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const fiverrProfileDescription = (subscription) => {
  const { task, profession, experience, numberOfSuggestions } = getLimits(
    fiverrValidation.fiverrProfileDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      profession: Joi.string().min(profession.min).max(profession.max).required(),
      experience: Joi.string().min(experience.min).max(experience.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const fiverrCategoriesHeadline = (subscription) => {
  const { task, categoriesName } = getLimits(fiverrValidation.fiverrCategoriesHeadline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      categoriesName: Joi.string().min(categoriesName.min).max(categoriesName.max).required(),
    }),
  };
};

module.exports = {
  fiverrProfileDescription,
  fiverrCategoriesHeadline,
};
