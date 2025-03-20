exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    // eslint-disable-next-line camelcase
    playlist_id: {
      type: 'varchar(50)',
      references: '"playlists"',
      onDelete: 'CASCADE',
    },
    // eslint-disable-next-line camelcase
    song_id: {
      type: 'varchar(50)',
      notNull: true,
    },
    // eslint-disable-next-line camelcase
    user_id: {
      type: 'varchar(50)',
      notNull: true,
    },
    action: {
      type: 'varchar(10)',
      notNull: true,
    },
    time: {
      type: 'timestamp',
      notNull: true,
    },
  });
  pgm.createIndex('playlist_song_activities', 'playlist_id');
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_song_activities');
};
