const httpStatus = require('http-status');
const { Subscriber } = require('../models');
const ApiError = require('../utils/ApiError');

const createOwnSubscribe = async (data) => {
  const subscriber = await Subscriber.create(data);
  return subscriber;
};

const getOwnSubscribe = async (userId) => {
  const subscriber = await Subscriber.findOne({ userId });
  if (!subscriber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
  }
  return subscriber;
};

const updateOwnSubscribe = async (userId, data) => {
  const subscriber = await Subscriber.findOneAndUpdate({ userId }, data, { new: true });
  if (!subscriber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
  }
  return subscriber;
};

const updateOwnCopyCounter = async (userId) => {
  const update = await Subscriber.findOneAndUpdate({ userId }, { $inc: { copycounter: 1 } }, { new: true });
  return update;
};

const updatesubscriptionAll = async (userId) => {
  const subscriber = await getOwnSubscribe(userId);
  const subscriberIndex = subscriber.subscriptionAll
    .map((subscription) => subscription.subscriptionId)
    .indexOf(subscriber.activeSubscription.subscriptionId);

  if (subscriberIndex >= 0) {
    subscriber.subscriptionAll.set(subscriberIndex, { ...subscriber.activeSubscription });
    subscriber.save();
  }
  return subscriber;
};

const subscriberSwitcher = async (req) => {
  const { user, body } = req;
  const subscriber = await updatesubscriptionAll(user.userId);
  const selectSubscriber = subscriber.subscriptionAll.find((sub) => sub.subscriptionId === body.subscriptionId);
  if (selectSubscriber) {
    const updatedSubscription = await Subscriber.findOneAndUpdate(
      { userId: user.userId },
      { activeSubscription: { ...selectSubscriber } },
      { new: true }
    );
    return updatedSubscription;
  }
  return subscriber;
};

module.exports = { createOwnSubscribe, getOwnSubscribe, updateOwnSubscribe, updateOwnCopyCounter, subscriberSwitcher };
