(function () {
    'use strict';

    angular.module('app.techservice').controller('techservices', techservices);

    techservices.$inject = ['$state', '$timeout', 'techdataservice'];

    function techservices($state, $timeout, techdataservice) {

        var vm = this;

        activate();

        function activate() {
            getTech();
        }

        vm.getRequest = function getRequest(lRno){
            //if(mvIdentity.currentUser) {
            var LrId = lRno;
            $state.go('techdetails', {id:LrId});
            //}
        };

        vm.elaspedTime = function(start, lead){

            return new Date(date.getTime() + minutes*60000);
        };

        vm.elaspedTime = function(date, units, interval ) {
            var ret = new Date(date); //don't change original date
            switch(interval.toLowerCase()) {
                case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
                case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
                case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
                case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
                case 'day'    :  ret.setDate(ret.getDate() + units);  break;
                case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
                case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
                case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
                default       :  ret = undefined;  break;
            }
            return ret;
        };



        function getTech() {
            return techdataservice.getTechServices()
                .$promise.then(function (data) {
                    vm.techservices = data;
                });

        }
    }

})();