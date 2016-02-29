'use strict';

module.exports = ['$http', '$q', 'Loki', '$rootScope', 'chimpleConfig', 'LokiService', function ($http, $q, Loki, $rootScope, chimpleConfig, LokiService) {
  console.log('Create Story Service');

  var createStoryService = this;

  createStoryService.init = function () {
    var libraryCollection = LokiService.initLibraryCollection();
    return libraryCollection;
  };

  //generate UUID
  createStoryService.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  //create new story and sync with server
  createStoryService.createStory = function () {
    var collection = createStoryService.init();
    console.log('n create story service');
    var newStory = {
      id: createStoryService.generateUUID(),
      title: "Untitled",
      imgSrc: "",
      pages: []
    };
    //collection.data[0].stories.push(newStory);
    //collection.data.push(newStory);
    collection.insert(newStory);
    createStoryService.save();

    //Add Title Page
    createStoryService.createPage(newStory.id, 1, "Title", "assets/images/newPage.png");
    createStoryService.save();
    return newStory;
  };

  //create default page - title page and Question/Answer pages and sync with server

  createStoryService.setInitialStoryContents = function () {

  };

  createStoryService.save = function () {
    LokiService.save();
  };

  createStoryService.addTitlePage = function (storyIdUUID) {};

  createStoryService.fetchAllPagesForStoryId = function (storyIdUUID) {
    var curStory = LokiService.findStoryById(storyIdUUID);
    return curStory.pages;
  };

  createStoryService.createPage = function (storyIdUUID, pageCount, type, defaultImageUrl) {

    var newPage = {
      id: createStoryService.generateUUID(),
      type: type,
      backgroundImage: defaultImageUrl,
      storyId: storyIdUUID,
      pageCount: pageCount
    };

    var curStory = createStoryService.findStoryById(storyIdUUID);
    if (curStory.pages === undefined) {
      curStory.pages = [];
    }
    curStory.pages.push(newPage);
    createStoryService.save();
    return newPage;
  };

  createStoryService.findStoryById = function (storyIdUUID) {
    return LokiService.findStoryById(storyIdUUID);
  };

  createStoryService.deletePhaserPages = function (storyId, pageId) {
    LokiService.deletePhaserPages(storyId, pageId);
  }

  createStoryService.duplicatePhaserPage = function (storyId, pageId, newPageId) {
    LokiService.duplicatePhaserPage(storyId, pageId, newPageId);
  }

  createStoryService.syncPages = function (storyIdUUID, pages) {
    var curStory = LokiService.findStoryById(storyIdUUID);
    curStory.pages = pages;
    createStoryService.save();
  }

  createStoryService.duplicatePage = function (storyIdUUID, pages) {
    var curStory = LokiService.findStoryById(storyIdUUID);
    curStory.pages = pages;
    createStoryService.save();
  }

  createStoryService.updateTitle = function (storyIdUUID, title) {
    var curStory = LokiService.findStoryById(storyIdUUID);
    curStory.title = title;
    createStoryService.save();
  }

  createStoryService.getLatestPagesForStory = function (storyIdUUID) {
    var defer = $q.defer();
    var config = {
      params: { 'storyId': storyIdUUID },
    }
    console.log('endpoint:' + $rootScope.storiesEndpoint + '/updatedPages.mjson');
    $http.get($rootScope.storiesEndpoint + '/updatedPages.mjson', config)
      .success(function (data) {
        defer.resolve(data);
        console.log('data:' + data);
      }).error(function (err, status) {
        defer.reject(err);
      });

    return defer.promise;
  };

  return createStoryService;
}];
