const moment = require('moment-timezone');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const { toJSON, paginate } = require('./plugins');
const { subscription, trial } = require('../config/plan');

const subscriptionEnum = Object.values(subscription);
const paymentMethods = ['stripe', 'mobilebanking'];

// const activeSubscriptionSchema = new Schema({
//   subscription: { type: String, enum: subscriptionEnum, default: subscription.FREEMIUM },
//   subscriptionId: { type: String },
//   subscriptionExpire: { type: Date },
//   words: { type: Number, default: 3000 },
// });

const subscriptionAllSchema = new Schema({
  subscription: { type: String, enum: subscriptionEnum },
  subscriptionId: { type: String },
  subscriptionExpire: { type: Date },
  words: { type: Number },
  plagiarismCheckerWords: { type: Number },
  paymentMethod: { type: String, enum: paymentMethods, default: paymentMethods[0] },
});

const subscriberSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    dailyCreaditUsage: {
      date: { type: Date },
      usage: { type: Number, default: 0 },
    },
    copycounter: {
      type: Number,
      default: 0,
    },
    customerStripeId: {
      type: String,
    },
    activeSubscription: {
      subscription: { type: String, enum: subscriptionEnum, default: subscription.FREEMIUM },
      subscriptionId: { type: String },
      subscriptionExpire: { type: Date },
      words: { type: Number, default: trial.words },
      plagiarismCheckerWords: { type: Number, default: trial.plagiarismCheckerWords },
      paymentMethod: { type: String, enum: paymentMethods, default: paymentMethods[0] },
    },
    subscriptionAll: [subscriptionAllSchema],
  },
  {
    timestamps: true,
  }
);

subscriberSchema.virtual('freeTrial').get(function () {
  const { subscription: subs, subscriptionExpire } = this.activeSubscription;
  const dailyUsage = this.dailyCreaditUsage;
  const addSevenDays = moment(this.createdAt).add('7', 'days');
  const expireDate = subscriptionExpire || addSevenDays;

  if (subs === subscription.FREEMIUM && moment(expireDate).isValid() && moment().isSameOrBefore(expireDate)) {
    return { eligible: true, dailyLimitExceeded: dailyUsage.usage >= trial.dailyLimit };
  }
  return { eligible: false, dailyLimitExceeded: true };
});

subscriberSchema.virtual('subscriberInfo').get(function () {
  const { subscription: subs, subscriptionExpire: subsExpire } = this.activeSubscription;
  const excludedFreeSubs = Object.values(subscription).filter((item) => item !== subscription.FREEMIUM);
  const isPaidSubscription = excludedFreeSubs.includes(subs);

  const isPaidSubscribers = isPaidSubscription && subsExpire ? moment().isSameOrBefore(subsExpire) : false;
  let inputLimit = true;

  if (isPaidSubscribers) {
    switch (subs) {
      case subscription.BASIC_1MONTH:
      case subscription.BASIC_6MONTH:
      case subscription.STANDARD_1MONTH:
      case subscription.STANDARD_6MONTH:
        inputLimit = true;
        break;

      case subscription.PROFESSIONAL_1MONTH:
      case subscription.PROFESSIONAL_6MONTH:
        inputLimit = false;
        break;

      default:
        inputLimit = true;
        break;
    }
  }
  return { isPaidSubscribers, inputLimit };
});

subscriberSchema.set('toObject', { virtuals: true });
subscriberSchema.set('toJSON', { virtuals: true });

// add plugin that converts mongoose to json
subscriberSchema.plugin(toJSON);
subscriberSchema.plugin(paginate);

// Indexing
subscriberSchema.index({ userId: 1 });

/**
 * @typedef Subscription
 */
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
