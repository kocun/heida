'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('heidaApp')
    .directive('chat',function(){
        return {
        templateUrl:'scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
        }
    });


