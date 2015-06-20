(function () {
    'use strict';

    angular.module('app.task').factory('taskdataservice', taskdataservice);

    taskdataservice.$inject = ['$resource'];

    function taskdataservice($resource) {

        var taskResource = $resource('/api/tasks/:taskId', {taskId: '@id'},
            {'update': {method: 'PUT', params: {taskId: '@id'}}});

        var allTasksList = $resource('/api/alltasks/:status/:milestone',
            {status: '@status', milestone: '@milestone'});

        var listTaskResource = $resource('/api/project/tasks/:id', {projectId: '@id'});

        var service = {
            deleteTask: deleteTask,
            getTask: getTask,
            getTasks: getTasks,
            getTaskCount: getTaskCount,
            getProjectTasks: getProjectTasks,
            saveTask: saveTask,
            saveNewTask: saveNewTask
        };

        return service;

        function deleteTask (taskId) {
            return taskResource.delete({taskId: taskId});
        }

        function getProjectTasks(projectId) {
            return listTaskResource.query({id: projectId});

        }

//        function getTasks() {
//            var tasks = taskResource.query();
//
//            return tasks;
//        }


        function getTasks(status, milestone) {
            var tasks = allTasksList.query({status: status, milestone: milestone});

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
