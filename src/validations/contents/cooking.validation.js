const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { cookingValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const recipe = (subscription) => {
  const { task, recipeName, ingredients } = getLimits(cookingValidation.recipe, inputLimit[subscription]);
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      recipeName: Joi.string().min(recipeName.min).max(recipeName.max).required(),
      ingredients: Joi.string().min(ingredients.min).max(ingredients.max).required(),
    }),
  };
};

module.exports = {
  recipe,
};
