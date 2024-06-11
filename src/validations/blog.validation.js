const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    blogAbout: Joi.string(),
    headline: Joi.string(),
    blogPost: Joi.string(),
    blogType: Joi.string().valid('WRITE_ALONG', 'GHOSTWRITER').default('WRITE_ALONG'),
  }),
};

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
    blogType: Joi.string().valid('WRITE_ALONG', 'GHOSTWRITER'),
  }),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
