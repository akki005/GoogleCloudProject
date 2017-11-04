angular
  .module('app')
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/login');

    $ocLazyLoadProvider.config({
      // Set to true if you want to see what and when is dynamically loaded
      debug: true
    });

    $breadcrumbProvider.setOptions({
      prefixStateName: 'app.main',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: '/public/views/common/layouts/full.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Root',
          skip: true
        },
        resolve: {
          loadCSS: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Font Awesome',
              files: ['/public/libs/font-awesome/css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['/public/libs/simple-line-icons/css/simple-line-icons.css']
            }]);
          }],
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              serie: true,
              name: 'chart.js',
              files: [
                '/public/libs/chart.js/dist/Chart.min.js',
                '/public/libs/angular-chart.js/dist/angular-chart.min.js'
              ]
            }]);
          }],
        }
      })
      .state('app.main', {
        url: '/dashboard',
        templateUrl: '/public/views/main.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Home',
        },
        //page subtitle goes here
        params: {
          subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit'
        },
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              serie: true,
              name: 'chart.js',
              files: [
                '/public/libs/chart.js/dist/Chart.min.js',
                '/public/libs/angular-chart.js/dist/angular-chart.min.js'
              ]
            }, ]);
          }],
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['/public/app/controllers/main.js']
            });
          }]
        }
      })
      .state('appSimple', {
        abstract: true,
        templateUrl: '/public/views/common/layouts/simple.html',
        resolve: {
          loadCSS: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Font Awesome',
              files: ['/public/libs/font-awesome/css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['/public/libs/simple-line-icons/css/simple-line-icons.css']
            }]);
          }],
        }
      })

      // Additional Pages
      .state('appSimple.login', {
        url: '/login',
        templateUrl: '/public/views/pages/login.html'
      })
      .state('appSimple.register', {
        url: '/register',
        templateUrl: '/public/views/pages/register.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['/public/app/controllers/RegisterCtrl.js',
                '/public/app/services/UserServices.js',
                '/public/dist/css/main.css'
              ]
            });
          }]
        }
      })
      .state('appSimple.404', {
        url: '/404',
        templateUrl: '/public/views/pages/404.html'
      })
      .state('appSimple.500', {
        url: '/500',
        templateUrl: '/public/views/pages/500.html'
      })
      .state('appSimple.Verify', {
        url: '/Verify?key',
        templateUrl: '/public/views/pages/Verification.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['/public/app/controllers/verifyCtrl.js',
                '/public/app/services/UserServices.js'
              ]
            });
          }]
        }
      });
  }]);