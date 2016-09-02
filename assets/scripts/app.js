'use strict';
/**
 * @ngdoc overview
 * @name heidaApp
 * @description
 * # heidaApp
 *
 * Main module of the application.
 */
angular
  .module('heidaApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'restangular'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      debug: false,
      events: true
    });
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
          loadMyDirectives: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/directives/header/header.js',
                'scripts/directives/sidebar/sidebar.js',
                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
              ]
            }),
              $ocLazyLoad.load({
                name: 'toggle-switch',
                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                  "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                ]
              }),
              $ocLazyLoad.load({
                name: 'ngAnimate',
                files: ['bower_components/angular-animate/angular-animate.js']
              }),
              $ocLazyLoad.load({
                name: 'ngCookies',
                files: ['bower_components/angular-cookies/angular-cookies.js']
              }),
              $ocLazyLoad.load({
                name: 'ngResource',
                files: ['bower_components/angular-resource/angular-resource.js']
              })
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'views/dashboard/home.html',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/main.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/pages/login.html',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/login.js'
              ]
            })
          }
        }
      })
      .state('dashboard.chart', {
        templateUrl: 'views/chart.html',
        url: '/chart',
        controller: 'ChartCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'chart.js',
              files: [
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
              $ocLazyLoad.load({
                name: 'heidaApp',
                files: ['scripts/controllers/chartContoller.js']
              })
          }
        }
      })
      .state('dashboard.profile', {
        controller: 'LoginCtrl',
        templateUrl: 'views/pages/profile.html',
        url: '/profile',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/login.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.users', {
        controller: 'UserCtrl',
        templateUrl: 'views/pages/users.html',
        url: '/users/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/users.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.users_edit', {
        controller: 'UserEditCtrl',
        templateUrl: 'views/pages/users_edit.html',
        url: '/users/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/users.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.departments', {
        controller: 'DepartmentCtrl',
        templateUrl: 'views/pages/departments.html',
        url: '/departments/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/departments.js'
              ]
            })
          }
        }
      })
      .state('dashboard.departments_edit', {
        controller: 'DepartmentEditCtrl',
        templateUrl: 'views/pages/departments_edit.html',
        url: '/departments/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/departments.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.sub-departments', {
        controller: 'SubdepartmentCtrl',
        templateUrl: 'views/pages/sub-departments.html',
        url: '/sub-departments/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/sub-departments.js'
              ]
            })
          }
        }
      })
      .state('dashboard.goals', {
        controller: 'GoalCtrl',
        templateUrl: 'views/pages/goals.html',
        url: '/goals/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/goals.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.goals_edit', {
        controller: 'GoalEditCtrl',
        templateUrl: 'views/pages/goals_edit.html',
        url: '/goals/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/goals.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.groups', {
        controller: 'GroupCtrl',
        templateUrl: 'views/pages/groups.html',
        url: '/groups/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/groups.js'
              ]
            })
          }
        }
      })
      .state('dashboard.groups_edit', {
        controller: 'GroupEditCtrl',
        templateUrl: 'views/pages/groups_edit.html',
        url: '/groups/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/groups.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.sub-groups', {
        controller: 'SubgroupCtrl',
        templateUrl: 'views/pages/sub-groups.html',
        url: '/sub-groups/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/sub-groups.js'
              ]
            })
          }
        }
      })
      .state('dashboard.sub-groups_edit', {
        controller: 'SubgroupEditCtrl',
        templateUrl: 'views/pages/sub-groups_edit.html',
        url: '/sub-groups/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/sub-groups.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.indicators', {
        controller: 'IndicatorCtrl',
        templateUrl: 'views/pages/indicators.html',
        url: '/indicators/',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/indicators.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.indicators_new', {
        controller: 'IndicatorNewCtrl',
        templateUrl: 'views/pages/indicators_new.html',
        url: '/indicators/new',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/indicators.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'

              ]
            })
          }
        }
      })
      .state('dashboard.indicators_edit', {
        controller: 'IndicatorEditCtrl',
        templateUrl: 'views/pages/indicators_edit.html',
        url: '/indicators/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/indicators.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js',
                'scripts/directives/dashboard/selectd.js'

              ]
            })
          }
        }
      })
      .state('dashboard.criterias', {
        controller: 'CriteriaCtrl',
        templateUrl: 'views/pages/criterias.html',
        url: '/criterias',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/criterias.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.criterias_edit', {
        controller: 'CriteriaEditCtrl',
        templateUrl: 'views/pages/criterias_edit.html',
        url: '/criterias/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/criterias.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.questions', {
        controller: 'QuestionCtrl',
        templateUrl: 'views/pages/questions.html',
        url: '/questions',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/questions.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.questions_edit', {
        controller: 'QuestionEditCtrl',
        templateUrl: 'views/pages/questions_edit.html',
        url: '/questions/:id',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/questions.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.data', {
        controller: 'DataCtrl',
        templateUrl: 'views/pages/data.html',
        url: '/data',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/datas.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js',
                'bower_components/ng-dialog/js/ngDialog.js',
                'bower_components/ng-dialog/css/ngDialog.css'
              ]
            })
          }
        }
      })
      .state('dashboard.report', {
        controller: 'DataReportCtrl',
        templateUrl: 'views/pages/reports.html',
        url: '/report',
        resolve: {
          loadMyFiles: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'heidaApp',
              files: [
                'scripts/controllers/report.js'
              ]
            })
          }
        }
      })
      .state('dashboard.report_detail', {
        templateUrl: 'views/pages/reports_detail.html',
        url: '/report/detail/:department/:indicator',
        controller: 'DataReportDetailCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'chart.js',
              files: [
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
              $ocLazyLoad.load({
                name: 'heidaApp',
                files: ['scripts/controllers/report.js']
              })
          }
        }
      })

  }]);



