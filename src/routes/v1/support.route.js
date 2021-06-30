const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { supportValidation } = require('../../validations');
const { supportController } = require('../../controllers');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const router = express.Router();

router.post('/feature-request', validate(supportValidation.featureRequest), supportController.featureRequest);
router.post('/bug-report', [upload, validate(supportValidation.bugReport)], supportController.bugReport);
router.post('/contact', validate(supportValidation.userMessage), supportController.userMessage);

module.exports = router;
