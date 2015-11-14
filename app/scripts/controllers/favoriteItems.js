'use strict';

/**
 * @ngdoc function
 * @name idealsApp.controller:FavoriteListCtrl
 * @description
 * # FavoriteListCtrl
 * Controller of the idealsApp which shows
 * list of favorite
 */
angular.module('idealsApp')
  .controller('FavoriteListCtrl', ['$scope', 'GithubRepos', 'FavoriteList', '$uibModal', 'GlobalFunc', '$window', function ($scope, GithubRepos, FavoriteList,
                                                                                            $uibModal, GlobalFunc, $window) {

    if($window.localStorage.getItem('access_token') == null) {
      $window.open(GlobalFunc.url);
    }

    $scope.reposList = [];
    $scope.checkboxes = {};

    $scope.updateCheckboxes = function() {
      $scope.favoriteList = FavoriteList.getList();
      angular.forEach($scope.favoriteList, function(item) {
        $scope.checkboxes[item] = true;
      });
    };

    $scope.updateCheckboxes();

    angular.forEach($scope.favoriteList, function(item) {
      GithubRepos.get_one_repo({
        id: item,
        page:1,
        per_page: 100,
        access_token: $window.localStorage.getItem('access_token'),
        token_type: $window.localStorage.getItem('token_type')
      },function(data) {
        $scope.reposList.push(data);
        console.log(data)
      }, function(err) {
        $window.open(GlobalFunc.url);
      });
    });

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

    $scope.toogleFavorite = function(id) {
      $scope.favoriteList.splice($scope.favoriteList.indexOf(id), 1);
      FavoriteList.setList($scope.favoriteList);
      $scope.updateCheckboxes()
    }

  }]);
