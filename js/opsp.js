var app1 = angular.module('app1', ["ngRoute"]);

var controllers = {};

app1.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'firstController',
                templateUrl: 'views/addProfile.html'
            })
        .when('/allProfiles',
            {
                controller: 'firstController',
                templateUrl: 'views/allProfiles.html'
            })
        .otherwise({ redirect: '/'});
});

app1.controller('firstController', ['$scope', '$http', function($scope, $http){

    $scope.slide1 = true;
    $scope.slide2 = false;
    $scope.slide3 = false;
    $scope.slide4 = false;

    $scope.sliding = function(){
        if($scope.slide1){
            $scope.slide1 = false;
            $scope.slide2 = true;
        }
        else if($scope.slide2){
            $scope.slide2 = false;
            $scope.slide3 = true;
        }
        else if($scope.slide3){
            $scope.slide3 = false;
            $scope.slide4 = true;
        }
        else if($scope.slide4){
            $scope.slide1 = true;
            $scope.slide4 = false;
        }
    };
    $scope.slidingBack = function(){
        if($scope.slide2){
            $scope.slide1 = true;
            $scope.slide2 = false;
        }
        else if($scope.slide3){
            $scope.slide2 = true;
            $scope.slide3 = false;
        }
        else if($scope.slide4){
            $scope.slide3 = true;
            $scope.slide4 = false;
        }
    };

    var newAthlete = {};

    $scope.addAthlete = function () {
        newAthlete = {
            name: $scope.new.name,
            sports: $scope.new.sports,
            nationality: $scope.new.nationality,
            gender: $scope.new.gender,
            dob: $scope.new.dob,
            location: $scope.new.location,
            association: $scope.new.association,
            team: $scope.new.team,
            about: $scope.new.about,
            interests: $scope.new.interests,
            charities: $scope.new.charities,
            pets: $scope.new.pets,
            drinks: $scope.new.drinks,
            married: $scope.new.married,
            profile_image: $scope.new.profileImage,
            social_media: $scope.new.socialMedia
        };

        $scope.new.name="";
        $scope.new.sports="";
        $scope.new.nationality="";
        $scope.new.gender="";
        $scope.new.dob="";
        $scope.new.location="";
        $scope.new.association="";
        $scope.new.team="";
        $scope.new.about="";
        $scope.new.interests="";
        $scope.new.charities="";
        $scope.new.pets="";
        $scope.new.drinks="";
        $scope.new.married="";
        $scope.new.profileImage="";
        $scope.new.socialMedia="";

        $http({
            method: 'POST',
            url: 'https://whispering-headland-87488.herokuapp.com/api/profile',
            data: JSON.stringify(newAthlete)
        }).then(function(response){
            $scope.athletes.push(newAthlete);
            console.log($scope.athletes);
        }),function(error){
            console.log(error, 'Cannot Get Data!');
        };

    };

    $http({
        method: 'GET',
        url: 'https://whispering-headland-87488.herokuapp.com/api/profiles'
    }).then(function(response){
        $scope.athletes = response.data;
        console.log($scope.athletes);
    }),function(error){
        console.log(error, 'Cannot Get Data!');
    };

    $scope.go = function ( path ) {
        $location.path( path );
    };

}]);