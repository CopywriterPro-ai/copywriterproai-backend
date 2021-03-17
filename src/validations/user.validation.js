const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    otp: Joi.string().length(6).required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateUserInfo = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email(),
  }),
};

const updateUserInterest = {
  body: Joi.object().keys({
    contentId: Joi.string().custom(objectId),
    generatedContentsIndexes: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  updateUserInfo,
  updateUserInterest,
};
