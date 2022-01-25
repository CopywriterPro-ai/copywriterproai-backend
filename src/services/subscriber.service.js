const httpStatus = require('http-status');
const { Subscriber } = require('../models');
const ApiError = require('../utils/ApiError');

const createOwnSubscribe = async (data) => {
  const subscriber = await Subscriber.create(data);
  return subscriber;
};

const getOwnSubscribe = async (email) => {
  const subscriber = await Subscriber.findOne({ email });
  if (!subscriber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
  }
  return subscriber;
};

const updateOwnSubscribe = async (email, data) => {
  const subscriber = await Subscriber.findOneAndUpdate({ email }, data, { new: true });
  if (!subscriber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
  }
  return subscriber;
};

const updateOwnCopyCounter = async (email) => {
  const update = await Subscriber.findOneAndUpdate({ email }, { $inc: { copycounter: 1 } }, { new: true });
  return update;
};

module.exports = { createOwnSubscribe, getOwnSubscribe, updateOwnSubscribe, updateOwnCopyCounter };
