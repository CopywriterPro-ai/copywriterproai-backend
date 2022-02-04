const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/content.validate');
const { extensionValidation } = require('../../validations');
const { extensionController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrasing')
  .post(auth('generateContentExtension'), validate(extensionValidation.paraphrase), extensionController.generate);

router
  .route('/generate/grammar-fixer')
  .post(auth('generateContent'), validate(extensionValidation.grammarFixer), extensionController.generate);

router
  .route('/generate/simplifier')
  .post(auth('generateContentExtension'), validate(extensionValidation.simplifier), extensionController.generate);

router
  .route('/generate/summarizer')
  .post(auth('generateContentExtension'), validate(extensionValidation.summarizer), extensionController.generate);

router
  .route('/generate/change-tone')
  .post(auth('generateContentExtension'), validate(extensionValidation.changeTone), extensionController.generate);

module.exports = router;
