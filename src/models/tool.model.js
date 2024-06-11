const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const toolCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    src: String,
  },
});

const toolFieldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  tips: {
    text: String,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  validation: {
    required: { type: Boolean, default: true },
    max: { type: Number },
  },
});

const toolSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
  },
  fields: [toolFieldSchema],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToolCategory',
    required: true,
  },
});

// add plugin that converts mongoose to json
toolSchema.plugin(toJSON);
toolCategorySchema.plugin(toJSON);

const Tool = mongoose.model('Tool', toolSchema);

const ToolCategory = mongoose.model('ToolCategory', toolCategorySchema);

module.exports = { ToolCategory, Tool };
