const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

const getBlog = async (_id, userEmail) => {
  return Blog.findOne({ _id, userEmail });
};

const checkBlogExistsOrNot = async (id, userEmail) => {
  const blog = await getBlog(id, userEmail);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const queryBlogs = async (filter, options) => {
  const blogs = await Blog.paginate(filter, options);
  return blogs;
};

const createBlog = async (userId, userEmail, body) => {
  const blog = await Blog.create({ userId, userEmail, ...body });
  return blog;
};

const updateBlog = async (blog, updatedBlog) => {
  Object.assign(blog, updatedBlog);
  await blog.save();
  return blog;
};

const deleteBlogById = async (blogId, userEmail) => {
  const blog = await getBlog(blogId, userEmail);
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
