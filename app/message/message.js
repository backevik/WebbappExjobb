'use strict';

var myApp = angular.module('myApp.message', ['ngRoute','ngAnimate']);

myApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.get = {};
}]);

myApp.controller('MessageCtrl', function($scope, $location, $http, restfulFactory) {
  $scope.ssn = $location.search().ssn;
  $scope.fname = $location.search().fname;
  $scope.surname = $location.search().surname;
  $scope.listOfMessages = [];

  getDevices($scope.ssn);

  var config = {
    headers:  {
        'key': 'xfDJ9rtlYqTC'
    }
  };


$scope.postMessage = function () {
  var message = {
    'from': $scope.listOfDevices[0].crypt, //$scope.listOfDevices[0].crypt,
    'text': $('#inputText').val(), //$('#inputText').val(),
    'timestamp': (new Date).getTime(), //new Date().getTime(),
    'self': false //false
  };
  restfulFactory.postMessage(message)
  .then(function (response) {
    $scope.status = 'Inserted Customer! Refreshing customer list.';
    getDevices($scope.ssn);
      //run get messages again
  }, function (error) {
      $scope.status = 'Unable to post message data: ' + error.message;
  });
};

function getDevices(ssn) {
    $scope.listOfMessages = [];
    restfulFactory.getDevices(ssn)
        .then(function (response) {
            $scope.listOfDevices = response.data;
            angular.forEach($scope.listOfDevices, function(value, index){
                restfulFactory.getMessages(value.crypt)
                .then(function(response){
                    $scope.listOfMessages = $scope.listOfMessages.concat(response.data);
                    $scope.status = 'Success on loading message data: ' + response.message;
                },function(error){
                  $scope.status = 'Unable to load message data: ' + error.message;
                });
            });
        },function (error) {
            $scope.status = 'Unable to load device data: ' + error.message;
        });
};
/*
  $http.get('http://46.101.96.201:8080/api/users/devices/'+$scope.ssn, config)
  .success(function (data) {
                $scope.listOfDevices = data;
                var templabels = [];
                var devices = [];
                angular.forEach($scope.listOfDevices, function(value, index){
                  $http.get('http://46.101.96.201:8080/api/message/'+value.crypt, config)
                  .success(function (data) {
                    if(data.length > 0){
                      $scope.listOfMessages = $scope.listOfMessages.concat(data);
                    }
                  });
                });
  });*/

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
