const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { writingValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const paraphrase = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.paraphrase, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const expander = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.expander, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const simplifier = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.simplifier, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const summarizer = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.summarizer, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const abstractGenerator = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.abstractGenerator, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const notesFromPassage = (subscription) => {
  const { task, userText, numberOfPoints } = getLimits(writingValidation.notesFromPassage, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      numberOfPoints: Joi.number().min(numberOfPoints.min).max(numberOfPoints.max).required(),
    }),
  };
};

const grammarFixer = (subscription) => {
  const { task, userText } = getLimits(writingValidation.grammarFixer, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
    }),
  };
};

const changeTone = (subscription) => {
  const { task, userText, tone, numberOfSuggestions } = getLimits(writingValidation.changeTone, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      tone: Joi.string()
        .required()
        .valid(...tone),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const activePassive = (subscription) => {
  const { task, userText, voice } = getLimits(writingValidation.activePassive, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      from: Joi.string()
        .required()
        .valid(...voice),
      to: Joi.string()
        .required()
        .valid(...voice),
    }),
  };
};

const pointOfView = (subscription) => {
  const { task, userText, person, gender } = getLimits(writingValidation.pointOfView, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
      from: Joi.string()
        .required()
        .valid(...person),
      to: Joi.string()
        .required()
        .valid(...person),
      gender: Joi.string().valid(...gender),
    }),
  };
};

module.exports = {
  paraphrase,
  expander,
  simplifier,
  summarizer,
  abstractGenerator,
  notesFromPassage,
  grammarFixer,
  changeTone,
  activePassive,
  pointOfView,
};
