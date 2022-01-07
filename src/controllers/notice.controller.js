const { join } = require('path');
const fsPromises = require('fs/promises');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const noticeUrl = join(__dirname, '../data/notice.json');

const getNotice = catchAsync(async (req, res) => {
  const notice = await fsPromises.readFile(noticeUrl, 'utf-8');
  res.status(httpStatus.OK).send({ status: httpStatus.OK, notice: JSON.parse(notice) });
});

const updateNotice = catchAsync(async (req, res) => {
  await fsPromises.writeFile(noticeUrl, JSON.stringify(req.body), 'utf-8');
  res.status(httpStatus.OK).send({ status: httpStatus.OK, notice: req.body });
});

module.exports = {
  getNotice,
  updateNotice,
};
