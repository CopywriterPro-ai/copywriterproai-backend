const Joi = require('joi');
const { objectId } = require('./custom.validation');

const toolfields = Joi.object({
  name: Joi.string().required(),
  key: Joi.string().required(),
  tips: Joi.object()
    .keys({
      text: Joi.string().required(),
    })
    .optional(),
  type: Joi.string().required(),
  placeholder: Joi.string().optional(),
  validation: Joi.object().keys({
    required: Joi.boolean().default(true),
    max: Joi.number().optional(),
  }),
});

const toolCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    key: Joi.string().required(),
    description: Joi.string().optional(),
    icon: Joi.object().keys({
      code: Joi.string().required(),
      color: Joi.string().required(),
    }),
  }),
};

const tool = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    key: Joi.string().required(),
    videoId: Joi.string().optional(),
    fields: Joi.array().items(toolfields).min(1),
    category: Joi.string().custom(objectId),
  }),
};

module.exports = {
  toolCategory,
  tool,
};
