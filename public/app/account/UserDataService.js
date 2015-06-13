(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserDataService', UserDataService);

    UserDataService.$inject = ['$resource'];
    /* @ngInject */
    function UserDataService($resource) {

        var UserResource = $resource('/api/users/admin/:id', {
            id: "@id"
        }, {
            'update': {
                method: 'PUT',
                params: {
                    id: "@id"
                }
            }
        });

        var allUsers = $resource('/api/allusers', {
            isArray: true
        });

        var service = {

            getAllUsers: getAllUsers,
            saveUser: saveUser,
            deleteUser: deleteUser
        };

        return service;

        function getAllUsers() {
            return allUsers.query();
        }

        function saveUser(user, userId) {
            UserResource.get({
                id: userId
            });
            return UserResource.update({
                id: userId
            }, user);
        }

        function deleteUser(userId) {
            return UserResource.delete({
                id: userId
            });
        }



    }
})();