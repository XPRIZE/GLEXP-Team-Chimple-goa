module.exports = ['$http', '$q', 'Loki', '$rootScope', 'chimpleConfig', 'LokiService', function ($http, $q, Loki, $rootScope, chimpleConfig, LokiService) {
  console.log('Narrate Story Service');

  var narrateStoryService = this;

  narrateStoryService.init = function () {
    var narrateConfigCollection = LokiService.initNarrateConfigCollection();
    return {
      "narrateConfigCollection": narrateConfigCollection
    };
  };

  narrateStoryService.loadNarrateConfig = function () {
    var defer = $q.defer();
    console.log('endpoint:' + $rootScope.storiesEndpoint + '/narrateConfig.json');
    $http.get($rootScope.storiesEndpoint + '/narrateConfig.json').success(function (data) {
      defer.resolve(data);
      console.log('data:' + data);
    }).error(function (err, status) {
      defer.reject(err);
    });

    return defer.promise;
  };

  narrateStoryService.save = function () {
    LokiService.save();
  };
  return narrateStoryService;
}];
