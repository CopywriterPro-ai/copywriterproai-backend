const { trial } = require('./config');

const trialInfo = {
  ...trial,
  // dailyLimit: Math.floor(trial.words / trial.days),
  dailyLimit: trial.words,
};

const subscription = {
  FREEMIUM: 'Freemium',
  BASIC_1MONTH: 'BASIC_1MONTH',
  BASIC_6MONTH: 'BASIC_6MONTH',
  PROFESSIONAL_1MONTH: 'PROFESSIONAL_1MONTH',
  PROFESSIONAL_6MONTH: 'PROFESSIONAL_6MONTH',
};

const subscriptionPlan = {
  [subscription.BASIC_1MONTH]: { words: 70000, package: subscription.BASIC_1MONTH },
  [subscription.BASIC_6MONTH]: { words: 70000 * 6, package: subscription.BASIC_6MONTH },
  [subscription.PROFESSIONAL_1MONTH]: { words: 300000, package: subscription.PROFESSIONAL_1MONTH },
  [subscription.PROFESSIONAL_6MONTH]: { words: 300000 * 6, package: subscription.PROFESSIONAL_6MONTH },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
