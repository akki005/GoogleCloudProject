// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';

angular
  .module('app', [
    'ui.router',
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'angular-loading-bar',
    'toaster',
    'ngAnimate',
    '720kb.tooltips',
    'ngSanitize'
  ])
  .constant('FORM_VALIDATION_REGEX', {
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@]).{8,}$/
  })
  .config(['cfpLoadingBarProvider', 'tooltipsConfProvider', function (cfpLoadingBarProvider, tooltipsConfProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;
    tooltipsConfProvider.configure({
      'speed': 'slow'
    });
  }])
  .run(['$transitions', '$rootScope', '$state', '$stateParams', '$location', 'UserServices', function ($transitions, $rootScope, $state, $stateParams, $location, UserServices) {
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }]);