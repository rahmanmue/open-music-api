const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBAlbumToModel, mapDBAlbumSongToModel } = require('../../utils');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows.map(mapDBAlbumToModel);
  }

  async getAlbumById(id) {
    //get with song
    const query = {
      text: 'SELECT albums.id, albums.name, albums.year, albums.cover, songs.id as songId, songs.title, songs.performer  FROM albums LEFT JOIN songs ON songs.album_id = albums.id WHERE albums.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return mapDBAlbumSongToModel(result.rows);
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const results = await this._pool.query(query);

    if (!results.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return results.rows[0].id;
  }

  async editAlbumById({ id }, { name, year }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }

  async checkCoverAlbum(albumId) {
    const query = {
      text: 'SELECT id, cover FROM albums WHERE id= $1 AND cover IS NOT NULL',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async updateAlbumCover(albumId, coverUrl) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET cover = $1, updated_at = $2 WHERE id= $3 RETURNING id',
      values: [coverUrl, updatedAt, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async checkAlbums(albumId) {
    const query = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
