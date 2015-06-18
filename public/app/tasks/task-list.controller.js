(function () {
    'use strict';

    angular.module('app.task').controller('tasklist', tasklist);

    tasklist.$inject = ['$location', '$modal', '$stateParams', '$timeout', 'IdService', 'taskdataservice'];

    function tasklist($location, $modal, $stateParams, $timeout, IdService, taskdataservice) {
        var vm = this;

        vm.activate = activate;
        vm.activeonly = true;
        vm.currentPage = 1;
        vm.capaonly = null;

        vm.getTask = getTask;
        vm.items = [];
        vm.loadAll = loadAll;
        vm.newTask = newTask;
        vm.numPerPage = 20;
        vm.open = open;
        vm.openTask = openTask;
        vm.projectName = {};
        vm.tasks = [];
        vm.totalItems = {};
        vm.setPagPage = setPagPage;

        var dpStatus = 5;
        var dvCapa = 0;


        activate();

        function activate() {
              getProjectTasks();
        }

        function getTask (task) {
            var taskId = task._id;
            var id = task.ProjectId;
            $location.path('/taskEdit/' + taskId + '/' + id );
        }

        function newTask () {
            var taskId = "new";
            var id = $stateParams.id;
            $location.path('/taskEdit/' + taskId + '/' + id);
        }

        function getProjectTasks() {
            //if(IdService.currentUser) {
                var val = $stateParams.id;

                if(val == 'search'){
                    return taskdataservice.getTasks(dpStatus, dvCapa)
                        .$promise.then(function(data){
                            vm.tasks = data;
                            vm.projectName = 'Search';
                            vm.dpShowButton = false;
                            setPagPage();
                        });
                } else {

                    return taskdataservice.getProjectTasks(val)
                        .$promise.then(function (data) {
                            vm.tasks = data;
                            vm.dpShowButton = true;

                            //mvProjectName.name(val).$promise.then(function (data) {
                            //    vm.projectName = data.Title + ' ' + '(' + data.ProjNo + ')';
                            //    setPagPage();
                            //});
                        });
                }
            //}

        }

        function loadAll(){

            if (vm.activeonly === false) {

                dpStatus = 6;

            } else {

                dpStatus = 5;
            }

            dvCapa = +vm.capaonly;
            console.log(dvCapa);

            getProjectTasks();

        }

        function openTask(t){
            var currentUser = IdService.currentUser;
            if(currentUser){
                var lUser = currentUser.firstName + " " + currentUser.lastName;
                open(t, lUser);
            }
        }
        //This open function is used for the ui.bootstrap.modal
        function open (t, currentUser) {

            vm.items = [];

            if (t != 'new'){
                vm.items.push(t._id);
                vm.items.push(t.DevId);
            } else {
                vm.items.push(t);
                vm.items.push($stateParams.id);
                vm.items.push(currentUser);
            }

            var modalInstance = $modal.open({
                templateUrl: '/app/tasks/task-detail.html',
                controller: 'taskDetail as vm',
                size: "lg",
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //vm.selected = selectedItem;

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
                getProjectTasks();
            });
        }

//Pagination function

        function setPagPage() {

            $timeout(function () {
                //wait for 'filtered' to be changed
                /* change pagination with vm.filtered */
                // vm.noOfPages = Math.ceil(vm.filtered.length/vm.numPerPage);
                vm.totalItems = vm.filtered.length;
            }, 10);

        }
    }
})();
