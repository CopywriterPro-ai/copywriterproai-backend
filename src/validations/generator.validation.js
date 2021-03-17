const Joi = require('joi');

const generateContent = {
  body: Joi.object().keys({
    originalContent: Joi.string().required(),
    documentType: Joi.string().required(),
    tone: Joi.string(),
    numberOfContents: Joi.number().integer(),
    wordLimit: Joi.number().integer(),
  }),
};

module.exports = {
  generateContent,
};
