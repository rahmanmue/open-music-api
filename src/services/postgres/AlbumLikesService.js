const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumLikesService {
  constructor(albumsService, cacheService) {
    this._cacheService = cacheService;
    this._albumsService = albumsService;
    this._pool = new Pool();
  }

  async getAlbumLikes(albumId) {
    try {
      const customHeader = 'cache';
      const likes = await this._cacheService.get(`likes:${albumId}`);
      return { customHeader, likes: Number(likes) };

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1 GROUP BY id',
        values: [albumId],
      };
      const result = await this._pool.query(query);

      // simpan cache
      await this._cacheService.set(
        `likes:${albumId}`,
        JSON.stringify(result.rowCount),
      );

      const likes = result.rowCount;
      const customHeader = '';

      return { customHeader, likes: likes };
    }
  }

  async addLike(userId, albumId) {
    await this._albumsService.checkAlbums(albumId);

    await this.checkLikes(userId, albumId);

    const id = `likes-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const results = await this._pool.query(query);

    if (!results.rows[0].id) {
      throw new InvariantError('Album gagal disukai');
    }

    await this._cacheService.delete(`likes:${albumId}`);
  }

  async deleteAlbumLike(userId, albumId) {
    await this._albumsService.checkAlbums(albumId);

    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id= $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus');
    }

    await this._cacheService.delete(`likes:${albumId}`);
  }

  async checkLikes(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2 ',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Album sudah dilike');
    }
  }
}

module.exports = AlbumLikesService;
