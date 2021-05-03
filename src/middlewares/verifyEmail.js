const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { verifyMail } = require('../config/config');

const verifyEmail = () => (req, res, next) => {
  const { token } = req.query;
  jwt.verify(token, verifyMail.jwtSecret, (err, decoded) => {
    if (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'verify token is invalid or expired');
    } else {
      req.token = decoded;
      next();
    }
  });
};

module.exports = verifyEmail;
