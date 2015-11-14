/**
 * Created by andrew on 13.11.15.
 */

/**
 * @ngdoc function
 * @name idealsApp.controller.modals:contributorsCtrl
 * @description
 * # contributorsCtrl
 * Controller of the idealsApp which shows
 * list of contribs in modal
 */

angular.module('idealsApp')
  .controller('contributorsCtrl', ['$scope', '$uibModalInstance', 'itemData', 'GithubContrib','$window', function($scope, $uibModalInstance, itemData, GithubContrib, $window) {

    GithubContrib.get_all_contrib({
      owner: itemData.owner.login,
      repo: itemData.name,
      access_token: $window.localStorage.getItem('access_token'),
      token_type: $window.localStorage.getItem('token_type')
    }, function(response) {
      $scope.contribList = response;
    }, function(err) {
      console.log(err);
    })
  }]);
