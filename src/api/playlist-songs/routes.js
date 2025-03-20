const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.getPlaylistSongHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: (request, h) => handler.getPlaylistActivityHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.postPlaylistSongHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.deletePlaylistSongHandler(request, h),
    options: {
      auth: 'musicapp_jwt',
    },
  },
];

module.exports = routes;
