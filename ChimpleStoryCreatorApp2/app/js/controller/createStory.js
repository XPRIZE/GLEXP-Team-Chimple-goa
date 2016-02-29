'use strict';

module.exports = ['$scope', '$rootScope', '$location', '$route', '$routeParams', '$mdDialog', '$mdMedia', 'CreateStoryService',
  'Loki', 'chimpleConfig', '_',
  function ($scope, $rootScope, $location, $route, $routeParams, $mdDialog,
    $mdMedia, CreateStoryService, Loki, chimpleConfig, _) {
    console.log('CreateStoryCtrl');
    var vm = this;

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    vm.init = function () {
      vm.mergeAllPages();
    };

    vm.mergeAllPages = function () {
      if (!$scope.currentStory) {
        $scope.draggableObjects = [];
        return;
      }

      $scope.draggableObjects = CreateStoryService.fetchAllPagesForStoryId($scope.currentStory.id) || [];
      var pagesFromInternet = null;
      CreateStoryService.getLatestPagesForStory($scope.currentStory.id).then(function (data) {
        pagesFromInternet = data;
        if (pagesFromInternet != undefined && pagesFromInternet.length > 0) {
          angular.forEach(pagesFromInternet, function (value, key) {
            if (!vm.pagesAlreadyExistsInLocalStorage($scope.draggableObjects, value)) {
              value.pageCount = $scope.draggableObjects.length + 1;
              $scope.draggableObjects.push(value);
            }
          });

          CreateStoryService.syncPages($scope.currentStory.id, $scope.draggableObjects);
        }
      }, function (err) {
        pagesFromInternet = [];
      });

    };

    vm.pagesAlreadyExistsInLocalStorage = function (array, story) {
      var exists = false;
      _.each(array, function (item) {
        if (story.id === item.id) {
          exists = true;
        }
      });

      return exists;
    };

    $scope.$on("$routeChangeSuccess", function () {
      if ($location.path().indexOf("/editStory/") == 0) {
        var storyId = $routeParams["id"];
        console.log('root changed to editStory with id:' + storyId);
        //Fetch story and assign
        $scope.currentStory = CreateStoryService.findStoryById(storyId);
        vm.init();
      } else if ($location.path().indexOf("/createStory") == 0) {
        console.log('root changed to createStory');
        $scope.currentStory = CreateStoryService.createStory();
        console.log('story id:' + $scope.currentStory.id);
        vm.init();
      }

    });

    $scope.modifyTitle = function () {

    };

    $scope.deletePage = function (index, obj) {
      $scope.draggableObjects.splice(index, 1);
      CreateStoryService.syncPages($scope.currentStory.id, $scope.draggableObjects);
      //Also delete from phaserDB
      CreateStoryService.deletePhaserPages($scope.currentStory.id, obj.id);
    };

    $scope.addNewPage = function () {
      console.log('adding new page for Story:' + $scope.currentStory.id);
      //call service and generate new page
      var count = $scope.draggableObjects.length + 1;
      var newPage = CreateStoryService.createPage($scope.currentStory.id, count, "content", "assets/images/newPage.png");
      $scope.draggableObjects.push(newPage);
    };

    $scope.adjustOrder = function (array, from, to) {

      if (to === from) return;

      var target = array[from];
      var increment = to < from ? -1 : 1;

      for (var k = from; k != to; k += increment) {
        array[k] = array[k + increment];
      }
      array[to] = target;
    };

    $scope.onDropComplete = function (index, obj, evt) {
      if (index == 0) return;
      var draggedObjectIndex = $scope.draggableObjects.indexOf(obj);
      $scope.adjustOrder($scope.draggableObjects, draggedObjectIndex, index);

      CreateStoryService.syncPages($scope.currentStory.id, $scope.draggableObjects);
    };

    vm.updateTitle = function (title) {
      CreateStoryService.updateTitle($scope.currentStory.id, title);
    }

    vm.DialogController = function ($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }

    $scope.addTitle = function (ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: vm.DialogController,
          templateUrl: 'views/updateTitle.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        })
        .then(function (answer) {
          $scope.status = 'You said the was "' + answer + '".';
          vm.updateTitle(answer);
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function () {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    $scope.goToLibrary = function (event) {
      $location.path("/library");
    };

    $scope.editPage = function (index, page) {
      var createToolBar = document.getElementById("createToolBar");
      var toolBarHeight = 0;
      if (createToolBar) {
        $rootScope.toolBarHeight = createToolBar.clientHeight;
      } else {
        $rootScope.toolBarHeight = 0;
      }
      $location.path("/editPage/" + page.id + "/" + $scope.currentStory.id + "/" + $scope.currentStory.title + "/" + $rootScope.toolBarHeight);
    };

    $scope.duplicatePage = function (index, page) {
      if (index == 0) {
        return;
      }
      var newPageId = CreateStoryService.generateUUID();
      console.log('called duplicate page:' + page);
      var copyPage = _.cloneDeep(page);
      copyPage.id = newPageId;
      copyPage.pageCount = $scope.draggableObjects.length + 1;
      $scope.draggableObjects.splice(index, 0, copyPage);
      CreateStoryService.syncPages($scope.currentStory.id, $scope.draggableObjects);
      //Also copy into from phaserDB
      CreateStoryService.duplicatePhaserPage($scope.currentStory.id, page.id, copyPage.id);
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

  }
];
