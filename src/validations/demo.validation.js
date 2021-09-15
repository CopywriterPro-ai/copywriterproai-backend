const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.valid('paraphrasing').required(),
    userText: Joi.string().min(10).max(100).required(),
  }),
};

const blogHeadline = {
  body: Joi.object().keys({
    task: Joi.valid('blog-headline').required(),
    blogAbout: Joi.string().min(10).max(100).required(),
  }),
};

module.exports = {
  paraphrase,
  blogHeadline,
};
