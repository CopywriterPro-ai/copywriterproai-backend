const mongoose = require('mongoose');
const moment = require('moment-timezone');

const { toJSON, paginate } = require('./plugins');
const { subscription, trial } = require('../config/plan');

const subscriptionEnum = Object.values(subscription);

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    words: {
      type: Number,
      trim: true,
      default: 700,
    },
    dailyCreaditUsage: {
      date: { type: Date },
      usage: { type: Number, default: 0 },
    },
    subscription: {
      type: String,
      enum: subscriptionEnum,
      default: subscription.FREEMIUM,
    },
    subscriptionExpire: {
      type: Date,
    },
    copycounter: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

subscriberSchema.virtual('freeTrial').get(function () {
  const subs = this.subscription;
  const dailyUsage = this.dailyCreaditUsage;
  const addSevenDays = moment(this.createdAt).add('7', 'days');

  if (subs === subscription.FREEMIUM && moment().isSameOrBefore(addSevenDays)) {
    return { eligible: true, dailyLimitExceeded: dailyUsage.usage === trial.dailyLimit };
  }
  return { eligible: false, dailyLimitExceeded: true };
});

subscriberSchema.virtual('isPaidSubscribers').get(function () {
  const subs = this.subscription;
  const subsExpire = this.subscriptionExpire;
  const excludedFreeSubs = Object.values(subscription).filter((item) => item !== subscription.FREEMIUM);
  const isPaidSubscription = excludedFreeSubs.includes(subs);

  if (isPaidSubscription && subsExpire) {
    return moment().isSameOrBefore(subsExpire);
  }

  return false;
});

subscriberSchema.virtual('inputLimit').get(function () {
  const subs = this.subscription;
  const subsExpire = this.subscriptionExpire;
  const excludedFreeSubs = Object.values(subscription).filter((item) => item !== subscription.FREEMIUM);
  const isPaidSubscription = excludedFreeSubs.includes(subs);

  const isPaidSubscribers = isPaidSubscription && subsExpire ? moment().isSameOrBefore(subsExpire) : false;

  if (isPaidSubscribers) {
    switch (subs) {
      case subscription.BASIC_1MONTH:
      case subscription.BASIC_6MONTH:
        return true;

      case subscription.PROFESSIONAL_1MONTH:
      case subscription.PROFESSIONAL_6MONTH:
        return false;

      default:
        return true;
    }
  }
  return true;
});

subscriberSchema.set('toObject', { virtuals: true });
subscriberSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
subscriberSchema.plugin(toJSON);
subscriberSchema.plugin(paginate);

/**
 * @typedef Subscription
 */
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
