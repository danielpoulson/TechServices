(function () {
    'use strict';

    angular
        .module('app')
        .directive('dvDatePicker', dvDatePicker);

    dvDatePicker.$inject = ['$http'];
    /* @ngInject */
    function dvDatePicker($http) {
        return {
            restrict: 'E',
            templateUrl: '/app/common/dvDatePicker.html',
            controller: 'mvDateCtrl',
            scope: {
                dpDate: '='
            }
        };
    }
})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('mvDateCtrl', mvDateCtrl);

    mvDateCtrl.$inject = ['$scope'];
    /* @ngInject */
    function mvDateCtrl($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['d/MM/yy', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'dd/MM/yyyy';
    }
})();