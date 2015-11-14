/**
 * Created by andrew on 13.11.15.
 */


angular.module('idealsApp')

/**
 * @ngdoc function
 * @name idealsApp.resources:Auth
 * @description
 * # Auth
 * Service of the idealsApp which creates resource for auth
 * */

  .factory("Auth", ['$resource', function($resource) {
    return $resource("https://github.com/:action/:second/:third", {action: '@action', second: '@second', third: '@third'}, {
      get_token: {method:'GET', params: {action:'login', second: 'oauth', third: 'access_token'}}
    }, {
      stripTrailingSlashes: true
    })
  }])

/**
 * @ngdoc function
 * @name idealsApp.resources:GithubRepos
 * @description
 * # GithubRepos
 * Service of the idealsApp which creates resource for
 * getting list of repo
 * */


  .factory("GithubRepos", ['$resource', function($resource) {
    return $resource("https://api.github.com/:action/:id", {action: '@action', id: '@id'}, {
      get_all_repos: {method:'GET', isArray:true,  params:{action: 'repositories'} },
      get_one_repo: {method:'GET',  params:{action: 'repositories'} }
    }, {
      stripTrailingSlashes: true
    })
  }])

/**
 * @ngdoc function
 * @name idealsApp.resources:GithubContrib
 * @description
 * # GithubContrib
 * Service of the idealsApp which creates resource for
 * getting list of contribs
 * */


  .factory("GithubContrib", ['$resource', function($resource) {
    return $resource("https://api.github.com/:action/:owner/:repo/:data", {
        action: '@action',
        owner: '@owner',
        repo: '@repo',
        data: 'data'
    }, {
      get_all_contrib: {method:'GET', isArray:true, params:{action: 'repos', data: 'contributors'} }
    }, {
      stripTrailingSlashes: true
    })
  }]);
