'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('heidaApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.adminCollapseVar = 0;
        $scope.editorCollapseVar = 0;
        $scope.multiCollapseVar = 0;

        $scope.adminCollapse = function(x){

          if(x==$scope.adminCollapseVar) {
            $scope.adminCollapseVar = 0;
          }
          else {
            $scope.adminCollapseVar = x;
            $scope.editorCollapseVar = 0;
          }

        };

        $scope.editorCollapse = function(x) {
          if(x==$scope.editorCollapseVar) {
            $scope.editorCollapseVar = 0;
          }
          else {
            $scope.editorCollapseVar = x;
            $scope.adminCollapseVar = 0;
          }

        }

        $scope.multiCheck = function(y){

          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }])

