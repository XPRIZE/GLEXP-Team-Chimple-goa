'use strict';

var _ = require('lodash')._;

var Init = (function (scope, ele) {
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

  gameHeight = scope.toolBarHeight != 0 ? (gameHeight - scope.toolBarHeight) : gameHeight;

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

  game.gameStatus = game.CONFIGS.PRE_RECORDING;

  //define all States

  game.state.add('PreBootState', require('./preboot'));
  game.state.add('BootState', require('./boot'));
  game.state.add('PreloadState', require('./preload'));
  game.state.add('DynamicLoaderState', require('./dynamicloader'));
  game.state.add('GameState', require('./game'));
  game.state.start('PreBootState');

  //register all events between Angular-Phaser
  scope.$on('game:storyId-pageId', function (event, args) {
    if (args.storyId) {
      game.scope.storyId = args.storyId;
    }

    if (args.pageId) {
      game.scope.pageId = args.pageId;
    }

  });

  //register all events between Angular-Phaser
  scope.$on('game:storyId', function (event, args) {
    if (args.storyId) {
      game.scope.storyId = args.storyId;
    }
  });

  scope.$on('$destroy', function () {
    game.destroy();
  });

  scope.$on('game:spriteText', function (event, args, gameObject) {
    console.log('game:spriteText with args:' + args);
    game.state.getCurrentState().updateText(args, gameObject);
  });

  scope.$on('game:spriteAttributeChanged', function (event, args, gameObject) {
    console.log('game:spriteAttributeChanged with args:' + args);
    game.state.getCurrentState().updateAttribute(args, gameObject);
  });

  scope.$on('game:resumePlaying', function (event, args) {
    game.state.getCurrentState().lastUpdatedTimeInUpdate = new Date();
    game.state.getCurrentState().onResumeFromPauseWhilePlaying.dispatch();
    console.log('game.state.getCurrentState() playcounter:' + game.currentPlayCounter);
  });

  scope.$on('game:action', function (event, args) {
    console.log('game:action with args:' + args);

    if (args.action === 'record') {
      game.state.getCurrentState().record(args);
    } else if (args.action === 'stop') {
      game.state.getCurrentState().stop(args);
    } else if (args.action === 'play') {
      game.state.getCurrentState().play(args);
    }
  });

  scope.$on('game:addTextToGame', function (event, args, gameObject) {
    console.log('add Text to game & resume recording:' + args + " and gameObject:" + gameObject);
    //make it generic
    //Create TextNode to show while recording for 1 sec - use 'class' for rendering on screen - pre-record/record mode
    //Update applied=true flag for Text in DB
    //record into specialRecording against keyframe for playing
    //Start Recording

    //Update applied=true flag for Text in DB
    game.state.getCurrentState().updateText(args, gameObject);

    //record into text against keyframe for playing        
    //Inject appropriate recordingType
    args.recordingType = game.CONFIGS.SP_EVENTS.TEXT_RECORDING;
    game.state.getCurrentState().onSpecialAttrRecordSignal.dispatch(args, gameObject);

  });

  scope.$on('game:closeEditor', function (event, args) {
    console.log('close editor' + args);

    //Resume 
    if (game.gameStatus === game.CONFIGS.RECORDING) {
      game.state.getCurrentState().onRecordingResumeSignal.dispatch();
    }

    //attributeEditOverlay
    var attrEditOverlay = args["attributeEditOverlay"];
    attrEditOverlay.closeOverlay.call(attrEditOverlay);
  });

  scope.$on('game:backgroundSelected', function (event, args) {
    //Received event from angular when new background is selected 
    console.log('game.state.getCurrentState():' + game.state.getCurrentState());
    game.state.getCurrentState().needsRegenerateImage = true;
    game.state.start('DynamicLoaderState', true, false, args, 'background');
  });

  scope.$on('game:characterSelected', function (event, args) {
    //Received event from angular when new character is selected        
    //Determine sprite type => either CharacterSprite or DragonBoneSprite        
    var theme = args["theme"];
    if (theme) {
      game.state.getCurrentState().needsRegenerateImage = true;
      if (theme.hasOwnProperty("kind")) {
        var kind = theme["kind"];

        if (kind === 'sprite') {
          args.generatePageImage = true;
          game.state.start('DynamicLoaderState', true, false, args, kind);
        } else if (kind === 'armature') {
          args.generatePageImage = true;
          game.state.start('DynamicLoaderState', true, false, args, kind);
        }
      }
    }
  });

});

module.exports = Init;
