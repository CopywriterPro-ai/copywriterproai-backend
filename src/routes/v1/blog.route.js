const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { blogValidation } = require('../../validations');
const { blogController } = require('../../controllers');

const router = express.Router();

router.route('/').get(auth('getBlog'), validate(blogValidation.getBlogs), blogController.getBlogs);

router.route('/create-new').post(auth('manageBlog'), validate(blogValidation.createBlog), blogController.createBlog);

router
  .route('/:blogId')
  .get(auth('getBlog'), validate(blogValidation.getBlog), blogController.getBlog)
  .patch(auth('manageBlog'), validate(blogValidation.updateBlog), blogController.updateBlog)
  .delete(auth('manageBlog'), validate(blogValidation.deleteBlog), blogController.deleteBlog);

module.exports = router;
