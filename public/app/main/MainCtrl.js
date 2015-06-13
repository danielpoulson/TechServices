(function () {    
    'use strict';

    angular.module('app').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'mvDashboardService'];

    function MainCtrl($scope, mvDashboardService) {
         var vm = this;

        var _classData = [];
        var _labels = [];
        var _data = [];
        var _y1open = 0;
        $scope.bColors = ['#FF5252', '#3333FF'];

        activate();

        function activate() {

            getClassData();
            getSummaryData();

        }
        
  // Chart information http://www.chartjs.org/
  // Chart information http://jtblin.github.io/angular-chart.js
  $scope.cLabels = _labels;
  $scope.cData = _data;

        function getClassData(){

            return mvDashboardService.getDevClass()
                .$promise.then(function (data){
                    for(var i = 0; i < data.length; i++){
                        if(!data[i]._id){
                            data[i]._id = "Not Assigned";
                        }
                        
                        _labels.push(data[i]._id);
                        _data.push(data[i].total);
                        
                    }
                });
        }
        
        
        function getSummaryData(){
            return mvDashboardService.getDashArray()
            .$promise.then(function(data){
                    $scope.labels = [data.year1, data.year2, data.year3];
                      $scope.series = ['Open', 'Closed'];
                    
                      $scope.data = [
                        [data.y1open, data.y2open, data.y3open],
                        [data.y1Closed, data.y2Closed, data.y3Closed]
                      ];
                
                vm.summary = data;

            });
        }



        $scope.configYear = {
            "labels": false,
            "title": "Deviation Opened and Closed",
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
