(function() {
    "use strict";
    var serviceId = 'getItemCount';
    angular.module('app').factory(serviceId, ['$http', '$q', getItemCount]);

    function getItemCount($http, $q) {


        function getCount(prefix){
            var deferred = $q.defer();
            var urlBase = '';

            if (prefix == "LR")  {
                urlBase = '/api/techItem';
            } else {
                urlBase = '/api/devItem';
            }

            $http.get(urlBase).
                success(function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }).
                error(function (reason) {
                    deferred.reject(reason);
                    console.log(reason);
                });



            return deferred.promise;

        }


        return  {

            getCount : getCount
        };

    }



})();
