const httpStatus = require('http-status');
const { Subscriber, Payment } = require('../models');
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

const updatePaymentSubscriber = async (subscriber) => {
  const payment = await Payment.findOne({ userId: subscriber.userId });

  const subscriberIndex = payment.customerSubscription
    .map((subscription) => subscription.subscriptionId)
    .indexOf(subscriber.subscriptionId);

  if (subscriberIndex >= 0) {
    const { Subscription, subscriptionId, subscriptionExpire } = payment.customerSubscription[subscriberIndex];

    payment.customerSubscription.set(subscriberIndex, {
      Subscription,
      subscriptionId,
      subscriptionExpire,
      words: subscriber.words,
    });
    payment.save();
  }

  return payment;
};

const subscriberSwitcher = async (subscriber, subId) => {
  const payment = await updatePaymentSubscriber(subscriber);
  const findSubscriber = payment.customerSubscription.find((sub) => sub.subscriptionId === subId);
  if (findSubscriber) {
    const updatedSubscription = await Subscriber.findOneAndUpdate(
      { userId: payment.userId },
      {
        words: findSubscriber.words,
        subscription: findSubscriber.Subscription,
        subscriptionId: findSubscriber.subscriptionId,
        subscriptionExpire: findSubscriber.subscriptionExpire,
      },
      { new: true }
    );
    return updatedSubscription;
  }
  return subscriber;
};

module.exports = { createOwnSubscribe, getOwnSubscribe, updateOwnSubscribe, updateOwnCopyCounter, subscriberSwitcher };
