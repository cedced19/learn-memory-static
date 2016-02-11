module.exports = ['$scope', '$location', '$http', '$rootScope', 'sweet', function($scope, $location, $http, $rootScope, sweet) {
        $rootScope.nav = 'list';
        $scope.goLesson = function (lesson) {
            $location.path('/lessons/' + lesson.id);
        };
}];
