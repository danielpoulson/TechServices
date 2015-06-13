(function() {
    'use strict';

    angular
        .module('app')
        .directive('changeStatus', changeStatus);

    /* @ngInject */
    function changeStatus () {
        //Usage:

        var directive = {
            restrict: 'A',
            replace: true,
            template: '<img/>',
            scope: {
                status: "="
            },


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

               var dpSrc = "../../images/"+statusTxt+".png";


                attrs.$observe('status', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        attrs.$set('src', dpSrc);
                    }
                });

            }

        };
        return directive;
    }
})();