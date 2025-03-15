const InvariantError = require('../../exceptions/InvariantError');
const {
  SongPayloadSchema,
  SongQuerySchema,
  SongParamsSchema,
} = require('./schema');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateSongParams: (params) => {
    const validationResult = SongParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateSongQuery: (query) => {
    const validationResult = SongQuerySchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
    return validationResult;
  },
};

module.exports = SongsValidator;
