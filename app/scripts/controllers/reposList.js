'use strict';

/**
 * @ngdoc function
 * @name idealsApp.controller:RepoListCtrl
 * @description
 * # RepoListCtrl
 * Controller of the idealsApp, which shows
 * list of repos
 */
angular.module('idealsApp')
  .controller('RepoListCtrl', ['$scope', 'GithubRepos', 'FavoriteList', '$window', 'GlobalFunc', function ($scope, GithubRepos,
                                                                                                           FavoriteList, $window, GlobalFunc) {

    if($window.localStorage.getItem('access_token') == null) {
      $window.open(GlobalFunc.url);
    }

    $scope.checkboxes = {};

    $scope.updateCheckboxes = function() {
      $scope.favoriteList = FavoriteList.getList();
      angular.forEach($scope.favoriteList, function(item) {
        $scope.checkboxes[item] = true;
      });
    };

    $scope.updateCheckboxes();


    $scope.getAllList = function() {
      GithubRepos.get_all_repos({
        page: 1,
        per_page: 200,
        access_token: $window.localStorage.getItem('access_token'),
        token_type: $window.localStorage.getItem('token_type')
      },function(data) {
        $scope.reposList = data;
      }, function(err) {
        $window.open(GlobalFunc.url);
      });
    };

    $scope.getAllList();



    $scope.toogleFavorite = function(id) {
      if($scope.favoriteList.indexOf(id) > -1){
        $scope.favoriteList.splice($scope.favoriteList.indexOf(id), 1);
      } else {
        $scope.favoriteList.push(id);
      }
      FavoriteList.setList($scope.favoriteList);
    };


    $scope.contributorsModal = function(item) {
      var uibModalInstance = $uibModal.open({
        templateUrl: '/views/modals/contributors.html',
        controller: 'contributorsCtrl',
        resolve: {
          itemData: function() {
            return item;
          }
        }
      })
    };

  }]);

