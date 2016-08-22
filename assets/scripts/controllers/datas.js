'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp', ['ngDialog'])
  .controller('DataCtrl', function ($scope, $http, Restangular, $state, $stateParams, ngDialog) {
    $scope.state = 0;
    $scope.data;
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
    $scope.done = function (data, ind) {
      console.log(data);
      console.log(ind);
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
    $scope.addData = function (indicator) {
      $scope.ind = indicator;
      Restangular.all('/api/data/'+$scope.ind.id).getList().then(function (datas) {
        $scope.datas = datas;
      });
      ngDialog.open({
        template: 'views/pages/editData.html',
        scope: $scope
      });
    };
    $scope.changePeriod = function (type) {
      if (type == "academic") {
        $scope.calendar = [{
          val: "2006-2007"
        }, {
          val: "2007-2008"
        }, {
          val: "2008-2009"
        }, {
          val: "2009-2010"
        }, {
          val: "2010-2011"
        }, {
          val: "2011-2012"
        }, {
          val: "2012-2013"
        }, {
          val: "2013-2014"
        }, {
          val: "2014-2015"
        }, {
          val: "2015-2016"
        }, {
          val: "2016-2017"
        }, {
          val: "2017-2018"
        }, {
          val: "2018-2019"
        }, {
          val: "2019-2020"
        }, {
          val: "2020-2021"
        }, {
          val: "2021-2022"
        }, {
          val: "2022-2023"
        }];
      } else {
        $scope.calendar = [{
          val: "2007"
        }, {
          val: "2008"
        }, {
          val: "2009"
        }, {
          val: "2010"
        }, {
          val: "2011"
        }, {
          val: "2012"
        }, {
          val: "2013"
        }, {
          val: "2014"
        }, {
          val: "2015"
        }, {
          val: "2016"
        }, {
          val: "2017"
        }, {
          val: "2018"
        }, {
          val: "2019"
        }, {
          val: "2020"
        }, {
          val: "2021"
        }, {
          val: "2022"
        }, {
          val: "2023"
        }];
      }

    };
    $scope.criterias = [];
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

    $scope.calendar = [{
      val: "2007"
    }, {
      val: "2008"
    }, {
      val: "2009"
    }, {
      val: "2010"
    }, {
      val: "2011"
    }, {
      val: "2012"
    }, {
      val: "2013"
    }, {
      val: "2014"
    }, {
      val: "2015"
    }, {
      val: "2016"
    }, {
      val: "2017"
    }, {
      val: "2018"
    }, {
      val: "2019"
    }, {
      val: "2020"
    }, {
      val: "2021"
    }, {
      val: "2022"
    }, {
      val: "2023"
    }];
    /*
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
     */
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
