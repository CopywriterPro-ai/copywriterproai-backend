const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const extensionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
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
    tone: {
      type: String,
      trim: true,
      default: 'neutral',
    },
    openAPIInformation: {
      type: mongoose.Schema.Types.Mixed,
    },
    generatedContents: {
      type: Array,
      required: true,
      default: [],
    },
    bookmarks: {
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
extensionSchema.plugin(toJSON);
extensionSchema.plugin(paginate);

const Extension = mongoose.model('Extension', extensionSchema);

module.exports = Extension;
