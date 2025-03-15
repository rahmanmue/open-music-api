const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

const SongQuerySchema = Joi.object({
  title: Joi.string().empty(''),
  performer: Joi.string().empty(''),
});

const SongParamsSchema = Joi.object({
  id: Joi.string(),
});

module.exports = {
  SongPayloadSchema,
  SongQuerySchema,
  SongParamsSchema,
};
