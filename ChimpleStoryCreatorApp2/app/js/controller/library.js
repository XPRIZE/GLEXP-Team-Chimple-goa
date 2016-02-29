'use strict';

module.exports = ['$scope', '$location', '$mdMedia', 'FetchStoriesService', 'Loki', 'chimpleConfig', '_', function ($scope, $location, $mdMedia, FetchStoriesService, Loki, chimpleConfig, _) {
  console.log('LibraryCtrl');
  var vm = this;
  $scope.stories = [];

  $scope.hideFooter = function () {
    return $mdMedia('sm');
  }

  vm.init = function () {
    //create database if doesn't exist
    var collection = FetchStoriesService.init();

    //Fetch Existing stories
    vm.getExistingStories(collection);
  };

  vm.getExistingStories = function (collection) {
    if (!collection) {
      $scope.stories = [];
      return;
    }

    FetchStoriesService.loadStories().then(function (data) {

      var stories = null;
      var uniqueStories = null;

      var alreadyStoredStories = vm.loadStoriesExistsInLocalStorage(collection);
      var storiesDownloadedFromInternet = angular.fromJson(data);

      if (angular.isArray(alreadyStoredStories) && alreadyStoredStories.length > 0) {
        uniqueStories = [];
        angular.forEach(storiesDownloadedFromInternet, function (value, key) {
          if (!vm.storyAlreadyExistsInLocalStorage(alreadyStoredStories, value)) {
            uniqueStories.push(value);
          }
        });
      } else {
        uniqueStories = storiesDownloadedFromInternet;
      }

      angular.forEach(uniqueStories, function (value, key) {
        var document = {
          id: value.id,
          title: value.title,
          imgSrc: value.src,
          pages: value.pages
        };

        collection.insert(document);
      });

      FetchStoriesService.save();
      $scope.stories = vm.loadStoriesExistsInLocalStorage(collection);

    }, function (err) {
      console.log('no internet accessible, trying to find from local storage');
      $scope.stories = vm.loadStoriesExistsInLocalStorage(collection);
    });
  };

  vm.loadStoriesExistsInLocalStorage = function (collection) {
    var alreadyStoredStories = null;
    if (collection && collection.data.length > 0) {
      //alreadyStoredStories = collection.data[0].stories;
      alreadyStoredStories = collection.data;
    }
    return alreadyStoredStories;
  };

  vm.storyAlreadyExistsInLocalStorage = function (array, story) {
    var exists = false;
    _.each(array, function (item) {
      if (story.id === item.id) {
        exists = true;
      }
    });

    return exists;
  };

  $scope.displayImage = function (story) {
    console.log('check if image exists');
    if (story.imgSrc) {
      return story.imageSrc;
    } else {
      return "http://localhost:8080/css/images/default.jpeg";
    }

  };

  $scope.deleteStory = function (index, story) {
    //delete this story
    var collection = FetchStoriesService.init();
    collection.remove(story);
    FetchStoriesService.save();
    $scope.stories.splice(index, 1);
    FetchStoriesService.deletePhaserStory(story.id);
  };

  $scope.syncToServer = function (story) {
    console.log('TBD to sync');
  };

  $scope.startNarrateStory = function ($event, story) {
    console.log('start narrating story $event:' + $event + " story id:" + story);
    $location.path("/narrateStory/" + story.id + "/" + story.title);
  };

  $scope.editStory = function ($event, story) {
    console.log('$event :' + $event);
    console.log('edit story:' + story.id);
    $location.path("/editStory/" + story.id);
  };

  $scope.$watch(function () {
    return $mdMedia('sm') ? 'small' : $mdMedia('md') ? 'medium' : 'large';
  }, function (size) {
    $scope.screenSize = size;
    $scope.__layout = {
      screen: size,
      paddingStyle: vm.getPaddingStyle(),
      itemSize: vm.getItemSize()
    };
  });

  vm.getPaddingStyle = function () {
    return $scope.screenSize == 'small' ? 'smallPadding' : 'normalPadding';
  };

  vm.getItemSize = function () {
    switch ($scope.screenSize) {
    case 'small':
      return 50;
    case 'medium':
      return 33;
    default:
      return 25;
    }
  };

  vm.init();
}];
