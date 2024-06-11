const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerStripeId: {
      type: String,
    },
    customerSubscription: [
      {
        Subscription: {
          type: String,
        },
        subscriptionId: {
          type: String,
        },
        subscriptionExpire: {
          type: Date,
        },
        words: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

// Indexing
paymentSchema.index({ userId: 1 });

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
