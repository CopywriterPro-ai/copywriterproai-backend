const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService, contentService, tokenService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getMe = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ status: httpStatus.OK, profile: req.user });
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  res.send(user);
});

const getUserBookmarks = catchAsync(async (req, res) => {
  const bookmarks = await userService.getBookmarks(req.user.email, req.query);
  res.send(bookmarks);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  const updatedUserInfo = await userService.updateUserById(user, req.params.userId, req.body);
  res.status(httpStatus.OK).send(updatedUserInfo);
});

const updateUserBookmarks = catchAsync(async (req, res) => {
  await userService.updateBookmarks(req.user.email, req.body);
  res.status(httpStatus.OK).send({ message: 'Bookmarks Updated!' });
});

const updateUserContent = catchAsync(async (req, res) => {
  await contentService.updateBookmarkedText(req.user.email, req.body);
  res.status(httpStatus.OK).send({ message: 'Content Updated!' });
});

const getUserFavouriteTools = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  res.send(user.favouriteTools);
});

const updateUserFavouriteTools = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  const updatedUserInfo = await userService.updateFavouriteTools(user, req.body.tool);
  res.status(httpStatus.OK).send(updatedUserInfo);
});

const updateUserCopyCounter = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  const copyCounter = await userService.updateUserCopyCounter(user);
  res.status(httpStatus.OK).send(copyCounter);
});

const extensionAccessToken = catchAsync(async (req, res) => {
  const accessToken = await tokenService.generateExtensionAccessToken(req.user);
  res.status(httpStatus.OK).send(accessToken);
});

module.exports = {
  createUser,
  getMe,
  getUsers,
  getUser,
  getUserBookmarks,
  deleteUser,
  updateUser,
  updateUserBookmarks,
  getUserFavouriteTools,
  updateUserContent,
  updateUserFavouriteTools,
  updateUserCopyCounter,
  extensionAccessToken,
};
