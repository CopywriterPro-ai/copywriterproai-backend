/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const httpStatus = require('http-status');
const { User, Content } = require('../models');
const { updateBookmarkedText } = require('./content.service');
const ApiError = require('../utils/ApiError');
const { authTypes } = require('../config/auths');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isVerifiedEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This email is already registered!');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

const checkUserExistsOrNot = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUser = async (identity) => {
  const user = await User.findOne(identity);
  return user;
};

/**
 * Get bookmarks  of a user
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getBookmarks = async (userId) => {
  const user = await checkUserExistsOrNot(userId);
  const { bookmarks } = user;
  const contents = [];
  for (const id in bookmarks) {
    const content = await Content.findById(id);
    const generatedContents = [];
    user.bookmarks[id].forEach((index) => generatedContents.push(content.generatedContents[index]));
    contents.push({
      userText: content.prompt,
      generatedContents,
    });
  }
  return contents;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (user, userId, updateBody) => {
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateBookmarks = async (user, { contentId, index, bookmarkedText }) => {
  const { bookmarks } = user;

  const content = await updateBookmarkedText(contentId, index, bookmarkedText);

  if ([contentId] in bookmarks) {
    if (bookmarks[contentId].includes(index)) {
      if (content === bookmarkedText) {
        bookmarks[contentId] = bookmarks[contentId].filter((ind) => ind !== index);
        if (!bookmarks[contentId].length) {
          delete bookmarks[contentId];
        }
      }
    } else {
      bookmarks[contentId].push(index);
    }
  } else {
    bookmarks[contentId] = [index];
  }
 
  await user.markModified('bookmarks');
  await user.save();
  return getBookmarks(user._id);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const deleteunVerifiedUserByEmail = async (email) => {
  await User.deleteMany({ email, isVerified: false });
};

const registeredEmail = async (email) => {
  const user = await User.findOne({ email, isVerified: true });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email not registered');
  }
  return !!user;
};

const strategyValuesByAuthType = (strategy, profile) => {
  switch (strategy) {
    case authTypes.GOOGLE:
      return {
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
        profileAvatar: profile._json.picture,
      };
    case authTypes.FACEBOOK:
      return {
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        email: profile._json.email,
        profileAvatar: profile.photos[0].value,
      };
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid strategy');
  }
};

const strategyVerify = (authType) => async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ userId: profile.id, authType });
    if (user) {
      done(null, user);
    } else {
      const userInfo = strategyValuesByAuthType(authType, profile);
      const newUser = await User.create({
        userId: profile.id,
        isVerified: true,
        bookmarks: {},
        authType,
        ...userInfo,
      });
      done(null, newUser);
    }
  } catch (error) {
    done(error, false);
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUser,
  getBookmarks,
  checkUserExistsOrNot,
  updateUserById,
  updateBookmarks,
  deleteUserById,
  deleteunVerifiedUserByEmail,
  registeredEmail,
  strategyVerify,
};
