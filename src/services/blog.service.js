const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

const getBlog = async (_id, userId) => {
  return Blog.findOne({ _id, userId });
};

const checkBlogExistsOrNot = async (id, userId) => {
  const blog = await getBlog(id, userId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const queryBlogs = async (filter, options) => {
  const blogs = await Blog.paginate(filter, options);
  return blogs;
};

const createBlog = async (userId, { blogAbout, headline, blogPost }) => {
  const blog = await Blog.create({ userId, blogAbout, headline, blogPost });
  return blog;
};

const updateBlog = async (blog, updatedBlog) => {
  Object.assign(blog, updatedBlog);
  await blog.save();
  return blog;
};

const deleteBlogById = async (blogId, userId) => {
  const blog = await getBlog(blogId, userId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  await blog.remove();
  return blog;
};

module.exports = {
  checkBlogExistsOrNot,
  queryBlogs,
  createBlog,
  updateBlog,
  deleteBlogById,
};
