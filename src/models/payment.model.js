const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
      unique: true,
    },
    paymentsHistory: [
      {
        plan: {
          type: String,
          enum: ['Monthly', 'Annual'],
          required: true,
          trim: true,
        },
        amount: {
          type: Number,
          required: true,
          trim: true,
        },
        paidAt: {
          type: Date,
          required: true,
          trim: true,
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

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
