(function () {
    'use strict';

    angular
        .module('app.project')
        .factory('projectName', projectName);

    projectName.$inject = ['$window', 'UserServ'];
    /* @ngInject */
    function projectName($window, UserServ) {

    var projectName = function(projectId){
        return mvProject.getProjectName(projectId);
//            .$promise.then(function(data){
//                return theName = data;
//                console.log(theName);
//            });
    };

    return {
        name: function(projNo) {
            return projectName(projNo);
        }
    };
}
})();