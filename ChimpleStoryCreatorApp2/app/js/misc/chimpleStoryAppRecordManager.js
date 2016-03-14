'use strict';

var _ = require('lodash')._;
var HashMap = require('hashmap');
var CharacterSprite = require('../fabs/characterSprite');
var DragonBoneSprite = require('../fabs/dragonBoneSprite');

(function (global, Phaser, loki, _, HashMap) {
  var ChimpleStoryAppRecordManager = function (game, storage) {
    return new ChimpleStoryAppRecordManager.Init(game, storage);
  };

  ChimpleStoryAppRecordManager.prototype = {
    resetMap: function () {
      var self = this;
      self.recordInformationMap = new HashMap();
      self.textRecordInformationMap = new HashMap();
      self.soundRecordInformationMap = new HashMap();
      self.fxRecordInformationMap = new HashMap();
      self.animsRecordInformationMap = new HashMap();

      return self;
    },

    getTotalRecordingTime: function () {
      var self = this;
      var animstory = self.storage.findStoryIdPageId(self.game.storage_config.animationCollection, self.game.story.storyId + '-' + self.game.scope.pageId);
      return animstory.recordingTime;
    },

    syncRecordInformation: function (key, valueMap, totalRecordingTime) {
      var self = this;
      if (!key) {
        throw 'Key is required';
      }

      if (!valueMap) {
        throw 'valueMap is required';
      }

      /*if(valueMap && !(valueMap instanceof(HashMap))) {
          throw 'valueMap must be HashMap';
      } */

      self.recordToLoki(key, valueMap, totalRecordingTime);
      return self;
    },

    updateAttribute: function (data) {
      var self = this;
      console.log('data:' + data);

      var self = this;
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      var spriteToSave;
      var atIndex = data.selectedAttrIndex;
      var identifiedObj = self.identifyObjectByUniquename(data.uniquename);

      if (identifiedObj) {
        spriteToSave = identifiedObj.sprite;
        var arrayKind = data.type;
        var doc = {};

        for (var property in data) {
          if (data.hasOwnProperty(property)) {
            doc[property] = data[property];
          }
        }

        spriteToSave[arrayKind].splice(atIndex, 1, doc);
        collection.update(self.game.story);
        self.game.storageDB.getDB().save();
      }

    },

    updateText: function (data) {
      var self = this;
      console.log('data:' + data);

      var self = this;
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      var spriteToSave;
      var atIndex = data.selectedTextIndex;
      var identifiedObj = self.identifyObjectByUniquename(data.uniquename);

      if (identifiedObj) {
        spriteToSave = identifiedObj.sprite;
        spriteToSave.texts.splice(atIndex, 1, {
          "x": spriteToSave.x,
          "y": spriteToSave.y,
          "kind": "text",
          "uniquename": _.uniqueId(spriteToSave.uniquename + "_" + atIndex),
          "applied": data.applied || false,
          "displayText": data.displayText,
          "template": data.template,
          "class": data.class,
          "attrs": {
            "backGroundColor": data.attrs.backGroundColor,
            "textColor": data.attrs.textColor
          }
        });
        collection.update(self.game.story);
        self.game.storageDB.getDB().save();

      }
    },

    recordSpecialPropertyChange: function (key, valueMap, specialType) {

    },

    recordText: function (key, valueMap) {
      var self = this;
      var stringJSON = null;
      self.textRecordInformationMap.set(key, valueMap);

      var animstory = self.storage.findStoryIdPageId(self.game.storage_config.animationCollection, self.game.story.storyId + '-' + self.game.scope.pageId);
      var anims = self.storage.getCollection(self.game.storage_config.animationCollection);
      if (!animstory) {
        var sequences = [];
        sequences.push({
          "key": key,
          "map": valueMap
        });
        var doc = {
          'sequences': sequences,
          'storyId-pageId': self.game.story.storyId + '-' + this.game.scope.pageId
        }
        anims.insert(doc);
        self.storage.getDB().save();
      } else {
        animstory.sequences.push({
          "key": key,
          "map": valueMap
        });
        anims.update(animstory);
        self.storage.getDB().save();
      }
    },

    recordToLoki: function (key, valueMap, totalRecordingTime) {
      var self = this;
      var stringJSON = null;
      self.recordInformationMap.set(key, valueMap);

      var animstory = self.storage.findStoryIdPageId(self.game.storage_config.animationCollection, self.game.story.storyId + '-' + self.game.scope.pageId);
      var anims = self.storage.getCollection(self.game.storage_config.animationCollection);
      if (!animstory) {
        var sequences = [];
        sequences.push({
          "key": key,
          "map": valueMap
        });
        var doc = {
          'sequences': sequences,
          'storyId-pageId': self.game.story.storyId + '-' + this.game.scope.pageId,
          'recordingTime': totalRecordingTime
        }
        anims.insert(doc);
        self.storage.getDB().save();
      } else {
        animstory.sequences.push({
          "key": key,
          "map": valueMap
        });
        animstory.recordingTime = totalRecordingTime;
        anims.update(animstory);
        self.storage.getDB().save();
      }

      //Also update recordingTime in PhaserStories collection for each storyId-PageId
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      self.game.currentPage.recordingTime = totalRecordingTime;
      collection.update(self.game.story);
      self.game.storageDB.getDB().save();
    },

    findNearestValue: function (uniquenameKey, lookUpKey) {
      var self = this;
      //Download data from Loki and create recorded map            
      if (!self.recordInformationMap.get(uniquenameKey)) {
        var animstory = self.storage.findStoryIdPageId(self.game.storage_config.animationCollection, self.game.story.storyId + '-' + self.game.scope.pageId);
        _.each(animstory.sequences, function (doc) {
          if (doc.key === uniquenameKey) {
            var data = doc.map;
            if (data) {
              var valueMapBack = data;
              valueMapBack.__proto__ = HashMap.prototype;
              var newMap = new HashMap();
              newMap._data = _.cloneDeep(valueMapBack._data);
              self.recordInformationMap.set(uniquenameKey, newMap);
            }
          }
        });
      }

      var map = self.recordInformationMap.get(uniquenameKey);
      if (map && map.keys() && map.keys().length > 0) {
        var closest = map.keys().reduce(function (prev, curr) {
          return (Math.abs(curr - lookUpKey) < Math.abs(prev - lookUpKey) ? curr : prev);
        });
        return map.get(closest);
      };
    },

    getRecordInformationMap: function () {
      var self = this;
      return self.recordInformationMap;
    },

    recordHideOrUnhideChange: function (data) {
      var self = this;
      self.recordPropertiesChange(data);
    },

    setPropteryToDefaultSuppliedValueForAllGameObjects: function (data) {
      var self = this;
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);

      _.each(self.game.currentPage.characterDragonBones, function (dragonBone, i) {
        for (var property in data) {
          if (data.hasOwnProperty(property) && property !== "uniquename") {
            dragonBone[property] = data[property]["default"];
          }
        }
      });

      _.each(self.game.currentPage.characterSprites, function (character, i) {
        for (var property in data) {
          if (data.hasOwnProperty(property) && property !== "uniquename") {
            character[property] = data[property]["default"];
          }
        }
      });

      _.each(self.game.currentPage.backgrounds, function (background, i) {
        for (var property in data) {
          if (data.hasOwnProperty(property) && property !== "uniquename") {
            background[property] = data[property]["default"];
          }
        }
      });

      collection.update(self.game.story);
      self.game.storageDB.getDB().save();

    },

    recordSendToBackChange: function (data) {
      var self = this;
      self.recordPropertiesChangeAcrossAllObjects(data);
    },

    recordBringToTopChange: function (data) {
      var self = this;
      self.recordPropertiesChangeAcrossAllObjects(data);
    },

    recordAngleAndScale: function (data) {
      var self = this;
      self.recordPropertiesChange(data);
    },

    remove: function (uniquename) {
      var self = this;
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      var found = false;
      _.each(self.game.currentPage.characterDragonBones, function (dragonBone, i) {
        if (dragonBone.uniquename === uniquename) {
          self.game.currentPage.characterDragonBones.splice(i, 1);
          found = true;
        }
      });
      if (!found) {
        _.each(self.game.currentPage.characterSprites, function (character, i) {
          if (character.uniquename === uniquename) {
            self.game.currentPage.characterSprites.splice(i, 1);
            found = true;
          }
        });
      }

      if (!found) {
        _.each(self.game.currentPage.backgrounds, function (background, i) {
          if (background.uniquename === uniquename) {
            self.game.currentPage.backgrounds.splice(i, 1);
          }
        });
      }
      collection.update(self.game.story);
      self.game.storageDB.getDB().save();
    },

    loadRecordedSequence: function () {
      //load recorded sequence for a given story-page to play/replay
      var self = this;
      self.resetMap();
      var key, valueMap, dataString;
      var animstory = self.storage.findStoryIdPageId(self.game.storage_config.animationCollection, self.game.story.storyId + '-' + self.game.scope.pageId);
      console.log('animstory:' + animstory);
      if (animstory) {
        self.recordInformationMap.recordingTime = animstory.recordingTime;
        _.each(animstory.sequences, function (sequence) {
          key = sequence.key;
          valueMap = sequence.map;
          valueMap.__proto__ = HashMap.prototype;
          valueMap.constructor = HashMap.prototype.constructor;
          var newMap = new HashMap();
          newMap._data = _.cloneDeep(valueMap._data);
          var recMap = self.fillRecordingDataMap(key, newMap);
        });
      }
    },

    fillRecordingDataMap: function (key, newMap) {
      var self = this;
      if (newMap.has(self.game.CONFIGS.SP_EVENTS.TEXT_RECORDING)) {
        self.textRecordInformationMap.set(key, newMap);
      }
      self.recordInformationMap.set(key, newMap);
    },

    identifyObjectByUniquename: function (uniquename) {
      var self = this;
      var found = false;
      var obj = undefined;
      _.each(self.game.currentPage.characterDragonBones, function (dragonBone, i) {
        if (dragonBone.uniquename === uniquename) {
          obj = {
            "sprite": dragonBone,
            "index": i
          }
          found = true;
        }
      });

      if (!found) {
        _.each(self.game.currentPage.characterSprites, function (character, i) {
          if (character.uniquename === uniquename) {
            obj = {
              "sprite": character,
              "index": i
            }
            found = true;
          }
        });
      }

      if (!found) {
        _.each(self.game.currentPage.backgrounds, function (background, i) {
          if (background.uniquename === uniquename) {
            obj = {
              "sprite": background,
              "index": i
            }
            found = true;
          }
        });
      }

      return obj;
    },

    recordDrag: function (data) {
      var self = this;
      self.recordPropertiesChange(data);
    },

    recordPropertiesChange: function (data) {
      var self = this;
      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      var spriteToSave;
      var index;
      var identifiedObj = self.identifyObjectByUniquename(data.uniquename);

      if (identifiedObj) {
        spriteToSave = identifiedObj.sprite;
        index = identifiedObj.index;

        if (spriteToSave) {
          for (var property in data) {
            if (data.hasOwnProperty(property)) {
              spriteToSave[property] = data[property];
            }
          }
          collection.update(self.game.story);
          self.game.storageDB.getDB().save();
        }
      }
    },

    recordImageToLibrary: function (data, storyId) {
      var self = this;
      var storyInLibrary = self.game.storageDB.findInLibraryById(self.game.storage_config.libraryCollection, storyId);
      storyInLibrary.imgSrc = data;
      self.game.storageDB.getDB().save();
    },

    recordPageImageToLibrary: function (data, storyId, pageId) {
      var self = this;
      var libCollection = self.game.storageDB.getCollection(self.game.storage_config.libraryCollection);
      var storyInLibrary = self.game.storageDB.findInLibraryById(self.game.storage_config.libraryCollection, storyId);
      _.each(storyInLibrary.pages, function (p) {
        if (p.id === pageId) {
          p.backgroundImage = data;
          libCollection.update(storyInLibrary);
          self.game.storageDB.getDB().save();
        }
      });

    },

    recordPropertiesChangeAcrossAllObjects: function (data) {
      var self = this;
      self.setPropteryToDefaultSuppliedValueForAllGameObjects(data);

      var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
      var index;

      var identifiedObj = self.identifyObjectByUniquename(data.uniquename);

      if (identifiedObj) {
        spriteToSave = identifiedObj.sprite;
        index = identifiedObj.index;

        if (spriteToSave) {
          for (var property in data) {
            if (data.hasOwnProperty(property) && property !== "uniquename") {
              spriteToSave[property] = data[property]["matched"];
            }
          }
          collection.update(self.game.story);
          self.game.storageDB.getDB().save();
        }
      }
    }
  };

  ChimpleStoryAppRecordManager.Init = function (game, storage) {
    var self = this;
    self.recordInformationMap = null;

    if (!Phaser) {
      throw 'Phaser is not loaded';
    }
    if (!_) {
      throw 'Lodash is not loaded';
    }

    if (!loki) {
      throw 'Loki is not loaded';
    }

    if (!HashMap) {
      throw 'HashMap is not loaded';
    }

    if (!game) {
      throw 'Game is not loaded';
    }

    if (!storage) {
      throw 'Storage is not loaded';
    }

    self.game = game;
    self.storage = storage;
  }

  ChimpleStoryAppRecordManager.Init.prototype = ChimpleStoryAppRecordManager.prototype;
  global.ChimpleStoryAppRecordManager = global.$R = ChimpleStoryAppRecordManager;

}(window, Phaser, loki, _, HashMap));
