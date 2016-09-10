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
      $scope.criterias = [{
    "questions": [{
        "name": "Yes",
        "createdAt": "2016-06-07T11:48:59.695Z",
        "updatedAt": "2016-08-24T06:17:24.341Z",
        "criteria": "5756b1e46ecb6afd7fd51bf3",
        "id": "5756b4ab6ecb6afd7fd51c07"
    }, {
        "name": "No",
        "createdAt": "2016-06-07T11:48:59.695Z",
        "updatedAt": "2016-08-24T06:17:24.341Z",
        "criteria": "5756b1e46ecb6afd7fd51bf3",
        "id": "5756b4ab6ecb6afd7fd51c08"
    }, {
        "name": "Partially",
        "createdAt": "2016-06-07T11:49:00.233Z",
        "updatedAt": "2016-08-24T06:17:24.341Z",
        "criteria": "5756b1e46ecb6afd7fd51bf3",
        "id": "5756b4ac6ecb6afd7fd51c09"
    }],
    "name": "Criteria 1 - Do we have the data for this indicator?",
    "createdAt": "2016-06-07T11:37:08.064Z",
    "updatedAt": "2016-08-24T06:17:24.337Z",
    "multiple": false,
    "id": "5756b1e46ecb6afd7fd51bf3"
}, {
    "questions": [{
        "name": "Optional",
        "createdAt": "2016-06-07T11:49:40.352Z",
        "updatedAt": "2016-06-07T11:49:40.359Z",
        "criteria": "5756b1e86ecb6afd7fd51bf4",
        "id": "5756b4d46ecb6afd7fd51c0a"
    }, {
        "name": "Compulsory",
        "createdAt": "2016-06-07T11:49:40.352Z",
        "updatedAt": "2016-06-07T11:49:40.360Z",
        "criteria": "5756b1e86ecb6afd7fd51bf4",
        "id": "5756b4d46ecb6afd7fd51c0b"
    }],
    "name": "Criteria 2 - Is this indicator optional or compulsory?",
    "createdAt": "2016-06-07T11:37:12.911Z",
    "updatedAt": "2016-06-07T11:49:40.692Z",
    "id": "5756b1e86ecb6afd7fd51bf4"
}, {
    "questions": [{
        "name": "Once per year",
        "createdAt": "2016-06-07T11:50:24.393Z",
        "updatedAt": "2016-08-24T06:17:28.963Z",
        "criteria": "5756b1ed6ecb6afd7fd51bf5",
        "id": "5756b5006ecb6afd7fd51c0d"
    }, {
        "name": "Once per semester/trimester/term",
        "createdAt": "2016-06-07T11:50:24.394Z",
        "updatedAt": "2016-08-24T06:17:28.964Z",
        "criteria": "5756b1ed6ecb6afd7fd51bf5",
        "id": "5756b5006ecb6afd7fd51c0e"
    }, {
        "name": "Once a month",
        "createdAt": "2016-06-07T11:50:24.664Z",
        "updatedAt": "2016-08-24T06:17:28.964Z",
        "criteria": "5756b1ed6ecb6afd7fd51bf5",
        "id": "5756b5006ecb6afd7fd51c0f"
    }, {
        "name": "Other",
        "createdAt": "2016-06-07T11:51:32.403Z",
        "updatedAt": "2016-08-24T06:17:28.965Z",
        "criteria": "5756b1ed6ecb6afd7fd51bf5",
        "id": "5756b5446ecb6afd7fd51c10"
    }, {
        "name": "AdHoc",
        "createdAt": "2016-06-07T11:51:32.719Z",
        "updatedAt": "2016-08-24T06:17:28.965Z",
        "criteria": "5756b1ed6ecb6afd7fd51bf5",
        "id": "5756b5446ecb6afd7fd51c11"
    }],
    "name": "Criteria 3 - How frequently do we collect the data for this indicator?",
    "createdAt": "2016-06-07T11:37:17.071Z",
    "updatedAt": "2016-08-24T06:17:28.961Z",
    "id": "5756b1ed6ecb6afd7fd51bf5"
}, {
    "questions": [{
        "name": " HR deparment",
        "createdAt": "2016-06-07T11:52:33.382Z",
        "updatedAt": "2016-06-07T11:52:54.537Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c15"
    }, {
        "name": " ICT department",
        "createdAt": "2016-06-07T11:52:33.382Z",
        "updatedAt": "2016-06-07T11:52:54.537Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c17"
    }, {
        "name": " Finance deparment",
        "createdAt": "2016-06-07T11:52:33.383Z",
        "updatedAt": "2016-06-07T11:52:54.538Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c18"
    }, {
        "name": " Strategic planning/accreditation department",
        "createdAt": "2016-06-07T11:52:33.383Z",
        "updatedAt": "2016-06-07T11:52:54.538Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c19"
    }, {
        "name": " Research deparments",
        "createdAt": "2016-06-07T11:52:33.377Z",
        "updatedAt": "2016-06-07T11:52:54.538Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c13"
    }, {
        "name": "Education/Academic departments/units",
        "createdAt": "2016-06-07T11:52:33.376Z",
        "updatedAt": "2016-06-07T11:52:54.538Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c12"
    }, {
        "name": " International office",
        "createdAt": "2016-06-07T11:52:33.377Z",
        "updatedAt": "2016-06-07T11:52:54.539Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c14"
    }, {
        "name": " Quality assurance deparment",
        "createdAt": "2016-06-07T11:52:33.382Z",
        "updatedAt": "2016-06-07T11:52:54.539Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5816ecb6afd7fd51c16"
    }, {
        "name": " Other",
        "createdAt": "2016-06-07T11:52:34.032Z",
        "updatedAt": "2016-06-07T11:52:54.539Z",
        "criteria": "5756b1f06ecb6afd7fd51bf6",
        "id": "5756b5826ecb6afd7fd51c1a"
    }],
    "name": "Criteria 4 - Who is responsible for collecting the data for this indicator? (Select more than one unit if needed)",
    "createdAt": "2016-06-07T11:37:20.783Z",
    "updatedAt": "2016-06-07T11:52:54.535Z",
    "multiple": true,
    "id": "5756b1f06ecb6afd7fd51bf6"
}, {
    "questions": [{
        "name": " Accreditation",
        "createdAt": "2016-06-07T11:53:48.477Z",
        "updatedAt": "2016-06-07T11:53:48.508Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c1c"
    }, {
        "name": " Membership records",
        "createdAt": "2016-06-07T11:53:48.478Z",
        "updatedAt": "2016-06-07T11:53:48.507Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c1d"
    }, {
        "name": " Research",
        "createdAt": "2016-06-07T11:53:48.484Z",
        "updatedAt": "2016-06-07T11:53:48.515Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c21"
    }, {
        "name": " Benchmarking",
        "createdAt": "2016-06-07T11:53:48.484Z",
        "updatedAt": "2016-06-07T11:53:48.511Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c22"
    }, {
        "name": " National statistics",
        "createdAt": "2016-06-07T11:53:48.483Z",
        "updatedAt": "2016-06-07T11:53:48.509Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c1f"
    }, {
        "name": "Educational/Academic planning",
        "createdAt": "2016-06-07T11:53:48.477Z",
        "updatedAt": "2016-06-07T11:53:48.509Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c1b"
    }, {
        "name": " Funding and budgeting",
        "createdAt": "2016-06-07T11:53:48.483Z",
        "updatedAt": "2016-06-07T11:53:48.511Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c1e"
    }, {
        "name": " Media and marketing ",
        "createdAt": "2016-06-07T11:53:48.484Z",
        "updatedAt": "2016-06-07T11:53:48.511Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c20"
    }, {
        "name": " Other",
        "createdAt": "2016-06-07T11:53:48.923Z",
        "updatedAt": "2016-06-07T11:53:48.928Z",
        "criteria": "5756b1f46ecb6afd7fd51bf7",
        "id": "5756b5cc6ecb6afd7fd51c23"
    }],
    "name": "Criteria 5 - What is this indicator used for? - Please choose all that apply",
    "createdAt": "2016-06-07T11:37:24.351Z",
    "updatedAt": "2016-06-07T11:53:48.926Z",
    "id": "5756b1f46ecb6afd7fd51bf7"
}, {
    "questions": [{
        "name": "Paper records",
        "createdAt": "2016-06-07T11:57:20.161Z",
        "updatedAt": "2016-06-07T11:57:20.180Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6a06ecb6afd7fd51c26"
    }, {
        "name": "Open source/free data management/sharing software (eg. Google docs, other)",
        "createdAt": "2016-06-07T11:57:20.170Z",
        "updatedAt": "2016-06-07T11:57:20.183Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6a06ecb6afd7fd51c29"
    }, {
        "name": "Excel database/worksheet  ",
        "createdAt": "2016-06-07T11:57:20.164Z",
        "updatedAt": "2016-06-07T11:57:20.180Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6a06ecb6afd7fd51c27"
    }, {
        "name": "Commercial data management software   ",
        "createdAt": "2016-06-07T11:57:20.169Z",
        "updatedAt": "2016-06-07T11:57:20.181Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6a06ecb6afd7fd51c28"
    }, {
        "name": "Other",
        "createdAt": "2016-06-07T11:57:20.750Z",
        "updatedAt": "2016-06-07T11:57:20.754Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6a06ecb6afd7fd51c2a"
    }, {
        "name": "Own institution's data management software",
        "createdAt": "2016-06-07T11:57:47.670Z",
        "updatedAt": "2016-06-07T11:57:47.676Z",
        "criteria": "5756b1fc6ecb6afd7fd51bf9",
        "id": "5756b6bb6ecb6afd7fd51c2b"
    }],
    "name": "Criteria 7- In what format do we collect the data for this indicator? Please tick all that apply ",
    "createdAt": "2016-06-07T11:37:32.081Z",
    "updatedAt": "2016-06-07T11:57:47.673Z",
    "id": "5756b1fc6ecb6afd7fd51bf9"
}, {
    "questions": [{
        "name": "Annual reports  ",
        "createdAt": "2016-06-07T11:58:50.124Z",
        "updatedAt": "2016-06-07T11:58:50.140Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c2c"
    }, {
        "name": "Open source/free data management/sharing software (eg. Google docs, other)",
        "createdAt": "2016-06-07T11:58:50.128Z",
        "updatedAt": "2016-06-07T11:58:50.142Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c30"
    }, {
        "name": "Institution's website",
        "createdAt": "2016-06-07T11:58:50.125Z",
        "updatedAt": "2016-06-07T11:58:50.139Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c2e"
    }, {
        "name": "Commercial data management software   ",
        "createdAt": "2016-06-07T11:58:50.128Z",
        "updatedAt": "2016-06-07T11:58:50.141Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c2f"
    }, {
        "name": "Institutions' intranet",
        "createdAt": "2016-06-07T11:58:50.125Z",
        "updatedAt": "2016-06-07T11:58:50.142Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c2d"
    }, {
        "name": "Other",
        "createdAt": "2016-06-07T11:58:50.678Z",
        "updatedAt": "2016-06-07T11:58:50.684Z",
        "criteria": "5756b1ff6ecb6afd7fd51bfa",
        "id": "5756b6fa6ecb6afd7fd51c31"
    }],
    "name": "Criteria 8 -In what format is the data for this indicator available? - Please tick all that apply ",
    "createdAt": "2016-06-07T11:37:35.911Z",
    "updatedAt": "2016-06-07T11:58:50.682Z",
    "id": "5756b1ff6ecb6afd7fd51bfa"
}, {
    "questions": [{
        "name": "Yes",
        "createdAt": "2016-06-07T11:54:17.717Z",
        "updatedAt": "2016-06-07T11:56:19.745Z",
        "criteria": "5756b1f86ecb6afd7fd51bf8",
        "id": "5756b5e96ecb6afd7fd51c24"
    }, {
        "name": "No",
        "createdAt": "2016-06-07T11:54:18.066Z",
        "updatedAt": "2016-06-07T11:56:19.750Z",
        "criteria": "5756b1f86ecb6afd7fd51bf8",
        "id": "5756b5ea6ecb6afd7fd51c25"
    }],
    "name": "Criteria 6 -Do we have procedures for ensuring the data for this indicator is accurate?",
    "createdAt": "2016-06-07T11:37:28.112Z",
    "updatedAt": "2016-06-07T11:56:19.743Z",
    "route": "/api/criteria",
    "reqParams": null,
    "restangularized": true,
    "fromServer": true,
    "parentResource": null,
    "restangularCollection": false,
    "id": "5756b1f86ecb6afd7fd51bf8"
}];
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
    var _resetScreens = function(){
      $scope.addNewScreens.screen1 = true;
      $scope.addNewScreens.screen2 = false;
      $scope.addNewScreens.screen3 = false;
      $scope.addNewScreens.screen4 = false;
      $scope.addNewScreens.screen5 = false;
    }

    // New
    var _prepareDataToEdit = function(data) {
      var editData = {value:1, isInvalid: true, yearsValues: {}, criterias: {} };

      editData.id = data.id;
      editData.departmentId = data.departmentId;
      editData.selectedIndicators = [];

      if (typeof data.indicator == "string" ) {
        editData.selectedIndicators.push(data.indicator);
      } else {
        var i = 0, iL = data.indicator.length;

        for ( ; i < iL; i++ ) {
          editData.selectedIndicators.push(data.indicator[i]);
        }
      }

      editData.periodType = data.periodType;

      editData.year = [];

      if (typeof data.year == "string" ) {
        editData.year.push(data.year);
      } else {
        var i = 0, iL = data.year.length;

        for ( ; i < iL; i++ ) {
          editData.year.push(data.year[i]);
        }
      }

      if (typeof data.value == "string" ) {
        editData.yearsValues[data.year] = data.value;
      } else {
        var i = 0, iL = data.value.length;

        for ( ; i < iL; i++ ) {
          editData.yearsValues[editData.year[i]] = data.value[i];
        }
      }

      if ( data.public == 0 ) {
        editData.public = $scope.accessToIndicators[1];
      } else if ( data.public == 1) {
        editData.public = $scope.accessToIndicators[0];
      } else {
        editData.public = data.public
      }

      editData.editMode = true;

      return editData;

    }

    // New
    $scope.saveNewData = function(data){
      debugger;
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
        debugger;
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
      Restangular.all('/api/data/'+$scope.ind.id).getList().then(function (datas) {
        $scope.currentDatas = [];
        var i, iL = datas.length;
        for ( i = 0 ; i < iL ; i++ ) {
          var pureData = datas[i];
          var datasObj = {};
          datasObj.departmentId = pureData.department.id;
          datasObj.value = pureData.value;
          datasObj.public = pureData.indicator.public;
          datasObj.indicator = pureData.indicator.id;
          datasObj.indicatorName = pureData.indicator.name;
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
