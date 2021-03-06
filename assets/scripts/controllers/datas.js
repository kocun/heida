'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp', ['ngDialog'])
  .controller('DataCtrl', function ($scope, $http, $compile, Restangular, $state, $stateParams, ngDialog) {
    $scope.state = 0;
    $scope.data;
    $scope.ind = "";
    $http.get('api/me').
    success(function(data) {
      $scope.me = data;
    });
    Restangular.all('api/group').getList().then(function (groups) {
      $scope.groups = groups;
    });
    Restangular.all('api/subGroup').getList().then(function (subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.all('api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });
    Restangular.all('api/department').getList().then(function (departments) {
      $scope.departments = departments;
    });
    Restangular.all('api/subdepartment').getList().then(function (subdepartments) {
      $scope.subdepartments = subdepartments;
    });
    Restangular.all('api/data').getList().then(function (allDatas) {
      $scope.allDatas = allDatas;
    });
    Restangular.all('api/criteria').getList().then(function (criterias) {
      $scope.criterias = criterias;
    });
    Restangular.all('api/goal').getList().then(function (goals) {
      $scope.goals = goals;
    });

    $scope.calendarArr = (function(){
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
    $scope.periodRange = function (type) {
      return $scope[type+"Arr"];
    }

    $scope.otherTexts = {};

    $scope.isOtherSelected = function (id, surveyData) {
      var id = $(id).val();
      var isOther = false;

      surveyData.questions.forEach(function (e) {
        if (id == e.id) {
          if (e.name.toLowerCase() == "other") {
            isOther = true;
          }
        }
      })

      $scope.otherTexts[surveyData.id] = isOther;

    }

    $scope.isMultipleOtherSelected = function (id, surveyData) {
      var select = $(id)[0];
      var selectedValues = $(select).val();
      var options = $(select.options);
      var otherId;

      options.each(function (i,e) {
        if (e.text.toLowerCase() == 'other' ) {
          otherId = e.value;
        }
      })

      var isOther = false;

      selectedValues.forEach(function (el) {
        if ( el == otherId ) {
          isOther = true;
        }
      })

      $scope.otherTexts[surveyData.id] = isOther;

    };

    $scope.periodArrObj = [{
      value: "calendar",
      label: 'Calendar Year'
    }, {
      value: "academic",
      label: 'Academic Year'
    }];

    $scope.addRow = function () {
      $scope.newData.indicatorName = $scope.ind.name;
      $scope.newData.subGroupId = $scope.ind.subgroup.id;
      $scope.newData.group = $scope.ind.subgroup.group;
      $scope.newData.yearNotSelected = true;
      $scope.newData[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'other'] = true;
      $scope.newData.public = $scope.ind.public;
      $scope.newData.indicator = $scope.ind.id;
      $scope.newData.group = $scope.ind.subgroup.group;
    }

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

    $scope.accessToIndicators = ["Public","Staff only","Not sure"];

    var _resetScreens = function(){
      $scope.addNewScreens.screen1 = true;
      $scope.addNewScreens.screen2 = false;
      $scope.addNewScreens.screen3 = false;
    }

    var _prepareDataToEdit = function(data) {
      var originalData = data;
      var editData = originalData;
      editData.isInvalid= true;
      var yearsValues= {};
      editData.id = data.id;
      editData.departmentId = data.departmentId.id || data.departmentId;

      editData.subdepartments = $scope.subUnits(editData.departmentId);
      editData.otherUnit = originalData.departmentDesc || originalData.otherUnit;
      editData.subUnitId = originalData.subDepartment || originalData.subUnitId.id;
      editData.subDepartmentLists = originalData.subDepartmentLists;

      var year = [];

      var i = 0, iL = data.yearsValues.length;

      for (; i < iL ; i++ ) {
        var obj = data.yearsValues[i];
        year.push(obj.year);
        yearsValues[obj.year] = (data.numeric || data.percentage || data.yesno) ? 1*obj.value : obj.value;
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

      editData.id = data.id;

      editData[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'percentage'] = true;
      editData.public = $scope.ind.public;
      editData.indicator = $scope.ind.id;

      editData.editMode = true;

      return editData;

    }

    $scope.prepareYearsValues = function () {
      for ( var key in $scope.newData.yearsValues ) {
        if ($scope.newData.year && $scope.newData.year.indexOf(key) == -1 ) {
          delete $scope.newData.yearsValues[key];
        }
      }
    }

    $scope.saveNewData = function(data){
      var obj = {};
      obj.department = data.departmentId;
      obj.subDepartment = data.subUnitId;
      obj.departmentDesc = data.otherUnit;
      obj.indicator = data.indicator;

      var yearArr = [];

      for (var year in data.yearsValues) {
        yearArr.push({
          "year":year,
          "value": $scope.ind.valueType == "yes/no" ? data.yearsValues[year] : data.yearsValues[year]*1
        });
      }
      obj.years = yearArr;

      var criteriaArr = [];

      for (var criteria in data.criterias) {

        if (criteria.indexOf('_other')>-1) {
          continue;
        }


        var answerObj = {
          "indicator":data.indicator,
          "criteria":criteria,
          "question": data.criterias[criteria]
        };

        if ( data.criterias[criteria+'_other'] ) {
          answerObj.freeText = data.criterias[criteria+'_other'];
        }

        criteriaArr.push(answerObj);
      }
      obj.criterias = criteriaArr;

      obj.periodType = data.periodType;
      obj.public = data.public;

      /*obj.goals = data.goals;
       obj.subGroup = data.subGroupId;
       obj.subUnit = data.subUnitId;
       obj.group = $scope.groups[data.groupIndex].id;*/
      if (!obj.department || !obj.years) {
        alert('You must choose a Department and/or Year to save your selection');
        return false
      } else {

        if ( $scope.editRowtoIndicator ) {

          var maniReq = {
            method: 'PUT',
            url: 'api/data/'+data.id,
            headers: {
              'Content-Type': 'application/json'
            },
            data: obj
          }

          $http(maniReq).then(function(){
            $state.go('dashboard.data', $stateParams, {
              reload: true,
              inherit: true
            });
          }, function(err){console.log(err)});
        } else {
          var datas = Restangular.all('api/data');
          datas.post(obj);
          $state.go('dashboard.data', $stateParams, {
            reload: true,
            inherit: true
          });
        }
      }
    }

    $scope.changeYearValueType = function(yearStr) {
      if ( !$scope.newData[yearStr] )
        $scope.newData.yearsValues[yearStr] = undefined;
    }

    $scope.cancelNewData = function(){
      $scope.addNewRowtoIndicator = false;
      $scope.editRowtoIndicator = false;
      $scope.newData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} };
    }

    $scope.editDataRow = function(data){
      $scope.newData = _prepareDataToEdit(data);
      $scope.newData.indicator = $scope.ind.id;
      $scope.newData.indicatorName = $scope.ind.name;
      $scope.newData.subGroupId = $scope.ind.subgroup.id;
      $scope.newData.group = $scope.ind.subgroup.group;
      $scope.editRowtoIndicator = true;
    }

    $scope.addData = function (indicator) {
      $scope.cancelNewData();
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
          datasObj[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'numeric'] = true;
          datasObj.public = $scope.ind.public;
          datasObj.indicator = $scope.ind.id;
          datasObj.indicatorName = $scope.ind.name;
          datasObj.id = pureData.id;
          datasObj.criterias = pureData.criterias;
          datasObj.otherUnit = pureData.departmentDesc;
          datasObj.subUnitId = pureData.subDepartment;


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

    $scope.checkNewData = function(){
      if ( $scope.newData.departmentId && $scope.newData.departmentId != ""
        && $scope.newData.periodType && $scope.newData.periodType != ""
        && $scope.newData.year && $scope.newData.year != "") {
        $scope.newData.isInvalid = false;
      } else {
        $scope.newData.isInvalid = true;
      }
    }

    $scope.completed = false;
    $scope.getSubGroups = function (group) {
      Restangular.all('api/subGroup?group=' + group).getList().then(function (subgroups) {
        $scope.subgroups = subgroups;
      });
    }
    $scope.filterState = false;
    $scope.filter = function (subgroup,goal) {
      Restangular.all('api/indicator?subgroup=' + subgroup).getList().then(function (indicators) {
        $scope.indicators = indicators;
        $scope.filterGoal = goal;
        $scope.filterState = true;
      });
    }
    $scope.clearFilter = function (subgroup) {
      $scope.filterState = false;
      $scope.filterGoal = false;
      Restangular.all('api/indicator').getList().then(function (indicators) {
        $scope.indicators = indicators;
      });
    }

    $scope.validatePercentage = function(val,objName){
      var currentValue;
      if ( val > 100 ) {
        var strVal = (""+val);
        var currentValue = parseInt(strVal.substring(0, strVal.length - 1));
        $scope.newData.yearsValues[objName] = currentValue;
      }
    }

  })
  .controller('DataEditCtrl', function ($scope, $http, $compile, Restangular, $state, $stateParams, ngDialog, $location) {
    $scope.state = 0;
    $scope.data;
    $scope.ind = "";
    $http.get('api/me').
      success(function(data) {
        $scope.me = data;
      });
    Restangular.all('api/group').getList().then(function (groups) {
      $scope.groups = groups;
    });
    Restangular.all('api/subGroup').getList().then(function (subgroups) {
      $scope.subgroups = subgroups;
    });
    Restangular.all('api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });
    Restangular.all('api/department').getList().then(function (departments) {
      $scope.departments = departments;
    });
    Restangular.all('api/subdepartment').getList().then(function (subdepartments) {
      $scope.subdepartments = subdepartments;
    });
    Restangular.all('api/data').getList().then(function (allDatas) {
      $scope.allDatas = allDatas;
    });
    Restangular.all('api/criteria').getList().then(function (criterias) {
      $scope.criterias = criterias;

    });
    Restangular.all('api/goal').getList().then(function (goals) {
      $scope.goals = goals;
    });

    Restangular.one('api/data', $stateParams.id).get().then(function() {
      $scope.cancelNewData();
      $scope.newData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} }; //...
      var datas = $scope.allDatas;

      var dataIdPath = $location.path().split('/').slice([3],[6]);
      $scope.currentDatas = [];
      var i, iL = datas.length;
      for ( i = 0 ; i < iL ; i++ ) {
        var pureData = datas[i];
        $scope.ind = pureData.indicator;
        if ( pureData.indicator && pureData.indicator.id == $scope.ind.id && dataIdPath == pureData.id) {
          var datasObj = {};
          datasObj.departmentId =  pureData.department || pureData.department.id;
          datasObj.departmentName = pureData.department.name;
          datasObj.value = pureData.value;
          datasObj[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'numeric'] = true;
          datasObj.public = $scope.ind.public;
          datasObj.indicator = $scope.ind.id;
          datasObj.indicatorName = $scope.ind.name;
          datasObj.id = pureData.id;
          datasObj.criterias = pureData.criterias;
          datasObj.otherUnit = pureData.departmentDesc;
          datasObj.subUnitId = pureData.subDepartment;


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

    });
    $scope.calendarArr = (function(){
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

    $scope.periodRange = function (type) {
      return $scope[type+"Arr"];
    }
    $scope.otherTexts = {};

    $scope.isOtherSelected = function (id, surveyData) {
      var id = $(id).val();
      var isOther = false;

      surveyData.questions.forEach(function (e) {
        if (id == e.id) {
          if (e.name.toLowerCase() == "other") {
            isOther = true;
          }
        }
      })

      $scope.otherTexts[surveyData.id] = isOther;

    };

    $scope.isMultipleOtherSelected = function (id, surveyData) {
      var select = $(id)[0];
      var selectedValues = $(select).val();
      var options = $(select.options);
      var otherId;

      options.each(function (i,e) {
        if (e.text.toLowerCase() == 'other' ) {
          otherId = e.value;
        }
      })

      var isOther = false;

      selectedValues.forEach(function (el) {
        if ( el == otherId ) {
          isOther = true;
        }
      })

      $scope.otherTexts[surveyData.id] = isOther;

    };

    $scope.periodArrObj = [{
      value: "calendar",
      label: 'Calendar Year'
    }, {
      value: "academic",
      label: 'Academic Year'
    }];

    $scope.addRow = function () {
      $scope.newData.indicatorName = $scope.ind.name;
      $scope.newData.subGroupId = $scope.ind.subgroup.id;
      $scope.newData.group = $scope.ind.subgroup.group;
      $scope.newData.yearNotSelected = true;
      $scope.newData[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'other'] = true;
      $scope.newData.public = $scope.ind.public;
      $scope.newData.indicator = $scope.ind.id;
      $scope.newData.group = $scope.ind.subgroup.group;
    }

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

    $scope.accessToIndicators = ["Public","Staff only","Not sure"];

    var _resetScreens = function(){
      $scope.addNewScreens.screen1 = true;
      $scope.addNewScreens.screen2 = false;
      $scope.addNewScreens.screen3 = false;
    }

    var _prepareDataToEdit = function(data) {
      var originalData = data;
      var editData = originalData;
      editData.isInvalid= true;
      var yearsValues= {};
      editData.id = data.id;
      editData.departmentId = data.departmentId.id || data.departmentId;

      editData.subdepartments = $scope.subUnits(editData.departmentId);
      editData.otherUnit = originalData.departmentDesc || originalData.otherUnit;
      editData.subUnitId = originalData.subDepartment || originalData.subUnitId.id;
      editData.subDepartmentLists = originalData.subDepartmentLists;

      var year = [];

      var i = 0, iL = data.yearsValues.length;
      for (; i < iL ; i++ ) {
        var obj = data.yearsValues[i];
        year.push(obj.year);
        yearsValues[obj.year] = (data.numeric || data.percentage || data.yesno) ? 1*obj.value : obj.value;
      }

      editData.year = year;
      editData.yearsValues = yearsValues;

      var k = 0, kL = data.criterias.length;
      var otherTextsObj = {};

      if (kL != 0) {
        var criteriasObj = {};
        for (; k < kL ; k++ ) {
          var obj = data.criterias[k];
          criteriasObj[obj.criteria] = obj.question;
          if(obj.freeText) {
            otherTextsObj[obj.criteria] = obj.freeText;
            criteriasObj[obj.criteria+'_other'] = obj.freeText;
          }
        }
        editData.criterias = criteriasObj;
        editData.otherText = otherTextsObj;
      }

      editData.id = data.id;

      editData[$scope.ind.valueType ? $scope.ind.valueType.toLowerCase().replace('/','') : 'percentage'] = true;
      editData.public = $scope.ind.public;
      editData.indicator = $scope.ind.id;

      editData.editMode = true;

      return editData;

    }

    $scope.prepareYearsValues = function () {
      for ( var key in $scope.newData.yearsValues ) {
        if ($scope.newData.year && $scope.newData.year.indexOf(key) == -1 ) {
          delete $scope.newData.yearsValues[key];
        }
      }
    }

    $scope.saveNewData = function(data){
      var obj = {};
      obj.department = data.departmentId;
      obj.subDepartment = data.subUnitId;
      obj.departmentDesc = data.otherUnit;
      obj.indicator = data.indicator;
      var yearArr = [];

      for (var year in data.yearsValues) {
        yearArr.push({
          "year":year,
          "value": $scope.ind.valueType == "yes/no" ? data.yearsValues[year] : data.yearsValues[year]*1
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
      if ( $scope.editRowtoIndicator ) {

        var maniReq = {
          method: 'PUT',
          url: 'api/data/'+data.id,
          headers: {
            'Content-Type': 'application/json'
          },
          data: obj
        }

        $http(maniReq).then(function(){
          $state.go('dashboard.data', $stateParams, {
            reload: true,
            inherit: true
          });
        }, function(err){console.log(err)});
      } else {
        var datas = Restangular.all('api/data');
        datas.post(obj);
        $state.go('dashboard.data', $stateParams, {
          reload: true,
          inherit: true
        });
      }
    }

    $scope.changeYearValueType = function(yearStr) {
      if ( !$scope.newData[yearStr] )
        $scope.newData.yearsValues[yearStr] = undefined;
    }

    $scope.cancelNewData = function(){
      $scope.addNewRowtoIndicator = false;
      $scope.editRowtoIndicator = false;
      $scope.newData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} };
    }

    $scope.editDataRow = function(data){
      $scope.newData = _prepareDataToEdit(data);
      $scope.newData.indicator = $scope.ind.id;
      $scope.newData.indicatorName = $scope.ind.name;
      $scope.newData.subGroupId = $scope.ind.subgroup.id;
      $scope.newData.group = $scope.ind.subgroup.group;
      $scope.editRowtoIndicator = true;
    }


    $scope.checkNewData = function(){
      if ( $scope.newData.departmentId && $scope.newData.departmentId != ""
        && $scope.newData.periodType && $scope.newData.periodType != ""
        && $scope.newData.year && $scope.newData.year != "") {
        $scope.newData.isInvalid = false;
      } else {
        $scope.newData.isInvalid = true;
      }
    }

    $scope.completed = false;
    $scope.getSubGroups = function (group) {
      Restangular.all('api/subGroup?group=' + group).getList().then(function (subgroups) {
        $scope.subgroups = subgroups;
      });
    }

    $scope.validatePercentage = function(val,objName){
      var currentValue;
      if ( val > 100 ) {
        var strVal = (""+val);
        var currentValue = parseInt(strVal.substring(0, strVal.length - 1));
        $scope.newData.yearsValues[objName] = currentValue;
      }
    }
  })
