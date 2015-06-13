(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserServ', UserServ);

    UserServ.$inject = ['$resource'];
    /* @ngInject */
    function UserServ($resource) {
        
        var UserResource = $resource('/api/users/:id', {_id: "@id"}, 
             {update: {method: 'PUT', isArray: false}});

        UserResource.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    }
})();