'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('LoginCtrl', function($scope, $http,$translate) {
    $http.get('/api/me').
    success(function(data) {
        $scope.me = data;
    });

    $scope.changeLanguage = function (langKey) {
        langKey = $scope.selected;
        $translate.use(langKey);
    };
  });
