const Joi = require('joi');

const paraphrase = {
  body: Joi.object().keys({
    task: Joi.valid('paraphrasing').required(),
    userText:  Joi.alternatives().conditional(Joi.ref('$isPaidSubscribers'), {
      is: false,
      then: Joi.string().min(5).max(100).required(),
      otherwise: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
        is: true,
        then: Joi.string().min(5).max(400).required(),
        otherwise: Joi.string().min(5).max(600).required(),
      }),
    }),
  }),
};

const grammarFixer = {
  body: Joi.object().keys({
    task: Joi.valid('grammar-fixer').required(),
    userText:  Joi.alternatives().conditional(Joi.ref('$isPaidSubscribers'), {
      is: false,
      then: Joi.string().min(5).max(100).required(),
      otherwise: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
        is: true,
        then: Joi.string().min(5).max(400).required(),
        otherwise: Joi.string().min(5).max(600).required(),
      }),
    }),
  }),
};

const simplifier = {
  body: Joi.object().keys({
    task: Joi.valid('simplifier').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
  }),
};

const summarizer = {
  body: Joi.object().keys({
    task: Joi.valid('summarizer').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
  }),
};

const changeTone = {
  body: Joi.object().keys({
    task: Joi.valid('change-tone').required(),
    userText: Joi.alternatives().conditional(Joi.ref('$inputLimit'), {
      is: true,
      then: Joi.string().min(5).max(400).required(),
      otherwise: Joi.string().min(5).max(600).required(),
    }),
    tone: Joi.string()
      .required()
      .valid(
        'Formal',
        'Friendly',
        'Neutral',
        'Confident',
        'Curious',
        'Surprised',
        'Happy',
        'Angry',
        'Sad',
        'Concerned',
        'Encouraging',
        'Regretful',
        'Optimistic',
        'Excited',
        'Witty',
        'Persuasive',
        'Empathetic'
      ),
  }),
};

module.exports = {
  paraphrase,
  grammarFixer,
  simplifier,
  summarizer,
  changeTone,
};
