exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(100)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    performer: {
      type: 'varchar(100)',
      notNull: true,
    },
    genre: {
      type: 'varchar(100)',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
    // eslint-disable-next-line camelcase
    album_id: {
      type: 'varchar(50)',
      references: '"albums"',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
    },
  });
  pgm.createIndex('songs', 'album_id');
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
