/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const httpStatus = require('http-status');
const { User, Content } = require('../models');
const contentService = require('./content.service');
const subscriberService = require('./subscriber.service');
const ApiError = require('../utils/ApiError');
const { authTypes } = require('../config/auths');
const { subscription } = require('../config/plan');
const { Subscriber } = require('../models');

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
const getBookmarks = async (userEmail, { sortBy = 'createdAt:asc', page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  let [key, order] = sortBy.split(':');

  key = key !== 'createdAt' && key !== 'updatedAt' ? 'createdAt' : key;
  order = order !== 'asc' && order !== 'desc' ? 'asc' : order;

  const totalPages = Math.ceil(
    (await Content.find({ userEmail, bookmarks: { $exists: true, $ne: [] } }).countDocuments()) / limit
  );
  const contents = await Content.find({ userEmail, bookmarks: { $exists: true, $ne: [] } })
    .select('documentType prompt generatedContents bookmarks')
    .sort({ [key]: order })
    .skip(skip)
    .limit(limit);

  const bookmarks = [];

  for (content of contents) {
    const bookmarkedTexts = [];
    for (index of content.bookmarks) {
      bookmarkedTexts.push(content.generatedContents[index]);
    }
    bookmarks.push({
      tool: content.documentType,
      input: content.prompt,
      output: bookmarkedTexts,
    });
  }

  const userBookmarks = {
    contents: bookmarks,
    totalPages,
  };

  return userBookmarks;
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

const updateBookmarks = async (userEmail, { contentId, index }) => {
  const content = await contentService.checkContentExistsOrNot(userEmail, { _id: contentId, index });
  const { bookmarks } = content;

  if (!bookmarks.includes(index)) {
    bookmarks.push(index);
  } else {
    content.bookmarks = bookmarks.filter((ind) => ind !== index);
  }
  await content.markModified('bookmarks');
  await content.save();
};

const updateCredits = async (email, updatedData) => {
  await User.updateMany({ email }, updatedData);
};

const updateFavouriteTools = async (user, tool) => {
  if (user.favouriteTools.includes(tool)) {
    user.favouriteTools = user.favouriteTools.filter((t) => t !== tool);
  } else {
    user.favouriteTools.push(tool);
  }

  const { email, favouriteTools } = user;

  await User.updateMany({ email }, { favouriteTools });
  return user.favouriteTools;
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
  const user = await User.findOne({ email, isVerified: true, authType: authTypes.EMAIL });
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
    const userInfo = strategyValuesByAuthType(authType, profile);
    if (user) {
      await User.findOneAndUpdate(
        { userId: profile.id, authType },
        {
          profileAvatar: userInfo.profileAvatar,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        },
        { new: true }
      );
      done(null, user);
    } else {
      const newUser = await User.create({
        userId: profile.id,
        isVerified: true,
        bookmarks: {},
        authType,
        ...userInfo,
      });

      const subscriber = await Subscriber.findOne({ email: userInfo.email });

      if (!subscriber) {
        await subscriberService.createOwnSubscribe({ email: userInfo.email, subscription: subscription.FREEMIUM });
      }

      done(null, newUser);
    }
  } catch (error) {
    done(error, false);
  }
};

const updateUserCopyCounter = async (user) => {
  const update = await User.findOneAndUpdate({ _id: user._id }, { $inc: { copycounter: 1 } }, { new: true });
  return update;
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
  updateCredits,
  updateFavouriteTools,
  deleteUserById,
  deleteunVerifiedUserByEmail,
  registeredEmail,
  strategyVerify,
  updateUserCopyCounter,
};
