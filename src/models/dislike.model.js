const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
    },
    dislikes: [
      {
        contentId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          trim: true,
        },
        generatedContentsIndexes: {
          type: Array,
          required: true,
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dislikeSchema.plugin(toJSON);
dislikeSchema.plugin(paginate);

/**
 * @typedef Dislike
 */
const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = Dislike;
