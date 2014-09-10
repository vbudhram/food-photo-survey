'use strict';

angular.module('surveyApp', []);

var app = angular.module('surveyApp', ['vr.directives.slider', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/survey', {
            templateUrl: 'views/survey.html',
            controller: 'SurveyController'
        })
        .when('/calc', {
            templateUrl: 'views/calc.html',
            controller: 'CalcController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'UserController'
        })
        .otherwise({
            templateUrl: 'views/register.html',
            controller: 'UserController'
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});