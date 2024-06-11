const Joi = require('joi');
const { password } = require('./custom.validation');
const { authTypes } = require('../config/auths');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().max(20).required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email().required(),
    authType: Joi.string().default(authTypes.EMAIL).valid(authTypes.EMAIL),
  }),
};

const verifyAccount = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const strategyLogin = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  verifyAccount,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  strategyLogin,
};
