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

const updateInterest = async (userInterest, interestType, { contentId, index }) => {
  const { interests } = userInterest;
  if ([contentId] in interests) {
    if (interests[contentId][`${interestType}s`].includes(index)) {
      throw new ApiError(httpStatus.CONFLICT, `Already ${interestType}d!`);
    } else {
      if (interestType === 'dislike' && interests[contentId]['likes'].includes(index)) {
        interests[contentId]['likes'] = interests[contentId]['likes'].filter(ind => ind !== index);
      } else if (interestType === 'like' && interests[contentId]['dislikes'].includes(index)) {
        interests[contentId]['dislikes'] = interests[contentId]['dislikes'].filter(ind => ind !== index);
      }
      interests[contentId][`${interestType}s`].push(index);
    }
  } else {
    interests[contentId] = { likes: [], dislikes: [] };
    interests[contentId][`${interestType}s`] = [index];
  }
  await userInterest.markModified('interests');
  await userInterest.save();
  return userInterest;
};

module.exports = {
  createUserInterest,
  getUserInterestsById,
  checkDocumentExistsOrNot,
  updateInterest,
};
