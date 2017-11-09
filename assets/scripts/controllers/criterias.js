'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('CriteriaCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('/api/criteria').getList().then(function(criterias) {
      $scope.criterias = criterias;
    });
    $scope.save = function(criteria) {
      $scope.criterias.post(criteria);
      $state.go('dashboard.criterias', $stateParams, {
        reload: true,
        inherit: true
      });
    }

  }).controller('CriteriaEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/criteria').getList().then(function(criterias) {
      $scope.criterias = criterias;
    });
    Restangular.one('api/criteria', $stateParams.id).get().then(function(criteria) {
      $scope.criteria = criteria;
    });
    $scope.update = function() {
      $scope.criteria.save();
      $state.go('dashboard.criterias', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
