'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('MainCtrl', function($scope, $position, Restangular) {
    // Get Users
    Restangular.all('/api/user').getList().then(function(users) {
      $scope.users = users;
    });

    // Get Departments
    Restangular.all('/api/department').getList().then(function(departments) {
      $scope.departments = departments;
    });

    // Get Groups
    Restangular.all('/api/group').getList().then(function (groups) {
      $scope.groups = groups;
    });

    // Get Subgroups
    Restangular.all('/api/subGroup').getList().then(function (subgroups) {
      $scope.subgroups = subgroups;
    });

    // get Indicators
    Restangular.all('/api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });

    // Get Departments
    Restangular.all('/api/department').getList().then(function (departments) {
      $scope.departments = departments;
    });

    // Get Criterias
    Restangular.all('/api/criteria').getList().then(function (criterias) {
      $scope.criterias = criterias;
    });

    // Get Data
    Restangular.all('/api/data').getList().then(function (datas) {
      $scope.datas = datas;
    });
  });
