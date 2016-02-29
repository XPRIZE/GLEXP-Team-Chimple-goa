'use strict';

var _ = require('lodash')._;

var InitNarrate = (function (scope, ele) {

  var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, ele);
  game.scope = scope;

  game.widthScaleFactor = gameDevicePixelRation * gameWidth / 1280;
  game.heightScaleFactor = gameDevicePixelRation * gameHeight / 800;

  game.storage_config = {
    storageDBName: "PhaserStoryCreatorDB",
    storiesCollection: "PhaserStories",
    animationCollection: "PhaserAnimations"
  };

  game.CONFIGS = {
    PRE_RECORDING: 0,
    RECORDING: 1,
    PLAYING: 2,
    SP_EVENTS: {
      TEXT_RECORDING: 1,
      SOUND_RECORDING: 2,
      FX_RECORDING: 3,
      ANIMS_RECORDING: 4
    }
  };

  game.gameStatus = game.CONFIGS.PLAYING;

  //define all States

  game.state.add('NarratePreBootState', require('./narratePreboot'));
  game.state.add('NarrateBootState', require('./narrateBoot'));
  game.state.add('NarratePreloadState', require('./narratePreload'));
  game.state.add('NarrateGameState', require('./narrateGame'));
  game.state.start('NarratePreBootState');

  //register all events between Angular-Phaser
  scope.$on('game:storyId', function (event, args) {
    if (args.storyId) {
      game.scope.storyId = args.storyId;
    }
  });

  scope.$on('game:resumePlaying', function (event, args) {
    game.state.getCurrentState().lastUpdatedTimeInUpdate = new Date();
    game.state.getCurrentState().onResumeFromPauseWhilePlaying.dispatch();
    console.log('game.state.getCurrentState() playcounter:' + game.currentPlayCounter);
  });

  scope.$on('$destroy', function () {
    game.destroy();
  });

});

module.exports = InitNarrate;
