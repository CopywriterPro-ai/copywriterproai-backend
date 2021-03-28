const httpStatus = require('http-status');
const { Interest } = require('../models');
const ApiError = require('../utils/ApiError');

const createUserInterest = async (userId) => {
  const userInterest = {
    _id: userId,
    interests: {},
  };
  await Interest.create(userInterest);
};

const getUserInterestsById = async (id) => {
  return Interest.findById(id);
};

const checkDocumentExistsOrNot = async (id) => {
  const userInterest = await getUserInterestsById(id);
  if (!userInterest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  return userInterest;
};

const updateInterests = async (userInterest, interestType, { contentId, index }) => {
  const { interests } = userInterest;
  if ([contentId] in interests) {
    if (interests[contentId][interestType].includes(index)) {
      throw new ApiError(httpStatus.CONFLICT, 'Already reacted!');
    } else {
      interests[contentId][interestType].push(index);
    }
  } else {
    interests[contentId] = [[], []];
    interests[contentId][interestType] = [index];
  }
  await userInterest.markModified('interests');
  await userInterest.save();
  return userInterest;
};

module.exports = {
  createUserInterest,
  getUserInterestsById,
  checkDocumentExistsOrNot,
  updateInterests,
};
