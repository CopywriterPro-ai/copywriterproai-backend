const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { featuresValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const proofread = (subscription) => {
  const { task, userText } = getLimits(featuresValidation.proofread, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
    }),
  };
};

module.exports = {
  proofread,
};
