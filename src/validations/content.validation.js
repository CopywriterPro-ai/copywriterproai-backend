const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.string().required(),
    userText: Joi.string().required(),
    wordLimit: Joi.number().integer(),
  }),
};

const productDescription = {
  body: Joi.object().keys({
    task: Joi.string().required(),
    productName: Joi.string().required(),
    type: Joi.string().required(),
    targetPeople: Joi.string().required(),
    features: Joi.string().required(),
  }),
};

// const generate = {
//   body: Joi.object().keys({
//     originalContent: Joi.string().required(),
//     documentType: Joi.string().required(),
//     tone: Joi.string(),
//     numberOfContents: Joi.number().integer(),
//     wordLimit: Joi.number().integer(),
//   }),
// };

module.exports = {
  paraphrase,
  productDescription,
};
