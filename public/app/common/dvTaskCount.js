(function() {
    "use strict";
    var serviceId = 'dvTaskCount';
    angular.module('app').factory(serviceId, ['$http', '$q', dvTaskCount]);

    function dvTaskCount($http, $q) {


        function getTaskCount(taskId){
            var deferred = $q.defer();
            var urlBase = '/api/taskcount/' + taskId;


            $http.get(urlBase).
                success(function (data) {
                    deferred.resolve(data);

                }).
                error(function (reason) {
                    deferred.reject(reason);

                });



            return deferred.promise;

        }


        return  {

            getTaskCount : getTaskCount
        };

    }



})();
