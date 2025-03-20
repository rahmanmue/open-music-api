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

const mapDBUsersToModel = ({ id, username, password, fullname }) => ({
  id,
  username,
  password,
  fullname,
});

const mapDBPlaylistsToModel = ({ playlistId, name, username }) => ({
  id: playlistId,
  name,
  username,
});

const mapDBPlaylistSongsToModel = (rows) => {
  const { id, name, username } = rows[0];

  const songs = rows
    .filter(({ title }) => title !== null)
    // eslint-disable-next-line camelcase
    .map(({ song_id, title, performer }) => ({
      // eslint-disable-next-line camelcase
      id: song_id,
      title,
      performer,
    }));

  return { id, name, username, songs };
};

const mapDBPlaylistActivitiesToModel = (rows) => {
  console.log(rows);
  const { playlistId } = rows[0];
  const activities = rows.map(({ username, title, action, time }) => ({
    username,
    title,
    action,
    time,
  }));

  return { playlistId, activities };
};

module.exports = {
  mapDBAlbumToModel,
  mapDBAlbumSongToModel,
  mapDBSongToModel,
  mapDBSongsToModel,
  mapDBUsersToModel,
  mapDBPlaylistsToModel,
  mapDBPlaylistSongsToModel,
  mapDBPlaylistActivitiesToModel,
};
