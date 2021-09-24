const { trial } = require('./config');

const trialInfo = {
  ...trial,
  dailyLimit: Math.floor(trial.credits / trial.days),
};

const subscription = {
  FREEMIUM: 'Freemium',
  BASIC_1MONTH: 'BASIC_1MONTH',
  BASIC_6MONTH: 'BASIC_6MONTH',
  PROFESSINAL_1MONTH: 'PROFESSINAL_1MONTH',
  PROFESSINAL_6MONTH: 'PROFESSINAL_6MONTH',
};

const subscriptionPlan = {
  [subscription.BASIC_1MONTH]: { creadit: 700, package: subscription.BASIC_1MONTH },
  [subscription.BASIC_6MONTH]: { creadit: 8400, package: subscription.BASIC_6MONTH },
  [subscription.PROFESSINAL_1MONTH]: { creadit: 1000, package: subscription.PROFESSINAL_1MONTH },
  [subscription.PROFESSINAL_6MONTH]: { creadit: 12000, package: subscription.PROFESSINAL_6MONTH },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
