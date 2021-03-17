const Joi = require('joi');
const customJoi = Joi.extend(require('joi-phone-number'));
const { password } = require('./custom.validation');

const requestOTP = {
  body: Joi.object().keys({
    phone: customJoi.string().required().phoneNumber(),
  }),
};

const verifyOTP = {
  body: Joi.object().keys({
    otp: Joi.string().length(6).required(),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().custom(password),
    otp: Joi.string().length(6).required(),
  }),
};

const login = {
  body: Joi.object().keys({
    phone: customJoi.string().required().phoneNumber(),
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
  requestOTP,
  verifyOTP,
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
};
