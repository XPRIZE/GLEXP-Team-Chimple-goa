module.exports = ['$http', '$q', 'Loki', '$rootScope', 'chimpleConfig', 'LokiService', function ($http, $q, Loki, $rootScope, chimpleConfig, LokiService) {
    console.log('Edit Page Service');

    var editPageService = this;

    editPageService.init = function () {
        var libraryCollection = LokiService.initLibraryCollection();
        var masterConfigCollection = LokiService.initMasterConfigCollection();
        var masterAttributesConfigCollection = LokiService.initMasterAttributesConfigCollection();
        return  {
            "libraryCollection": libraryCollection,
            "masterConfigCollection": masterConfigCollection,
            "masterAttributesConfigCollection":masterAttributesConfigCollection
        };
        //return [libraryCollection, masterConfigCollection, masterAttributesConfigCollection];
    };

    editPageService.loadMasterConfig = function () {
        var defer = $q.defer();
        console.log('endpoint:' + $rootScope.storiesEndpoint + '/masterConfig.json');
        $http.get($rootScope.storiesEndpoint + '/masterConfig.json').success(function (data) {
            defer.resolve(data);
            console.log('data:' + data);
        }).error(function (err, status) {
            defer.reject(err);
        });

        return defer.promise;
    };

    editPageService.loadMasterAttributesConfig = function () {
        var defer = $q.defer();
        console.log('endpoint:' + $rootScope.storiesEndpoint + '/masterAttributesConfig.json');
        $http.get($rootScope.storiesEndpoint + '/masterAttributesConfig.json').success(function (data) {
            defer.resolve(data);
            console.log('data:' + data);
        }).error(function (err, status) {
            defer.reject(err);
        });

        return defer.promise;
    };


    editPageService.save = function () {
        LokiService.save();
    };
    return editPageService;
}];