const httpStatus = require('http-status');
const { v1: uuidv1 } = require('uuid');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  interestService,
  emailService,
  subscriberService,
} = require('../services');
const { frontendUrl } = require('../config/config');
const { authTypes } = require('../config/auths');
const { subscription } = require('../config/plan');
const User = require('../models/user.model');

/**
 * Register a new user.
 * This function handles the registration of a new user by creating the user record in the database,
 * sending a verification email, and returning a success response.
 *
 * @param {Object} req - The request object containing user registration details.
 * @param {Object} res - The response object.
 */
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
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
 * This function verifies a user's account using the token provided in the request.
 * It updates the user's verification status and sends a welcome email.
 *
 * @param {Object} req - The request object containing the verification token.
 * @param {Object} res - The response object.
 */
const verifyAccount = catchAsync(async (req, res) => {
  const { sub: userId, email } = req.token;
  const user = await userService.getUser({ _id: userId, isVerified: false });
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: httpStatus.BAD_REQUEST, message: 'User not found or already verified' });
  }
  const uuid = uuidv1();
  const verifiedUser = await userService.getUser({ email, isVerified: true });
  const { userId: userID } = await userService.updateUserById(user, userId, {
    userId: verifiedUser ? verifiedUser.userId : uuid,
    isVerified: true,
  });
  await interestService.createUserInterest(email);
  if (!verifiedUser) {
    await subscriberService.createOwnSubscribe({ userId: userID, subscription: subscription.FREEMIUM });
  }
  await userService.deleteunVerifiedUserByEmail(email);
  await emailService.sendWelcomeEmail(email, user.firstName);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Your account is verified, please sign in' });
});

/**
 * Login user.
 * This function handles user login by validating credentials, generating auth tokens, and returning the user and tokens.
 *
 * @param {Object} req - The request object containing login details.
 * @param {Object} res - The response object.
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser({ email, authType: authTypes.EMAIL }, password);
  const tokens = await tokenService.generateAuthTokens(user);
  // Check if onboarding is complete
  if (!user.hasCompletedOnboarding) {
    return res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens, onboarding: true });
  }
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens });
});

/**
 * Logout user.
 * This function handles user logout by invalidating the provided refresh token.
 *
 * @param {Object} req - The request object containing the refresh token.
 * @param {Object} res - The response object.
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Refresh authentication tokens.
 * This function generates new authentication tokens using the provided refresh token.
 *
 * @param {Object} req - The request object containing the refresh token.
 * @param {Object} res - The response object.
 */
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, ...tokens });
});

/**
 * Handle forgot password.
 * This function handles the forgot password process by sending a password reset email to the user.
 *
 * @param {Object} req - The request object containing the user's email.
 * @param {Object} res - The response object.
 */
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await userService.registeredEmail(email);
  await emailService.sendResetPasswordEmailUsingToken(email);
  res
    .status(httpStatus.OK)
    .send({ status: httpStatus.OK, message: 'An email has been sent to you with password reset instructions' });
});

/**
 * Reset user password.
 * This function resets the user's password using the token provided in the request.
 *
 * @param {Object} req - The request object containing the new password and token.
 * @param {Object} res - The response object.
 */
const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.token;
  await authService.resetPassword({ password: req.body.password, email });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'Password reset successful, please sign in' });
});

/**
 * Handle OAuth strategy callback.
 * This function handles the callback from OAuth providers, generates a JWT token, and redirects to the frontend with the token.
 *
 * @param {Object} req - The request object containing the OAuth user information.
 * @param {Object} res - The response object.
 */
const strategyCallback = catchAsync(async (req, res) => {
  const { userId, authType, _id } = req.user;
  const jwtToken = tokenService.generateStrategyToken({ userId, authType, _id });
  res.redirect(`${frontendUrl.web}/auth?token=${jwtToken}`);
});

/**
 * Handle OAuth strategy login.
 * This function logs in the user using OAuth strategy, generates auth tokens, and returns the user and tokens.
 *
 * @param {Object} req - The request object containing the OAuth user information.
 * @param {Object} res - The response object.
 */
const strategyLogin = catchAsync(async (req, res) => {
  const user = await authService.strategyUser(req.user);
  const tokens = await tokenService.generateAuthTokens({ id: user.id });
  // Check if onboarding is complete
  if (!user.hasCompletedOnboarding) {
    return res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens, onboarding: true });
  }
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user, tokens });
});

/**
 * Complete onboarding.
 * This function marks the user as having completed the onboarding process.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const completeOnboarding = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { hasCompletedOnboarding: true }, { new: true });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, user });
});

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
