const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const generatorValidation = require('../../validations/generator.validation');
const generatorController = require('../../controllers/generator.controller');

const router = express.Router();

router
  .route('/generate')
  .post(auth('generateContent'), validate(generatorValidation.generateContent), generatorController.generateContent);

module.exports = router;
