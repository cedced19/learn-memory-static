require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('ng-notie');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-url');

var app = angular.module('LearnMemory', ['ngNotie', 'ngSanitize', 'ngRoute', 'pascalprecht.translate']);
app.config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {
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

        // i18n configuration
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/langs/locale-',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'fr'], {
          'fr_*': 'fr',
          'en_*': 'en',
          '*': 'en'
        })
        .useSanitizeValueStrategy(null)
        .determinePreferredLanguage()
        .fallbackLanguage('en');

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
