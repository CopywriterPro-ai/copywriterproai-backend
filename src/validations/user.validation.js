const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const path = require('path');
const fs = require('fs');

let data;
try {
  data = fs.readFileSync(path.join(__dirname, '/services.txt'), 'utf8');
  data = data.split('\n');
} catch (err) {
  console.error(err);
}

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

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getUserBookmarks = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
  }),
};

const getUserFavouriteTools = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      role: Joi.string(),
      isVerified: Joi.boolean(),
      accountStatus: Joi.string(),
      wordsLeft: Joi.number(),
    })
    .min(1),
};

const updateUserInfo = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
  }),
};

const updateUserBookmarks = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    contentId: Joi.string().custom(objectId).required(),
    index: Joi.number().required(),
    bookmarkedText: Joi.string().required(),
  }),
};

const updateUserFavouriteTools = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    tool: Joi.string().valid(...data),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserBookmarks,
  getUserFavouriteTools,
  updateUser,
  updateUserInfo,
  updateUserBookmarks,
  updateUserFavouriteTools,
};
