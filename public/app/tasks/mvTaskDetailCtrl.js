(function () {
    'use strict';

    var controllerId = 'mvTaskDetailCtrl';

    angular.module('app').controller(controllerId,
        ['$modalInstance','$scope','mvTask', 'items', mvTaskDetailCtrl]); //removed 'mvProjectName',

    function mvTaskDetailCtrl($modalInstance, $scope, mvTask, items) {
        //var vm = this;

        // Bindable properties and functions are placed on vm.
        $scope.activate = activate;
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.deleteTask = deleteTask;
        $scope.projectId = {};
        $scope.task = {};
        $scope.taskId = {};
        $scope.saveTask = saveTask;

        $scope.projectName = {};

        //TODO convert static select to dynamic
        $scope.stats = [
            { "value": 1 , "text": "Task - Not Started (New)" },
            { "value": 2 , "text": 'Task - On Track' },
            { "value": 3 , "text": 'Task - In Concern' },
            { "value": 4 , "text": 'Task - Behind Schedule' },
            { "value": 5 , "text": 'Task - Completed' }
        ];

        // $scope.Department = $scope.depts[1];


        activate();

        function activate() {
            $scope.taskId = items[0];
            $scope.dvNo = items[1];
            getTaskDetail();

        }


        function deleteTask() {

            return mvTask.deleteTask($scope.taskId)
                .$promise.then(function(){
                    $modalInstance.dismiss('cancel');
                });
        }


        function getTaskDetail() {

            if ($scope.taskId != 'new') {
                return mvTask.getTask($scope.taskId)
                    .$promise.then(function(data){
                        return $scope.task = data;
                    });

            }
            else
            {

                $scope.task.TKActive = true;
                $scope.task.TKMile = false;
            }

        }

        function saveTask(task, form) {

            if (form.$valid) {
                if ($scope.taskId != 'new') {
                    return mvTask.saveTask($scope.taskId, task)
                        .$promise.then(success, failed);
                }
                else
                {
                    $scope.task.DevId = $scope.dvNo;
                    return mvTask.saveNewTask(task)
                        .$promise.then(success, failed);
                }
            }

            function success() { $modalInstance.dismiss('cancel');}
            function failed(error) { console.log(error);}


        }

    }

})();