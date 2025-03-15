class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId: songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    this._validator.validateSongQuery(request.query);
    const songs = await this._service.getSongs(request.query);
    const response = h.response({
      status: 'success',
      data: {
        songs: songs,
      },
    });
    response.code(200);
    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    const response = h.response({
      status: 'success',
      data: {
        song: song,
      },
    });
    response.code(200);
    return response;
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongParams(request.params);
    this._validator.validateSongPayload(request.payload);
    await this._service.editSongById(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = SongsHandler;
