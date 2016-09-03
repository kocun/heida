'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp', ['ngDialog'])
  .controller('DataCtrl', function ($scope, $http, Restangular, $state, $stateParams, $compile, ngDialog) {
    $scope.state = 0;
    $scope.data;
    $scope.currentData;
    $scope.ind = "";
    Restangular.all('/api/group').getList().then(function (groups) {
      $scope.groups = groups;
    });
    Restangular.all('/api/subGroup').getList().then(function (subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.all('/api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });
    Restangular.all('/api/department').getList().then(function (departments) {
      $scope.departments = departments;
    });
    Restangular.all('/api/criteria').getList().then(function (criterias) {
      $scope.criterias = criterias;
    });
    Restangular.all('/api/goal').getList().then(function (goals) {
      $scope.goals = goals;
    });


    $scope.done = function (data, ind) {
      var datas = Restangular.all('/api/data');
      var dat = {
        department: data.department.id,
        indicator: ind.id,
        year: data.year,
        value: data.value,
        //answer: $scope.data.answers,
      };
      datas.post(dat);
      $state.go('dashboard.data', $stateParams, {
        reload: true,
        inherit: true
      });

    };

    // New
    $scope.yearArr = (function(){
      var thisYear = new Date().getFullYear();

      var selectArr = [];

      var beforegap = 10; // 10 year before from thisYear.
      var aftergap = 9; // 9 year after from thisYear.
      thisYear += aftergap;

      var i, iL = beforegap + aftergap;
      for ( i = 0; i <= iL ; i++ ) {
        var yearNode = thisYear - i;

        selectArr.unshift(yearNode+"");
      }

      return selectArr;
    })();

    // New
    $scope.academicArr = (function(){
      var thisYear = new Date().getFullYear();

      var selectArr = [];

      var gap = 10; // 11 year before and after from thisYear.

      thisYear += gap;

      var i, iL = gap*2;
      for ( i = 0; i <= iL ; i++ ) {
        var yearNode = thisYear - i;

        selectArr.unshift((yearNode-1) + " - " + yearNode);
      }

      return selectArr;
    })();

    // New
    $scope.periodRange = function (type) {
      return $scope[type+"Arr"];
    }

    // New
    $scope.periodArrObj = [{
      value: "year",
      label: 'Calendar Year'
    }, {
      value: "academic",
      label: 'Academic Year'
    }];

    // New
    $scope.prepareValuesArea = function(yearArr) {
      var valuesAreaArr = [];

      var i, iL=yearArr.length;

      for ( i = 0; i < iL; i++ ) {
        var item = {};
        var year = yearArr[i];
        item.label = year.replace(" - ","-");
        item.modelName = year.replace(" - ","_")+"_value";

        valuesAreaArr.push(item);
      }

      $scope.newData.valuesOfYears = valuesAreaArr;
    }

    // New
    $scope.addRow = function () {
      var datas = Restangular.all('/api/data/'+$scope.ind.id);
      var data = {
        department: $scope.newData.indicatorId,
        indicator: $scope.ind.id,
        year: $scope.newData.year,
        value: $scope.newData.value,
        public: $scope.newData.public
        };
      datas.post(data);
      $state.go('dashboard.data', $stateParams, {
        reload: true,
        inherit: true
      });
    }

    // New
    $scope.subUnits = function(departmentIndex){
      if ( departmentIndex && departmentIndex != "custom" )
        return $scope.departments[departmentIndex].subs;
    }

    // New
    $scope.subGroups = function(groupIndex){
      if ( groupIndex && groupIndex != "custom" )
        return $scope.groups[groupIndex].subs;
      else
        return $scope.subgroups;
    }

    // New
    $scope.secondScreenIsInvalid = true;

    // New
    $scope.secondScreenIsInvalidFunc = function(){
      var state = true;

      if ( $scope.newData.goals && ( ( $scope.newData.goals.length > 0 && !($scope.newData.goals.indexOf('custom') > -1) ) || ( $scope.newData.otherGoal &&  $scope.newData.otherGoal.trim != "" )  ) ) {
        if ( $scope.newData.groupIndex && $scope.newData.groupIndex != 'custom' ) {
          if ( $scope.newData.subGroupId && (( $scope.newData.subGroupId != 'custom') || ( $scope.newData.otherSubGroup && $scope.newData.otherSubGroup.trim != "" )) ) {
            state = false;
          }
        } else if ($scope.newData.otherGroup && $scope.newData.otherGroup.trim != "") {
          if ( $scope.newData.subGroupId && (( $scope.newData.subGroupId != 'custom') || ( $scope.newData.otherSubGroup && $scope.newData.otherSubGroup.trim != "" )) ) {
            state = false;
          }
        }
      }

      $scope.secondScreenIsInvalid = state;
    }

    // New
    $scope.getIndicators = function(){
      var indicatorArr = [];

      $scope.newData.indicators = [];

      if ($scope.newData.subGroupId == 'custom') {
        indicatorArr = $scope.indicators;
      } else {
        var i, iL = $scope.subgroups.length;

        for ( i = 0; i < iL; i++ ) {
          if ($scope.newData.subGroupId == $scope.subgroups[i].id){
            indicatorArr = $scope.subgroups[i].indicators;
            break;
          }
        }
      }

      $scope.indicatorArr = indicatorArr;
    }

    // New
    $scope.accessToIndicators = ["Public","Staff only","Not sure"];


    // New
    $scope.addData = function (indicator) {

      $scope.addNewScreens = {screen1:true}; //...
      $scope.newData = {value:1, isInvalid: true, valuesOfYears : [], criterias: {} }; //...

      $scope.ind = indicator;
      Restangular.all('/api/data/'+$scope.ind.id).getList().then(function (datas) {
        $scope.currentDatas = [];
        var i, iL = datas.length;
        for ( i = 0 ; i < iL ; i++ ) {
          var pureData = datas[i];
          var datasObj = {};
          datasObj.departmentId = pureData.department.id;
          datasObj.value = pureData.value;
          datasObj.public = pureData.indicator.public;
          datasObj.id = pureData.id;

          var periodType;

          if ( pureData.year.indexOf('-')  < 0 ) {  // if year value is just a year like "2013". Not "2012-2013".
            datasObj.periodType = "year";
          } else {
            datasObj.periodType = "academic";
          }

          datasObj.year = pureData.year;

          $scope.currentDatas.push(datasObj);

        }
      });

      angular.element('.js-temp-data-content').remove();

      var templatePath = 'views/pages/editData.html';
      var elem = angular.element(event.target);
      $http.get(templatePath).success(function(response) {
          var newNode = angular.element(response);
          newNode.addClass('js-temp-data-content');
          var contents = newNode.insertAfter(elem);
          $compile(contents)($scope);
      });
    };

    // New
    $scope.checkNewData = function(){
      if ( $scope.newData.departmentId && $scope.newData.departmentId != ""
        && $scope.newData.periodType && $scope.newData.periodType != ""
        && $scope.newData.year && $scope.newData.year != "") {
        $scope.newData.isInvalid = false;
      } else {
        $scope.newData.isInvalid = true;
      }
    }

    //$scope.criterias = [];
    $scope.completed = false;
    $scope.filter = function (goal, group, subgroup) {
      if (group)
        Restangular.all('/api/subGroup?group=' + group).getList().then(function (subgroups) {
          $scope.subgroups = subgroups;
        });
      if (subgroup)
        Restangular.all('/api/indicator?subgroup=' + subgroup).getList().then(function (indicators) {
          $scope.indicators = indicators;
        });
    }

     $scope.next = function(data, criteria, question, index) {
       if ($scope.state == 0) {
         $scope.data.answers = [];
         $scope.data.criterias = [];

       }
       console.log($scope.state + "-" + $scope.criterias.length);
       if ($scope.state < $scope.criterias.length) {
         console.log("Small");
         $scope.data.criterias.push($scope.criterias[$scope.state]);
       } else {
         console.log("Big");
         $scope.completed = true;
       }
       if (index) {
         console.log("index");
         $scope.data.answers[index] = question;
       } else if (index > -1) {
         console.log("no index" + index);
         $scope.data.answers[index] = question;
       }
      console.log($scope.data.answers);
      if (!$scope.criterias[state ]) {
        console.log("no state");

        Restangular.all('/api/criteria').getList().then(function(criterias) {
          $scope.criterias=criterias;
          $scope.data.criterias.push(criterias[state]);
          $scope.state++;
        });
      } else {
        console.log("else");
        $scope.data.criterias.push($scope.criterias[state ]);
        console.log($scope.data.criterias);
      }
      $scope.state++;
    }

      $scope.save = function () {
        var datas = Restangular.all('/api/data');
        var dat = {
          department: $scope.data.department.id,
          indicator: $scope.data.indicator.id,
          year: $scope.data.year,
          value: $scope.data.value,
          answer: $scope.data.answers,
          };
        datas.post(dat);
        $state.go('dashboard.data', $stateParams, {
          reload: true,
          inherit: true
        });
      }


  }).controller('DataReportCtrl', function ($scope, $http, Restangular, $state, $stateParams, $timeout) {
  Restangular.all('/api/data/').getList().then(function (datas) {
    $scope.datas = datas;
  });

}).controller('DataReportDetailCtrl', function ($scope, $http, Restangular, $state, $stateParams, $timeout) {
  Restangular.all('/api/data/' + $stateParams.department + '/' + $stateParams.indicator).getList().then(function (data) {
    $scope.data = data;
    console.log(data[0].department);
    $scope.dept = $scope.data[0].department.name;
    $scope.ind = $scope.data[0].indicator.name;
    var lbl = [];
    var dt = [];
    for (var i = 0; i < $scope.data.length; i++) {
      lbl.push($scope.data[i].year)
      dt.push($scope.data[i].value);
    }
    $scope.bar = {

      labels: lbl,
      series: ['Series A'],

      data: [
        dt

      ]

    };
  });

});
