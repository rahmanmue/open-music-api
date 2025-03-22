const {
  ExportPlaylistsPayloadSchema,
  PlaylistParamsSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportsValidator = {
  validateExportPlaylistsPayload: (payload) => {
    const validationResult = ExportPlaylistsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePlaylistParams: (params) => {
    const validationResult = PlaylistParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
