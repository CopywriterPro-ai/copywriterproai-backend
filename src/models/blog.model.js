const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      trim: true,
    },
    blogAbout: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    blogPost: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
