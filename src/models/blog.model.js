const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const BLOG_TYPE = ['WRITE_ALONG', 'GHOSTWRITER'];

const blogSchema = mongoose.Schema(
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
    blogType: {
      type: String,
      enum: BLOG_TYPE,
      default: BLOG_TYPE[0],
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
