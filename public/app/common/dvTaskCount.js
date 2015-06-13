(function() {
    "use strict";
    var serviceId = 'getTaskCount';
    angular.module('app').factory(serviceId, ['$http', '$q', getTaskCount]);

    function getRecordCount($http, $q) {


        function getTaskCount(taskId){
            var deferred = $q.defer();
            var urlBase = '/api/taskcount/:' + taskId;


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

            getTaskCount : getTaskCount
        };

    }



})();
