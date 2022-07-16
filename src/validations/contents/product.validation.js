const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { productValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const productDescription = (subscription) => {
  const { task, productName, productType, numberOfSuggestions } = getLimits(
    productValidation.productDescription,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productType: Joi.string().min(productType.min).max(productType.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const makeProductDescriptionSEOFriendly = (subscription) => {
  const { task, productName, productType, productFeatures, productBenefits, targetAudience, numberOfSuggestions } =
    getLimits(productValidation.makeProductDescriptionSEOFriendly, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productName: Joi.string().min(productName.min).max(productName.max).required(),
      productType: Joi.string().min(productType.min).max(productType.max).required(),
      productFeatures: Joi.string().min(productFeatures.min).max(productFeatures.max).required(),
      productBenefits: Joi.string().min(productBenefits.min).max(productBenefits.max).required(),
      targetAudience: Joi.string().min(targetAudience.min).max(targetAudience.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const productReview = (subscription) => {
  const { task, product, rating, comment, numberOfSuggestions } = getLimits(
    productValidation.productReview,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      product: Joi.string().min(product.min).max(product.max).required(),
      rating: Joi.string()
        .required()
        .valid(...rating),
      comment: Joi.string().min(comment.min).max(comment.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

const productName = (subscription) => {
  const { task, productDescription, keywords, numberOfSuggestions } = getLimits(
    productValidation.productName,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      productDescription: Joi.string().min(productDescription.min).max(productDescription.max).required(),
      keywords: Joi.string().min(keywords.min).max(keywords.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  productDescription,
  makeProductDescriptionSEOFriendly,
  productReview,
  productName,
};
