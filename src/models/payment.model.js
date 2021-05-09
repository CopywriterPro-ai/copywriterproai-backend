const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: 'User',
    },
    email: {
      type: String,
    },
    customerStripeId: {
      type: String,
    },
    customerSubscriptionId: {
      type: String,
    },
    // paymentsHistory: [
    //   {
    //     plan: {
    //       type: String,
    //       enum: ['Monthly', 'Annual'],
    //       required: true,
    //       trim: true,
    //     },
    //     amount: {
    //       type: Number,
    //       required: true,
    //       trim: true,
    //     },
    //     paidAt: {
    //       type: Date,
    //       required: true,
    //       trim: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
