const Joi = require('joi');
const inputLimit = require('../../config/inputLimit'); // Adjust the path as needed
const { writingValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const paraphrase = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.paraphrase, inputLimit[subscription]);
  console.log({ task, userText, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const expander = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.expander, inputLimit[subscription]);
  console.log({ task, userText, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const simplifier = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.simplifier, inputLimit[subscription]);
  console.log({ task, userText, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const summarizer = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.summarizer, inputLimit[subscription]);
  console.log({ task, userText, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const abstractGenerator = (subscription) => {
  const { task, userText, numberOfSuggestions } = getLimits(writingValidation.abstractGenerator, inputLimit[subscription]);
  console.log({ task, userText, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const notesFromPassage = (subscription) => {
  const { task, userText, numberOfPoints } = getLimits(writingValidation.notesFromPassage, inputLimit[subscription]);
  console.log({ task, userText, numberOfPoints }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfPoints: Joi.number().min(numberOfPoints.min).max(numberOfPoints.max).required(),
    }),
  };
};

const grammarFixer = (subscription) => {
  const { task, userText } = getLimits(writingValidation.grammarFixer, inputLimit[subscription]);
  console.log({ task, userText }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
    }),
  };
};

const changeTone = (subscription) => {
  const { task, userText, tone, numberOfSuggestions } = getLimits(writingValidation.changeTone, inputLimit[subscription]);
  console.log({ task, userText, tone, numberOfSuggestions }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      tone: Joi.string().required().valid(...tone),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const activePassive = (subscription) => {
  const { task, userText, voice } = getLimits(writingValidation.activePassive, inputLimit[subscription]);
  console.log({ task, userText, voice }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      from: Joi.string().required().valid(...voice),
      to: Joi.string().required().valid(...voice),
    }),
  };
};

const pointOfView = (subscription) => {
  const { task, userText, person, gender } = getLimits(writingValidation.pointOfView, inputLimit[subscription]);
  console.log({ task, userText, person, gender }); // Log to verify correct limits
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().max(userText.max).required(),
      from: Joi.string().required().valid(...person),
      to: Joi.string().required().valid(...person),
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
