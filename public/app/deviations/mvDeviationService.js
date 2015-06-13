(function () {
    'use strict';

    var serviceId = 'mvDeviationService';
    angular.module('app').factory(serviceId, ['$resource', mvDeviationService]);

    function mvDeviationService($resource) {

        var devList = $resource("/api/deviationlist/:status", {status: '@status'}, {isArray:true} );

        var deviations = $resource("/api/deviations/:Id", {Id: '@id'},
            {'update': {method: 'PUT', params: {Id: '@id'}}, isArray:true});


        var service = {
            getDeviation: getDeviation,
            getDeviations: getDeviations,
            saveDeviation: saveDeviation,
            saveNewDeviation: saveNewDeviation
            //requestCount: requestCount

        };

        return service;

        function getDeviation(DevId){
            var dev = deviations.get({Id: DevId});
            return dev;
        }


        function getDeviations(status) {

            return devList.query({status: status});
        }

        function saveDeviation(deviation, DevId) {

            return deviations.update({Id:DevId},deviation);

        }


        function saveNewDeviation(deviation) {

            return deviations.save(deviation);
        }


    }

})();
