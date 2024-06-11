const Joi = require('joi');
const { demoValidation } = require('./validationData');

const paraphrase = () => {
  const { task, userText } = demoValidation.paraphrase;
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      userText: Joi.string().min(userText.min).max(userText.max).required(),
    }),
  };
};

const blogHeadline = () => {
  const { task, blogAbout } = demoValidation.blogHeadline;
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      blogAbout: Joi.string().min(blogAbout.min).max(blogAbout.max).required(),
    }),
  }
};

module.exports = {
  paraphrase,
  blogHeadline,
};
