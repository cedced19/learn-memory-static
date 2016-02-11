require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('./alert/sweet-alert.js');
require('./alert/ng-sweet-alert.js');

var app = angular.module('LearnMemory', ['hSweetAlert', 'ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: '/views/lessons-list.html',
            controller: 'LearnMemoryLessonsListCtrl'
        })
        .when('/lessons/:id', {
            templateUrl: '/views/lessons-id.html',
            controller: 'LearnMemoryLessonsIdCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
app.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
        $http.get('../data.json').success(function (data) {
            $rootScope.lessons = data;
        }).error(function() {
            sweet.show('Oops...', 'Something went wrong!', 'error');
            $location.path('/');
        });
}]);
app.controller('LearnMemoryLessonsListCtrl', require('./controllers/lessons-list.js'));
app.controller('LearnMemoryLessonsIdCtrl', require('./controllers/lessons-id.js'));
