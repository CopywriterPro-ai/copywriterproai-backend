const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');

const getBlogs = catchAsync(async (req, res) => {
  const filter = { userId: req.user._id };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  console.log(filter, '\n', options);
  const result = await blogService.queryBlogs(filter, options);
  res.send(result);
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.checkBlogExistsOrNot(req.params.blogId, req.user._id);
  res.send(blog);
});

const createBlog = catchAsync(async (req, res) => {
  const user = await blogService.createBlog(req.user._id, req.body);
  res.status(httpStatus.CREATED).send(user);
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.checkBlogExistsOrNot(req.params.blogId, req.user._id);
  const updatedBlog = await blogService.updateBlog(blog, req.body);
  res.status(httpStatus.OK).send(updatedBlog);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
