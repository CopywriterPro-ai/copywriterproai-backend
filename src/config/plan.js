const { trial } = require('./config');

const trialInfo = {
  ...trial,
  // dailyLimit: Math.floor(trial.words / trial.days),
  dailyLimit: trial.words,
};

const subscription = {
  FREEMIUM: 'FREEMIUM',
  BASIC_1MONTH: 'BASIC_1MONTH',
  BASIC_6MONTH: 'BASIC_6MONTH',
  STANDARD_1MONTH: 'STANDARD_1MONTH',
  STANDARD_6MONTH: 'STANDARD_6MONTH',
  PROFESSIONAL_1MONTH: 'PROFESSIONAL_1MONTH',
  PROFESSIONAL_6MONTH: 'PROFESSIONAL_6MONTH',
};

const subscriptionPlan = {
  [subscription.BASIC_1MONTH]: {
    words: 7000,
    plagiarismCheckerWords: 0,
    package: subscription.BASIC_1MONTH,
    month: 1,
    price: { bdt: '399' },
  },
  [subscription.BASIC_6MONTH]: {
    words: 7000 * 6,
    plagiarismCheckerWords: 0,
    package: subscription.BASIC_6MONTH,
    month: 6,
    price: { bdt: '1999' },
  },
  [subscription.STANDARD_1MONTH]: {
    words: 50000,
    plagiarismCheckerWords: 10000,
    package: subscription.STANDARD_1MONTH,
    month: 1,
    price: { bdt: '1999' },
  },
  [subscription.STANDARD_6MONTH]: {
    words: 50000 * 6,
    plagiarismCheckerWords: 10000 * 6,
    package: subscription.STANDARD_6MONTH,
    month: 6,
    price: { bdt: '9999' },
  },
  [subscription.PROFESSIONAL_1MONTH]: {
    words: 200000,
    plagiarismCheckerWords: 50000,
    package: subscription.PROFESSIONAL_1MONTH,
    month: 1,
    price: { bdt: '4999' },
  },
  [subscription.PROFESSIONAL_6MONTH]: {
    words: 200000 * 6,
    plagiarismCheckerWords: 50000 * 6,
    package: subscription.PROFESSIONAL_6MONTH,
    month: 6,
    price: { bdt: '24999' },
  },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
