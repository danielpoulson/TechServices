(function () {
    'use strict';

    angular
        .module('app')
        .factory('IdService', IdService);

    IdService.$inject = ['$window', 'UserServ'];
    /* @ngInject */
    function IdService($window, UserServ) {

        var currentUser; //Production Setting 
        //var currentUser = "Devlopement";

        if (!!$window.bootstrappedUserObject) {
            currentUser = new UserServ();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }

        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        return service;

        function isAuthenticated() {
            /*jshint validthis:true */
            return !!this.currentUser;
        }

        function isAuthorized(role) {
            /*jshint validthis:true */
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }


    }
})();

