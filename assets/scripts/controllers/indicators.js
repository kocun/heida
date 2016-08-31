'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('IndicatorCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    Restangular.all('/api/indicator?limit=-1').getList().then(function(indicators) {
      $scope.indicators = indicators;
    });

    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.all('/api/goal').getList().then(function(goals) {
      $scope.goals_to_add = goals;
      $scope.goals = goals;
      console.log(goals_to_add);
    });
    Restangular.all('/api/indicator').getList().then(function(indicators) {
      $scope.indicators = indicators;
    });

    $scope.save = function(indicator) {
      $scope.indicators.post(indicator);
      $state.go('dashboard.indicators', $stateParams, {
        reload: true,
        inherit: true
      });
    }

  }).controller('IndicatorEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {
     $scope.opts= [
      {id:0,val:"Not Relevant"},
      {id:1,val:"Low"},
      {id:2,val:"Moderately"},
      {id:3,val:"Highly"}
    ];

    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.one('/api/indicator', $stateParams.id).get().then(function(indicator) {
      $scope.indicator = indicator;
    });
    $scope.update = function() {
      $scope.indicator.save();
      $state.go('dashboard.indicators', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
