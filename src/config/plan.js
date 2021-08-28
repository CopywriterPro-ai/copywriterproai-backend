const { trial } = require('./config');

const subscriptionPlan = {
  monthStarter: { creadit: 700 },
  yearStarter: { creadit: 8400 },
  monthProfessinal: { creadit: 1000 },
  yearProfessinal: { creadit: 12000 },
};

const trialInfo = {
  ...trial,
  dailyLimit: Math.floor(trial.credits / trial.days),
};

const subscription = {
  FREEMIUM: 'Freemium',
  PREMIUM_MONTHLY: 'Premium - Monthly',
  PREMIUM_ANNUAL: 'Premium - Annual',
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
