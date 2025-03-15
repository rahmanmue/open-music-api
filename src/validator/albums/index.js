const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayloadSchema, AlbumParamsSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateAlbumParams: (params) => {
    const validationResult = AlbumParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
