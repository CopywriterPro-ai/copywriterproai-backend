const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const demoSchema = mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    documentType: {
      type: String,
      required: true,
      trim: true,
    },
    openAPIInformation: {
      type: mongoose.Schema.Types.Mixed,
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
demoSchema.plugin(toJSON);

/**
 * @typedef Content
 */
const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
