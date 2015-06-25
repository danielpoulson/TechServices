(function () {
    'use strict';

    angular.module('app.dashboard').controller('dashboard', dashboard);

    dashboard.$inject = ['$scope', 'dashboarddataservice'];

    function dashboard($scope, dashboarddataservice) {
        var vm = this;

        var _classData = [];
        var _labels = [];
        let _data = [];
        var _y1open = 0;
        $scope.bColors = ['#FF5252', '#3333FF'];

        activate();

        function activate() {

            setStatic();


            //getClassData();
            // getSummaryData();

        }
        
        // Chart information http://www.chartjs.org/
        // Chart information http://jtblin.github.io/angular-chart.js
        $scope.cLabels = _labels;
        $scope.cData = _data;

        // function getClassData() {

        //     return dashboarddataservice.getDevClass()
        //         .$promise.then(function (data) {
        //         for (var i = 0; i < data.length; i++) {
        //             if (!data[i]._id) {
        //                 data[i]._id = "Not Assigned";
        //             }

        //             _labels.push(data[i]._id);
        //             _data.push(data[i].total);

        //         }
        //     });
        // }


        // function getSummaryData() {
        //     return dashboarddataservice.getDashArray()
        //         .$promise.then(function (data) {
        //         $scope.labels = [data.year1, data.year2, data.year3];
        //         $scope.series = ['Open', 'Closed'];

        //         $scope.data = [
        //             [data.y1open, data.y2open, data.y3open],
        //             [data.y1Closed, data.y2Closed, data.y3Closed]
        //         ];

        //         vm.summary = data;

        //     });
        // }
        
        function setStatic() {
            _labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            _data = [300, 500, 100];
            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            
            vm.summary = [];
        }



        $scope.configYear = {
            "labels": false,
            "title": "Open projects",
            "legend": {
                "display": true,
                "position": "right"
            },
            colors: ['#a0c5e8', '#709ac1'],
            "innerRadius": 0,
            "lineLegend": "lineEnd"
        };




    }
})();
