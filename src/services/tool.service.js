const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Tool } = require('../models');

const notFound = async (cond) => {
  if (cond) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
};

const alreadyExist = async (cond) => {
  if (cond) {
    throw new ApiError(httpStatus.CONFLICT, 'Already Exist');
  }
};

const checkModelNotFound = async (Model, id) => {
  const tool = await Model.findById(id);
  await notFound(!tool);
};

const checkModelExist = async (Model, key) => {
  const existTool = await Model.findOne({ key });
  await alreadyExist(existTool);
};

const postToolCategory = async (data) => {
  await checkModelExist(Tool.ToolCategory, data.key);
  const toolCategory = await Tool.ToolCategory.create(data);
  return toolCategory;
};

const getToolCategories = async () => {
  const toolCategory = await Tool.ToolCategory.find({});
  return toolCategory;
};

const getToolCategory = async (id) => {
  const toolCategory = await Tool.ToolCategory.findById(id);
  await notFound(!toolCategory);
  return toolCategory;
};

const deleteToolCategory = async (id) => {
  await checkModelNotFound(Tool.ToolCategory, id);
  const toolCategory = await Tool.ToolCategory.findByIdAndDelete(id);
  await Tool.Tool.deleteMany({ category: id });
  return toolCategory;
};

const patchToolCategory = async (id, data) => {
  await checkModelNotFound(Tool.ToolCategory, id);
  const toolCategory = await Tool.ToolCategory.findByIdAndUpdate(id, data, { new: true });
  return toolCategory;
};

const postTool = async (data) => {
  const category = await Tool.ToolCategory.findById(data.category);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide valid category id');
  }
  await checkModelExist(Tool.Tool, data.key);
  const tool = await Tool.Tool.create(data);
  return tool;
};

const getTools = async () => {
  const tool = await Tool.Tool.find({}).populate('category', 'name key');
  return tool;
};

const getTool = async (id) => {
  const tool = await Tool.Tool.findById(id).populate('category', 'name key');
  await notFound(!tool);
  return tool;
};

const patchTool = async (id, data) => {
  await checkModelNotFound(Tool.Tool, id);
  const tool = await Tool.Tool.findByIdAndUpdate(id, data, { new: true });
  return tool;
};

const deleteTool = async (id) => {
  await checkModelNotFound(Tool.Tool, id);
  const tool = await Tool.Tool.findByIdAndDelete(id);
  return tool;
};

module.exports = {
  postToolCategory,
  getToolCategories,
  getToolCategory,
  deleteToolCategory,
  patchToolCategory,
  postTool,
  getTools,
  getTool,
  patchTool,
  deleteTool,
};
