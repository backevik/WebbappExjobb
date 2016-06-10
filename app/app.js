'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.detail',
  'myApp.steps',
  'myApp.restfulFactory',
  'myApp.message',
  'myApp.asthma',
  'myApp.anxdep',
  'myApp.home'
]).
config(['$routeProvider', function($routeProvider){
  //routes here
  $routeProvider.when('/anxdep', {
    templateUrl: 'forms/anxdep.html',
    controller: 'AnxdepCtrl'
  });
  $routeProvider.when('/asthma', {
    templateUrl: 'forms/asthma.html',
    controller: 'AsthmaCtrl'
  });
  $routeProvider.when('/message', {
    templateUrl: 'message/message.html',
    controller: 'MessageCtrl'
  });
  $routeProvider.when('/steps', {
    templateUrl: 'steps/steps.html',
    controller: 'StepsCtrl'
  });
  $routeProvider.when('/detail', {
    templateUrl: 'detail/detail.html',
    controller: 'DetailCtrl',
    reloadOnSearch:false
  });
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.otherwise({
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);
