const mapDBAlbumToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDBAlbumSongToModel = (rows) => {
  const { id, name, year } = rows[0];

  const songs = rows
    .filter(({ title }) => title !== null)
    .map(({ songId, title, performer }) => ({
      id: songId,
      title,
      performer,
    }));

  return { id, name, year, songs };
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
