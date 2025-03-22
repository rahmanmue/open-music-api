const InvariantError = require('../../exceptions/InvariantError');

class UploadsHandler {
  constructor(albumsService, service, validator) {
    this._albumsService = albumsService;
    this._service = service;
    this._validator = validator;
  }

  async postUploadAlbumImageHandler(request, h) {
    const { id: albumId } = request.params;
    const { cover } = request.payload;
    if (!cover) {
      throw new InvariantError('Cover tidak boleh kosong');
    }

    this._validator.validateAlbumParams(request.params);
    this._validator.validateImageHeaders(cover.hapi.headers);

    const rows = await this._albumsService.checkCoverAlbum(albumId);

    if (rows.length) {
      const { cover } = rows[0];
      await this._service.deleteBucketFile(cover);
    }

    const coverUrl = await this._service.writeFile(cover, cover.hapi);
    await this._albumsService.updateAlbumCover(albumId, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
