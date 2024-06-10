const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, interestService, emailService } = require('../services');
const { frontendUrl } = require('../config/config');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  await emailService.sendVerifyAccountEmailUsingToken({ id: user.id, email: user.email });
  res.status(httpStatus.CREATED).send({ user });
});

const verifyAccount = catchAsync(async (req, res) => {
  const { sub: userId, email } = req.token;
  const user = await userService.getUser({ _id: userId, isVerified: false });
  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'User not found or already verified' });
  }
  await interestService.createUserInterest(userId);
  await userService.updateUserById(user, userId, { isVerified: true, bookmarks: {} });
  await userService.deleteunVerifiedUserByEmail(email);
  res.status(httpStatus.OK).send({ message: 'Your account is verified!' });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser({ email }, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  await userService.registeredEmail(email);
  await emailService.sendResetPasswordEmailUsingToken(email);
  res.status(httpStatus.OK).send({ message: 'An email has been sent to you with password reset instructions' });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.token;
  await authService.resetPassword({ password: req.body.password, email });
  res.status(httpStatus.OK).send({ message: 'Pasaword reset successful' });
});

const strategyCallback = catchAsync(async (req, res) => {
  const { userId, authType, _id } = req.user;
  const jwtToken = tokenService.generateStrategyToken({ userId, authType, _id });
  res.redirect(`${frontendUrl.web}/?verifyClientToken=${jwtToken}`);
});

const strategyLogin = catchAsync(async (req, res) => {
  const user = await authService.strategyUser(req.user);
  const tokens = await tokenService.generateAuthTokens({ id: user.id });
  res.status(httpStatus.OK).send({ user, tokens });
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
};
