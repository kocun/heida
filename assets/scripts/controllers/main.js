'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('MainCtrl', function($scope,$position, Restangular) {
    // Get Users
    Restangular.all('/api/user').getList().then(function(users) {
      $scope.users = users;
    });

    // Get Departments
    Restangular.all('/api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });

    // Get Success Indicators but not yet
  });
