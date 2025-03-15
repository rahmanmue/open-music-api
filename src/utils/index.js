const mapDBAlbumToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDBAlbumSongToModel = (rows) => {
  const songs = rows.map(({ song_id, title, performer }) => ({
    id: song_id,
    title,
    performer,
  }));

  return {
    id: rows[0].id,
    name: rows[0].name,
    year: rows[0].year,
    songs: songs[0].id !== null ? songs : [],
  };
};

const mapDBSongToModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const mapDBSongsToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
}) => ({ id, title, year, performer, genre, duration, albumId });

module.exports = {
  mapDBAlbumToModel,
  mapDBAlbumSongToModel,
  mapDBSongToModel,
  mapDBSongsToModel,
};
