const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');

/**
 * Get all blogs for the authenticated user.
 * This function retrieves blogs based on the user's email and query options such as sorting, pagination, and limit.
 *
 * @param {Object} req - The request object containing user information and query parameters.
 * @param {Object} res - The response object.
 */
const getBlogs = catchAsync(async (req, res) => {
  const filter = { userEmail: req.user.email };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await blogService.queryBlogs(filter, options);
  res.send(result);
});

/**
 * Get a single blog by ID for the authenticated user.
 * This function retrieves a blog based on the blog ID and user's email.
 *
 * @param {Object} req - The request object containing the blog ID and user information.
 * @param {Object} res - The response object.
 */
const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.checkBlogExistsOrNot(req.params.blogId, req.user.email);
  res.send(blog);
});

/**
 * Create a new blog for the authenticated user.
 * This function creates a new blog entry with the provided user ID, email, and blog data.
 *
 * @param {Object} req - The request object containing the user information and blog data.
 * @param {Object} res - The response object.
 */
const createBlog = catchAsync(async (req, res) => {
  const user = await blogService.createBlog(req.user._id, req.user.email, req.body);
  res.status(httpStatus.CREATED).send(user);
});

/**
 * Update an existing blog for the authenticated user.
 * This function updates a blog entry based on the blog ID, user's email, and the new blog data.
 *
 * @param {Object} req - The request object containing the blog ID, user information, and new blog data.
 * @param {Object} res - The response object.
 */
const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.checkBlogExistsOrNot(req.params.blogId, req.user.email);
  const updatedBlog = await blogService.updateBlog(blog, req.body);
  res.status(httpStatus.OK).send(updatedBlog);
});

/**
 * Delete a blog by ID for the authenticated user.
 * This function deletes a blog entry based on the blog ID and user's email.
 *
 * @param {Object} req - The request object containing the blog ID and user information.
 * @param {Object} res - The response object.
 */
const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId, req.user.email);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
