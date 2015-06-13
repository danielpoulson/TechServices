(function () {
    'use strict';

    angular.module('app').controller('dvDevList', dvDevList);

    dvDevList.$inject =
        ['$location', '$timeout', 'mvIdentity', 'mvDeviationService'];

    function dvDevList($location, $timeout, mvIdentity, mvDeviationService) {
        var vm = this;

        vm.getDev = getDev();
        vm.getDeviation = getDeviation;
        vm.totalItems = 10;
        vm.currentPage = 1;
        vm.numPerPage = 20;
        vm.loadAll = loadAll;
        vm.loadActive = loadActive;

        activate();

        function activate() {
            getDev(1);
        }

        function getDev(status) {
            return mvDeviationService.getDeviations(status)
                .$promise.then(function (data) {
                    vm.data = data;
                    setPagPage();
                });

        }

        function getDeviation (DevId) {

            if(mvIdentity.currentUser)
                $location.path('/deviation/' + DevId);
        }

        function setPagPage() {

            $timeout(function () {
                //wait for 'filtered' to be changed
                vm.totalItems = vm.filtered.length;
            }, 10);

        }


        function loadAll(){
            getDev(2)
        }

        function loadActive(){
            getDev(1)
        }
    }

})();
