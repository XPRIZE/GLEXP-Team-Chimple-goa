'use strict';
var _ = require('lodash')._;
require('../loki-angular/lokiIndexedAdapter');

module.exports = ['Loki', 'chimpleConfig', function (Loki, chimpleConfig) {

  var lokiService = this;

  lokiService.init = function () {
    console.log('inside lokiService.init');
    //var lfAdapter = new lokiIndexedAdapter("lokidb");
    /*var options = {
      //autoload: true,
      // autoloadCallback : lokidb_loadHandler,
      // autosave: true,
      // autosaveInterval: 10000,
      adapter: lfAdapter, // <- required      
      autosave: true,
      autosaveInterval: 1000, // 5 second
    };*/

    lokiService.dbInstance = new Loki(chimpleConfig.lokiDB, { autoload: true });
    window.storageDB = lokiService.dbInstance;
  }

  lokiService.addCollection = function (collectionName) {
    return lokiService.dbInstance.addCollection(collectionName);
  };

  lokiService.removeCollection = function (collectionName) {
    return lokiService.dbInstance.removeCollection(collectionName);
  };

  lokiService.getCollection = function (collectionName) {
    return lokiService.dbInstance.getCollection(collectionName);
  };

  lokiService.save = function () {
    lokiService.dbInstance.save();
  };

  lokiService.getDBInstance = function () {
    return lokiService.dbInstance;
  };

  lokiService.findStoryById = function (id) {
    var result = null;
    lokiService.dbInstance.loadDatabase({}, function () {
      var collection = lokiService.dbInstance.getCollection(chimpleConfig.storyCollectionName);
      var story = collection.findOne({
        'id': {
          '$eq': id
        }
      });
      result = story;
    });
    return result;
  };

  lokiService.initNarrateConfigCollection = function () {
    var collection = null;
    lokiService.dbInstance.loadDatabase({}, function () {
      collection = lokiService.dbInstance.getCollection(chimpleConfig.narrateConfigCollectionName);

      if (!collection) {
        collection = lokiService.dbInstance.addCollection(chimpleConfig.narrateConfigCollectionName);
        lokiService.save();
      }
    });
    return collection;
  };

  lokiService.initLibraryCollection = function () {
    var collection = null;
    lokiService.dbInstance.loadDatabase({}, function () {
      collection = lokiService.dbInstance.getCollection(chimpleConfig.storyCollectionName);

      if (!collection) {
        collection = lokiService.dbInstance.addCollection(chimpleConfig.storyCollectionName);
        lokiService.save();
      }
    });
    return collection;
  };

  lokiService.deletePhaserPages = function (storyId, pageId) {
    if (window.storageDB) {
      var phaserCollection = window.storageDB.getCollection(chimpleConfig.phaserCollection);
      if (phaserCollection) {
        var story = phaserCollection.findOne({
          'storyId': {
            '$eq': storyId
          }
        });
        if (story) {
          var page = _.find(story.pages, function (page) {
            return page.pageId === pageId;
          });

          if (page) {
            _.pull(story.pages, page);
            phaserCollection.update(story);
          }
        }

        var animationCollection = window.storageDB.getCollection(chimpleConfig.animationCollection);
        if (animationCollection) {
          var anim = animationCollection.findOne({
            'storyId-pageId': {
              '$eq': storyId + "-" + pageId
            }
          });
          if (anim) {
            animationCollection.remove(anim);
          }

        }
      }
      window.storageDB.save();
    }
  };

  lokiService.duplicatePhaserPage = function (storyId, pageId, newPageId) {
    if (window.storageDB) {
      var phaserCollection = window.storageDB.getCollection(chimpleConfig.phaserCollection);
      if (phaserCollection) {
        var story = phaserCollection.findOne({
          'storyId': {
            '$eq': storyId
          }
        });
        if (story) {
          var curIndex;
          var page = _.find(story.pages, function (page, i) {
            curIndex = i;
            return page.pageId === pageId;
          });

          if (page) {
            var copyPage = _.cloneDeep(page);
            copyPage.id = newPageId;
            story.pages.splice(curIndex, 0, copyPage);
            phaserCollection.update(story);
          }
        }

        var animationCollection = window.storageDB.getCollection(chimpleConfig.animationCollection);
        if (animationCollection) {
          var anim = animationCollection.findOne({
            'storyId-pageId': {
              '$eq': storyId + "-" + pageId
            }
          });
          if (anim) {
            var copySequence = _.cloneDeep(anim.sequences);
            var doc = {
              'sequences': copySequence,
              'storyId-pageId': storyId + '-' + newPageId
            }
            animationCollection.insert(doc);
          }
        }
      }
      window.storageDB.save();
    }
  };

  lokiService.deletePhaserStory = function (storyId) {
    if (window.storageDB) {
      var phaserCollection = window.storageDB.getCollection(chimpleConfig.phaserCollection);
      if (phaserCollection) {
        var animationCollection = window.storageDB.getCollection(chimpleConfig.animationCollection);
        var story = phaserCollection.findOne({
          'storyId': {
            '$eq': storyId
          }
        });
        if (story) {
          _.each(story.pages, function (page) {
            if (animationCollection) {
              var anim = animationCollection.findOne({
                'storyId-pageId': {
                  '$eq': storyId + "-" + page.pageId
                }
              });
              if (anim) {
                animationCollection.remove(anim);
              }

            }
          });

          phaserCollection.remove(story);
        }
      }
      window.storageDB.save();
    }
  };

  lokiService.initMasterConfigCollection = function () {
    var collection = null;
    lokiService.dbInstance.loadDatabase({}, function () {
      collection = lokiService.dbInstance.getCollection(chimpleConfig.masterConfigCollectionName);

      if (!collection) {
        collection = lokiService.dbInstance.addCollection(chimpleConfig.masterConfigCollectionName);
        lokiService.save();
      }
    });
    return collection;
  };

  lokiService.initMasterAttributesConfigCollection = function () {
    var collection = null;
    lokiService.dbInstance.loadDatabase({}, function () {
      collection = lokiService.dbInstance.getCollection(chimpleConfig.masterAttributesConfigCollectionName);

      if (!collection) {
        collection = lokiService.dbInstance.addCollection(chimpleConfig.masterAttributesConfigCollectionName);
        lokiService.save();
      }
    });
    return collection;
  };

  //Execute
  lokiService.init();

  return lokiService;
}];
