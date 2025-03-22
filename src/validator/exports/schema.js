const Joi = require('joi');

const ExportPlaylistsPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

const PlaylistParamsSchema = Joi.object({
  playlistId: Joi.string(),
});

module.exports = { ExportPlaylistsPayloadSchema, PlaylistParamsSchema };
