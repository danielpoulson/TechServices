angular.module('app').directive('myDatepicker', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/common/my-datepicker',
        controller: 'mvDateCtrl',
        scope: {
            dpDate: '='
        }
    };

});
