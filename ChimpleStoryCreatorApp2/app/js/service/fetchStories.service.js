'use strict';

module.exports = ['$http', '$q', 'Loki', '$rootScope', 'chimpleConfig', 'LokiService', function ($http, $q, Loki, $rootScope, chimpleConfig, LokiService) {
  //download collection of available stories from internet (local folder) and convert into LokiJS datastructure for access/update)

  var fetchStoriesService = this;

  fetchStoriesService.init = function () {
    var libraryCollection = LokiService.initLibraryCollection();
    return libraryCollection;
  };

  fetchStoriesService.loadStories = function () {
    var defer = $q.defer();
    console.log('endpoint:' + $rootScope.storiesEndpoint + '/library.json');
    $http.get($rootScope.storiesEndpoint + '/library.json').success(function (data) {
      defer.resolve(data);
      console.log('data:' + data);
    }).error(function (err, status) {
      defer.reject(err);
    });

    return defer.promise;
  };

  fetchStoriesService.save = function () {
    LokiService.save();
  };

  fetchStoriesService.deletePhaserStory = function (story) {
    LokiService.deletePhaserStory(story);
  };

  fetchStoriesService.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  return fetchStoriesService;
}];
