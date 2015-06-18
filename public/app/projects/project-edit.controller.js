(function () {
    'use strict';

    angular.module('app.project').controller('projectEdit', projectEdit);

    projectEdit.$inject = ['$location', '$stateParams', 'IdService','projectdataservice', 'projectName'];

    function projectEdit($location, $stateParams, IdService, projectdataservice, projectName) {
        var vm = this;


    // Bindable properties and functions are placed on vm.
    vm.activate = activate;
    vm.addObj = addObj;
    vm.addDel = addDel;
    vm.cancelEdit = cancelEdit;
    vm.deleteProject = deleteProject;
    vm.editObj = editObj;
    vm.editDel = editDel;
    vm.getObj = getObj;
    //vm.getNewProjNo = getNewProjNo;
    vm.getDel = getDel;
    vm.loadTasks = loadTasks;
    vm.resetComp = resetComp;
    vm.rmObj = rmObj;
    vm.rmDel = rmDel;

    vm.active = '';
    vm.project = {};
    vm.projectName = projectName.projectName;
    vm.saveProject = saveProject;
    vm.project.objectives = [];
    vm.project.deliverables = [];
    vm.hideBut = hideBut;
    vm.setBut = false;

//    var currentUser = IdService.currentUser.firstName + " " + IdService.currentUser.lastName;

    //TODO convert static select to dynamic
    vm.sites = [
        'CAPL', 'Toll', 'Wyong', 'Other'
    ];

    vm.Priority = [
        'A','B','C'
    ];

    vm.CSFS = [
        'Improvement',
        'Audit',
        'New Project',
        'Inventory',
        'Lean',
        'Write-offs',
        'New Products'
    ];

    vm.depts = [
        'Administration',
        'Antigen',
        'Blending',
        'Engineering',
        'Filling',
        'Manufacturing',
        'Packaging',
        'Quality - QA',
        'Quality - QC',
        'Wharehouse',
        'Other'
    ];

    vm.stats = [
        { "value": 1 , "text": "Project - Not Started (New)" },
        { "value": 2 , "text": 'Project - On Track' },
        { "value": 3 , "text": 'Project - In Concern' },
        { "value": 4 , "text": 'Project - Behind Schedule' },
        { "value": 5 , "text": 'Project - Completed' }
    ];

    // vm.Department = vm.depts[1];

    vm.tab = 1;

    vm.selectTab = function(setTab) {
        vm.tab = setTab;
    };

    vm.isSelected = function(checkTab){
        return vm.tab === checkTab;
    };


    activate();

    function activate() {
        getProjectDetail();

    }

    function addObj(){
       var addArray = { projObj : vm.project.objEdit,
            eByObj : currentUser,
            eDateObj : Date.now()};

        if (vm.project.objectives != null) {
            vm.project.objectives.push(addArray);
        } else {
            vm.project.objectives = new Array(addArray);
        }

    }

    function addDel(){
        var addArray = { projDel : vm.project.delEdit,
            eByDel : currentUser,
            eDateDel : Date.now()};

        if (vm.project.deliverables != null) {
            vm.project.deliverables.push(addArray);
        } else {
            vm.project.deliverables = new Array(addArray);
        }

    }


    function cancelEdit() {
        $location.url("/projects");
    }

    function deleteProject() {
        var val = $routeParams.id;

        return projectdataservice.deleteProject(val)
            .$promise.then(function(){
                $location.url("/projects");
            });


    }

   function hideBut(dpState){

        vm.setBut = dpState;
        console.log(vm.setBut);
    }

    function editObj() {
        vm.project.objectives[vm.active] = { projObj : vm.project.objEdit, eByObj : currentUser, eDateObj : Date.now() };
    }

    function editDel() {
        vm.project.deliverables[vm.active] = { projDel : vm.project.delEdit, eByDel : currentUser, eDateDel : Date.now() };
    }

    function getObj(obj){
        var objs = vm.project.objectives;
        vm.active = objs.indexOf(obj);
        vm.project.objEdit = objs[vm.active].projObj;
    }


    function getDel(del){
        var dels = vm.project.deliverables;
        vm.active = dels.indexOf(del);
        vm.project.delEdit = dels[vm.active].projDel;
    }

    function loadTasks () {
        var val = $routeParams.id;
        $location.path('/tasks/' + val);
    }


    function _createNewProjNo() {
        var projNo = [];
        var dpProjNo = '';
        var yr = _getYear();


        return projectdataservice.getProjNo(yr)
            .$promise.then(function (data) {
                projNo = data;

                if (projNo.length != 0 ) {
                    dpProjNo = projNo[0].projCount;

                    if (dpProjNo < 100) {
                        if (dpProjNo < 10) {
                            dpProjNo = '00' + dpProjNo;
                        } else {
                            dpProjNo = '0' + dpProjNo;
                        }
                    }

                } else {

                    projectdataservice.newYearStart(yr);
                    dpProjNo = '001';
                    console.log(dpProjNo);
                }

                vm.project.ProjNo = 'P' + yr + dpProjNo;
                vm.project.PROJCD = new Date();

            });


    }

    function getProjectDetail() {
        var val = $stateParams.id;


        if (val != 'new') {
            return projectdataservice.getProject(val)
                .$promise.then(function(data){
                    return vm.project = data;
                });
        }


        _createNewProjNo();

    }


    function saveProject(project, form) {
        var val = $stateParams.id;
        var yr = _getYear();

        if(form.$valid) {
            if (val != 'new') {
                return projectdataservice.saveProject(project, val)
                    .$promise.then(success, failed);
            }
            else
            {
                projectdataservice.incProjectNo(yr);
                return projectdataservice.saveNewProject(project)
                    .$promise.then(success, failed);

            }
        }

        function success() {
            $location.url("/projects");
        }

        function failed(error) { console.log(error);}


    }

    function resetComp () { vm.project.PROJMD = null; }

    function rmObj() {
        var myArray = vm.project.objectives;
        myArray.splice(vm.active,1);
        vm.project.objEdit = '';
    }

    function rmDel() {
        var myArray = vm.project.deliverables;
        myArray.splice(vm.active,1);
        vm.project.delEdit = '';
    }


    function _getYear(){
        var newDate = new Date();
        var yr = newDate.getFullYear().toString().substr(2, 2);
        return yr;
    }
        function open ($event){
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;

        }

    }

})();

