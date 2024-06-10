const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUser = async (identity, password) => {
  const user = await userService.getUser(identity);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  } else if (!user.isVerified) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Account not verified!');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async ({ email, password }) => {
  try {
    const user = await userService.getUser({ email });
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Handle OAuth strategy user
 * @param {Object} userData
 * @returns {Promise<User>}
 */
const strategyUser = async ({ sub, authType, userId }) => {
  let user = await userService.getUser({ _id: sub, authType, userId });

  // If user does not exist, create a new user entry
  if (!user) {
    const newUser = {
      _id: sub,
      authType,
      userId,
      isVerified: true, // Assuming OAuth users are auto-verified
    };
    user = await userService.createUser(newUser);
  }

  return user;
};

module.exports = {
  loginUser,
  logout,
  refreshAuth,
  resetPassword,
  strategyUser,
};
