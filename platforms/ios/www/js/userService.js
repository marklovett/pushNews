// www/js/userService.js  get user data and send it to server
(function () {
  function _UserService($q, config, $http, localStorageService, $state) {

    var user;

    function loginUser(post) {
      var deferred = $q.defer();

      $http.post(config.server + '/user/login', post)
        .success(function (data) {
          if (data.error || !data.user) {
            deferred.reject(data.error);
          }

          localStorageService.set('user', data.user);
          user = data.user;

          deferred.resolve(data.user);
        })
        .error(function () {
          deferred.reject('error');
        });
      return deferred.promise;
    }

    function logoutUser() {
      localStorageService.remove('user');
      user = null;
      $state.go('login');
    }

    function currentUser() {
      if (!user) {
        user = localStorageService.get('user');
      }
      return user;
    }

    function registerDevice(putData) {
      var deferred = $q.defer();

      $http.put(config.server + '/user/registerDevice', putData)
        .success(function (data) {
          if (data.error || !data.user) {
            deferred.reject(data.error);
          }

          localStorageService.set('user', data.user);
          user = data.user;

          deferred.resolve(data.user);
        })
        .error(function () {
          deferred.reject('error');
        });
      return deferred.promise;
    }

    return {
      login: loginUser,
      logout: logoutUser,
      current: currentUser,
      registerDevice: registerDevice
    };
  }

  function _ConfigService() {
    return {
      server: 'http://push-news.herokuapp.com',
      twitterKey: 'oheEpZ95SOkdtIpSpX4IBRsLd',
      twitterSecret: '0S8qHOtdzzcRx1nlAtEUEmvPCVVslv1K2A5aAZgDUW2wZIIm8A'
    };
  }

  _UserService.$inject = ['$q', 'Config', '$http', 'localStorageService', '$state', '$cordovaPush', '$ionicPlatform'];

  angular.module('app.services')
    .factory('UserService', _UserService)
    .service('Config', _ConfigService);
})();


