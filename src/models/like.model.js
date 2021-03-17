const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
    },
    likes: [
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
likeSchema.plugin(toJSON);
likeSchema.plugin(paginate);

/**
 * @typedef Like
 */
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
