const { trial } = require('./config');

const trialInfo = {
  ...trial,
  dailyLimit: Math.floor(trial.credits / trial.days),
};

const subscription = {
  FREEMIUM: 'Freemium',
  STARTER_MONTHLY: 'Starter - Monthly',
  STARTER_ANNUAL: 'Starter - Annual',
  PROFESSINAL_MONTHLY: 'Professinal - Monthly',
  PROFESSINAL_ANNUAL: 'Professinal - Annual',
};

const subscriptionPlan = {
  monthStarter: { creadit: 700, amount: 15 * 100, package: subscription.STARTER_MONTHLY },
  yearStarter: { creadit: 8400, amount: 170 * 100, package: subscription.STARTER_ANNUAL },
  monthProfessinal: { creadit: 1000, amount: 20 * 100, package: subscription.PROFESSINAL_MONTHLY },
  yearProfessinal: { creadit: 12000, amount: 220 * 100, package: subscription.PROFESSINAL_ANNUAL },
};

module.exports = { subscription, trial: trialInfo, subscriptionPlan };
