(function () {
    'use strict';

    var controllerId = 'mvTaskListCtrl';

    angular.module('app').controller(controllerId,
        ['$location', '$log', '$modal', '$route', '$routeParams', '$scope', '$timeout', 'mvIdentity', 'mvTask', mvTaskListCtrl]);

    function mvTaskListCtrl($location, $log, $modal, $route, $routeParams, $scope, $timeout, mvIdentity, mvTask) {

        $scope.activate = activate;
        $scope.alltasks = false;
        $scope.currentPage = 1;
        $scope.getDevTasks = getDevTasks;
        $scope.getTask = getTask;
        $scope.items = [];
        $scope.loadAll = loadAll;
        $scope.newTask = newTask;
        $scope.numPerPage = 20;
        $scope.open = open;
        $scope.projectName = {};
        $scope.tasks = [];
        $scope.totalItems = {};
        $scope.setPagPage = setPagPage;

        var dpStatus = 5;


        activate();

        function activate() {
              getDevTasks();
        }

        function getTask (task) {
            var taskId = task._id;
            var id = task.ProjectId;
            $location.path('/taskEdit/' + taskId + '/' + id );
        }

        function newTask () {
            var taskId = "new";
            var id = $routeParams.id;
            $location.path('/taskEdit/' + taskId + '/' + id);
        }

        function getDevTasks() {
            //if(mvIdentity.currentUser) {
                var val = $routeParams.id;
            console.log(val);
                if(val == 'search'){
                    return mvTask.getTasks(dpStatus)
                        .$promise.then(function(data){
                            $scope.tasks = data;
                            $scope.projectName = 'Search';
                            $scope.dpShowButton = false;
                            setPagPage();
                        });
                } else {

                    return mvTask.getDeviationTasks(val)
                        .$promise.then(function (data) {
                            $scope.tasks = data;
                            $scope.dpShowButton = true;

                            //mvProjectName.name(val).$promise.then(function (data) {
                            //    $scope.projectName = data.Title + ' ' + '(' + data.ProjNo + ')';
                            //    setPagPage();
                            //});
                        });
                }
            //}

        }

        function loadAll(){

            if ($scope.alltasks == true) {
                console.log("true");
                dpStatus = 6;
                getDevTasks();

            } else {
                console.log("false");
                dpStatus = 5;
                getDevTasks();
            }

        }

        //This open function is used for the ui.bootstrap.modal
        function open (t) {
            $scope.items = [];

            if (t != 'new'){
                $scope.items.push(t._id);
                $scope.items.push(t.DevNo);
            } else {
                $scope.items.push(t);
                $scope.items.push($routeParams.id);
            }

            var modalInstance = $modal.open({
                templateUrl: '/partials/tasks/task-detail',
                controller: 'mvTaskDetailCtrl',
                size: "lg",
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
                getDevTasks();
            });
        }

//Pagination function

        function setPagPage() {

            $timeout(function () {
                //wait for 'filtered' to be changed
                /* change pagination with $scope.filtered */
                // $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.numPerPage);
                $scope.totalItems = $scope.filtered.length;
            }, 10);

        }
    }
})();
