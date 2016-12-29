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

    var selectedLang = window.localStorage.getItem('selectedLang');

    if ( selectedLang ) {
      $translate.use( selectedLang );
      $scope.selected = selectedLang;
    }

    $scope.changeLanguage = function (langKey) {
      langKey = $scope.selected;
      window.localStorage.setItem('selectedLang', langKey);
      $translate.use(langKey);
    };
  });
