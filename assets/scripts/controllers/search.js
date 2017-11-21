'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('SearchCtrl', function($scope, $http, Restangular, $state, $stateParams, $location) {
    $http.get('api/me').
      success(function(data) {
        $scope.me = data;
      });

    Restangular.all('api/search/'+ $stateParams.text).getList().then(function(searchDatas) {
      $scope.searchDatas = searchDatas;
    });
  })
