
(function () {
    'use strict';
    
    angular.module('app').filter('dvDayNumber', [function() {
        return function(ts, closed) {

            if (ts) {
                if(closed === 0){
                    var currentTime = new Date().getTime();
                    var logTime = new Date(ts[0].dvLogDate).getTime();
                    var timeDiff = Math.abs(currentTime - logTime);
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    return dayDiff;
                } else {
                    return "-";
                }
            }
        };
    }]);
})();
