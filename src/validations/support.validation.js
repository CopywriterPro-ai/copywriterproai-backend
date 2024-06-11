const Joi = require('joi');

// const featureRequest = {
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     feature: Joi.string().max(1000).required(),
//     image: Joi.any(),
//   }),
// };

// const bugReport = {
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     report: Joi.string().max(1000).required(),
//     image: Joi.any(),
//   }),
// };

const userMessage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(1000).required(),
    // image: Joi.any(),
  }),
};

module.exports = {
  // featureRequest,
  // bugReport,
  userMessage,
};
