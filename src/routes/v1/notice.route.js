const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { noticeValidation } = require('../../validations');
const noticeController = require('../../controllers/notice.controller');

const router = express.Router();

router.get('/get-notice', noticeController.getNotice);
router.patch('/update-notice', auth('updateNotice'), validate(noticeValidation.updateNotice), noticeController.updateNotice);

module.exports = router;
