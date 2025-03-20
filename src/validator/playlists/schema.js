const Joi = require('joi');

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const PlaylistParamsSchema = Joi.object({
  id: Joi.string(),
});

module.exports = {
  PlaylistPayloadSchema,
  PlaylistSongPayloadSchema,
  PlaylistParamsSchema,
};
