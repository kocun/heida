'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('GoalCtrl', function ($scope, $http, Restangular, $state, $stateParams) {
    $http.get('api/me').success(function (data) {
      $scope.me = data;
    });
    Restangular.all('api/goal').getList().then(function (goals) {
      $scope.goals = goals;
    });

    $scope.save = function (goal) {
      $scope.goals.post(goal);
      $state.go('dashboard.goals', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('GoalEditCtrl', function ($scope, $http, Restangular, $state, $stateParams) {

  $http.get('api/me').success(function (data) {
    $scope.me = data;
  });

  Restangular.all('api/goal').getList().then(function (goals) {
    $scope.goals = goals;
  });

  Restangular.one('api/goal', $stateParams.id).get().then(function (goal) {
    $scope.goal = goal;
  });
  $scope.update = function () {
    $scope.goal.save().then(function() {
      $state.go('dashboard.goals', $stateParams, {
        reload: true,
        inherit: true,
        notify: true
      });
    });
  };
});
