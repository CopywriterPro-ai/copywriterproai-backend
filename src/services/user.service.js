const httpStatus = require('http-status');
const { User, Payment, Dislike } = require('../models');
const ApiError = require('../utils/ApiError');

const config = require('../config/config');
const twilio = require('twilio')(config.twilio.twilioAccountSID, config.twilio.twilioAuthToken);

const lookupPhoneNumber = async (phoneNumber) => {
  try {
    const phoneNumberVerificationData = await twilio.lookups.v1.phoneNumbers(phoneNumber).fetch({ countryCode: 'BD' });
    return phoneNumberVerificationData;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a valid phone number');
  }
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isPhoneNumberTaken(userBody.phoneNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This phone number is already registered!');
  }
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This email is already registered!');
  }
  const { phoneNumber } = userBody;
  await lookupPhoneNumber(phoneNumber);
  const user = await User.create(userBody);
  return user;
};

const createUserPayment = async (userId) => {
  const userPayment = {
    _id: userId,
    paymentsHistory: [],
  };
  await Payment.create(userPayment);
};

const createUserDislike = async (userId) => {
  const userDislike = {
    _id: userId,
    dislikes: {},
  };
  await Dislike.create(userDislike);
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
  return User.findOne(identity);
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

const updateBookmarks = async (user, { contentId, index }) => {
  const { bookmarks } = user;
  if ([contentId] in bookmarks) {
    bookmarks[contentId].push(index);
  } else {
    bookmarks[contentId] = [index];
  }
  await user.markModified('bookmarks');
  await user.save();
  return user;
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

module.exports = {
  createUser,
  createUserPayment,
  createUserDislike,
  queryUsers,
  getUserById,
  getUser,
  checkUserExistsOrNot,
  updateUserById,
  updateBookmarks,
  deleteUserById,
};
