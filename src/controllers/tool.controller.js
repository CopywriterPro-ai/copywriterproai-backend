const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { toolService } = require('../services');

const postToolCategory = catchAsync(async (req, res) => {
  const category = await toolService.postToolCategory(req.body);
  res.status(httpStatus.CREATED).send({ status: httpStatus.CREATED, category });
});

const getToolCategories = catchAsync(async (req, res) => {
  const categories = await toolService.getToolCategories();
  res.status(httpStatus.OK).send({ status: httpStatus.OK, categories });
});

const getToolCategory = catchAsync(async (req, res) => {
  const category = await toolService.getToolCategory(req.params.categoryId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, category });
});

const deleteToolCategory = catchAsync(async (req, res) => {
  await toolService.deleteToolCategory(req.params.categoryId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK });
});

const patchToolCategory = catchAsync(async (req, res) => {
  const category = await toolService.patchToolCategory(req.params.categoryId, req.body);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, category });
});

const postTool = catchAsync(async (req, res) => {
  const tool = await toolService.postTool(req.body);
  res.status(httpStatus.CREATED).send({ status: httpStatus.CREATED, tool });
});

const getTools = catchAsync(async (req, res) => {
  const tools = await toolService.getTools();
  res.status(httpStatus.OK).send({ status: httpStatus.OK, tools });
});

const getTool = catchAsync(async (req, res) => {
  const tool = await toolService.getTool(req.params.toolId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, tool });
});

const deleteTool = catchAsync(async (req, res) => {
  await toolService.deleteTool(req.params.toolId);
  res.status(httpStatus.OK).send({ status: httpStatus.OK });
});

const patchTool = catchAsync(async (req, res) => {
  const tool = await toolService.patchTool(req.params.toolId, req.body);
  res.status(httpStatus.OK).send({ status: httpStatus.OK, tool });
});

module.exports = {
  postToolCategory,
  getToolCategory,
  getToolCategories,
  deleteToolCategory,
  patchToolCategory,
  postTool,
  getTools,
  getTool,
  patchTool,
  deleteTool,
};
