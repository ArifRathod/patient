var scotchApp = angular.module('imageGallery', ['ngRoute','ui.bootstrap','angularUtils.directives.dirPagination','ngDialog','ngAnimate', 'toaster']);
scotchApp.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })
        .when('/list', {
            templateUrl : 'pages/list.html',
            controller  : 'listController'
        })
        .when('/add', {
            templateUrl : 'pages/add.html',
            controller  : 'addController'
        })
        .otherwise({
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        });
});

