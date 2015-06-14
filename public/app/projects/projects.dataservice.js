(function () {
    'use strict';
    
        angular
        .module('app.project')
        .factory('projectdataservice', projectdataservice);

    projectdataservice.$inject = ['$http','$resource', '$q'];

    function projectdataservice($http,$resource, $q) {

        var projResource = $resource('/api/project/:projId', { projId: '@id' },
            { 'update': { method: 'PUT', params: { projId: '@id'}} });

        var projNameResource = $resource('/api/projectName/:projId', { projId: '@id' });

        var allProjRes = $resource('/api/projects/:status', { status: '@status', isArray: false  });

        var projNoResource = $resource('/api/projectNo/:year', { year: '@year'});

        var service = {
            deleteProject: deleteProject,
            getProject: getProject,
            getProjNo: getProjNo,
            getProjectName: getProjectName,
            newYearStart: newYearStart,
            getProjects: getProjects,
            incProjectNo: incProjectNo,
            saveProject: saveProject,
            saveNewProject: saveNewProject
        };

        return service;

        function deleteProject (projId) {
            return projResource.delete({ projId: projId });
        }


        function getProjects(status) {
            var project = allProjRes.query({ status: status });

            return project;
        }

        function getProject(projectId) {
            var project = projResource.get({ projId: projectId });

            return project;
        }

        function getProjectName(projNo) {
            var projectName = projNameResource.get({ projId: projNo });

            return projectName;
        }

//        function getNewProjNo() {
//            var projectNo = projNoResource.get();
//
//            return projectNo;
//        }

        function incProjectNo(yr){
            $http.put('/api/projectNo/' + yr);
        }

        function newYearStart(yr){
            $http.post('/api/projectNo/' + yr);
        }

        function getProjNo(year){
            return projNoResource.query({year: year});
        }

        function saveProject(project, projId) {
            projResource.get({ projId: projId });
            return projResource.update({ projId: projId }, project);
        }

        function saveNewProject(project) {
            return projResource.save(project);
        }

    }

})();