const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { contentValidation } = require('../../validations');
const { contentController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrase')
  .post(auth('generateContent'), validate(contentValidation.paraphrase), contentController.generate);

router
  .route('/generate/product-description')
  .post(auth('generateContent'), validate(contentValidation.productDescription), contentController.generate);

module.exports = router;
