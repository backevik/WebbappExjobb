'use strict';

var myApp = angular.module('myApp.steps', ['ngRoute', 'chart.js']);

myApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.get = {};
}]);

myApp.config(['ChartJsProvider',function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colours : [ '#0075B0', '#A3DD00']});
}]);

myApp.controller('StepsCtrl', function($scope, $location, $http, $filter) {
  $scope.ssn = $location.search().ssn;
  $scope.fname = $location.search().fname;
  $scope.surname = $location.search().surname;

  $scope.listOfDevices = [];

  $scope.labels = [];
  $scope.series = [];
  $scope.stepdata = [];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  var config = {
    headers:  {
        'key': 'xfDJ9rtlYqTC'
    }
  };

  $http.get('http://46.101.96.201:8080/api/users/devices/'+$scope.ssn, config)
  .success(function (data) {
                $scope.listOfDevices = data;
                var tempstepdata = [];
                var templabels = [];
                var devices = [];
                angular.forEach($scope.listOfDevices, function(value, index){
                  $http.get('http://46.101.96.201:8080/api/steps/'+value.crypt, config)
                  .success(function (data) {
                                var stepjson = data;
                                var first = true;
                                var currentdate = new Date();
                                var weekdate = new Date();
                                weekdate.setTime(currentdate.getTime()-(30*24*3600000));
                                angular.forEach(stepjson, function(value, index){
                                  var v = new Date(value.timestamp*1);
                                  var date = new Date(v);
                                  //var date = $filter('date')(v, 'd MMMM yyyy');
                                  console.log(date + ", " + weekdate);
                                  if(date.getTime() > weekdate.getTime()){
                                    tempstepdata.push(value.steps);
                                    var n = date.toLocaleDateString();
                                    templabels.push(n);
                                  }

                                });
                                $scope.series.push("Device "+value.code);
                  });
                });
                $scope.labels = templabels;
                $scope.stepdata = [ tempstepdata ];
                console.log($scope.stepdata);
  });

  $scope.navigateDetail = function(ssn,fname,surname){
    $location.path('/detail').search({ssn: ssn, fname: fname, surname: surname});
  };
  $scope.navigateSteps = function(ssn,fname,surname){
    $location.path('/steps').search({ssn: ssn, fname: fname, surname: surname});
  };
  $scope.navigateAsthma = function(ssn,fname,surname){
    $location.path('/asthma').search({ssn: ssn, fname: fname, surname: surname});
  };
  $scope.navigateAnxdep = function(ssn,fname,surname){
    $location.path('/anxdep').search({ssn: ssn, fname: fname, surname: surname});
  };
  $scope.navigateMsg = function(ssn,fname,surname){
    $location.path('/message').search({ssn: ssn, fname: fname, surname: surname});
  };
});
