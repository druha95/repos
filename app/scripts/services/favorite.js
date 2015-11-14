/**
 * Created by andrew on 13.11.15.
 */


angular.module('idealsApp')
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
