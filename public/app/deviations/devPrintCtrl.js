(function () {
    'use strict';

    angular.module('app').controller('devEditCtrl', devEditCtrl);

    devEditCtrl.$inject =
        ['$location', '$state', '$stateParams', 'getItemCount', 'mvIdentity', 'mvNotifier', 'mvUserData', 'mvDeviationService', 'dvTaskCount'];

    function devEditCtrl($location, $state, $stateParams, getItemCount, mvIdentity, mvNotifier, mvUserData, mvDeviationService, dvTaskCount) {
        var vm = this;
        var currentUser = mvIdentity.currentUser.firstName + " " + mvIdentity.currentUser.lastName;
        var val = $stateParams.id;

        vm.new = true;
        vm.getDevDetails = getDevDetails;
        vm.cancelEdit = cancelEdit;
        vm.closed = "0";
        vm.dvPrint = dvPrint;
        vm.filecount = 5;
        vm._dvNo = '';
        vm.role = false;
        vm.taskcount = '';
        vm.title = "Deviation";
        vm.open = open;
        vm.save = save;
        vm.dvUser = '';


        vm.dvOutcome = [
            'Accept',
            'Rework',
            'Repair',
            'Reject',
            ''
        ];

        vm.Cat = [
            'Incomming Goods',
            'Bulk',
            'Finished Goods',
            ''
        ];

        vm.Class = [
            'Stock Discrepancy',
            'Formulation Difficulty',
            'Documentation',
            'Damage',
            'Out of Specification',
            'Leakers',
            'Transport Issue',
            'Improvement Suggestion',
            'Operator Error',
            'Procedure',
            'Contamination',
            'Other',
            ''
        ];


        activate();

        function activate() {

            getDevDetails();
            getTaskCount();
            setRole();


        }

        function addlog(logMessage){
            var dvLog = { dvLogType : logMessage,
                dvLogBy : currentUser,
                dvLogDate : Date.now()};

            if ( vm.deviation.dvLog != null) {
                vm.deviation.dvLog.push(dvLog);
            } else {
                vm.deviation.dvLog = new Array(dvLog);
            }
        }


        function cancelEdit() {
            $location.url("/deviations");
        }

        function getDevDetails() {
            var val = $stateParams.id;

            if (val != 'new') {
                vm.new = false;
                return mvDeviationService.getDeviation(val)
                    .$promise.then(function(data) {
                        vm.deviation = data;
                        vm._dvNo = data.dvNo;
                    }).then(function(){
                        //vm.users = mvUserData.getAllUsers();
                        return mvUserData.getAllUsers()
                            .$promise.then(function(users) {
                                vm.users = users;
                                var idx = users.indexOf(vm.deviation.dvAssign);
                                vm.dvUser = vm.users[idx];
                            })
                    });
            } else {

                _createNewDeviation();
            }

        }


        function getTaskCount(){
            var val = $stateParams.id;

            if (val != 'new') {
                return dvTaskCount.getTaskCount(val)
                    .then(function(data){
                        return vm.taskcount = data;
                    });
            }

        }

        function _createNewDeviation() {
            var cnt;
            vm.new_date = new Date();
            var yr = vm.new_date.getFullYear().toString().substr(2, 2);
            getItemCount.getCount("Dev").then(function(data){
                cnt = data.count;
                vm._dvNo = "DV" + ((yr * 10000) + (cnt + 1));
            });

        }


        function open ($event){
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;

        }


    function save (data, form, logMessage) {
    //Log out an audit trail message
        if (logMessage == 'closed'){
            //Log out to Audit trail
            addlog('Deviation actioned and completed');
            data.dvClosed = 1;
        } else {
            data.dvClosed = 0;
            addlog(logMessage);
        }

        data.dvLog = vm.deviation.dvLog;

        //data.dvAssign = vm.dvUser;

        if(form.$valid) {
            if(val != 'new'){
                data.dvAssign = vm.dvUser;
                return mvDeviationService.saveDeviation(data, val)
                    .$promise.then(success, failed);

            } else {

                data.dvNo = vm._dvNo;
                if (!vm.deviation.dvAssign){
                    data.dvAssign = "Quality Assurance";
                }

                return mvDeviationService.saveNewDeviation(data)
                    .$promise.then(success, failed);
            }
        }
    }

    function success() {
        mvNotifier.notify('Deviation has been saved!');
        if(val == 'new'){ $state.go("deviationList"); }
    }

    function failed(error) { console.log(error);}

    function setRole(){
    if(mvIdentity.currentUser.roles == 'QA' || mvIdentity.currentUser.roles == 'admin'){
        vm.role = true;
    }
}

    function dvPrint(){
        if(mvIdentity.currentUser)
            $state.go('deviationsPrint', {id:vm._dvNo});
    }

}


})();

