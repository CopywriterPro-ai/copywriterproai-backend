const Joi = require('joi');
const inputLimit = require('../../config/inputLimit');
const { cvValidation } = require('./validationData');
const getLimits = require('./helper.validation');

const CVSummary = (subscription) => {
  const { task, yourJobTitle, keyAchievements, yearsOfExperience, numberOfSuggestions } = getLimits(
    cvValidation.CVSummary,
    inputLimit[subscription]
  );
  return {
    body: Joi.object().keys({
      task: Joi.valid(task).required(),
      // yourJobTitle: Joi.string().min(yourJobTitle.min).max(yourJobTitle.max).required(),
      // keyAchievements: Joi.string().min(keyAchievements.min).max(keyAchievements.max).required(),
      yourJobTitle: Joi.string().max(yourJobTitle.max).required(),
      keyAchievements: Joi.string().max(keyAchievements.max).required(),
      yearsOfExperience: Joi.number().min(yearsOfExperience.min).max(yearsOfExperience.max).required(),
      numberOfSuggestions: Joi.number().min(numberOfSuggestions.min).max(numberOfSuggestions.max).required(),
    }),
  };
};

module.exports = {
  CVSummary,
};
