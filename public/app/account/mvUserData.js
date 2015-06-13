angular.module('app').factory('mvUser', function($resource) {
  var UserResource = $resource('/api/users/admin/:id', {id: "@id"},
      { 'update': { method: 'PUT', params: { id: "@id"}}});

  var service = {
    saveUser: saveUser,
    deleteUser: deleteUser
  };

  return service;

  function saveUser(user, userId) {
    UserResource.get({ id: userId });
    return UserResource.update({ id: userId }, user);
  }

  function deleteUser (userId) {
    return UserResource.delete({ id: userId });
  }
});