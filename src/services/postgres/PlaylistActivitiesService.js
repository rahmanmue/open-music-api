const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBPlaylistActivitiesToModel } = require('../../utils');

class PlaylistActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistActivities(playlistId, userId) {
    const query = {
      text: `SELECT playlist_song_activities.id, playlist_song_activities.playlist_id AS "playlistId",
      playlist_song_activities.song_id, playlist_song_activities.user_id, playlist_song_activities.action,
      playlist_song_activities.time, users.username, songs.title
      FROM playlist_song_activities 
            JOIN songs ON songs.id = playlist_song_activities.song_id
            JOIN users ON users.id = playlist_song_activities.user_id 
            WHERE playlist_song_activities.user_id = $1 AND playlist_song_activities.playlist_id = $2`,
      values: [userId, playlistId],
    };

    const result = await this._pool.query(query);

    return mapDBPlaylistActivitiesToModel(result.rows);
  }

  async addPlaylistActivity(playlistId, songId, userId, action) {
    const id = `playlist-activities-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const results = await this._pool.query(query);

    if (!results.rows[0].id) {
      throw new InvariantError('Playlist Song Activity gagal ditambahkan');
    }

    return results.rows[0].id;
  }
}

module.exports = PlaylistActivitiesService;
