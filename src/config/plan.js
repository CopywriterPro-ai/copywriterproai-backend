const { trial } = require('./config');

const trialInfo = {
  ...trial,
  // dailyLimit: Math.floor(trial.words / trial.days),
  dailyLimit: trial.words,
};

const subscription = {
  FREEMIUM: 'Freemium',
  LIGHT_1MONTH: 'LIGHT_1MONTH',
  LIGHT_6MONTH: 'LIGHT_6MONTH',
  BASIC_1MONTH: 'BASIC_1MONTH',
  BASIC_6MONTH: 'BASIC_6MONTH',
  PROFESSINAL_1MONTH: 'PROFESSINAL_1MONTH',
  PROFESSINAL_6MONTH: 'PROFESSINAL_6MONTH',
};

const subscriptionPlan = {
  [subscription.LIGHT_1MONTH]: { words: 13000, package: subscription.LIGHT_1MONTH },
  [subscription.LIGHT_6MONTH]: { words: 13000 * 6, package: subscription.LIGHT_6MONTH },
  [subscription.BASIC_1MONTH]: { words: 70000, package: subscription.BASIC_1MONTH },
  [subscription.BASIC_6MONTH]: { words: 70000 * 6, package: subscription.BASIC_6MONTH },
  [subscription.PROFESSINAL_1MONTH]: { words: 300000, package: subscription.PROFESSINAL_1MONTH },
  [subscription.PROFESSINAL_6MONTH]: { words: 300000 * 6, package: subscription.PROFESSINAL_6MONTH },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
