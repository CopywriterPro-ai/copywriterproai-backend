const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { blogValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const blogIdea = (subscription) => {
  const { task, productName, productDescription, numberOfSuggestions } = getLimits(
    blogValidation.blogIdea,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // productName: Joi.string().min(productName.min).max(productName.max).required(),
      // productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      productName: Joi.string().max(productName.max).required(),
      productDescription: Joi.string().max(productDescription.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const blogHeadline = (subscription) => {
  const { task, about, numberOfSuggestions } = getLimits(blogValidation.blogHeadline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      about: Joi.string().max(about.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const blogIntro = (subscription) => {
  const { task, about, headline, numberOfSuggestions } = getLimits(blogValidation.blogIntro, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const blogOutline = (subscription) => {
  const { task, about, headline, numberOfPoints, numberOfSuggestions } = getLimits(
    blogValidation.blogOutline,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      numberOfPoints: Joi.number().min(numberOfPoints.min).max(numberOfPoints.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const blogTopic = (subscription) => {
  const { task, about, headline, userText, numberOfSuggestions } = getLimits(
    blogValidation.blogTopic,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      // userText: Joi.string().min(userText.min).max(userText.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      userText: Joi.string().max(userText.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const blogOutro = (subscription) => {
  const { task, about, headline, numberOfSuggestions } = getLimits(blogValidation.blogOutro, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const shortBlog = (subscription) => {
  const { task, about, headline, keywords } = getLimits(blogValidation.shortBlog, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      keywords: Joi.array().items(Joi.string()).min(keywords.min).max(keywords.max),
    }),
  };
};

const longBlog = (subscription) => {
  const { task, about, headline, keywords, contents } = getLimits(blogValidation.longBlog, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // about: Joi.string().min(about.min).max(about.max).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      about: Joi.string().max(about.max).required(),
      headline: Joi.string().max(headline.max).required(),
      keywords: Joi.array().items(Joi.string()).min(keywords.min).max(keywords.max),
      contents: Joi.string().min(contents.min).max(contents.max),
    }),
  };
};

const blogFromOutline = (subscription) => {
  const { task, headline, intro, outline } = getLimits(blogValidation.blogFromOutline, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // headline: Joi.string().min(headline.min).max(headline.max).required(),
      // intro: Joi.string().min(intro.min).max(intro.max).required(),
      headline: Joi.string().max(headline.max).required(),
      intro: Joi.string().max(intro.max).required(),
      outline: Joi.array().items(Joi.string()).min(outline.min).max(outline.max).required(),
    }),
  };
};

const blogRewriter = (subscription) => {
  const { task, blog } = getLimits(blogValidation.blogRewriter, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // blog: Joi.string().min(blog.min).max(blog.max).required(),
      blog: Joi.string().max(blog.max).required(),
    }),
  };
};

module.exports = {
  blogIdea,
  blogHeadline,
  blogIntro,
  blogOutline,
  blogTopic,
  blogOutro,
  shortBlog,
  longBlog,
  blogFromOutline,
  blogRewriter,
};
