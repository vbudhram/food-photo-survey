'use strict';

angular.module('surveyApp', ['vr.directives.slider', 'ngRoute']).controller('UserController', ['$scope', '$route', '$routeParams', '$location', '$rootScope', function($scope, $route, $routeParams, $location, $rootScope) {
    $scope.takeSurvey = function() {
        console.log('Clicked take survey');
        $rootScope.user = $scope.user;
        $location.path('/survey');
    };
}]).controller('SurveyController', ['$scope', '$route', '$routeParams', '$location', '$rootScope', '$http', function($scope, $route, $routeParams, $location, $rootScope, $http) {
    $scope.user = $rootScope.user;
    $scope.images = [{
        src: 'images/food1.png',
        weight: 1
    }, {
        src: 'images/food2.png',
        weight: 3
    }, {
        src: 'images/food3.png',
        weight: 2
    }, {
        src: 'images/food4.png',
        weight: 3
    }, {
        src: 'images/food5.png',
        weight: 2
    }];

    var imageIndex = 0
    $scope.currentImage = $scope.images[imageIndex];
    
    var submitting = false;

    $scope.nextImage = function() {
        $scope.images[imageIndex].health = $scope.rating.health;
        $scope.images[imageIndex].taste = $scope.rating.taste;

        imageIndex++;

        if (imageIndex === $scope.images.length) {
            imageIndex = 0;
        }

        $scope.currentImage = $scope.images[imageIndex];
        $scope.rating.health = $scope.currentImage.health;
        $scope.rating.taste = $scope.currentImage.taste;
    }

    $scope.done = function() {
        if (!submitting) {
            submitting = true;
            var resultData = {
                user: $scope.user,
                result: $scope.images
            }
            $http.post('/save', resultData).success(function() {
                alert('Thanks for your submission!');
                $location.path('/register');
            });
        }
    }

}]).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyController'
    }).otherwise({
        templateUrl: 'views/register.html',
        controller: 'UserController',
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});