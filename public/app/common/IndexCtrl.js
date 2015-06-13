(function () {
    'use strict';

    angular.module('app').controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = [];

    function IndexCtrl() {
        var vm = this;

        vm.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.status.isopen = !vm.status.isopen;
        };
    }
})();

