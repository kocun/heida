'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('SubgroupCtrl', function($scope, $http, Restangular) {
    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
  }).controller('SubgroupEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });

    Restangular.one('/api/subgroup', $stateParams.id).get().then(function(subgroup) {
      $scope.subgroup = subgroup;
    });
    $scope.update = function() {
      $scope.subgroup.save();
      $state.go('dashboard.sub-groups', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('SubgroupNewCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });
    Restangular.all('/api/subgroup').getList().then(function(subgroups) {
      $scope.subgroups = subgroups;
    });
    $scope.save = function(subgroup) {

      $scope.subgroups.post(subgroup);
      $state.go('dashboard.sub-groups', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
