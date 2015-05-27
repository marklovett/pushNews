// set up routes  1) login  2) all news list  3) news view  4) user profile

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('app', ['ngCordova', 'LocalStorageModule'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      //add event listener to tell app when push is sent
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            if (notification.alert) {
              navigator.notification.alert(notification.alert);
            }
        })
    });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

  // Each tab has its own nav history stack:
    .state('tab', {
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'NewsCtrl'
        }
      }
    })
    .state('tab.details', {
      url: '/news/:id',
      views: {
        'tab-news': {
          templateUrl: 'templates/details.html',
          controller: 'DetailsCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
