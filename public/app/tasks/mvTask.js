(function () {
    'use strict';

    var serviceId = 'mvTask';
    angular.module('app').factory(serviceId, ['$resource', mvTask]);

    function mvTask($resource) {


        var taskResource = $resource('/api/tasks/:taskId', {taskId: '@id'},
            {'update': {method: 'PUT', params: {taskId: '@id'}}});

        var allTasksList = $resource('/api/alltasks/:status/:capa', {status: '@status', capa: '@capa'});

        var listTaskResource = $resource('/api/deviation/tasks/:id', {DevId: '@id'});

        var service = {
            deleteTask: deleteTask,
            getTask: getTask,
            getTasks: getTasks,
            getTaskCount: getTaskCount,
            getDeviationTasks: getDeviationTasks,
            saveTask: saveTask,
            saveNewTask: saveNewTask
        };

        return service;

        function deleteTask (taskId) {
            return taskResource.delete({taskId: taskId});
        }

        function getDeviationTasks(DevId) {
            return listTaskResource.query({id: DevId});

        }

//        function getTasks() {
//            var tasks = taskResource.query();
//
//            return tasks;
//        }


        function getTasks(status, capa) {
            var tasks = allTasksList.query({status: status, capa: capa});

            return tasks;
        }

        function getTask(taskId) {
            var task = taskResource.get({taskId: taskId});

            return task;
        }

        function getTaskCount(taskId){
            var taskcount = taskResource.get({taskId: taskId});
            return taskcount;
        }

        function saveTask(taskId, task) {
            taskResource.get({taskId: taskId});
            return taskResource.update({taskId: taskId}, task);
        }

        function saveNewTask(task) {
            return taskResource.save(task);
        }

    }

})();
