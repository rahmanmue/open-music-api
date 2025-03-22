class AlbumLikesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumLikeHandler(request, h) {
    this._validator.validateAlbumParams(request.params);
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;
    await this._service.addLike(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil disukai',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikeHandler(request, h) {
    this._validator.validateAlbumParams(request.params);
    const { id: albumId } = request.params;

    const { customHeader, likes } = await this._service.getAlbumLikes(albumId);
    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.header('X-Data-Source', customHeader);
    response.code(200);
    return response;
  }

  async deleteAlbumLikeHandler(request, h) {
    this._validator.validateAlbumParams(request.params);
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.deleteAlbumLike(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Album likes berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = AlbumLikesHandler;
