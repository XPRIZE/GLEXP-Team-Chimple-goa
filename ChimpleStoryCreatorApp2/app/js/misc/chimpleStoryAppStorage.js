;
(function (global, Phaser, loki) {
  var CreateChimpleStoryAppStorage = function (db) {
    return new CreateChimpleStoryAppStorage.init(db);
  };

  CreateChimpleStoryAppStorage.prototype = {
    getDB: function () {
      return this.dbName;
    },

    findInLibraryById: function (collectionKind, queryBy) {
      var self = this;
      var result = null;
      self.dbName.loadDatabase({}, function () {
        var collections = self.dbName.getCollection(collectionKind);
        var story = collections.findOne({
          'id': {
            '$eq': queryBy
          }
        });
        result = story;
      });
      return result;
    },

    findStoryId: function (collectionKind, queryBy) {
      var self = this;
      var result = null;
      self.dbName.loadDatabase({}, function () {
        var collections = self.dbName.getCollection(collectionKind);
        var story = collections.findOne({
          'storyId': {
            '$eq': queryBy
          }
        });
        result = story;
      });
      return result;
    },

    findQueryBy: function (collectionKind, queryBy) {
      var self = this;
      var result = null;
      self.dbName.loadDatabase({}, function () {
        var cartoons = self.dbName.getCollection(collectionKind);
        var cartoon = cartoons.findOne({
          'uniquename': {
            '$eq': queryBy
          }
        });
        result = cartoon;
      });
      return result;
    },

    findStoryIdPageId: function (collectionKind, storyIdPageId) {
      var self = this;
      var result = null;
      self.dbName.loadDatabase({}, function () {
        var collections = self.dbName.getCollection(collectionKind);
        var story = collections.findOne({
          'storyId-pageId': {
            '$eq': storyIdPageId
          }
        });
        result = story;
      });
      return result;
    },

    loadAnimationSequences: function (key) {
      var self = this;

      var doc = self.findStoryIdPageId("PhaserAnimations", key);
      if (doc) {
        return doc;
      }
    },

    getCollection: function (name) {
      return this.dbName.getCollection(name);
    },

    addCollection: function (name) {
      return this.dbName.addCollection(name);
    },

    removeCollection: function (name) {
      return this.dbName.removeCollection(name);
    },

    save: function () {
      this.dbName.saveDatabase(function () {
        console.log("DATA IS SAVED >>>> SIGNAL TO SAVE TO EXTERNAL SERVICE");
        //signal to save to external file....
      });

    },

    remove: function (object, collectionKind) {
      this.dbName.remove(object);
      this.save();
    },

    findQueryByIndex: function (collectionKind, queryBy) {
      var self = this;
      var result = null;
      self.dbName.loadDatabase({}, function () {
        var sprites = self.dbName.getCollection(collectionKind);
        var sprite = sprites.findOne({
          'index': {
            '$eq': queryBy
          }
        });
        result = sprite;
      });
      return result;
    },

  };

  CreateChimpleStoryAppStorage.init = function (db) {
    var self = this;

    if (!Phaser) {
      throw 'Phaser is not loaded';
    }

    if (!loki) {
      throw 'Loki is not loaded';
    }

    self.dbName = db;
  }

  CreateChimpleStoryAppStorage.init.prototype = CreateChimpleStoryAppStorage.prototype;
  global.CreateChimpleStoryAppStorage = global.$Storage = CreateChimpleStoryAppStorage;

}(window, Phaser, loki));
