module.exports = ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope) {
        $rootScope.nav = 'list';
        $scope.goLesson = function (lesson) {
            $location.path('/lessons/' + lesson.id);
        };
}];
