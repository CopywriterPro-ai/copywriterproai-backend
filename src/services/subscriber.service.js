const httpStatus = require('http-status');
const moment = require('moment-timezone');
const { Subscriber } = require('../models');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model'); // Import User model to check for OpenAI API key

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

const manageTrial = async (userId) => {
  const subscriber = await getOwnSubscribe(userId);
  const user = await User.findById(userId);

  // Check if the user has provided their own OpenAI API key
  if (user.UserOwnOpenAIApiKey) {
    // If the user has their own API key, no trial restrictions are applied
    return subscriber;
  }

  // Implement trial management logic based on your application's requirements
  const trialEndDate = moment(subscriber.createdAt).add(trial.days, 'days');
  const isTrialEnded = moment().isAfter(trialEndDate);

  if (isTrialEnded) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your trial period has ended. Please subscribe to continue.');
  }

  return subscriber;
};

const enforceSubscription = async (userId) => {
  const subscriber = await getOwnSubscribe(userId);
  const user = await User.findById(userId);

  // Check if the user has provided their own OpenAIApiKey
  if (user.UserOwnOpenAIApiKey) {
    // If the user has their own API key, no subscription restrictions are applied
    return subscriber;
  }

  // Implement subscription enforcement logic
  const { subscriptionExpire } = subscriber.activeSubscription;
  const isSubscriptionExpired = moment().isAfter(subscriptionExpire);

  if (isSubscriptionExpired) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your subscription has expired. Please renew to continue.');
  }

  return subscriber;
};

module.exports = {
  createOwnSubscribe,
  getOwnSubscribe,
  updateOwnSubscribe,
  updateOwnCopyCounter,
  updatesubscriptionAll,
  subscriberSwitcher,
  manageTrial,
  enforceSubscription,
};
