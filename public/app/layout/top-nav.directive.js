(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('topNav', topNav);

    /* @ngInject */
    function topNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'tagline': '=',
                'title': '='
            },
            templateUrl: 'app/layout/top-nav.html'
        };

        /* @ngInject */
        function TopNavController() {
            var vm = this;
            
            vm.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.status.isopen = !vm.status.isopen;
            };
        }

        return directive;
    }
})();