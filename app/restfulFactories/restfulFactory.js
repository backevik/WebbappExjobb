var myApp = angular.module('myApp.restfulFactory',[]);
  myApp.factory('restfulFactory', ['$http', function($http){
    var urlBase = 'http://46.101.96.201:8080/api/';
    var restfulFactory = {};

    var config = {
      headers:  {
          'key': 'xfDJ9rtlYqTC'
      }
    };

    restfulFactory.postMessage = function(message){
      return $http.post(urlBase+'message/',message, config);
    };

    restfulFactory.getMessages = function(crypt){
      return $http.get(urlBase+'message/'+crypt,config);
    };

    restfulFactory.getDevices = function(ssn){
      return $http.get(urlBase+'users/devices/'+ssn,config);
    };

    return restfulFactory;

  }]);
