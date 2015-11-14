'use strict';

/**
 * @ngdoc overview
 * @name idealsApp
 * @description
 * # idealsApp
 *
 * Main module of the application.
 */
angular
  .module('idealsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: '../views/reposList.html',
        controller: 'RepoListCtrl',
        controllerAs: 'list'
      })
      .when('/favorite', {
        templateUrl: '../views/favorite.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($window, $uibModal, $location, Auth , GlobalFunc) {


    if($window.localStorage.getItem('favoriteList')== null){
      $window.localStorage.setItem('favoriteList', JSON.stringify([]));
      console.log(JSON.stringify([]))
    }

    var getParamFromLocation = GlobalFunc.getParamFromLocation;

    var getParams = getParamFromLocation('code');
    if(getParams.code) {
      Auth.get_token(
        {
          client_id: GlobalFunc.client_id,
          client_secret: GlobalFunc.client_secret,
          code: getParams.code
        }, function(data) {

          var dividedParams = GlobalFunc.divideParams(data);

          $window.localStorage.setItem('access_token', dividedParams.access_token);
          $window.localStorage.setItem('token_type', dividedParams.token_type);
          window.location.search = "";
        }, function(err) {
          console.log(err);
        })
    }

  })

