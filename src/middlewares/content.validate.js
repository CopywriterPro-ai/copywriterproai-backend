const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { Subscriber } = require('../models');

const getSubscriberInfo = async ({ userId }, next) => {
  const subscriber = await Subscriber.findOne({ userId });
  if (!subscriber) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found'));
  }
  const { inputLimit, isPaidSubscribers } = subscriber.subscriberInfo;
  return { inputLimit, isPaidSubscribers };
};

const validate = (schema) => async (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const context = req.user ? await getSubscriberInfo(req.user, next) : undefined;
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, { context });

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
