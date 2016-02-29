'use strict';

module.exports = ['$rootScope', '$scope', '$location', '$route', '$routeParams', '$mdSidenav', '$mdDialog', '$mdMedia', '$mdBottomSheet', '$mdToast', '$timeout', 'EditPageService',
  'Loki', 'chimpleConfig', '_',
  function ($rootScope, $scope, $location, $route, $routeParams, $mdSidenav, $mdDialog, $mdMedia, $mdBottomSheet, $mdToast, $timeout, EditPageService, Loki, chimpleConfig, _) {
    console.log('Edit Page Ctrl');
    var vm = this;
    //load master configuration from internet
    vm.init = function () {
      //create database if doesn't exist
      var collections = EditPageService.init();

      if (collections["masterConfigCollection"] != undefined) {
        vm.loadMasterConfigs(collections["masterConfigCollection"]);
      };

      if (collections["masterAttributesConfigCollection"] != undefined) {
        vm.loadMasterAttributesConfigs(collections["masterAttributesConfigCollection"]);
      };
    };

    vm.loadMasterAttributesConfigs = function (collection) {
      if (!collection) {
        return;
      }

      EditPageService.loadMasterAttributesConfig().then(function (data) {
        console.log("master attributes config data:" + data);
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
        EditPageService.save();
        vm.attributesConfig = vm.loadMasterAttributesConfigFromLocalStorage(collection);
        vm.constructTabs();
      }, function (err) {
        console.log('no internet accessible, trying to find from local storage');
        vm.attributesConfig = vm.loadMasterAttributesConfigFromLocalStorage(collection);
        vm.constructTabs();
      });
    };

    vm.loadMasterConfigs = function (collection) {
      if (!collection) {
        return;
      }

      EditPageService.loadMasterConfig().then(function (data) {
        console.log("master config data:" + data);
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
        EditPageService.save();
        vm.config = vm.loadMasterConfigFromLocalStorage(collection);
        vm.buildUI();
      }, function (err) {
        console.log('no internet accessible, trying to find from local storage');
        vm.config = vm.loadMasterConfigFromLocalStorage(collection);
        vm.buildUI();
      });
    };

    vm.loadMasterAttributesConfigFromLocalStorage = function (collection) {
      var configs = null;
      if (collection && collection.data.length > 0) {
        //alreadyStoredStories = collection.data[0].stories;
        configs = collection.data;
      }
      return configs;
    };

    vm.loadMasterConfigFromLocalStorage = function (collection) {
      var configs = null;
      if (collection && collection.data.length > 0) {
        //alreadyStoredStories = collection.data[0].stories;
        configs = collection.data;
      }
      return configs;
    };

    //TODO set from current value later...
    $scope.bColor = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    };

    $scope.tColor = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    };

    $scope.$on("$routeChangeStart", function () {
      console.log('on route change start:' + $routeParams["id"]);
      console.log('on route change start:' + $routeParams["storyId"]);
    });

    $scope.$on("$routeChangeSuccess", function () {
      if ($location.path().indexOf("/editPage/") == 0) {
        vm.pageId = $routeParams["id"];
        vm.storyId = $routeParams["storyId"];
        $scope.title = $routeParams["title"] || '';
        $scope.storyId = vm.storyId;
        $scope.pageId = vm.pageId;
        $scope.toolBarHeight = $routeParams["toolBarHeight"];
        console.log('root changed to editPage with id:' + vm.pageId + "and storyId:" + vm.storyId);
        vm.init();
        $rootScope.$broadcast('game:storyId-pageId', {
          storyId: $scope.storyId,
          pageId: $scope.pageId
        });
      }
    });

    vm.getToolBarData = function () {
      var categoryControls = vm.constructCategoryButtons();
      var actionControls = vm.constructActionButtons();
      var fabItems = [];
      fabItems = fabItems.concat(categoryControls);
      fabItems = fabItems.concat(actionControls);

      return fabItems;
    };

    vm.constructActionButtons = function () {
      var fabItems = [];
      angular.forEach(vm.config, function (value, index) {
        var operation = value["operationType"];
        if (operation === 'action' || operation === 'link') {
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

    vm.constructCategoryButtons = function () {
      var fabItems = [];
      angular.forEach(vm.config, function (value, index) {
        var operation = value["operationType"];
        if (operation === 'category') {
          var mThemes = value["masterThemes"];
          var mThemeItems = [];
          angular.forEach(mThemes, function (data, index) {
            var item = {
              name: data["name"],
              thumbnail: data["displayThumbNail"],
              subThemes: data["subThemes"],
              themeType: value["type"],
              itemIndex: index
            }
            mThemeItems.push(item);
          });

          var itemDoc = {
            name: value["type"],
            icon: value["fabSpeedDialImage"],
            direction: value["direction"],
            disabled: value["disabled"],
            hidden: value["hidden"],
            operationType: value["operationType"],
            themeData: mThemeItems
          }
          fabItems.push(itemDoc);
        }
      });
      return fabItems;
    };

    $scope.onSelectCategoryTab = function (response) {
      console.log('select tab:' + response);
      if (response.themeType != undefined && response.themeType !== $scope.selectedThemeType) {
        return;
      }
      $scope.selectedMasterTheme = response;
      $scope.selectedChildThemes = {
        getLength: function () {
          var length = 0;
          length = response.subThemes.length;
          return length;
        },
        getItemAtIndex: function (i) {
          var item;
          item = response.subThemes[i];
          return item;
        }
      };
      $scope.curSelectedCategoryTab = response.name;

    };

    $scope.onDeSelectCategoryTab = function (tab) {
      console.log('deselect tab:' + tab);
    };

    $scope.onSelectTab = function (tab) {
      console.log('select tab:' + tab);
      $scope.curSelectedTab = tab.displayName;

      $scope.childTabs = {
        getLength: function () {
          var length = 0;
          angular.forEach($scope.tabBody, function (item, index) {
            if (item.selectedTab === $scope.curSelectedTab) {
              length = item.data.length;
            }
          });

          return length;
        },
        getItemAtIndex: function (i) {
          var item;
          angular.forEach($scope.tabBody, function (obj, index) {
            if (obj.selectedTab === $scope.curSelectedTab) {
              item = obj.data[i];
              if (item) {
                if (obj.editData != undefined && obj.editData.length > 0) {
                  item.editAllowed = true;
                  item.editData = obj.editData;
                } else {
                  item.editAllowed = false;
                }
              }
            }
          });

          return item;
        }
      };

    };

    $scope.onDeSelectTab = function (tab) {
      console.log('deselect tab:' + tab);
    };

    vm.refreshToolBar = function (array, type, action, name) {
      if (type === "category") {
        if (action === "disable") {
          angular.forEach(array, function (doc) {
            if (doc.name === name) {
              doc.disabled = true;
              doc.hidden = true;
            }
          });

        } else if (action === "enable") {
          angular.forEach(array, function (doc) {
            if (doc.name === name) {
              doc.disabled = false;
              doc.hidden = false;
            }

          });
        }
      } else if (type === "action") {
        if (action === "disable") {
          angular.forEach(array, function (doc) {
            if (doc.name === name) {
              doc.disabled = true;
              doc.hidden = true;
            }
          });
        } else if (action === "enable") {
          angular.forEach(array, function (doc) {
            if (doc.name === name) {
              doc.disabled = false;
              doc.hidden = false;
            }
          });
        }
      }
    };

    vm.updateUI = function (fabItems) {
      $scope.criteria = {
        hidden: false,
        isOpen: false,
        hover: false,
        selectedMode: 'md-scale',
        selectedDirection: 'left',
        items: fabItems
      };
    };

    //Buid UI        
    vm.buildUI = function () {
      $scope.criteria = {
        hidden: false,
        isOpen: false,
        hover: false,
        selectedMode: 'md-scale',
        selectedDirection: 'left',
        items: vm.getToolBarData()
      };
    };

    vm.getTabs = function (type) {
      angular.forEach($scope.tabHeaders, function (v) {
        if (v.key == type) {
          if (v.data && v.data.length > 0) {
            $scope.curSelectedTab = v.data[0].displayName;
            $scope.tabs = v.data;
          }
        }
      })
    };

    vm.constructTabs = function () {
      var tabHeaders = [];
      var tabBody = [];
      angular.forEach(vm.attributesConfig, function (value, index) {
        if (value.type && value.tabData != undefined && value.tabData.length > 0) {
          var data = [];
          angular.forEach(value.tabData, function (v, i) {
            data.push({
              "displayName": v["displayName"],
              "displayImage": v["displayImage"],
              "tabIndex": v["tabIndex"]
            });
            tabBody.push({
              "selectedTab": v["displayName"],
              "data": v["attrs"],
              "editData": v["editAttrs"]
            });

          });
          tabHeaders.push({
            "key": value.type,
            "data": data
          });
        }
      });

      $scope.tabHeaders = tabHeaders;
      $scope.tabBody = tabBody;
    };

    $scope.masterThemes = {
      getLength: function () {
        var length = 0;
        angular.forEach($scope.criteria.items, function (fabItem, index) {
          if (fabItem.name === $scope.selectedThemeType) {
            length = fabItem.themeData.length;
          }
        });

        return length;
      },
      getItemAtIndex: function (i) {
        var item;
        angular.forEach($scope.criteria.items, function (fabItem, index) {
          if (fabItem.name === $scope.selectedThemeType) {
            item = fabItem.themeData[i];
          }
        });

        return item;
      }
    };

    vm.selectMasterThemes = function (type) {
      var mThemeItems = [];
      angular.forEach(vm.config, function (value, index) {
        var whichKind = value["type"];
        if (whichKind === type) {
          var mThemes = value["masterThemes"];
          angular.forEach(mThemes, function (data, index) {
            var item = {
              name: data["name"],
              thumbnail: data["displayThumbNail"]
            }
            mThemeItems.push(item);
          });
        }
      });

      return mThemeItems;
    };

    $scope.childThemes = {
      getLength: function () {
        var length = 0;
        length = $scope.selectedMasterTheme.subThemes.length;
        return length;
      },
      getItemAtIndex: function (i) {
        var item;
        item = $scope.selectedMasterTheme.subThemes[i];
        return item;
      }
    };

    $scope.selectedMasterItem = function ($index, item, $event) {
      $mdBottomSheet.hide(item);
    };

    $scope.childSelected = function ($index, item) {
      $mdBottomSheet.hide(item);
    };

    $scope.$on('game:showText', function (event, args) {
      console.log('angular received:' + args);
      $scope.showText(event, args);
    });

    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.$on('game:recordingStarted', function (event, args) {
      var fabItems = [];
      var categoryControls = vm.constructCategoryButtons();
      var actionControls = vm.constructActionButtons();

      fabItems = fabItems.concat(categoryControls);
      fabItems = fabItems.concat(actionControls);

      vm.refreshToolBar(fabItems, "action", "disable", "record");
      vm.refreshToolBar(fabItems, "action", "disable", "play");
      vm.refreshToolBar(fabItems, "category", "disable", "backGround");
      vm.refreshToolBar(fabItems, "category", "disable", "character");
      vm.refreshToolBar(fabItems, "action", "enable", "stop");
      $scope.safeApply(function () {
        vm.updateUI(fabItems);
      });
    });

    $scope.$on('game:enableRecording', function (events, args) {
      console.log('game:enableRecording:' + event + " " + args);
      var fabItems = [];
      var categoryControls = vm.constructCategoryButtons();
      var actionControls = vm.constructActionButtons();
      fabItems = fabItems.concat(categoryControls);
      fabItems = fabItems.concat(actionControls);
      vm.refreshToolBar(fabItems, "action", "enable", "record");
      $scope.safeApply(function () {
        vm.updateUI(fabItems);
      });

    });

    $scope.$on('game:recordingPaused', function (events, args) {
      console.log('game:recordingPaused:' + event + " " + args);
      var fabItems = [];
      var categoryControls = vm.constructCategoryButtons();
      var actionControls = vm.constructActionButtons();

      fabItems = fabItems.concat(categoryControls);
      fabItems = fabItems.concat(actionControls);
      vm.refreshToolBar(fabItems, "action", "disable", "record");
      vm.refreshToolBar(fabItems, "action", "disable", "play");
      vm.refreshToolBar(fabItems, "action", "disable", "stop");
      vm.refreshToolBar(fabItems, "category", "disable", "backGround");
      vm.refreshToolBar(fabItems, "category", "disable", "character");
      vm.refreshToolBar(fabItems, "action", "enable", "pause");
      $scope.safeApply(function () {
        vm.updateUI(fabItems);
      });

    });

    vm.buildDelayedToggler = function (navID) {
      return vm.debounce(function () {
        $mdSidenav(navID)
          .toggle()
          .then(function () {});
      }, 200);
    };

    vm.debounce = function (func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    $scope.changeBackGroundColor = function () {
      vm.buildDelayedToggler('left')()
      $scope.whichColorChanged = 'backGroundColor';
    };

    $scope.changeTextColor = function () {
      vm.buildDelayedToggler('left')();
      $scope.whichColorChanged = 'textColor';

    };

    $scope.updateSpriteText = function (text) {
      $scope.spriteText = text;
      console.log('curTextData:' + $scope.curTextData);
      console.log('bColor:' + $scope.bColor.red + " " + $scope.bColor.green + " " + $scope.bColor.blue);
      console.log('tColor:' + $scope.tColor.red + " " + $scope.tColor.green + " " + $scope.tColor.blue);
      console.log('spriteText:' + $scope.spriteText);
      $scope.curTextData.bgColor = $scope.bColor;
      $scope.curTextData.tColor = $scope.tColor;
      $scope.curTextData.displayText = $scope.spriteText;
      $scope.hidePhaser = true;
      $scope.showTextEditor = false;
      $scope.showSettings = true;

      $rootScope.$broadcast("game:spriteText", {
          selectedTextIndex: $scope.curTextData.selectedTextIndex,
          class: "TextEditor",
          displayText: $scope.curTextData.displayText,
          template: "speechBubble",
          attrs: {
            textColor: {
              red: $scope.curTextData.tColor.red,
              blue: $scope.curTextData.tColor.blue,
              green: $scope.curTextData.tColor.green
            },
            backGroundColor: {
              red: $scope.curTextData.bgColor.red,
              blue: $scope.curTextData.bgColor.blue,
              green: $scope.curTextData.bgColor.green
            }
          },
          storyId: vm.storyId,
          pageId: vm.pageId
        },
        $scope.settingArgs
      );
    }

    $scope.closeEditor = function () {
      $scope.hidePhaser = false;
      $scope.showTextEditor = false;
      $scope.showSettings = false;

      $rootScope.$broadcast("game:closeEditor", $scope.settingArgs);
    };

    $scope.deleteSpriteText = function (text) {
      $scope.spriteText = 'Change me';

      console.log('curTextData:' + $scope.curTextData);
      console.log('bColor:' + $scope.bColor.red + " " + $scope.bColor.green + " " + $scope.bColor.blue);
      console.log('tColor:' + $scope.tColor.red + " " + $scope.tColor.green + " " + $scope.tColor.blue);
      console.log('spriteText:' + $scope.spriteText);

      var defaultColor = 255;
      var defaultBGColor = 0;

      $scope.curTextData.bgColor = {
        red: defaultBGColor,
        green: defaultBGColor,
        blue: defaultBGColor
      };

      $scope.curTextData.tColor = {
        red: defaultColor,
        green: defaultColor,
        blue: defaultColor
      };;
      $scope.curTextData.displayText = $scope.spriteText;
      $scope.hidePhaser = true;
      $scope.showTextEditor = false;
      $scope.showSettings = true;

      $rootScope.$broadcast("game:spriteText", {
          selectedTextIndex: $scope.curTextData.selectedTextIndex,
          class: "TextEditor",
          displayText: $scope.curTextData.displayText,
          template: "speechBubble",
          attrs: {
            textColor: {
              red: $scope.curTextData.tColor.red,
              blue: $scope.curTextData.tColor.blue,
              green: $scope.curTextData.tColor.green
            },
            backGroundColor: {
              red: $scope.curTextData.bgColor.red,
              blue: $scope.curTextData.bgColor.blue,
              green: $scope.curTextData.bgColor.green
            }
          },
          storyId: vm.storyId,
          pageId: vm.pageId
        },
        $scope.settingArgs
      );
    };

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {});
    };

    $scope.changeAttribute = function (item, ev, selectedItemIndex) {
      console.log('change:attribute:' + event + "item:" + item + "selectedItemIndex:" + selectedItemIndex);
      $scope.tabType = item.type;
      $scope.selectedAttrIndex = item.selectedAttrIndex;
      $scope.curItemIndex = item.itemIndex != undefined ? item.itemIndex : $scope.curItemIndex;
      $scope.curTabIndex = item.tabIndex != undefined ? item.tabIndex : $scope.curTabIndex;
      console.log('what is curTabIndex:' + $scope.curTabIndex);
      console.log('what is curItemIndex:' + $scope.curItemIndex);
      vm.getTabs($scope.tabType);
      //Hacked to scroll to cur tab
      if ($scope.curTabIndex !== 0) {
        _.each($scope.tabHeaders, function (th) {
          if (th.key === item.type) {
            if (th.data != undefined && $scope.curTabIndex < th.data.length) {
              var firstTab = th.data[0];
              var curSelTab = th.data[$scope.curTabIndex];
              $scope.onDeSelectTab(firstTab);
              $scope.onSelectTab(curSelTab);
            }
          }
        });
      }

      $scope.hidePhaser = true;
      $scope.showTab = true;
      $scope.showSettings = false;
    };

    $scope.changeText = function (text, ev, selectedTextIndex) {
      console.log('change:text:' + event + "text:" + text);
      console.log('$scope.settingArgs:' + $scope.settingArgs);
      if ($scope.settingArgs != undefined && $scope.settingArgs.attributeEditOverlay != undefined && $scope.settingArgs.attributeEditOverlay.game != undefined) {
        console.log("game status in angular:" + $scope.settingArgs.attributeEditOverlay.game.gameStatus);

        if ($scope.settingArgs.attributeEditOverlay.game.gameStatus == 1) {
          $scope.hidePhaser = false;
          $scope.showTextEditor = false;
          $scope.showSettings = false;

          //Return back to game
          text.applied = true;
          $rootScope.$broadcast("game:addTextToGame", {
            selectedTextIndex: selectedTextIndex,
            type: text.type,
            applied: true,
            class: "TextEditor",
            displayText: text.displayText,
            template: "speechBubble",
            attrs: {
              textColor: {
                red: text.tColor.red,
                blue: text.tColor.blue,
                green: text.tColor.green
              },
              backGroundColor: {
                red: text.bgColor.red,
                blue: text.bgColor.blue,
                green: text.bgColor.green
              }
            },
            storyId: vm.storyId,
            pageId: vm.pageId
          }, $scope.settingArgs);
          return;
        }
      }
      $scope.bColor.red = text.bgColor.red;
      $scope.bColor.green = text.bgColor.green;
      $scope.bColor.blue = text.bgColor.blue;

      $scope.tColor.red = text.tColor.red;
      $scope.tColor.green = text.tColor.green;
      $scope.tColor.blue = text.tColor.blue;
      $scope.spriteText = text.displayText;
      $scope.curTextData = text;
      $scope.curTextData.selectedTextIndex = selectedTextIndex;
      $scope.showSettings = false;
      $scope.hidePhaser = true;
      $scope.showTextEditor = true;
    };

    $scope.$on('change:text', function (events, textSprite, editOverlay, saveTextForSprite) {
      console.log('change:text:' + event);
      $scope.textSprite = textSprite;
      $scope.editOverlay = editOverlay;
      $scope.saveTextForSprite = saveTextForSprite;
      var selectedIndex = textSprite.selectedTextIndex;
      var defaultColor = 255;
      if (saveTextForSprite.texts != null && saveTextForSprite.texts.length > selectedIndex) {
        var savedTextAttr = saveTextForSprite.texts[selectedIndex];
        if (savedTextAttr && savedTextAttr.attrs) {
          var bgColor = savedTextAttr.attrs.backGroundColor;
          $scope.bColor.red = bgColor.red;
          $scope.bColor.green = bgColor.green;
          $scope.bColor.blue = bgColor.blue;
          var tColor = savedTextAttr.attrs.textColor;
          $scope.tColor.red = tColor.red;
          $scope.tColor.green = tColor.green;
          $scope.tColor.blue = tColor.blue;
        }
      } else {
        $scope.bColor.red = defaultColor;
        $scope.bColor.green = defaultColor;
        $scope.bColor.blue = defaultColor;

        $scope.tColor.red = defaultColor;
        $scope.tColor.green = defaultColor;
        $scope.tColor.blue = defaultColor;

      }
      $scope.safeApply(function () {
        $scope.hidePhaser = true;
        $scope.showTextEditor = true;
      });
    });

    $scope.$on('change:settings', function (events, args) {
      console.log('construct change:settings grip overlay' + args);
      if (args !== undefined && args.phaserGameObject !== undefined) {
        var phaserGameObject = args.phaserGameObject;
        //contains texts, fx and sounds - which is already saved for a given Sprite
        $scope.settingArgs = args;
        $scope.texts = vm.createTextArrToDisplay(phaserGameObject.texts, args);

        var sounds = vm.createSoundsToDisplay(phaserGameObject.sound, args);

        var palette = [
          { name: "Red", color: "#00ffff", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'color.png', type: 'fx' },
          { name: "Pink", color: "#E91E63", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'color.png', type: 'fx' },
          { name: "Purple", color: "#9C27B0", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'color.png', type: 'fx' },
          { name: "Blue", color: "#9C27B0", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'color.png', type: 'fx' },
        ];

        var anims = [
          { name: "A1", color: "#00ffff", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'fx_button.png', type: 'anims' },
          { name: "A2", color: "#E91E63", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'fx_button.png', type: 'anims' },
          { name: "A3", color: "#9C27B0", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'fx_button.png', type: 'anims' },
          { name: "A4", color: "#9C27B0", light: true, 'rowSpan': 1, 'colSpan': 1, src: 'fx_button.png', type: 'anims' },
        ];
        var length = sounds.length;
        var finalArray = [];
        for (var i = 0; i < length; i++) {
          finalArray.push(palette.pop());
          finalArray.push(sounds.pop());
          finalArray.push(anims.pop());

        }

        $scope.spriteAttributes = finalArray;
      }

      $scope.safeApply(function () {
        $scope.hidePhaser = true;
        $scope.showSettings = true;
      });
    });

    vm.componentToHex = function (c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    vm.rgbToHex = function (r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };

    vm.createSoundsToDisplay = function (existingSoundsArr, args) {
      var soundData = [];
      for (var i = 0; i < 4; i++) {
        var soundObject = {
          "rowSpan": 1,
          "colSpan": 1,
          "src": 'sound_button.png',
          "type": 'sound',
          "selectedAttrIndex": i
        };

        if (existingSoundsArr !== undefined && i < existingSoundsArr.length) {
          var soundNode = existingSoundsArr[i];
          if (soundNode && !_.isEmpty(soundNode)) {
            soundObject["tabIndex"] = soundNode["tabIndex"];
            soundObject["itemIndex"] = soundNode["itemIndex"];
            soundObject["name"] = soundNode["name"];
            soundObject["soundFile"] = soundNode["soundFile"];
            soundObject["class"] = soundNode["class"];
            soundObject["loop"] = soundNode["loop"];
            soundObject["volume"] = soundNode["volume"];
            soundObject["image"] = soundNode["image"];
            soundObject["displayImage"] = soundNode["displayImage"];
            soundObject["displayName"] = soundNode["displayName"];
            soundObject["tabIndex"] = soundNode["tabIndex"];
            soundObject["selectedAttrIndex"] = soundNode["selectedAttrIndex"];
          }
        }
        soundData.push(soundObject);
      }
      return soundData;
    };

    vm.createTextArrToDisplay = function (existingTextsArr, args) {
      var textData = [];

      for (var i = 0; i < 4; i++) {
        var textObject = {
          "displayText": "Change Text",
          "bgColor": {
            "red": 0,
            "green": 0,
            "blue": 0
          },
          "tColor": {
            "red": 255,
            "green": 255,
            "blue": 255

          },
          'rowSpan': 1,
          'colSpan': 1,
          'src': 'text_bg.jpg'
        };

        if (existingTextsArr !== undefined && i < existingTextsArr.length) {
          var textNode = existingTextsArr[i];
          if (textNode && !_.isEmpty(textNode)) {
            textObject["displayText"] = textNode["displayText"];
            var bgColor = textNode["attrs"]["backGroundColor"];
            if (bgColor) {
              textObject.bgColor = bgColor;
            }
            var tColor = textNode["attrs"]["textColor"];
            if (tColor) {
              textObject.tColor = tColor;
            }
          }
        }
        textData.push(textObject);
      }
      return textData;
    };

    $scope.$on('game:showPlay', function (events, args) {
      console.log('game:showPlay:' + event + " " + args);
      var fabItems = [];
      var categoryControls = vm.constructCategoryButtons();
      var actionControls = vm.constructActionButtons();

      fabItems = fabItems.concat(categoryControls);
      fabItems = fabItems.concat(actionControls);
      vm.refreshToolBar(fabItems, "action", "enable", "play");
      vm.refreshToolBar(fabItems, "action", "disable", "stop");
      vm.refreshToolBar(fabItems, "action", "disable", "pause");
      vm.refreshToolBar(fabItems, "action", "enable", "record");
      vm.refreshToolBar(fabItems, "category", "enable", "backGround");
      vm.refreshToolBar(fabItems, "category", "enable", "character");
      vm.updateUI(fabItems);

    });

    $scope.addChildObjects = function ($event, response) {
      console.log("called add child objects for theme:" + response);
      $scope.selectedMasterTheme = response;
      $mdBottomSheet.show({
        templateUrl: 'views/childThemes.html',
        controller: 'EditPageCtrl',
        clickOutsideToClose: false,
        targetEvent: $event,
        bindToController: true,
        locals: { themes: $scope.childThemes, parentTheme: response.name },
        controllerAs: 'ctrl'
      }).then(function (response) {
        console.log("response:" + response);
        $scope.valueX = response;
        console.log('child item selected:' + response);
        console.log('$scope.selectedThemeType:' + $scope.selectedThemeType);
        console.log('$scope.selectedMasterTheme:' + $scope.selectedMasterTheme);

        //broadcast events to Phaser

        if ($scope.selectedThemeType === "backGround") {
          $rootScope.$broadcast("game:backgroundSelected", {
            parentTheme: $scope.selectedMasterTheme,
            theme: response,
            storyId: vm.storyId,
            pageId: vm.pageId
          });
        } else if ($scope.selectedThemeType === "character") {
          $rootScope.$broadcast("game:characterSelected", {
            parentTheme: $scope.selectedMasterTheme,
            theme: response,
            storyId: vm.storyId,
            pageId: vm.pageId
          });

        }

      });
    }

    $scope.invoke = function (item, $event) {
      console.log('invoke:' + item);

      if (item.operationType === 'category') {
        $scope.showMasterThemes(item, $event);

      } else if (item.operationType === 'action') {
        $scope.doAction(item);
      } else if (item.operationType === 'link') {
        $scope.doLink(item);
      }
    };

    $scope.onSelectCategoryItem = function (item, headerCategoryTab) {
      $scope.hidePhaser = false;
      $scope.showSettings = false;
      $scope.showTab = false;
      $scope.showCategory = false;

      if ($scope.selectedThemeType === "backGround") {
        $rootScope.$broadcast("game:backgroundSelected", {
          parentTheme: $scope.selectedMasterTheme,
          theme: item,
          storyId: vm.storyId,
          pageId: vm.pageId
        });
      } else if ($scope.selectedThemeType === "character") {
        $rootScope.$broadcast("game:characterSelected", {
          parentTheme: $scope.selectedMasterTheme,
          theme: item,
          storyId: vm.storyId,
          pageId: vm.pageId
        });

      }

    };

    $scope.onSelectItem = function (item, headerTab) {
      //save to db
      $scope.hidePhaser = true;
      $scope.showTab = false;
      $scope.showSettings = true;

      //put in $scope for quick access
      $scope.curItemIndex = item.itemIndex;
      $scope.curTabIndex = headerTab.tabIndex;
      var dataToSend = {};
      if (item.editData != undefined && item.editData.length > 0) {
        _.each(item.editData, function (ed) {
          item[ed.name] = ed.value;
        });
      }

      if (item.type === 'sound') {
        var itemSelected = $scope.spriteAttributes[$scope.selectedAttrIndex];
        itemSelected.itemIndex = item.tabIndex;
        itemSelected.class = item.class;
        itemSelected.image = item.image;
        itemSelected.loop = item.tabIndex;
        itemSelected.volume = item.tabIndex;
        itemSelected.soundFile = item.soundFile;
        itemSelected.displayImage = headerTab.displayImage;
        itemSelected.displayName = headerTab.displayName;
        itemSelected.tabIndex = headerTab.tabIndex;
        itemSelected.selectedAttrIndex = $scope.selectedAttrIndex;

        dataToSend = {
          selectedAttrIndex: $scope.selectedAttrIndex,
          class: item.class,
          type: item.type,
          image: item.image,
          itemIndex: item.itemIndex,
          loop: item.loop,
          name: item.name,
          soundFile: item.soundFile,
          volume: item.volume,
          displayImage: headerTab.displayImage,
          displayName: headerTab.displayName,
          tabIndex: headerTab.tabIndex,
          storyId: vm.storyId,
          pageId: vm.pageId
        };
      };

      $rootScope.$broadcast("game:spriteAttributeChanged", dataToSend, $scope.settingArgs);
      $scope.closeEditor();
    };

    $scope.doLink = function (item) {
      var linkLocation = item.name;
      $location.path(linkLocation);
    };

    $scope.doAction = function (item) {
      $rootScope.$broadcast("game:" + item.operationType, {
        action: item.name,
        storyId: vm.storyId,
        pageId: vm.pageId
      });
    };

    $scope.showAttributeSelector = function (item, $event) {
      console.log("called add pros:" + item.name);
      $scope.selectedThemeType = item.name;
      $mdBottomSheet.cancel();
      $mdBottomSheet.show({
        templateUrl: 'views/masterThemes.html',
        controller: 'EditPageCtrl',
        clickOutsideToClose: false,
        targetEvent: $event,
        bindToController: true,
        locals: { themes: $scope.masterThemes },
        controllerAs: 'ctrl'
      }).then(function (response) {
        $scope.valueX = response;
        console.log('master item selected:' + response);
        $scope.addChildObjects($event, response);
      });
    };

    $scope.showMasterThemes = function (item, $event) {
      console.log("called add pros:" + item.name);
      $scope.categoryTabs = item.themeData;
      $scope.selectedThemeType = item.name;
      if ($scope.categoryTabs != undefined && $scope.categoryTabs.length > 0) {
        $scope.selectedMasterTheme = $scope.categoryTabs[0];
        $scope.selectedMasterTheme.themeType = $scope.selectedThemeType;
        $scope.selectedChildThemes = {
          getLength: function () {
            var length = 0;
            length = $scope.categoryTabs[0].subThemes.length;
            return length;
          },
          getItemAtIndex: function (i) {
            var item;
            item = $scope.categoryTabs[0].subThemes[i];
            return item;
          }
        }
      }
      $scope.hidePhaser = true;
      $scope.showSettings = false;
      $scope.showTab = false;
      $scope.showCategory = true;
      $scope.onSelectCategoryTab($scope.selectedMasterTheme);
      $scope.selectedHeaderCategoryIndex = $scope.selectedMasterTheme.itemIndex;

      /*console.log("called add pros:" + item.name);
      $scope.selectedThemeType = item.name;            
      $mdBottomSheet.cancel();
      $mdBottomSheet.show({
          templateUrl: 'views/masterThemes.html',
          controller: 'EditPageCtrl',
          clickOutsideToClose: false,
          targetEvent: $event,
          bindToController: true,
          locals: {themes: $scope.masterThemes},
          controllerAs: 'ctrl'
      }).then(function (response) {
          $scope.valueX = response;
          console.log('master item selected:' + response);
          $scope.addChildObjects($event, response);
      });*/
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

    $scope.openAttributeEditorDialog = function (ev, item, args) {
      var useFullScreen = true;
      console.log('item:' + item);
      console.log('args:' + args);
      _.each(args, function (v) {
        var property = v.name;
        if (item.hasOwnProperty(property)) {
          v.value = item[property];
        };
      });
      $scope.editArgs = args;
      $mdDialog.show({
        controller: vm.AttributeEditorDialogController,
        templateUrl: 'views/attributeEditorDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        bindToController: true,
        locals: { content: $scope.editArgs },
        controllerAs: 'ctrl',
        fullscreen: useFullScreen
      });
    };

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

    vm.AttributeEditorDialogController = function ($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };
    }
  }
];
