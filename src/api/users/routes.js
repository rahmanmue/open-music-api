const routes = (handler) => [
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => handler.getUsersByUsernameHandler(request, h),
  },

  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
];

module.exports = routes;
