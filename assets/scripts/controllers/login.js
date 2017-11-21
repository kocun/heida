'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('LoginCtrl', function($scope, $http, $translate) {
    $http.get('api/me').
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
