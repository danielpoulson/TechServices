(function() {
    'use strict';

    angular
        .module('app')
        .directive('changeExt', changeExt);

    /* @ngInject */
    function changeExt () {
        //Usage:

        var directive = {
            restrict: 'A',
            replace: true,
            template: '<img/>',
            scope: {
                ext: "="
            },

            link: function(scope, element, attrs){

                var extTxt = scope.ext;
                var dpSrc = "../../images/"+extTxt+".png";


                attrs.$observe('ext', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        attrs.$set('src', dpSrc);
                    }
                });

            }

        };
        return directive;
    }
})();