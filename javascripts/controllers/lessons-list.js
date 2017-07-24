module.exports = ['$scope', '$location', '$http', '$rootScope', 'notie', '$translate', function($scope, $location, $http, $rootScope, notie, $translate) {
        $rootScope.nav = 'list';
        if (!$rootScope.lessons) {
          $http.get('data.json').success(function (data) {
              $rootScope.lessons = data;
          }).error(function() {
              $translate('error_occured').then(function (error) {
                notie.alert(3, error , 3);
              });
              $location.path('/');
          });
        }

        $scope.goLesson = function (lesson) {
            $location.path('/lessons/' + lesson.id);
        };
}];
