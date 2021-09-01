const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');
const { subscription } = require('../config/plan');

const subscriptionEnum = Object.values(subscription);

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    credits: {
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

// add plugin that converts mongoose to json
subscriberSchema.plugin(toJSON);
subscriberSchema.plugin(paginate);

/**
 * @typedef Subscription
 */
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
