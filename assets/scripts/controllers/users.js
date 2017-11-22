'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('UserCtrl', function($scope, $http, Restangular) {
    $http.get('api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/user').getList().then(function(users) {
      $scope.users = users;
    });
    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
  }).controller('UserEditCtrl', function($scope, Restangular, $stateParams, $state) {
    Restangular.one('api/user', $stateParams.id).get().then(function(user) {
      $scope.user = user;
    });
    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });
    $scope.update = function() {
      $scope.user.put();
      $state.go('dashboard.users', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });

