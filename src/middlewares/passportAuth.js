const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { passportConfig } = require('../config/config');

const passportAuth = () => (req, res, next) => {
  const { token } = req.query;
  jwt.verify(token, passportConfig.authSecretKey, (err, decoded) => {
    if (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'verifytoken is invalid or expired');
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = passportAuth;
