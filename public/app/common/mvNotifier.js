angular.module('app').value('mvToastr', toastr);

(function () {
    'use strict';

    angular
        .module('app')
        .factory('mvNotifier', mvNotifier);

    mvNotifier.$inject = ['mvToastr'];
    /* @ngInject */
    function mvNotifier(mvToastr) {
        return {
            notify: function (msg) {
                //toastr.success('Hello World', 'New Message', { timeOut: 9500 });
                mvToastr.success(msg, {
                    timeOut: 1000
                });
                console.log(msg);
            },
            error: function (msg) {
                mvToastr.error(msg, {
                    positionClass: "toast-bottom-right"
                });
                console.log(msg);
            }
        };
    }
})();