const httpStatus = require('http-status');
const { v1: uuidv1 } = require('uuid');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, interestService, emailService, subscriberService } = require('../services');
const { frontendUrl } = require('../config/config');
const { authTypes } = require('../config/auths');
const { subscription } = require('../config/plan');
const User = require('../models/user.model');

/**
 * Register a new user or login existing user.
 */
const register = catchAsync(async (req, res) => {
  const { email } = req.body;
  let user = await userService.getUser({ email });

  // If user already exists, directly login the user
  if (user) {
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens });
  }

  // If user does not exist, create a new user
  user = await userService.createUser(req.body);
  await emailService.sendVerifyAccountEmailUsingToken({
    id: user.id,
    email: user.email,
    name: { firstName: user.firstName, lastName: user.lastName },
  });
  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Thank you for registration, please check your email for account verification link',
  });
});

/**
 * Verify user account.
 */
const verifyAccount = catchAsync(async (req, res) => {
  const { sub: userId, email } = req.token;
  let user = await userService.getUser({ _id: userId, isVerified: false });

  // If user is already verified, send appropriate response
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({ status: httpStatus.BAD_REQUEST, message: 'User not found or already verified' });
  }

  // Handle case where user with same email exists but not verified
  const existingUser = await userService.getUser({ email, isVerified: true });
  const userIdToUpdate = existingUser ? existingUser.userId : uuidv1();
  const updatedUser = await userService.updateUserById(user.id, {
    userId: userIdToUpdate,
    isVerified: true,
    hasCompletedOnboarding: false,
  });

  await interestService.createUserInterest(email);

  // Create subscription for new users
  if (!existingUser) {
    await subscriberService.createOwnSubscribe({ userId: updatedUser.userId, subscription: subscription.FREEMIUM });
  }

  // Delete unverified user
  await userService.deleteunVerifiedUserByEmail(email);

  await emailService.sendWelcomeEmail(email, user.firstName);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Your account is verified, please sign in' });
});

/**
 * Login user.
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser({ email, authType: authTypes.EMAIL }, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens });
});

/**
 * Logout user.
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Refresh authentication tokens.
 */
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, ...tokens });
});

/**
 * Handle forgot password.
 */
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await userService.registeredEmail(email);
  await emailService.sendResetPasswordEmailUsingToken(email);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'An email has been sent to you with password reset instructions' });
});

/**
 * Reset user password.
 */
const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.token;
  await authService.resetPassword({ password: req.body.password, email });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Password reset successful, please sign in' });
});

/**
 * Handle OAuth strategy callback.
 */
const strategyCallback = catchAsync(async (req, res) => {
  const { userId, authType, _id } = req.user;
  const jwtToken = tokenService.generateStrategyToken({ userId, authType, _id });
  res.redirect(`${frontendUrl.web}/auth?token=${jwtToken}`);
});

/**
 * Handle OAuth strategy login.
 */
const strategyLogin = catchAsync(async (req, res) => {
  const user = await authService.strategyUser(req.user);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens });
});

/**
 * Complete onboarding.
 */
const completeOnboarding = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { hasCompletedOnboarding: true }, { new: true });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user });
});

/**
 * Submit user's own OpenAI API key.
 */
const submitOwnOpenAIApiKey = catchAsync(async (req, res) => {
  const { ownOpenAIApiKey } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { ownOpenAIApiKey }, { new: true });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
  }
  return res.status(httpStatus.OK).json({ message: 'Own OpenAI API key submitted successfully', user });
});

module.exports = {
  register,
  verifyAccount,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  strategyCallback,
  strategyLogin,
  completeOnboarding,
  submitOwnOpenAIApiKey,
};
