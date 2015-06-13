(function() {
    'use strict';

    angular
        .module('app')
        .directive('dvListSearch', dvListSearch);

    dvListSearch.$inject = [];

    function dvListSearch () {

        var directive = {
            restrict: 'E',
            templateUrl:"/app/deviations/dvListSearchView.html",
            scope: {
                query: "=",
                page: "&",
                dvplace: "@"

            }
        };
        return directive;

    }
})();