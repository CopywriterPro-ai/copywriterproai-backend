const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { toolValidation } = require('../../validations');
const { toolController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTools'), validate(toolValidation.tool), toolController.postTool)
  .get(toolController.getTools);

router
  .route('/categories')
  .post(auth('manageTools'), validate(toolValidation.toolCategory), toolController.postToolCategory)
  .get(toolController.getToolCategories);

router
  .route('/:toolId')
  .get(toolController.getTool)
  .patch(auth('manageTools'), toolController.patchTool)
  .delete(auth('manageTools'), toolController.deleteTool);

router
  .route('/categories/:categoryId')
  .get(toolController.getToolCategory)
  .patch(auth('manageTools'), toolController.patchToolCategory)
  .delete(auth('manageTools'), toolController.deleteToolCategory);

module.exports = router;
