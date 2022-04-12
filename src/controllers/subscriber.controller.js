const httpStatus = require('http-status');
const moment = require('moment-timezone');

const catchAsync = require('../utils/catchAsync');
const { subscriberService } = require('../services');

const getOwnSubscribe = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.getOwnSubscribe(req.user.userId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscriber });
});

const updateOwnSubscribe = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.updateOwnSubscribe(req.user.userId, req.body);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscriber });
});

const updateOwnCopyCounter = catchAsync(async (req, res) => {
  await subscriberService.updateOwnCopyCounter(req.user.userId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, message: 'success' });
});

const generateUpdate = catchAsync(async (req, res) => {
  let calDailyCreaditUsage;
  const { role, userId } = req.user;
  const { useWords = 0 } = req.body;
  const { activeSubscription, dailyCreaditUsage } = await subscriberService.getOwnSubscribe(userId);

  const todayDate = moment().startOf('day').format();
  const { date, usage } = dailyCreaditUsage;
  const isSameDay = moment(date).isSame(todayDate);
  const isAdmin = role === 'admin';

  if (isSameDay) {
    calDailyCreaditUsage = { date, usage: usage + useWords };
  } else {
    calDailyCreaditUsage = { date: todayDate, usage: useWords };
  }

  let remainingWords = 0;
  const subtractionWords = activeSubscription.words - useWords;

  if (subtractionWords < 0) {
    remainingWords = 0;
  } else {
    remainingWords = subtractionWords;
  }

  const subscriber = await subscriberService.updateOwnSubscribe(userId, {
    activeSubscription: {
      ...activeSubscription,
      words: isAdmin ? activeSubscription.words : remainingWords,
    },
    dailyCreaditUsage: calDailyCreaditUsage,
  });
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscriber });
});

const subscriberSwitcher = catchAsync(async (req, res) => {
  const subscriber = await subscriberService.subscriberSwitcher(req);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, subscriber });
});

module.exports = { getOwnSubscribe, updateOwnSubscribe, updateOwnCopyCounter, generateUpdate, subscriberSwitcher };
