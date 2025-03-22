const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBPlaylistSongsToModel } = require('../../utils');

class PlaylistSongsService {
  constructor(songsService, playlistsService, playlistActivitiesService) {
    this._pool = new Pool();
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._playlistActivitiesService = playlistActivitiesService;
  }

  async getPlaylistActivities(playlistId, userId) {
    await this._playlistsService.verifyPlaylist(playlistId);
    const results = await this._playlistActivitiesService.getPlaylistActivities(
      playlistId,
      userId,
    );
    return results;
  }

  async getPlaylistSongs(playlistId, owner) {
    await this._playlistsService.verifyPlaylist(playlistId);
    const query = {
      text: `SELECT playlists.id AS "playlistId", playlists.name,
      users.id, users.username, songs.id AS "songId", songs.title, songs.performer
      FROM playlists 
            RIGHT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id 
            LEFT JOIN songs ON playlist_songs.song_id = songs.id 
            LEFT JOIN users ON users.id = playlists.owner 
            LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
            WHERE playlists.id = $1 AND playlists.owner = $2 OR 
            collaborations.playlist_id = $1 AND collaborations.user_id = $2`,
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);

    return mapDBPlaylistSongsToModel(result.rows);
  }

  async addPlaylistSong(playlistId, songId, userId) {
    await this._songsService.verifySong(songId);
    const id = `playlist-song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const results = await this._pool.query(query);

    if (!results.rows[0].id) {
      throw new InvariantError('Playlist Song gagal ditambahkan');
    }

    await this._playlistActivitiesService.addPlaylistActivity(
      playlistId,
      songId,
      userId,
      'add',
    );

    return results.rows[0].id;
  }

  async deletePlaylistSong(playlistId, songId, userId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Playlist Song gagal dihapus. Id tidak ditemukan',
      );
    }

    await this._playlistActivitiesService.addPlaylistActivity(
      playlistId,
      songId,
      userId,
      'delete',
    );
  }
}

module.exports = PlaylistSongsService;
