var myApp = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngResource',
    'ngAnimate',
    'angular.filter']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

        //typical routes... when someone navigates to a given directory, load the partial, and use the controller
        $routeProvider.when('/home', {templateUrl: '/partials/home.html', controller: 'homeController'});
        $routeProvider.when('/projects', {templateUrl: '/partials/projects.html', controller: 'projectsController'});
        $routeProvider.when('/projects/actionform', {templateUrl: '/partials/projects/actionform.html', controller: 'actionFormController'});
        
        //if no valid routes are found, redirect to /home
        $routeProvider.otherwise({redirectTo: '/projects/actionform'});
        //new comment
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])
    .filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    });
    