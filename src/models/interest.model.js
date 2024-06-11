const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const interestSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   trim: true,
    //   ref: 'User',
    // },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    interests: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// add plugin that converts mongoose to json
interestSchema.plugin(toJSON);
interestSchema.plugin(paginate);

/**
 * @typedef Interest
 */
const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
