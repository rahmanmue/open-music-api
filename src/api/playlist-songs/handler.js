class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async getPlaylistSongHandler(request) {
    this._validator.validatePlaylistParams(request.params);

    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._playlistsService.verifyPlaylistSongAccess(
      playlistId,
      credentialId,
    );

    const playlist = await this._playlistSongsService.getPlaylistSongs(
      playlistId,
      credentialId,
    );
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async getPlaylistActivityHandler(request) {
    this._validator.validatePlaylistParams(request.params);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._playlistsService.verifyPlaylistSongAccess(
      playlistId,
      credentialId,
    );

    const activities = await this._playlistSongsService.getPlaylistActivities(
      playlistId,
      credentialId,
    );

    return {
      status: 'success',
      data: activities,
    };
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    this._validator.validatePlaylistParams(request.params);
    const { id: credentialId } = request.auth.credentials;

    const { songId } = request.payload;
    const { id: playlistId } = request.params;

    await this._playlistsService.verifyPlaylistSongAccess(
      playlistId,
      credentialId,
    );

    await this._playlistSongsService.addPlaylistSong(
      playlistId,
      songId,
      credentialId,
    );

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async deletePlaylistSongHandler(request, h) {
    this._validator.validatePlaylistParams(request.params);
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistSongAccess(
      playlistId,
      credentialId,
    );

    await this._playlistSongsService.deletePlaylistSong(
      playlistId,
      songId,
      credentialId,
    );

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongsHandler;
