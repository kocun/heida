'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('DataCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    $scope.state = 0;
    $scope.data;
    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });
    Restangular.all('/api/subGroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.all('/api/indicator').getList().then(function(indicators) {
      $scope.indicators = indicators;
    });
    Restangular.all('/api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
    Restangular.all('/api/criteria').getList().then(function(criterias) {
      $scope.criterias = criterias;
    });

    $scope.criterias = [];
    $scope.completed = false;
    $scope.filter = function(group, subgroup) {
      if (group)
        Restangular.all('/api/subGroup?group=' + group).getList().then(function(subgroups) {
          $scope.subgroups = subgroups;
        });
      if (subgroup)
        Restangular.all('/api/indicator?subgroup=' + subgroup).getList().then(function(indicators) {
          $scope.indicators = indicators;
        });
    }

    $scope.next = function(data, criteria, question, index) {
      if ($scope.state == 0) {
        $scope.data.answers = [];
        $scope.data.criterias = [];

      }

      console.log($scope.state + "-" + $scope.criterias.length);
      if ($scope.state < $scope.criterias.length) {
        console.log("Small");
        $scope.data.criterias.push($scope.criterias[$scope.state]);
      } else {
        console.log("Big");
        $scope.completed = true;
      }
      if (index) {
        console.log("index");
        $scope.data.answers[index] = question;
      } else if (index > -1) {
        console.log("no index" + index);
        $scope.data.answers[index] = question;
      }

      // console.log("index");
      // console.log(index);
      // console.log("state");
      // console.log($scope.state);
      // console.log("criteria");
      // console.log(criteria);
      // console.log("question");
      // console.log(question);
      // console.log("answers");
      // console.log($scope.data.answers);
      // if (!$scope.criterias[state ]) {
      //   console.log("no state");

      //   Restangular.all('/api/criteria').getList().then(function(criterias) {
      //     $scope.criterias=criterias;
      //     $scope.data.criterias.push(criterias[state]);
      //     $scope.state++;
      //   });
      // } else {
      //   console.log("else");
      //   $scope.data.criterias.push($scope.criterias[state ]);
      //   console.log($scope.data.criterias);
      // }
      $scope.state++;
    }

    $scope.save = function() {
      var datas = Restangular.all('/api/data');
      var dat = {
        department: $scope.data.department.id,
        indicator: $scope.data.indicator.id,
        year: $scope.data.year,
        value: $scope.data.value,
        answer: $scope.data.answers,
      };
      datas.post(dat);
      $state.go('dashboard.data', $stateParams, {
        reload: true,
        inherit: true
      });
    }

  }).controller('DataReportCtrl', function($scope, $http, Restangular, $state, $stateParams, $timeout) {
    Restangular.all('/api/data/').getList().then(function(datas) {
      $scope.datas = datas;
    });

  }).controller('DataReportDetailCtrl', function($scope, $http, Restangular, $state, $stateParams, $timeout) {
    Restangular.all('/api/data/'+$stateParams.department+'/'+$stateParams.indicator).getList().then(function(data) {
      $scope.data = data;
      console.log(data[0].department);
      $scope.dept=$scope.data[0].department.name;
      $scope.ind=$scope.data[0].indicator.name;
      var lbl = [];
      var dt = [];
      for (var i = 0; i < $scope.data.length; i++) {
        lbl.push($scope.data[i].year)
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
