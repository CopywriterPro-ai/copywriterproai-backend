const httpStatus = require('http-status');
const NodeCache = require('node-cache');
const ApiError = require('../utils/ApiError');
const { Tool } = require('../models');
const { TOOL_CATEGORIES, TOOL_CONTENTS } = require('../config/cachekey');

const nodeCache = new NodeCache();

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
  const categories = nodeCache.get(TOOL_CATEGORIES);
  if (categories) {
    return JSON.parse(categories);
  }
  const toolCategory = await Tool.ToolCategory.find({});
  nodeCache.set(TOOL_CATEGORIES, JSON.stringify(toolCategory));
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
  nodeCache.del(TOOL_CATEGORIES);
  return toolCategory;
};

const patchToolCategory = async (id, data) => {
  await checkModelNotFound(Tool.ToolCategory, id);
  const toolCategory = await Tool.ToolCategory.findByIdAndUpdate(id, data, { new: true });
  nodeCache.del(TOOL_CATEGORIES);
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
  const tools = nodeCache.get(TOOL_CONTENTS);
  if (tools) {
    return JSON.parse(tools);
  }
  const tool = await Tool.Tool.find({}).populate('category', 'name key');
  nodeCache.set(TOOL_CONTENTS, JSON.stringify(tool));
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
  nodeCache.del(TOOL_CONTENTS);
  return tool;
};

const deleteTool = async (id) => {
  await checkModelNotFound(Tool.Tool, id);
  const tool = await Tool.Tool.findByIdAndDelete(id);
  nodeCache.del(TOOL_CONTENTS);
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
