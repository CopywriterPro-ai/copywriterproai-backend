const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { businessValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const catchyBusinessTaglines = (subscription) => {
  const { task, companyName, businessType, numberOfSuggestions } = getLimits(
    businessValidation.catchyBusinessTaglines,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      companyName: Joi.string().min(companyName.min).max(companyName.max).required(),
      businessType: Joi.string().min(businessType.min).max(businessType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  }
};

module.exports = {
  catchyBusinessTaglines,
};
