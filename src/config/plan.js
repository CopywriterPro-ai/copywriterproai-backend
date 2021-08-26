const { trial } = require('./config');

const trialInfo = {
  ...trial,
  dailyLimit: Math.floor(trial.credits / trial.days),
};

const subscription = {
  FREEMIUM: 'Freemium',
  PREMIUM_MONTHLY: 'Premium - Monthly',
  PREMIUM_ANNUAL: 'Premium - Annual',
};

module.exports = { subscription, trial: trialInfo };
