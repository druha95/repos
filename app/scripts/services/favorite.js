/**
 * Created by andrew on 13.11.15.
 */


angular.module('idealsApp')

/**
 * @ngdoc function
 * @name idealsApp.services:FavoriteList
 * @description
 * # FavoriteList
 * Service of the idealsApp which works with
 * favorite list and local Storage
 * */

  .service("FavoriteList", function($window) {

    return {
      getList: function() {
        return JSON.parse($window.localStorage.getItem('favoriteList'));
      },
      setList: function(list) {
        $window.localStorage.setItem('favoriteList', JSON.stringify(list));
      }
    }
  });
