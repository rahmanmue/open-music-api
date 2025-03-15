const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const AlbumParamsSchema = Joi.object({
  id: Joi.string(),
});

module.exports = { AlbumPayloadSchema, AlbumParamsSchema };
