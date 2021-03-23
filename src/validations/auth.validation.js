const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email().required(),
  }),
};

const verifyAccount = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    OTP: Joi.string().length(6).required(),
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

const resetPassword = {
  body: Joi.object().keys({
    otp: Joi.string().length(6).required(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  verifyAccount,
  login,
  logout,
  refreshTokens,
  resetPassword,
};
