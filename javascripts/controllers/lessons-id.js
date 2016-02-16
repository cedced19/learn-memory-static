module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', function($scope, $location, $http, $routeParams, $rootScope) {
        $scope.currentLesson = $rootScope.lessons.filter(function (lesson) {
            return lesson.id == $routeParams.id;
        })[0];
        $rootScope.nav = 'lesson';
        $scope.print = function () {
            window.print();
        };
        $rootScope.back = function () {
            $location.path('/');
        };
}];
