class ExportsHandler {
  constructor(playlistsService, service, validator) {
    this._playlistsService = playlistsService;
    this._service = service;
    this._validator = validator;
  }

  async postExportPlaylistHandler(request, h) {
    this._validator.validatePlaylistParams(request.params);
    this._validator.validateExportPlaylistsPayload(request.payload);

    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistSongAccess(
      playlistId,
      credentialId,
    );

    const message = {
      userId: credentialId,
      playlistId: playlistId,
      targetEmail: request.payload.targetEmail,
    };

    // console.log(message);

    await this._service.sendMessage(
      'export:playlists',
      JSON.stringify(message),
    );

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
