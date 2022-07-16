const express = require('express');
const validate = require('../../middlewares/content.validate');
const { demo } = require('../../validations/contents');
const { demoController } = require('../../controllers');

const router = express.Router();

router.post('/paraphrasing', validate(demo.paraphrase), demoController.generate);

router.post('/blog-headline', validate(demo.blogHeadline), demoController.generate);

module.exports = router;
