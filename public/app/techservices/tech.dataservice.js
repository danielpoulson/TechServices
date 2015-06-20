(function () {
    'use strict';

    angular
        .module('app.techservice')
        .factory('techdataservice', techdataservice);

    techdataservice.$inject = ['$resource', '$q'];

    function techdataservice($resource, $q) {

        var techServices = $resource("/api/techServices/:Id", { Id: '@id' },
            { 'update': { method: 'PUT', params: { Id: '@id'}} });


        var service = {
            getLabRequest: getLabRequest,
            getTechServices: getTechServices,
            saveNewRequest: saveNewRequest,
            saveRequest: saveRequest,
            requestCount: requestCount

        };

        return service;

        function getLabRequest(lrId){
            var request = techServices.get({ Id: lrId });

            return request;
        }


        function getTechServices() {
            var allServices = techServices.query();

            return allServices;
        }

        function saveRequest(request, lrId) {

            techServices.get({ Id: lrId });
            return techServices.update({Id: lrId}, request);
        }

        function saveNewRequest(newRequest) {

            return techServices.save(newRequest);
        }

        function requestCount(year) {

            return techServices.get(year);
        }


    }

})();
