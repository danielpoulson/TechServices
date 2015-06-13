'use strict'
angular.module('app').directive('changeStatus', function(){
    return {
        restrict: 'A',
        replace: true,
        template: '<img/>',
        scope: {
            status: "="
        },

        // "<img src='/app/css/img/" + dpStatus + ".png'/>"
        link: function(scope, element, attrs){

            var status = scope.status;
            var statusTxt = {};

            switch (status) {
            case 1:
                statusTxt = "info-icon";
                 break;
            case 2:
                statusTxt = "ok-icon";
                 break;
            case 3:
                statusTxt = "alert-icon";
                 break;
            case 4:
                 statusTxt = "cancel-icon";
                  break;
	    
	    case 5:
                 statusTxt = "finish-flag";
                  break;
            }

           var dpSrc = "../../css/img/"+statusTxt+".png";
//            var dpSrc = "/app/css/img/red_circle.png"


            attrs.$observe('status', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    attrs.$set('src', dpSrc);
                }
            });

        }
    };
});