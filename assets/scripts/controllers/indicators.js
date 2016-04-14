'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('IndicatorCtrl', function($scope, $http, Restangular) {

    Restangular.all('/api/indicator?limit=-1').getList().then(function(indicators) {
      $scope.indicators = indicators;
    });

  }).controller('IndicatorEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    console.log($stateParams.id);

    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.one('/api/indicator', $stateParams.id).get().then(function(indicator) {
      $scope.indicator = indicator;
    });
    $scope.update = function() {
      console.log($scope.indicator.plain());
      $scope.indicator.save();
      $state.go('dashboard.indicators', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('IndicatorNewCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
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
  });
