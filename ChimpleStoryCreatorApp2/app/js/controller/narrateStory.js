'use strict';

module.exports = ['$rootScope', '$scope', '$location', '$route', '$routeParams', '$mdSidenav', '$mdDialog', '$mdMedia', '$mdBottomSheet', '$mdToast', '$timeout', 'NarrateStoryService',
  'Loki', 'chimpleConfig', '_',
  function ($rootScope, $scope, $location, $route, $routeParams, $mdSidenav, $mdDialog, $mdMedia, $mdBottomSheet, $mdToast, $timeout, NarrateStoryService, Loki, chimpleConfig, _) {
    console.log('Narrate Story Ctrl');
    var vm = this;
    //load narrate configuration from internet
    vm.init = function () {
      console.log('in narrate story controller');
      //create database if doesn't exist
      var collections = NarrateStoryService.init();

      if (collections["narrateConfigCollection"] != undefined) {
        vm.loadNarrateConfig(collections["narrateConfigCollection"]);
      };
    };

    $scope.$on("$routeChangeStart", function () {
      console.log('on route change start:' + $routeParams["storyId"]);
    });

    $scope.$on('game:showText', function (event, args) {
      console.log('angular received:' + args);
      $scope.showText(event, args);
    });

    $scope.showText = function (ev, args) {
      var useFullScreen = true;
      if (args && args.displayText) {
        $scope.displayText = args.displayText;
        $mdDialog.show({
          controller: vm.ShowTextDialogController,
          templateUrl: 'views/showTextDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          bindToController: true,
          locals: { content: $scope.displayText },
          controllerAs: 'ctrl',
          clickOutsideToClose: true
        }).then(function (answer) {}, function () {
          $rootScope.$broadcast("game:resumePlaying", {});
        });
      }
    };

    $scope.$on("$routeChangeSuccess", function () {
      if ($location.path().indexOf("/narrateStory/") == 0) {
        vm.storyId = $routeParams["storyId"];
        $scope.title = $routeParams["title"] || '';
        $scope.storyId = vm.storyId;
        console.log("root changed to narrateStory with storyId:" + vm.storyId);
        vm.init();
        $rootScope.$broadcast('game:storyId', {
          storyId: $scope.storyId
        });
      }
    });

    //Buid UI        
    vm.buildUI = function () {
      $scope.criteria = {
        selectedMode: 'md-scale',
        selectedDirection: 'left',
        items: vm.getToolBarData()
      };
    };

    vm.getToolBarData = function () {
      var actionControls = vm.constructActionButtons();
      var fabItems = [];
      fabItems = fabItems.concat(actionControls);
      return fabItems;
    };

    vm.constructActionButtons = function () {
      var fabItems = [];
      angular.forEach(vm.config, function (value, index) {
        var operation = value["operationType"];
        if (operation === 'link') {
          var itemDoc = {
            name: value["type"],
            icon: value["fabSpeedDialImage"],
            direction: value["direction"],
            disabled: value["disabled"],
            hidden: value["hidden"],
            operationType: value["operationType"],
          }
          fabItems.push(itemDoc);
        }
      });
      return fabItems;
    };

    $scope.invoke = function (item, $event) {
      console.log('invoke:' + item);
      if (item.operationType === 'link') {
        $scope.doLink(item);
      }
    };

    $scope.doLink = function (item) {
      var linkLocation = item.name;
      $location.path(linkLocation);
    };

    vm.loadNarrateConfig = function (collection) {
      if (!collection) {
        return;
      }

      NarrateStoryService.loadNarrateConfig().then(function (data) {
        console.log("narrate config data:" + data);
        collection.data = [];
        for (var property in data) {
          if (data.hasOwnProperty(property)) {
            var document = {
              type: property,
            };
            var doc = data[property];
            for (var p in doc) {
              if (doc.hasOwnProperty(p)) {
                document[p] = doc[p];
              }
            }
            collection.insert(document);
          }
        }
        NarrateStoryService.save();
        vm.config = vm.loadNarrateConfigFromLocalStorage(collection);
        vm.buildUI();
      }, function (err) {
        console.log('no internet accessible, trying to find from local storage');
        vm.config = vm.loadNarrateConfigFromLocalStorage(collection);
        vm.buildUI();
      });
    };

    vm.ShowTextDialogController = function ($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
        //$rootScope.$broadcast("game:resumePlaying",{});
      };
    };

    vm.loadNarrateConfigFromLocalStorage = function (collection) {
      var configs = null;
      if (collection && collection.data.length > 0) {
        configs = collection.data;
      }
      return configs;
    };

  }
];
