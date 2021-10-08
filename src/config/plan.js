const { trial } = require('./config');

const trialInfo = {
  ...trial,
  dailyLimit: Math.floor(trial.words / trial.days),
};

const subscription = {
  FREEMIUM: 'Freemium',
  BASIC_1MONTH: 'BASIC_1MONTH',
  BASIC_6MONTH: 'BASIC_6MONTH',
  PROFESSINAL_1MONTH: 'PROFESSINAL_1MONTH',
  PROFESSINAL_6MONTH: 'PROFESSINAL_6MONTH',
};

const subscriptionPlan = {
  [subscription.BASIC_1MONTH]: { words: 700, package: subscription.BASIC_1MONTH },
  [subscription.BASIC_6MONTH]: { words: 8400, package: subscription.BASIC_6MONTH },
  [subscription.PROFESSINAL_1MONTH]: { words: 1000, package: subscription.PROFESSINAL_1MONTH },
  [subscription.PROFESSINAL_6MONTH]: { words: 12000, package: subscription.PROFESSINAL_6MONTH },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
