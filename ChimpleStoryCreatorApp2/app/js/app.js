/// <reference path="../../bower_components/phaser-official/build/phaser.js" />
/// <reference path="../../typings/angularjs/angular.d.ts" />

'use strict';
require('es5-shim');
require('es5-sham');

require('jquery');
var angular = require('angular');
require('angular-route');
require('angular-resource');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-messages');
var _ = require('lodash')._;
var AbstractParentSprite = require('./fabs/abstractParentSprite');
var CharacterSprite = require('./fabs/characterSprite');
var DragonBoneSprite = require('./fabs/dragonBoneSprite');
var DragonBone = require('./dragonBones/dragonBones');
var PhaserDragonBone = require('./dragonBones/phaserDragonBones');

var app = angular.module('chimpleStoryBuilderApp', ['ngRoute', 'ngAnimate', 'ngResource', 'ngMaterial', 'lokijs', 'ngDraggable', 'ngCordova']);

app.constant('VERSION', require('../../package.json').version);
app.constant('_', _);
app.constant('chimpleConfig', {
  "lokiDB": "masterDB",
  "storyCollectionName": "library",
  "masterConfigCollectionName": "masterConfig",
  "narrateConfigCollectionName": "narrateConfig",
  "masterAttributesConfigCollectionName": "masterAttributesConfig",
  "storiesEndpoint": "/mocks",
  "phaserDB": "PhaserStoryCreatorDB",
  "phaserCollection": "PhaserStories",
  "animationCollection": "PhaserAnimations"
});

require('./service');
require('./controller');
require('./directive/customAppLoading');
require('./directive/ngDraggable');
require('./directive/phaserStory');
require('./directive/phaserNarrateStory');
require('./directive/customToolBarFilter');
require('./fabs/characterSprite');
require('./fabs/dragonBoneSprite');

require('./misc/chimpleStoryAppStorage');
require('./misc/chimpleStoryAppRecordManager');

app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  console.log('inside app config');
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .dark();

  $mdThemingProvider.alwaysWatchTheme(true);
  $routeProvider.when('/library', {
      templateUrl: 'views/library.html',
    })
    .when('/createStory', {
      templateUrl: 'views/createStory.html'
    })
    .when('/editStory/:id', {
      templateUrl: 'views/createStory.html'
    })
    .when('/editPage/:id/:storyId/:title/:toolBarHeight', {
      templateUrl: 'views/editPage.html'
    })
    .when('/narrateStory/:storyId/:title', {
      templateUrl: 'views/narrateStory.html'
    })
    .otherwise({
      redirectTo: '/library',
    });
}).run(function ($rootScope, chimpleConfig) {
  $rootScope._ = window._;
  $rootScope.storiesEndpoint = chimpleConfig.storiesEndpoint;
  console.log('all modules loaded.. inside run...');
});

setTimeout(
  function asyncBootstrap() {
    angular.bootstrap(document, ["chimpleStoryBuilderApp"]);
  },
  (2 * 1000)
);
