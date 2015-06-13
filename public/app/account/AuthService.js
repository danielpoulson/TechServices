(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', 'IdService', '$q', 'UserServ'];
    /* @ngInject */
    function AuthService($http, IdService, $q, UserServ) {

        var service = {
            authenticateUser: authenticateUser,
            createUser: createUser,

            // TODO: Need to work out what is going on with this block and why it does not seem to correctly save a password.
            updateCurrentUser: updateCurrentUser,

            logoutUser: logoutUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
            authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute
        };

        return service;

        function authenticateUser(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {
                username: username,
                password: password
            }).then(function (response) {
                if (response.data.success) {
                    var user = new UserServ();
                    angular.extend(user, response.data.user);
                    IdService.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }

        function createUser(newUserData) {
            var newUser = new UserServ(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }

        function updateCurrentUser(newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(IdService.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function () {
                IdService.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        }

        function logoutUser() {
            var dfd = $q.defer();
            $http.post('/logout', {
                logout: true
            }).then(function () {
                IdService.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if (IdService.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }

        }

        function authorizeAuthenticatedUserForRoute() {
            if (IdService.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

    }
})();