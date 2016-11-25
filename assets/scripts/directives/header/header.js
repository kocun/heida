'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('heidaApp')
  .directive('header',function(){
      return {
        templateUrl:'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true
      }
  }).controller('HeaderCtrl', function($scope, $http,$translate) {
    $http.get('/api/me').
    success(function(data) {
        $scope.me = data;
    });

    $scope.changeLanguage = function (langKey) {
        langKey = $scope.selected;
        $translate.use(langKey);
    };
  });
