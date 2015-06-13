(function () {
    'use strict';

    var serviceId = 'mvTask';
    angular.module('app').factory(serviceId, ['$resource', mvTask]);

    function mvTask($resource) {


        var taskResource = $resource('/api/tasks/:taskId', { taskId: '@id' },
            { 'update': { method: 'PUT', params: { taskId: '@id'}} });

        var allTasksList = $resource('/api/alltasks/:status', { status: '@status' });

        var listTaskResource = $resource('/api/deviation/tasks/:id', { DevId: '@id'});

        var service = {
            deleteTask: deleteTask,
            getTask: getTask,
            getTasks: getTasks,
            getDeviationTasks: getDeviationTasks,
            saveTask: saveTask,
            saveNewTask: saveNewTask
        };

        return service;

        function deleteTask (taskId) {
            return taskResource.delete({ taskId: taskId });
        }

        function getDeviationTasks(DevId) {
            return listTaskResource.query({ id: DevId });

        }

//        function getTasks() {
//            var tasks = taskResource.query();
//
//            return tasks;
//        }


        function getTasks(status) {
            var tasks = allTasksList.query({ status: status });

            return tasks;
        }

        function getTask(taskId) {
            var task = taskResource.get({ taskId: taskId });

            return task;
        }

        function saveTask(taskId, task) {
            taskResource.get({ taskId: taskId });
            return taskResource.update({ taskId: taskId }, task);
        }

        function saveNewTask(task) {
            return taskResource.save(task);
        }

    }

})();
