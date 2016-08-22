'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('heidaApp')
  .directive('convertToNumber', function() {
    console.log("asd");
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          console.log("asdasd" + val);
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          console.log("asdasd" + val);
          return '' + val;
        });
      }
    };
  });
