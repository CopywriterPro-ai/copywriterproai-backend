const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { plagiarismCheckerValidation } = require('../../validations');
const { plagiarismCheckerController } = require('../../controllers');

const router = express.Router();

router
  .route('/check-plagiarism')
  .post(
    auth('checkPlagiarism'),
    validate(plagiarismCheckerValidation.searchContent),
    plagiarismCheckerController.searchContent
  );

module.exports = router;
