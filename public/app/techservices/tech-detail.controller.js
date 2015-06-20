(function () {
    'use strict';

    angular.module('app.techservice').controller('techdetail', techdetail);

    techdetail.$inject = ['$state', '$stateParams', '$timeout', 'techdataservice'];

    function techdetail($state, $stateParams, $timeout, techdataservice) {
        var vm = this;

        var LrNo = '';
        vm.new = true;

        vm.getTechDetails = getTechDetails;
        vm.cancelEdit = cancelEdit;


        vm.stats = [
            { "value": 3 , "text": 'On-hold' },
            { "value": 2 , "text": 'In-progress' },
            { "value": 4 , "text": 'Cancelled' },
            { "value": 5 , "text": 'Completed' }
        ];



        vm.types = [
            'Stability',
            'Production',
            'Lab Batch',
            'Deviation',
            'API Test Incoming Goods'
        ];

        //vm.fmtype = vm.types[1];

        activate();

        function activate() {
            //console.log("Activate : dpTecDetails");
            getTechDetails();

        }



        function getTechDetails() {
            var val = $stateParams.id;

            if (val != 'new') {
                vm.new = false;
                return techdataservice.getLabRequest(val)
                    .$promise.then(function(data){
                        //data.ITarg = new Date(data.ITarg);
                        return vm.tech = data;
                    });
            } else {

                _createNewRequest();
            }

        }

        function _createNewRequest() {
            var lrCount;
            vm.new_date = new Date();
            var yr = vm.new_date.getFullYear().toString().substr(2, 2);
            getItemCount.getCount("LR").then(function(data){
                lrCount = data.count;
                vm.new_lrNum = "LR" + ((yr * 10000) + (lrCount + 1));
            });

            vm.ts.IStatus = vm.stats[1].value;
            vm.ts.IType = vm.types[1];



        }

        function cancelEdit() {
            $state.go("techservices");
        }

        vm.save = function (data, form) {
            var val = $stateParams.id;


            if(form.$valid) {
                if(val != 'new'){
                    return techdataservice.saveRequest(data, val)
                        .$promise.then(success, failed);
                } else {

                    data.IStart = vm.new_date;
                    data.LrNo = vm.new_lrNum;


                    return techdataservice.saveNewRequest(data)
                        .$promise.then(success, failed);
                }
            }
        };

        function success() {
            $state.go('techservices');
        }

        function failed(error) { console.log(error);}

    }
})();