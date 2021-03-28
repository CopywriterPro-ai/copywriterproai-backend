const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
    },
    originalContent: {
      type: String,
      required: true,
      trim: true,
    },
    documentType: {
      type: String,
      required: true,
      trim: true,
    },
    wordLimit: {
      type: Number,
      trim: true,
      default: 30,
    },
    tone: {
      type: String,
      trim: true,
      default: 'neutral',
    },
    generatedContents: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contentSchema.plugin(toJSON);
contentSchema.plugin(paginate);

/**
 * @typedef Content
 */
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
