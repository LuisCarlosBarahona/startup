var movieApp= angular.module('movieApp', ['ngRoute']);

movieApp.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/movies', {
  	templateUrl:'templates/estrenosTmpl.html'
  })
  .when('/',{
  	templateUrl:'templates/portadaTmpl.html'
  })
  .when('/movie', {
    templateUrl: 'templates/fichaPeliculaTmpl.html'
  });
});  


movieApp.controller('mainCtrl', function mainCtrl($scope) {
	
});


