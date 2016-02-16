require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('ng-notie');

var app = angular.module('LearnMemory', ['ngNotie', 'ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: './views/lessons-list.html',
            controller: 'LearnMemoryLessonsListCtrl'
        })
        .when('/lessons/:id', {
            templateUrl: './views/lessons-id.html',
            controller: 'LearnMemoryLessonsIdCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
app.run(['$rootScope', '$location', '$http', 'notie', function ($rootScope, $location, $http, notie) {
        $http.get('data.json').success(function (data) {
            $rootScope.lessons = data;
        }).error(function() {
            notie.alert(3, 'Something went wrong!', 3);
            $location.path('/');
        });
}]);
app.controller('LearnMemoryLessonsListCtrl', require('./controllers/lessons-list.js'));
app.controller('LearnMemoryLessonsIdCtrl', require('./controllers/lessons-id.js'));
