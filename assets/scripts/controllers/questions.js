'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('QuestionCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });

    Restangular.all('api/criteria').getList().then(function(criterias) {
      $scope.criterias = criterias;
    });
    Restangular.all('api/question').getList().then(function(questions) {
      $scope.questions = questions;
    });

    $scope.save = function(question) {
      $scope.questions.post(question);
      $state.go('dashboard.questions', $stateParams, {
        reload: true,
        inherit: true
      });
    }

  }).controller('QuestionEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    $http.get('/api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/criteria').getList().then(function(criterias) {
      $scope.criterias = criterias;
    });
    Restangular.all('api/question').getList().then(function(questions) {
      $scope.questions = questions;
    });
    Restangular.one('/api/question', $stateParams.id).get().then(function(question) {
      $scope.question = question;
    });
    $scope.update = function() {
      $scope.question.save();
      $state.go('dashboard.questions', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
