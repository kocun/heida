'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('MainCtrl', function($scope, $position, Restangular, $http) {
    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });

    // Get Users
    Restangular.all('api/user').getList().then(function(users) {
      $scope.users = users;
    });

    // Get Departments
    Restangular.all('api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });

    // get Indicators
    Restangular.all('api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });

    // Get Data
    Restangular.all('api/data').getList().then(function (datas) {
      $scope.datas = datas;
    });

  });
