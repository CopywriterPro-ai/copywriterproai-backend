const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { youtubeValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const youtubeVideoTitleFromDescription = (subscription) => {
  const { task, description, numberOfSuggestions } = getLimits(
    youtubeValidation.youtubeVideoTitleFromDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // description: Joi.string().min(description.min).max(description.nax).required(),
      description: Joi.string().max(description.nax).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const youtubeVideoIdeas = (subscription) => {
  const { task, topic, numberOfSuggestions } = getLimits(youtubeValidation.youtubeVideoIdeas, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // topic: Joi.string().min(topic.min).max(topic.max).required(),
      topic: Joi.string().max(topic.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const youtubeVideoScript = (subscription) => {
  const { task, title, numberOfSuggestions } = getLimits(youtubeValidation.youtubeVideoScript, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // title: Joi.string().min(title.min).max(title.max).required(),
      title: Joi.string().max(title.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const videoTagsFromDescription = (subscription) => {
  const { task, primaryText, numberOfSuggestions } = getLimits(
    youtubeValidation.videoTagsFromDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // primaryText: Joi.string().min(primaryText.min).max(primaryText.max).required(),
      primaryText: Joi.string().max(primaryText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const channelTagsFromDescription = (subscription) => {
  const { task, primaryText, numberOfSuggestions } = getLimits(
    youtubeValidation.channelTagsFromDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // primaryText: Joi.string().min(primaryText.min).max(primaryText.max).required(),
      primaryText: Joi.string().max(primaryText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  youtubeVideoTitleFromDescription,
  youtubeVideoIdeas,
  youtubeVideoScript,
  videoTagsFromDescription,
  channelTagsFromDescription,
};
