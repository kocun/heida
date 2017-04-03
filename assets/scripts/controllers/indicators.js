'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
    .controller('IndicatorCtrl', function ($scope, $http, Restangular, $state, $stateParams) {
        $http.get('/api/me').success(function (data) {
            $scope.me = data;
        });

        Restangular.all('api/indicator').getList().then(function (indicators) {
            $scope.indicators = $scope.allIndicators = indicators;
        });

        Restangular.all('api/group').getList().then(function (groups) {
            $scope.groups = groups;
        });

        Restangular.all('api/subgroup').getList().then(function (subgroups) {
            $scope.subgroups = subgroups;
        });
        Restangular.all('api/goal').getList().then(function (goals) {
            $scope.goals_to_add = goals;
            $scope.goals = goals;
        });

        $scope.save = function (indicator) {
            $scope.indicators.post(indicator);
            $state.go('dashboard.indicators', $stateParams, {
                reload: true,
                inherit: true
            });
        };

        // $scope.filterIndicatorByCode = function (filteredIndicator) {
        //     debugger;
        //     var i = 0, iL = $scope.allIndicators.length;
        //     var filteredDatas = [];
        //     for (; i < iL; i++) {
        //         var obj = $scope.allIndicators[i];
        //
        //         if (obj.code == filteredIndicator) {
        //             filteredDatas.push(obj)
        //         }
        //     }
        //
        //     $scope.indicators = filteredDatas;
        //     $scope.filterState = true;
        // };

        $scope.getSubGroups = function (group) {
            Restangular.all('api/subGroup?group=' + group).getList().then(function (subgroups) {
                $scope.subgroups = subgroups;
            });
        };

        $scope.filterIndicator = function (filteredSubGroup) {
            Restangular.all('api/indicator?subgroup=' + filteredSubGroup).getList().then(function (indicators) {
                $scope.indicators = indicators;
                $scope.filterState = true;
            });
        };

        $scope.clearFilter = function () {
            $scope.indicators = $scope.allIndicators;
            $scope.filterState = false;
        }

    }).controller('IndicatorEditCtrl', function ($scope, $http, Restangular, $state, $stateParams) {

    $http.get('/api/me').success(function (data) {
        $scope.me = data;
    });

    $scope.opts = [
        {id: 0, val: "Not Relevant"},
        {id: 1, val: "Low"},
        {id: 2, val: "Moderately"},
        {id: 3, val: "Highly"}
    ];
    Restangular.all('api/group').getList().then(function (groups) {
        $scope.groups = groups;
    });
    Restangular.all('api/subgroup').getList().then(function (subgroups) {
        $scope.subgroups = subgroups;
    });
    Restangular.one('/api/indicator', $stateParams.id).get().then(function (indicator) {
        $scope.indicator = indicator;
    });
    $scope.getSubGroups = function (group) {
        Restangular.all('api/subGroup?group=' + group).getList().then(function (subgroups) {
            $scope.subgroups = subgroups;
        });
    }
    $scope.update = function () {
        $scope.indicator.save();
        $state.go('dashboard.indicators', $stateParams, {
            reload: true,
            inherit: true
        });
    }
});
