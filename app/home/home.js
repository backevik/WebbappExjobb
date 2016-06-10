'use strict';

var myApp = angular.module('myApp.home', ['ngRoute']);

myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.get = {};
}]);


myApp.controller('HomeCtrl', function($scope, $http, $location){
  $scope.listOfUsers = null;
  $scope.selectedUsers = null;

  var config = {
    headers:  {
        'key': 'xfDJ9rtlYqTC'
    }
  };

          $http.get('http://46.101.96.201:8080/api/users/group/user', config)
          .success(function (data) {
                $scope.listOfUsers = data; //this should be data.nameOfListInJson

                   //  If we managed to load more than one Customer record, then select the
                   //  first record by default.
                   $scope.selectedUsers = $scope.listOfUsers[0].UserID;

                   //  Load the list of Orders, and their Products, that this Customer has ever made.
            });

            $scope.detail = function(ssn, fname, surname){
                $location.path('/detail').search({ssn: ssn, fname: fname, surname: surname});
            };

            $scope.saveData = function(ssn,fname, surname){
              $http.post('http://46.101.96.201:8080/api/users/', { 'ssn': ssn, 'fname': fname, 'surname':surname, 'group':'user' },config).success(function(result) {
                  location.reload();
                  console.log(result);
                  $scope.resultPut = result;
              }).error(function() {
                  console.log("error");
              });
            };

            $scope.remove = function(ssn){
              $http.delete('http://46.101.96.201:8080/api/users/'+ssn,config).success(function(result) {
                  location.reload();
                  console.log(result);
                  $scope.resultPut = result;
              }).error(function() {
                  console.log("error");
              });
            };
});
