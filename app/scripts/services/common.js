/**
 * Created by andrew on 14.11.15.
 */


angular.module('idealsApp')

/**
 * @ngdoc function
 * @name idealsApp.services:GlobalFunc
 * @description
 * # GlobalFunc
 * Service of the idealsApp which stores
 * a common functions
 * */

  .service('GlobalFunc', function() {
    return {

      /**
       * @ngdoc function
       * @name idealsApp.services.GlobalFunc:getParamFromLocation
       * @description
       * # getParamFromLocation
       * Function, which parse getParams from location
       * @param {String} - keys in location
       * @return {Object} - object of params with keys
       * */

      getParamFromLocation: function() {
        var result = {};
        var tmp = [];
        var argumentsArray = Array.prototype.slice.call(arguments);

        location.search
          .substr(1)
          .split("&")
          .forEach(function (item) {
            tmp = item.split("=");
            for (var i = 0; i < argumentsArray.length; i++) {
              if (tmp[0] == argumentsArray[i]) {
                result[argumentsArray[i]] = decodeURIComponent(tmp[1]);
              }
            }

          });

        if (Object.keys(result).length == 0) {
          return "Not found";
        } else {
          return result;
        }
      },

      /**
       * @ngdoc function
       * @name idealsApp.services.GlobalFunc:divideParams
       * @description
       * # divideParams
       * Function, which parses key/value string
       * @param data {String} - key/value string
       * @return {Object} - object with key=value
       * */

      divideParams: function(data) {
        var tmp ="";
        for (var key in data) {
          tmp += data[key];
        }
        var tmpObj = tmp.split("&");
        var dividedParams = {};
        angular.forEach(tmpObj, function(item){
          var keyValue = item.split("=");
          dividedParams[keyValue[0]] = keyValue[1];
        });
        return dividedParams
      },

      client_id: 'ba224e49345742605f2c',
      client_secret: '6cee7439892ac89be85dfd20e4b2ff22b25e27af',
      url: 'https://github.com/login/oauth/authorize?client_id=ba224e49345742605f2c'
    }
  });
