'use strict';

app.controller('UserController', ['$scope', '$route', '$routeParams', '$location', '$rootScope', function ($scope, $route, $routeParams, $location, $rootScope) {
    $scope.takeSurvey = function () {
        console.log('Clicked take survey');
        $rootScope.user = $scope.user;
        $location.path('/survey');
    };
}]);

app.controller('SurveyController', ['$scope', '$route', '$routeParams', '$location', '$rootScope', '$http', function ($scope, $route, $routeParams, $location, $rootScope, $http) {
    $scope.user = $rootScope.user;
    $scope.images = [
        {
            src: 'images/food1.png',
            weight: 1
        },
        {
            src: 'images/food2.png',
            weight: 3
        },
        {
            src: 'images/food3.png',
            weight: 2
        },
        {
            src: 'images/food4.png',
            weight: 3
        },
        {
            src: 'images/food5.png',
            weight: 2
        }
    ];

    var imageIndex = 0;
    $scope.currentImage = $scope.images[imageIndex];

    var submitting = false;

    $scope.nextImage = function () {
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

    $scope.done = function () {
        if (!submitting) {
            submitting = true;
            var resultData = {
                user: $scope.user,
                result: $scope.images
            };
            $http.post('/save', resultData).success(function () {
                alert('Thanks for your submission!');
                $location.path('/register');
            });
        }
    }

}]);

app.controller('CalcController', ['$scope', function ($scope) {
    $scope.calc = function(){
        try{
            var protein = parseInt($scope.data.protein) / 50;
            var fiber = parseInt($scope.data.fiber) / 25;
            var vita = parseInt($scope.data.vita) / 5000;
            var vitc = parseInt($scope.data.vitc) / 60;
            var vite = parseInt($scope.data.vite) / 30;
            var calcium = parseInt($scope.data.calcium ) / 1000;
            var iron = parseInt($scope.data.iron) / 18;
            var mag = parseInt($scope.data.mag) / 400;
            var pot = parseInt($scope.data.pot) / 3500;
            var sfat = parseInt($scope.data.sfat) / 20;
            var sugar = parseInt($scope.data.sugar) / 50;
            var sodium = parseInt($scope.data.sodium) / 2400;


            $scope.total = (protein + fiber + vita + vitc + vite + calcium + iron + mag + pot - sfat - sugar - sodium) * 100;
        }catch(e){
            $scope.error = e.message;
        }
    };

    $scope.calc2 = function(){
        try{
            var protein = parseFloat($scope.data.protein) / 100;
            var fiber = parseFloat($scope.data.fiber) / 100;
            var vita = parseFloat($scope.data.vita) / 100;
            var vitc = parseFloat($scope.data.vitc) / 100;
            var vite = parseFloat($scope.data.vite) / 100;
            var calcium = parseFloat($scope.data.calcium ) / 100;
            var iron = parseFloat($scope.data.iron) / 100;
            var mag = parseFloat($scope.data.mag) / 100;
            var pot = parseFloat($scope.data.pot) / 100;
            var sfat = parseFloat($scope.data.sfat) / 100;
            var sugar = parseFloat($scope.data.sugar) / 100;
            var sodium = parseFloat($scope.data.sodium) / 100;


            $scope.total = (protein + fiber + vita + vitc + vite + calcium + iron + mag + pot - sfat - sugar - sodium) * 100;
        }catch(e){
            $scope.error = e.message;
        }
    }
}]);