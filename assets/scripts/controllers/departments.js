'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */

angular.module('heidaApp')
  .controller('DepartmentCtrl', function($scope, Restangular, $stateParams, $state, $http) {
    $http.get('api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
    $scope.delete = function(department) {
      department.remove();
      $state.reload();
      $state.go($state.current, $stateParams, {
        reload: true,
        inherit: false
      });
    };

    $scope.save = function(department) {
      $scope.departments.post(department);
      $state.go('dashboard.departments', $stateParams, {
        reload: true,
        inherit: false
      });
    }
  }).controller('DepartmentEditCtrl', function($scope, Restangular, $stateParams, $state, $http) {
    $http.get('api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.one('api/department', $stateParams.id).get().then(function(department) {
      $scope.department = department;
    });
    $scope.update = function () {
      $scope.department.save().then(function() {
        $state.go('dashboard.departments', $stateParams, {
          reload: true,
          inherit: true,
          notify: true
        });
      });
    };
  });
