(function () {
    'use strict';

    angular.module('app.task').controller('taskDetail', taskDetail);

    taskDetail.$inject = ['$modalInstance', 'items', 'IdService', 'taskdataservice', 'UserDataService'];

    function taskDetail($modalInstance, items, IdService, taskdataservice, UserDataService) {
        var vm = this;

        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        vm.deleteTask = deleteTask;
        vm.dvUser = '';
        vm.projectId = {};
        vm.task = {};
        vm.taskId = {};
        vm.saveTask = saveTask;
        vm.submitted = false;

        vm.open = function ($event){
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;

            //console.log("here")
        };

        //vm.projectName = {};

        //TODO convert static select to dynamic
        vm.stats = [
            {"value": 1 , "text": "Task - Not Started (New)"},
            {"value": 2 , "text": 'Task - On Track'},
            {"value": 3 , "text": 'Task - In Concern'},
            {"value": 4 , "text": 'Task - Behind Schedule'},
            {"value": 5 , "text": 'Task - Completed'}
        ];


        activate();

        function activate() {
            vm.taskId = items[0];
            vm.dvNo = items[1];
            getTaskDetail();

        }


        function deleteTask() {

            return taskdataservice.deleteTask(vm.taskId)
                .$promise.then(function(){
                    $modalInstance.dismiss('cancel');
                });
        }


        function getTaskDetail() {

            if (vm.taskId != 'new') {
                return taskdataservice.getTask(vm.taskId)
                    .$promise.then(function(data){
                        vm.task = data;
                        }).then(function(){
                        return UserDataService.getAllUsers()
                            .$promise.then(function(users) {
                                vm.users = users;
                                var idx = users.indexOf(vm.task.TKChamp);
                                vm.dvUser = vm.users[idx];
                            });
                    });

            }
            else
            {
                vm.task.TKCapa = false;
                UserDataService.getAllUsers()
                    .$promise.then(function(users) {
                        vm.users = users;
                        vm.dvUser = items[2];
                    });



                //Setting the date on the date picker need to convert the date toJson
                var newDate = new Date(new Date().setDate(new Date().getDate() + 7));
                vm.task.TKTarg = new Date(newDate).toJSON();
            }

        }



        function saveTask(task, form) {

            vm.submitted = true;

           task.TKCapa = +vm.task.TKCapa;
           task.TKChamp = vm.dvUser;


            if (form.$valid) {
                if (vm.taskId != 'new') {
                    return taskdataservice.saveTask(vm.taskId, task)
                        .$promise.then(success, failed);
                }
                else
                {
                    vm.task.DevId = vm.dvNo;
                    return taskdataservice.saveNewTask(task)
                        .$promise.then(success, failed);

                }
            }

            function success() {$modalInstance.dismiss('cancel');}
            function failed(error) {console.log(error);}


        }

    }

})();