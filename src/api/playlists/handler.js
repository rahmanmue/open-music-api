class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async getPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { name } = request.payload;

    const playlistId = await this._service.addPlaylist(name, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async deletePlaylistHandler(request, h) {
    this._validator.validatePlaylistParams(request.params);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    await this._service.deletePlaylist(playlistId, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistsHandler;
