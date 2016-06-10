'use strict';

var myApp = angular.module('myApp.anxdep', ['ngRoute', 'chart.js']);

myApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.get = {};
}]);

myApp.config(['ChartJsProvider',function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colours : [ '#0075B0', '#A3DD00'] });
}]);

myApp.controller('AnxdepCtrl', function($scope, $location, $http, $filter) {
  $scope.ssn = $location.search().ssn;
  $scope.fname = $location.search().fname;
  $scope.surname = $location.search().surname;

  $scope.listOfDevices = [];

  $scope.labels = [];
  $scope.series = [];
  $scope.stepdata = [];

  $scope.formarray = [];


  $scope.toggleDetail = function($index) {
    //$scope.isVisible = $scope.isVisible == 0 ? true : false;
    $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
  };

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
                var tempdepressiondata = [];
                var tempanxietydata = [];
                var templabels = [];
                var devices = [];
                angular.forEach($scope.listOfDevices, function(value, index){
                  $http.get('http://46.101.96.201:8080/api/forms/ad/'+value.crypt, config)
                  .success(function (data) {

                                if(data.length > 0){
                                  $scope.formarray = $scope.formarray.concat(data);
                                  var formjson = data;
                                  angular.forEach(formjson, function(value, index){
                                    var v = new Date(value.timestamp*1);
                                    var date = $filter('date')(v, 'd MMMM yyyy');
                                    tempdepressiondata.push(value.depressionscore);
                                    tempanxietydata.push(value.anxietyscore);

                                    templabels.push(date);
                                  });
                                  $scope.series.push("Ångest");
                                  $scope.series.push("Depression");
                                }
                  });
                });
                $scope.labels = templabels;
                $scope.stepdata = [ tempdepressiondata, tempanxietydata ];
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
