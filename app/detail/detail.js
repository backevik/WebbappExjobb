'use strict';

var myApp = angular.module('myApp.detail', ['ngRoute']);

myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.get = {};
}]);

myApp.controller('DetailCtrl', function($scope, $location, $http) {
  $scope.ssn = $location.search().ssn;
  $scope.fname = $location.search().fname;
  $scope.surname = $location.search().surname;

  $scope.listOfUsers = null;

  var config = {
    headers:  {
        'key': 'xfDJ9rtlYqTC'
    }
  };

  $http.get('http://46.101.96.201:8080/api/users/devices/'+$scope.ssn, config)
  .success(function (data) {
                $scope.listOfUsers = data; //this should be data.nameOfListInJson
  });

  $scope.saveData = function(ssn,fname, surname){
    $location.path('/detail').search({ssn: ssn, fname: fname, surname: surname});

    $http.put('http://46.101.96.201:8080/api/users/'+$scope.ssn, { 'fname': fname, 'surname':surname },config).success(function(result) {
        console.log(result);
        $scope.resultPut = result;
    }).error(function() {
        console.log("error");
    });
  };

    $scope.deleteDevice = function(code){
      $http.delete('http://46.101.96.201:8080/api/users/devices/'+code, config).success(function(result){
        console.log(result);
        location.reload();
      }).error(function(){
        console.log("error");
      })
    };

    $scope.addDevice = function(ssn){
      $http.post('http://46.101.96.201:8080/api/devices',{ 'ssn': ssn }, config).success(function(result){
        console.log(result);
        location.reload();
      }).error(function(){
        console.log("error");
      })
    };
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
