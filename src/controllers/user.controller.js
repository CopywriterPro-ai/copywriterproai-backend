const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService, contentService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
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
  const options = pick(req.query, ['page', 'limit']);
  const bookmarks = await userService.getBookmarks(req.params.userId, req.query);
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
  const user = await userService.checkUserExistsOrNot(req.params.userId);
  await contentService.checkContentExistsOrNot(req.body);
  await userService.updateBookmarks(user, req.body);
  res.status(httpStatus.OK).send({ message: 'Bookmarks Updated!' });
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserBookmarks,
  deleteUser,
  updateUser,
  updateUserBookmarks,
  getUserFavouriteTools,
  updateUserFavouriteTools,
};
