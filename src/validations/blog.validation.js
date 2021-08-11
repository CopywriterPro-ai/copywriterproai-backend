const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getBlogs = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    blogAbout: Joi.string(),
    headline: Joi.string(),
    blogPost: Joi.string(),
  }),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
