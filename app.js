'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'services',
  'myApp.faj',
  'myApp.korFoertek',
  'myApp.elonyHatrany',
  'myApp.jartassagok',
  'myApp.tablak',
  'myApp.praktikus',
  'myApp.kodexek',
  'myApp.rendek',
  'myApp.npcGen',
  'myApp.karakter',
  'myApp.felszereles',
    'myApp.varazstargyak'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/faj'});
}]).
    filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
}).filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
}
}).filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
