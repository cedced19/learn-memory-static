module.exports = ['$scope', '$location', '$http', '$routeParams', '$rootScope', '$translate', 'notie', function($scope, $location, $http, $routeParams, $rootScope, $translate, notie) {
        $rootScope.nav = 'lesson';
        if (!$rootScope.lessons) {
          $http.get('data.json').success(function (data) {
              $rootScope.lessons = data;
              $scope.currentLesson = $rootScope.lessons.filter(function (lesson) {
                  return lesson.id == $routeParams.id;
              })[0];
          }).error(function() {
              $translate('error').then(function (error) {
                notie.alert(3, error , 3);
              });
              $location.path('/');
          });
        } else {
          $scope.currentLesson = $rootScope.lessons.filter(function (lesson) {
              return lesson.id == $routeParams.id;
          })[0];
        }

        $scope.print = function () {
            window.print();
        };
        $rootScope.back = function () {
            $location.path('/');
        };
}];
