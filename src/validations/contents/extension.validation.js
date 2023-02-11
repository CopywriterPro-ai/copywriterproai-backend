const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { extensionValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const paraphrase = (subscription) => {
  const { task, userText } = getLimits(extensionValidation.paraphrase, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      userText: Joi.string().max(userText.max).required(),
    }),
  };
};

const grammarFixer = (subscription) => {
  const { task, userText } = getLimits(extensionValidation.grammarFixer, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      userText: Joi.string().max(userText.max).required(),
    }),
  };
};

const simplifier = (subscription) => {
  const { task, userText } = getLimits(extensionValidation.simplifier, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      userText: Joi.string().max(userText.max).required(),
    }),
  };
};

const summarizer = (subscription) => {
  const { task, userText } = getLimits(extensionValidation.summarizer, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      userText: Joi.string().max(userText.max).required(),
    }),
  };
};

const changeTone = (subscription) => {
  const { task, userText, tone } = getLimits(extensionValidation.changeTone, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      userText: Joi.string().max(userText.max).required(),
      tone: Joi.string()
        .required()
        .valid(...tone),
    }),
  };
};

module.exports = {
  paraphrase,
  grammarFixer,
  simplifier,
  summarizer,
  changeTone,
};
