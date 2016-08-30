angular.module('heidaApp')

.controller('DataReportCtrl', function ($scope, $http, Restangular, $state, $stateParams, $timeout) {
  Restangular.all('/api/data/').getList().then(function (datas) {
    $scope.datas = datas;
  });
})
.controller('DataReportDetailCtrl', function ($scope, $http, Restangular, $state, $stateParams, $timeout) {
  Restangular.all('/api/data/' + $stateParams.department + '/' + $stateParams.indicator).getList().then(function (data) {
    $scope.data = data;
    console.log(data[0].department);
    $scope.dept = $scope.data[0].department.name;
    $scope.ind = $scope.data[0].indicator.name;
    var lbl = [];
    var dt = [];
    for (var i = 0; i < $scope.data.length; i++) {
      lbl.push($scope.data[i].year);
      dt.push($scope.data[i].value);
    }
    $scope.bar = {

      labels: lbl,
      series: ['Series A'],

      data: [
        dt

      ]

    };
  });

});

