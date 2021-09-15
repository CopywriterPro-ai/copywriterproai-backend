const express = require('express');
const validate = require('../../middlewares/validate');
const { demoValidation } = require('../../validations');
const { demoController } = require('../../controllers');

const router = express.Router();

router.post('/paraphrasing', validate(demoValidation.paraphrase), demoController.generate);

router.post('/blog-headline', validate(demoValidation.blogHeadline), demoController.generate);

module.exports = router;
