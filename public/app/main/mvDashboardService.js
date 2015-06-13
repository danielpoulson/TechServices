(function() {

    angular
        .module('app')
        .factory('mvDashboardService', mvDashboardService);

    mvDashboardService.$inject = ['$resource'];

    function mvDashboardService($resource) {

        var resClass = $resource("/api/dashboard/class", {isArray : true});
        var resDash = $resource("/api/dashboard/summary", {isArray : false});

        return {
            getDevClass: getDevClass,
            getDashArray: getDashArray
        };

        function getDevClass() {
            return resClass.query();
        }
        
        function getDashArray(){
            return resDash.get();
        }
    }

})();
/**
 * Created by danielp on 14/03/15.
 */
