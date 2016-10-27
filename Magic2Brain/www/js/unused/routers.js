var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
    .when('/', {
        controller: TestCtrl,
        templateUrl: 'partials/main.html'
    })
    .when('/view', {
        controller: ViewCtrl,
        templateUrl: 'partials/view.html'
    });
}]);

/*app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
      when('/', {
          templateUrl: 'list.html',
          controller: 'ListController'
      }).
      when('/items/:itemId', {
          templateUrl: 'details.html',
          controller: 'DetailsController'
      }).
      otherwise({
          redirectTo: '/'
      });
}]);*/