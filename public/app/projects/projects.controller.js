(function () {
    'use strict';
    
    angular.module('app.project').controller('projects', projects);

    projects.$inject = ['$location', '$state', '$timeout', 'IdService', 'projectdataservice'];

    function projects($location, $state, $timeout, IdService, projectdataservice) {
        
        var vm = this;

        vm.loadAll = loadAll;
        vm.loadActive = loadActive;
        vm.activate = activate;
        vm.projects = [];
        vm.getProject = getProject;
        vm.openNewProject = openNewProject;
        vm.setPagPage = setPagPage;
        vm.projectName = [];

        vm.predicate = 'ProjNo';
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.numPerPage = 20;


        activate();

        function activate() {
            getProjects(5);
        }

        function getProjects(status) {
            return projectdataservice.getProjects(status)
                .$promise.then(function(data){
                    vm.projects = data;
                    setPagPage();
                });

        }


        function getProject (projNo) {
            if(IdService.currentUser) {
                $state.go('projectEdit.detail', {id:projNo});
            } else {
                mvNotifier.error('You are not logged in!');
            }
        }

        function openNewProject(){
            if(IdService.currentUser) {
                $state.go('projectEdit.detail', {id:"new"});
            } else {
                mvNotifier.error('You are not logged in!');
            }
        }

        function setPagPage() {

            $timeout(function () {
                //wait for 'filtered' to be changed
                vm.totalItems = vm.filtered.length;
            }, 10);

        }

        function loadAll(){
            getProjects(6);
        }

        function loadActive(){
            getProjects(5);
        }
    }

})();
