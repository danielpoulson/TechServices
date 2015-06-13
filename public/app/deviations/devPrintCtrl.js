(function () {
    'use strict';

    angular.module('app').controller('DevPrintCtrl', DevPrintCtrl);

    DevPrintCtrl.$inject =
        ['$stateParams', 'mvDeviationService', 'mvTask'];

    function DevPrintCtrl($stateParams, mvDeviationService, mvTask) {
        var vm = this;

        vm.ctr = 0;

        activate();

        function activate() {

            getDevDetails();
            getDevTasks();

        }

        function getDevDetails() {
            var val = $stateParams.id;
            return mvDeviationService.getDeviation(val)
                .$promise.then(function (data) {
                    vm.deviation = data;
                });

        }

        function getDevTasks() {
            var val = $stateParams.id;

            return mvTask.getDeviationTasks(val)
                    .$promise.then(function (data) {
                        vm.tasks = data;

                    });

        }

}


})();

