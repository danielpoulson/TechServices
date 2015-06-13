(function () {
    'use strict';

    angular.module('app').controller('NavBarLoginCtrl', NavBarLoginCtrl);

    NavBarLoginCtrl.$inject = ['$modal','mvNotifier', 'AuthService', '$location', 'IdService', 'UserServ'];
    /* @ngInject */
    function NavBarLoginCtrl($modal, mvNotifier, AuthService, $location, IdService, UserServ) {
        var vm = this;

        activate = activate;
        vm.identity = IdService;
        vm.openPass = openPass;
        vm.isAdmin = false;

        activate();

        function activate(){
            //if(IdService.currentUser.roles == 'admin'){
            //    vm.isAdmin = true;
            //}
        }

        vm.signin = function(username, password) {
            AuthService.authenticateUser(username, password).then(function(success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in!');
                } else {
                    mvNotifier.notify('Username/Password combination incorrect');
                }
            });
        };

        vm.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.status.isopen = !vm.status.isopen;
        };


        vm.signout = function() {
        AuthService.logoutUser().then(function() {
            vm.username = "";
            vm.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });

         };

        //This open function is used for the ui.bootstrap.modal
        function openPass (t) {
            //vm.items = [];
            //
            //if (t != 'new'){
            //    vm.items.push(t._id);
            //    vm.items.push(t.DevId);
            //} else {
            //    vm.items.push(t);
            //    vm.items.push($stateParams.id);
            //}

            var modalInstance = $modal.open({
                templateUrl: '/app/account/changePass.html',
                controller: 'ChangePassServ as vm',
                size: ""
                //,
                //resolve: {
                //    items: function () {
                //        return vm.items;
                //    }
                //}
            });

            modalInstance.result.then(function (selectedItem) {
                //vm.selected = selectedItem;

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
                //getDevTasks();
            });
        }
    }

})();
