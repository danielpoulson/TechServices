(function () {
    'use strict';

    angular.module('app').controller('ChangePassServ', ChangePassServ);

    ChangePassServ.$inject = ['$modalInstance','IdService', 'UserDataService', 'mvNotifier'];
    /* @ngInject */
    function ChangePassServ($modalInstance, IdService, UserDataService, mvNotifier) {
        /*jshint validthis:true */
        var vm = this;

        vm.commit = commit;
        vm.identity = IdService;
        vm.password = IdService.currentUser.password;

        activate();

        function activate() {
//            console.log(IdService.currentUser);
        }

        function commit(){
            var newUserData = {
                username: IdService.currentUser.username,
                firstName: IdService.currentUser.firstName,
                lastName: IdService.currentUser.lastName,
                roles: IdService.currentUser.roles
            };

            if(vm.password && vm.password.length > 0) {
               newUserData.password = vm.password;
            }

            $modalInstance.dismiss('cancel');

            return UserDataService.saveUser(newUserData, newUserData.username)
                .$promise.then(success, failed);
        }

        function success() {
            mvNotifier.notify('Account has been updated');
        }

        function failed(reason) {
            mvNotifier.error("Oops looks like something has gone wrong please contact your administrator - " + reason);
        }
    }

})();

