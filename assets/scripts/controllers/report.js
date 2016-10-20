angular.module('heidaApp')

.controller('DataReportCtrl', function ($scope, $http, Restangular, $state, $stateParams, $location) {
  $http.get('/api/me').
    success(function(data) {
      $scope.me = data;
    });
  Restangular.all('/api/data/').getList().then(function (datas) {
    $scope.datas = $scope.allDatas = datas;
  });
  Restangular.all('/api/indicator').getList().then(function (indicators) {
    $scope.indicators = indicators;
  });
  Restangular.all('/api/department').getList().then(function (departments) {
    $scope.departments = departments;
  });
  Restangular.all('/api/group').getList().then(function (groups) {
    $scope.groups = groups;
  });
  Restangular.all('/api/subGroup').getList().then(function (subgroups) {
    $scope.subgroups = subgroups;
  });
  $scope.clearFilter = function () {
    $scope.datas = $scope.allDatas;
  }

  $scope.getSubDepartments = function (department) {
    Restangular.all('/api/subDepartment?department=' + department.id).getList().then(function (subdepartments) {
      $scope.subdepartments = subdepartments;
    });
  }
    $scope.filterUnit = function () {
      var i = 0, iL = $scope.allDatas.length;
      var filteredDatas = [];
      for (; i < iL; i++) {
        var obj = $scope.allDatas[i];

        if ( $scope.filteredDepartment && !$scope.filteredIndicator ) {
          if (obj.department && obj.department.id == $scope.filteredDepartment) {
            filteredDatas.push(obj)
          }
        } else if ( !$scope.filteredDepartment && $scope.filteredIndicator ) {
          if ( obj.indicator && obj.indicator.id == $scope.filteredIndicator) {
            filteredDatas.push(obj)
          }
        } else {
          if ( obj.department && obj.indicator && obj.indicator.id == $scope.filteredIndicator && obj.department.id == $scope.filteredDepartment ) {
            filteredDatas.push(obj)
          }
        }
      }

      $scope.datas = filteredDatas;
    }

    $scope.getSubGroups = function (group) {
      Restangular.all('/api/subGroup?group=' + group).getList().then(function (subgroups) {
        $scope.subgroups = subgroups;
      });
    }
    $scope.filterState = false;
    $scope.filterGroup = function (subgroup,goal) {

      debugger;
      Restangular.all('/api/indicator?subgroup=' + subgroup).getList().then(function (indicators) {
        $scope.indicators = indicators;
        $scope.filterGoal = goal;
        $scope.filterState = true;
      });

      var i = 0, iL = $scope.allDatas.length;
      var filteredDatas = [];
      for (; i < iL; i++) {
        var obj = $scope.allDatas[i];

        if ( $scope.filteredGoal && !$scope.filteredGroup ) {
          if (obj.goal && obj.indicator.goal == $scope.filteredGoal) {
            filteredDatas.push(obj)
          }
        } else if ( !$scope.filteredGoal && $scope.filteredGroup ) {
          if ( obj.group && obj.group.id == $scope.filteredGroup) {
            filteredDatas.push(obj)
          }
        }
        }

      $scope.datas = filteredDatas;

      console.log($scope.datas)
      }

    $scope.deleteReport = function(dataId) {
      if (confirm('Are you sure you want to delete this indicator?')) {
        $http.delete('/api/data/' + dataId.dataId)
          .success(function () {
            $state.go('dashboard.report', $stateParams, {
              reload: true,
              inherit: true
            });
          })
      } else {
        // Do nothing!
      }

    }

})
.controller('DataReportDetailCtrl', function ($scope, $http, Restangular, $state, $stateParams, $location) {

  Restangular.all('/api/criteria').getList().then(function (criterias) {
    $scope.criterias = criterias;
  });

  $http.get('/api/data/' + $stateParams.dataId).
  success(function(data) {
    $scope.data = data;

    $http.get('/api/group/' + $scope.data.indicator.subgroup.group).success(function(grp) { $scope.data.groupName = grp.name;});

    $scope.dept = $scope.data.department.name;
    $scope.ind = $scope.data.indicator.name;
    $scope.data.valueType = $stateParams.valueType;
    if ( $stateParams.valueType != "yesno" ) {
      var lbl = [];
      var dt = [];
      for (var i = 0; i < $scope.data.years.length; i++) {
        lbl.push($scope.data.years[i].year);
        dt.push($scope.data.years[i].value);
      }
      $scope.bar = {
        labels: lbl,
        series: ['Series A'],
        data: [
          dt
        ]
      };
    } else {
      document.getElementById("canvas_container").classList.add("ng-hide");
    }

    $scope.criteriasAndAnswers = [];

    $scope.criterias.forEach(function (item, i) {
      var criObj = {};
      criObj.name = item.name;
      criObj.answers = [];

      item.questions.forEach(function (answer) {
        var myCriteriaAnswer = data.criterias[i].question;

        if (item.multiple == true) {
          myCriteriaAnswer.forEach(function (myAnswer) {
            if (answer.id == myAnswer) {
              criObj.answers.push(answer.name);
            }
          })
        } else {
          if (answer.id == myCriteriaAnswer) {
            criObj.answers.push(answer.name);
          }
        }
      })
      $scope.criteriasAndAnswers.push(criObj)
    })
  });

  var printReport = $location.path().split('/').slice([4],[7]);
  if(printReport[2] == 'print') {
    setTimeout(function(){
      window.print();
    }, 2000);
  }
});

