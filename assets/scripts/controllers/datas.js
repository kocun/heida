'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp', ['ngDialog', 'ngPDFViewer' ])
  .controller('DataCtrl', function ($scope, $http, Restangular, $state, $stateParams, ngDialog) {
    $scope.state = 0;
    $scope.data;
    $scope.ind = "";
    $http.get('/api/me').
    success(function(data) {
      $scope.me = data;
    });
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
    Restangular.all('/api/subdepartment').getList().then(function (subdepartments) {
      $scope.subdepartments = subdepartments;
    });
    Restangular.all('/api/data').getList().then(function (allDatas) {
      $scope.allDatas = allDatas;
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
    $scope.subUnits = function(departmentId){
      if ( departmentId && departmentId != "custom" ) {
        var k = 0, kL = $scope.departments.length;
        var subs;
        for (;k < kL; k++) {
          if ( $scope.departments[k].id == departmentId ) {
            subs = $scope.newData.subdepartments = $scope.departments[k].subs;
            break;
          }
        }
      }
      return subs;
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
    var _resetScreens = function(){
      $scope.addNewScreens.screen1 = true;
      $scope.addNewScreens.screen2 = false;
      $scope.addNewScreens.screen3 = false;
      $scope.addNewScreens.screen4 = false;
      $scope.addNewScreens.screen5 = false;
    }

    // New
    var _prepareDataToEdit = function(data) {

      var originalData = data;
      var editData = originalData;
      editData.isInvalid= true;
      var yearsValues= {};
      editData.id = data.id;
      editData.departmentId = data.departmentId.id || data.departmentId;

      editData.subdepartments = $scope.subUnits(editData.departmentId);

      var year = [];

      var i = 0, iL = data.yearsValues.length;

      for (; i < iL ; i++ ) {
        var obj = data.yearsValues[i];
        year.push(obj.year);
        yearsValues[obj.year] = obj.value;
      }

      editData.year = year;
      editData.yearsValues = yearsValues;

      var k = 0, kL = data.criterias.length;

      if (kL != 0) {
        var criteriasObj = {};
        for (; k < kL ; k++ ) {
          var obj = data.criterias[k];
          criteriasObj[obj.criteria] = obj.question;
        }
        editData.criterias = criteriasObj;
      }

      editData.editMode = true;

      return editData;

    }

    // New

    $scope.prepareYearsValues = function () {
      for ( var key in $scope.newData.yearsValues ) {
        if ($scope.newData.year && $scope.newData.year.indexOf(key) == -1 ) {
          delete $scope.newData.yearsValues[key];
        }
      }
    }

    // New
    $scope.saveNewData = function(data){
      var obj = {};
      obj.department = data.departmentId;
      obj.indicator = data.indicator;

      var yearArr = [];

      for (var year in data.yearsValues) {
        yearArr.push({
          "year":year,
          "value": data.yearsValues[year]
        });
      }
      obj.years = yearArr;


      var criteriaArr = [];

      for (var criteria in data.criterias) {
        criteriaArr.push({
          "indicator":data.indicator,
          "criteria":criteria,
          "question": data.criterias[criteria]
        });
      }
      obj.criterias = criteriaArr;

      obj.periodType = data.periodType;
      obj.public = data.public;
      /*obj.goals = data.goals;
       obj.subGroup = data.subGroupId;
       obj.subUnit = data.subUnitId;
       obj.group = $scope.groups[data.groupIndex].id;*/


      var datas = Restangular.all('/api/data');
      datas.post(obj);
      $state.go('dashboard.data', $stateParams, {
        reload: true,
        inherit: true
      });

    }

    // New
    $scope.cancelNewData = function(){
      $scope.addNewRowtoIndicator = false;
      $scope.editRowtoIndicator = false;
      _resetScreens();
      $scope.newData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} };
    }

    // New
    $scope.editDataRow = function(data){
      $scope.newData = _prepareDataToEdit(data);
      _resetScreens();
      $scope.editRowtoIndicator = true;
    }

    // New
    $scope.selectIndicatorIfAvailable = function(item,data){
      var i = 0, iL = data.selectedIndicators.length;

      for (; i < iL ; i++ ) {
        if ( item.id == data.selectedIndicators[i] ) {
          return true;
        }
      }
    }

    // New
    $scope.addData = function (indicator) {
      $scope.addNewScreens = {screen1:true}; //...
      $scope.newData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} }; //...

      $scope.ind = indicator;
      var datas = $scope.allDatas;

      $scope.currentDatas = [];
      var i, iL = datas.length;
      for ( i = 0 ; i < iL ; i++ ) {
        var pureData = datas[i];

        if ( pureData.indicator && pureData.indicator.id == $scope.ind.id ) {
          var datasObj = {};
          datasObj.departmentId =  pureData.department || pureData.department.id;
          datasObj.departmentName = pureData.department.name;
          datasObj.value = pureData.value;
          datasObj.public = pureData.public || pureData.indicator.public;
          datasObj.indicator = pureData.indicator.id || pureData.criterias.indicator;
          datasObj.indicatorName = pureData.indicator.name;
          datasObj.id = pureData.id;
          datasObj.criterias = pureData.criterias;

          if ( !datasObj.departmentName ) {
            var k = 0, kL = $scope.departments.length;

            for (;k < kL; k++) {
              if ( $scope.departments[k].id == datasObj.departmentId ) {
                datasObj.departmentName = $scope.departments[k].name;
                break;
              }
            }
          }

          if (pureData.periodType) {
            datasObj.periodType = pureData.periodType
          } else {
            if ( pureData.year.indexOf('-')  < 0 ) {  // if year value is just a year like "2013". Not "2012-2013".
              datasObj.periodType = "year";
            } else {
              datasObj.periodType = "academic";
            }
          }
          datasObj.year = pureData.year;

          datasObj.yearsValues = pureData.years;

          $scope.currentDatas.push(datasObj);
        }

      }

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
      if (!$scope.criterias[state]) {
        console.log("no state");

        Restangular.all('/api/criteria').getList().then(function (criterias) {
          $scope.criterias = criterias;
          $scope.data.criterias.push(criterias[state]);
          $scope.state++;
        });
      } else {
        console.log("else");
        $scope.data.criterias.push($scope.criterias[state]);
        console.log($scope.data.criterias);
      }
      $scope.state++;

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
      // console.log("index");
      // console.log(index);
      // console.log("state");
      // console.log($scope.state);
      // console.log("criteria");
      // console.log(criteria);
      // console.log("question");
      // console.log(question);
      // console.log("answers");
      // console.log($scope.data.answers);
      // if (!$scope.criterias[state ]) {
      //   console.log("no state");

      //   Restangular.all('/api/criteria').getList().then(function(criterias) {
      //     $scope.criterias=criterias;
      //     $scope.data.criterias.push(criterias[state]);
      //     $scope.state++;
      //   });
      // } else {
      //   console.log("else");
      //   $scope.data.criterias.push($scope.criterias[state ]);
      //   console.log($scope.data.criterias);
      // }
      // $scope.state++;
      //}

      $scope.save = function () {
        var datas = Restangular.all('/api/data');
        var dat = {
          department: $scope.data.department.id,
          indicator: $scope.data.indicator.id,
          year: $scope.data.year,
          value: $scope.data.value,
          answer: $scope.data.answers
        };
        datas.post(dat);
        $state.go('dashboard.data', $stateParams, {
          reload: true,
          inherit: true
        });
      }

    }
  })
  .controller('DataReportCtrl', 'PDFViewerService',  function ($scope, $http, Restangular, $state, $stateParams, $timeout, pdf) {
    $http.get('/api/me').
    success(function(data) {
      $scope.me = data;
    });
    Restangular.all('/api/data/').getList().then(function (datas) {
      $scope.datas = datas;
    });
  })
  .controller('DataReportDetailCtrl', function ($scope, $http, Restangular, $state, $stateParams, $timeout) {
    Restangular.all('/api/data/' + $stateParams.department + '/' + $stateParams.indicator).getList().then(function (data) {
      $scope.data = data;
      console.log(data[0].department);
      $scope.dept = $scope.data[0].department.name;
      $scope.ind = $scope.data[0].indicator.name;
      var lbl = [];
      var dt = [];
      for (var i = 0; i < $scope.data.length; i++) {
        lbl.push($scope.data[i].year);
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
