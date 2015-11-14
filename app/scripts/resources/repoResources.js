/**
 * Created by andrew on 13.11.15.
 */


angular.module('idealsApp')

  .factory("Auth", ['$resource', function($resource) {
    return $resource("https://github.com/login/oauth/access_token", {action: '@action', second: '@second', third: '@third'}, {
      get_token: {method:'GET'}
    }, {
      stripTrailingSlashes: true
    })
  }])


  .factory("GithubRepos", ['$resource', function($resource) {
    return $resource("https://api.github.com/:action/:id", {action: '@action', id: '@id'}, {
      get_token: {method:'POST', params:{action: 'oauth', id: 'authorize'}},

      get_all_repos: {method:'GET', isArray:true,  params:{action: 'repositories'} },

      get_one_repo: {method:'GET',  params:{action: 'repositories'} }
    }, {
      stripTrailingSlashes: true
    })
  }])


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
