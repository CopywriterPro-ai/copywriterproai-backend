const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/content.validate');
const { extension } = require('../../validations/contents');
const { extensionController } = require('../../controllers');

const router = express.Router();

router
  .route('/generate/paraphrasing')
  .post(auth('generateContentExtension'), validate(extension.paraphrase), extensionController.generate);

router
  .route('/generate/grammar-fixer')
  .post(auth('generateContent'), validate(extension.grammarFixer), extensionController.generate);

router
  .route('/generate/simplifier')
  .post(auth('generateContentExtension'), validate(extension.simplifier), extensionController.generate);

router
  .route('/generate/summarizer')
  .post(auth('generateContentExtension'), validate(extension.summarizer), extensionController.generate);

router
  .route('/generate/change-tone')
  .post(auth('generateContentExtension'), validate(extension.changeTone), extensionController.generate);

module.exports = router;
