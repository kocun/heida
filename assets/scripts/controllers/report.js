angular.module('heidaApp')

  .controller('DataReportCtrl', function ($scope, $http, Restangular, $state, $stateParams, $location) {
    $http.get('/api/me').
    success(function(data) {
      $scope.me = data;
    });
    Restangular.all('api/data').getList().then(function (datas) {
      $scope.datas = $scope.allDatas = datas;
    });
    Restangular.all('api/indicator').getList().then(function (indicators) {
      $scope.indicators = indicators;
    });
    Restangular.all('api/department').getList().then(function (departments) {
      $scope.departments = departments;
    });
    Restangular.all('api/group').getList().then(function (groups) {
      $scope.groups = groups;
    });
    Restangular.all('api/subGroup').getList().then(function (subgroups) {
      $scope.subgroups = subgroups;
    });




    $scope.clearFilter = function () {
      $scope.datas = $scope.allDatas;
      $scope.filterState = false;
    }

    function dynamicSort(property,type) {
      var sortOrder = 1;
      if(type === "desc") {
        sortOrder = -1;
      }

      return function (a,b) {
        var val = a, vall = b;
        var prop = property.split('.');

        for (var i = 0; i<prop.length; i++) {
          val = val ? val[prop[i]] : " ";
          vall = vall ? vall[prop[i]] : " "
        }
        var result = (val < vall) ? -1 : (val > vall) ? 1 : 0;
        return result * sortOrder;
      }
    }
    $scope.sortName = 'none';
    $scope.sortData = function (name, type) {
      var sortName;

      name = name || $scope.sortName;

      switch(name) {
        case 'ind-code':
          sortName = "indicator.code";
          break;
        case 'ind-name':
          sortName = "indicator.name";
          break;
        case 'unit':
          sortName = "department.name";
          break;
        case 'subUnit':
          sortName = "subDepartment.name";
          break;
        case 'nameUnit':
          sortName = "departmentDesc";
          break;
      }

      $scope.sortType = type || ($scope.sortType || "asc");
      $scope.datas = $scope.datas.sort(dynamicSort(sortName, $scope.sortType));

    }
    $scope.filterIndicatorType = function(){
        if($scope.indicatorTypeValue == true){
          var i = 0, iL = $scope.allDatas.length;
          var filteredDatas = [];
          for (; i < iL; i++) {
              var obj = $scope.allDatas[i];

              if (obj.indicator.code.slice([1],[3]) == '10') {
                  filteredDatas.push(obj);
                  $scope.indicatorTypeValue = true;
                  $scope.datas = filteredDatas;
              } else {
                  $scope.datas = $scope.allDatas;
                  $scope.indicatorTypeValue = false;
              }

          }

          $scope.filterState = true;


      } else {
          $scope.datas = $scope.allDatas;
          $scope.filterState = false;
          $scope.indicatorTypeValue = false;
      }

    }
    $scope.filterDuplicateIndicatorCode = function(indicatorCode){

        var i = 0, iL = $scope.allDatas.length;
        var filteredDatas = [];
        for (; i < iL; i++) {
            var obj = $scope.allDatas[i];

            if (obj.indicator.code == indicatorCode) {
                filteredDatas.push(obj)
            }

        }

        $scope.datas = filteredDatas;
        $scope.filterState = true;
      }
      $scope.filterDuplicateIndicatorNameOfUnit = function(nameOfUnit){

          var i = 0, iL = $scope.allDatas.length;
          var filteredDatas = [];
          for (; i < iL; i++) {
              var obj = $scope.allDatas[i];

              if (obj.departmentDesc == nameOfUnit) {
                  filteredDatas.push(obj)
              }

          }

          $scope.datas = filteredDatas;
          $scope.filterState = true;
      }
    $scope.getSubDepartments = function (department) {
      Restangular.all('api/subDepartment?department=' + department.id).getList().then(function (subdepartments) {
        $scope.subdepartments = subdepartments;
      });
    }
    $scope.filterUnit = function () {
      var i = 0, iL = $scope.allDatas.length;
      var filteredDatas = [];
      for (; i < iL; i++) {
        var obj = $scope.allDatas[i];

        if (obj.subDepartment && obj.subDepartment.id == $scope.filteredSubDepartment.id) {
          filteredDatas.push(obj)
        }
      }

      $scope.datas = filteredDatas;
      $scope.filterState = true;
    }

    $scope.getSubGroups = function (group) {
      Restangular.all('api/subGroup?group=' + group).getList().then(function (subgroups) {
        $scope.subgroups = subgroups;
      });
    }

    $scope.filterState = false;

    $scope.filterGroup = function (subgroup,goal) {
      var i = 0, iL = $scope.allDatas.length;
      var filteredDatas = [];
      for (; i < iL; i++) {
        var obj = $scope.allDatas[i];

        if (obj.indicator && obj.indicator.subgroup == subgroup) {
          if (obj.indicator[goal] > 1) {
            filteredDatas.push(obj)
          }
        }
      }

      $scope.datas = filteredDatas;
      $scope.filterState = true;
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

    Restangular.all('api/criteria').getList().then(function (criterias) {
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

      var lastCriteriaId;

      $scope.criterias.forEach(function (item, i) {
        var criObj = {};
        criObj.name = item.name;
        criObj.answers = [];

          var dataCriterias = $scope.data.criterias[i];


          if (dataCriterias.criteria.indexOf('_other') > -1 ) {
              return false;
          }

        item.questions.forEach(function (answer) {

          var myCriteriaAnswer = dataCriterias.question;


          if (item.multiple == true) {

              if ( typeof myCriteriaAnswer == "string" )
                  myCriteriaAnswer = [myCriteriaAnswer];

              myCriteriaAnswer.forEach(function (myAnswer) {
                  if (answer.id == myAnswer) {


                      if(answer.name.trim().toLowerCase() == "other") {
                          var myCriteriaFreeText = dataCriterias.freeText;
                          criObj.answers.push(myCriteriaFreeText);
                      } else {
                          criObj.answers.push(answer.name);
                      }
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

