'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('SubdepartmentCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });

    Restangular.all('api/subdepartment').getList().then(function(subdepartments) {
      $scope.subdepartments = subdepartments;
    });

    $scope.save = function(subdepartment) {

      $scope.subdepartments.post(subdepartment);
      $state.go('dashboard.sub-departments', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('SubdepartmentEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });

    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });

    Restangular.one('/api/subdepartment', $stateParams.id).get().then(function(subdepartment) {
      $scope.subdepartment = subdepartment;
    });
    $scope.update = function() {
      $scope.subdepartment.save();
      $state.go('dashboard.sub-departments', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
