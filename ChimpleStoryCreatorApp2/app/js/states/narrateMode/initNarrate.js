'use strict';

var _ = require('lodash')._;

var InitNarrate = (function (scope, ele) {

  //determine window.screen or window.innerWidth
  var gameWidth, gameHeight = 0;
  var gameDevicePixelRation = 1;

  if (navigator.userAgent.match(/iPad | Android|webOS|iPhone|iPod|Blackberry/i)) {    
    gameDevicePixelRation = window.devicePixelRatio;
    console.log('mobile');   // do mobile stuff
    if (window.screen.width <= window.innerWidth) {  
      gameWidth = window.screen.width;
    } else  { 
      gameWidth = window.innerWidth;
    }

    if (window.screen.height <= window.innerHeight) {  
      gameHeight = window.screen.height;
    } else   {
      gameHeight = window.innerHeight;
    }
  } else {    
    console.log('desktop');  
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
  }

  if (scope.toolBarHeight !== undefined) {
    gameHeight = scope.toolBarHeight != 0 ? (gameHeight - scope.toolBarHeight) : gameHeight;
  }

  console.log('gameHeight:' + gameHeight);
  var game = new Phaser.Game(gameWidth * gameDevicePixelRation, gameHeight * gameDevicePixelRation, Phaser.AUTO, ele);

  game.scope = scope;

  game.actualGameWidth = gameWidth * gameDevicePixelRation;
  game.actualGameHeight = gameHeight * gameDevicePixelRation;

  game.widthScaleFactor = gameDevicePixelRation * gameWidth / 1280;
  game.heightScaleFactor = gameDevicePixelRation * gameHeight / 800;

  if (game.widthScaleFactor < game.heightScaleFactor) {
    game.heightScaleFactor = game.widthScaleFactor
  } else {
    game.widthScaleFactor = game.heightScaleFactor;
  }

  game.storage_config = {
    storageDBName: "masterDB",
    storiesCollection: "PhaserStories",
    libraryCollection: "library",
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
