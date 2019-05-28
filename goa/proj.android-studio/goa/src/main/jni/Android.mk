LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

$(call import-add-path,$(LOCAL_PATH)/../../cocos2d)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/external)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos/audio/include)

LOCAL_MODULE := MyGame_shared

LOCAL_MODULE_FILENAME := libMyGame

LOCAL_SRC_FILES := hellocpp/main.cpp \
         ../../Classes/alphamon/Alphamon.cpp \
         ../../Classes/alphamon/HPMeter.cpp \
         ../../Classes/alphamon/SelectAlphamonScene.cpp \
         ../../Classes/AppDelegate.cpp \
         ../../Classes/HelloDragonBones.cpp \
         ../../Classes/effects/FShake.cpp \
         ../../Classes/ext/AsyncTask.cpp \
         ../../Classes/ext/common/LTKCaptureDevice.cpp \
         ../../Classes/ext/common/LTKChannel.cpp \
         ../../Classes/ext/common/LTKException.cpp \
         ../../Classes/ext/common/LTKScreenContext.cpp \
         ../../Classes/ext/common/LTKTrace.cpp \
         ../../Classes/ext/common/LTKTraceFormat.cpp \
         ../../Classes/ext/common/LTKTraceGroup.cpp \
         ../../Classes/ext/lipiengine/lipiengine.cpp \
         ../../Classes/ext/lipiengine/LipiEngineModule.cpp \
         ../../Classes/ext/LipiTKInterface.cpp \
         ../../Classes/ext/LipiTKNode.cpp \
         ../../Classes/ext/LipiTKProcessTask.cpp \
         ../../Classes/ext/LipiTKResult.cpp \
         ../../Classes/ext/reco/shaperec/common/LTKShapeRecoConfig.cpp \
         ../../Classes/ext/reco/shaperec/common/LTKShapeRecognizer.cpp \
         ../../Classes/ext/reco/shaperec/common/LTKShapeRecoResult.cpp \
         ../../Classes/ext/reco/shaperec/common/LTKShapeRecoUtil.cpp \
         ../../Classes/ext/reco/shaperec/common/LTKShapeSample.cpp \
         ../../Classes/ext/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractor.cpp \
         ../../Classes/ext/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractorFactory.cpp \
         ../../Classes/ext/reco/shaperec/featureextractor/pointfloat/PointFloat.cpp \
         ../../Classes/ext/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeature.cpp \
         ../../Classes/ext/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeatureExtractor.cpp \
         ../../Classes/ext/reco/shaperec/nn/NN.cpp \
         ../../Classes/ext/reco/shaperec/nn/NNAdapt.cpp \
         ../../Classes/ext/reco/shaperec/nn/NNShapeRecognizer.cpp \
         ../../Classes/ext/reco/shaperec/preprocessing/LTKPreprocessor.cpp \
         ../../Classes/ext/reco/shaperec/preprocessing/preprocessing.cpp \
         ../../Classes/ext/Stroke.cpp \
         ../../Classes/ext/util/lib/LTKCheckSumGenerate.cpp \
         ../../Classes/ext/util/lib/LTKConfigFileReader.cpp \
         ../../Classes/ext/util/lib/LTKErrors.cpp \
         ../../Classes/ext/util/lib/LTKImageWriter.cpp \
         ../../Classes/ext/util/lib/LTKInkFileReader.cpp \
         ../../Classes/ext/util/lib/LTKInkFileWriter.cpp \
         ../../Classes/ext/util/lib/LTKInkUtils.cpp \
         ../../Classes/ext/util/lib/LTKLinuxUtil.cpp \
         ../../Classes/ext/util/lib/LTKLoggerUtil.cpp \
         ../../Classes/ext/util/lib/LTKOSUtilFactory.cpp \
         ../../Classes/ext/util/lib/LTKStrEncoding.cpp \
         ../../Classes/ext/util/lib/LTKStringUtil.cpp \
         ../../Classes/ext/util/lib/LTKVersionCompatibilityCheck.cpp \
         ../../Classes/ext/util/logger/logger.cpp \
         ../../Classes/ext/util/logger/LTKLogger.cpp \
         ../../Classes/ext/WordSceneLipiTKNode.cpp \
         ../../Classes/ext/dragonBones/animation/Animation.cpp \
         ../../Classes/ext/dragonBones/animation/AnimationState.cpp \
         ../../Classes/ext/dragonBones/animation/TimelineState.cpp \
         ../../Classes/ext/dragonBones/animation/WorldClock.cpp \
         ../../Classes/ext/dragonBones/armature/Armature.cpp \
         ../../Classes/ext/dragonBones/armature/Bone.cpp \
         ../../Classes/ext/dragonBones/armature/Slot.cpp \
         ../../Classes/ext/dragonBones/cocos2dx/CCArmatureDisplay.cpp \
         ../../Classes/ext/dragonBones/cocos2dx/CCFactory.cpp \
         ../../Classes/ext/dragonBones/cocos2dx/CCSlot.cpp \
         ../../Classes/ext/dragonBones/cocos2dx/CCTextureData.cpp \
         ../../Classes/ext/dragonBones/core/BaseObject.cpp \
         ../../Classes/ext/dragonBones/events/EventObject.cpp \
         ../../Classes/ext/dragonBones/factories/BaseFactory.cpp \
         ../../Classes/ext/dragonBones/model/AnimationData.cpp \
         ../../Classes/ext/dragonBones/model/ArmatureData.cpp \
         ../../Classes/ext/dragonBones/model/DragonBonesData.cpp \
         ../../Classes/ext/dragonBones/model/FrameData.cpp \
         ../../Classes/ext/dragonBones/model/TimelineData.cpp \
         ../../Classes/ext/dragonBones/parsers/DataParser.cpp \
         ../../Classes/ext/dragonBones/parsers/JSONDataParser.cpp \
         ../../Classes/ext/dragonBones/textures/TextureData.cpp \
         ../../Classes/hero/character/ExternalSkeletonCharacter.cpp \
         ../../Classes/hero/character/SkeletonCharacter.cpp \
         ../../Classes/hero/character/SkeletonConfiguration.cpp \
         ../../Classes/hero/character/SkeletonPosition.cpp \
         ../../Classes/hero/gesture/GestureLayer.cpp \
         ../../Classes/hero/HelloWorldScene.cpp \
         ../../Classes/hero/message/MessageContent.cpp \
         ../../Classes/hero/message/MessageReceiver.cpp \
         ../../Classes/hero/message/MessageSender.cpp \
         ../../Classes/hero/PhysicsShapeCache.cpp \
         ../../Classes/hero/RPGConfig.cpp \
         ../../Classes/hero/SpeechBubbleView.cpp \
         ../../Classes/hero/sprites/AlphamonSprite.cpp \
         ../../Classes/hero/sprites/RPGSprite.cpp \
         ../../Classes/hero/sprites/WordBubble.cpp \
         ../../Classes/hero/sprites/WordSprite.cpp \
         ../../Classes/hero/state/FallingState.cpp \
         ../../Classes/hero/state/JumpingState.cpp \
         ../../Classes/hero/state/RunningState.cpp \
         ../../Classes/hero/state/StandingState.cpp \
         ../../Classes/hero/state/State.cpp \
         ../../Classes/hero/state/StateMachine.cpp \
         ../../Classes/hero/state/WalkingState.cpp \
         ../../Classes/i18n/Entry.cpp \
         ../../Classes/i18n/I18nUtils.cpp \
         ../../Classes/i18n/MO.cpp \
         ../../Classes/lang/EnglishUtil.cpp \
         ../../Classes/lang/KannadaUtil.cpp \
         ../../Classes/lang/TeluguUtil.cpp \
         ../../Classes/lang/LanguageManager.cpp \
         ../../Classes/lang/LangUtil.cpp \
         ../../Classes/lang/SafariAnalyticsManager.cpp \
         ../../Classes/lang/SwahiliUtil.cpp \
         ../../Classes/lang/TextGenerator.cpp \
         ../../Classes/lang/WordInfo.cpp \
         ../../Classes/lang/WordManager.cpp \
         ../../Classes/lang/Lesson.cpp \
         ../../Classes/lang/StudySession.cpp \
         ../../Classes/menu/Award.cpp \
         ../../Classes/menu/GameMapScene.cpp \
         ../../Classes/menu/GameScene.cpp \
         ../../Classes/menu/HelpLayer.cpp \
         ../../Classes/menu/Introduction.cpp \
         ../../Classes/menu/LevelHelpOverlay.cpp \
         ../../Classes/menu/LevelHelpScene.cpp \
         ../../Classes/menu/LevelMenu.cpp \
         ../../Classes/menu/MapIsland.cpp \
         ../../Classes/menu/MapScene.cpp \
         ../../Classes/menu/MenuContext.cpp \
         ../../Classes/menu/MainMenuHome.cpp \
         ../../Classes/menu/ScoreBoardContent.cpp \
         ../../Classes/menu/ScrollableGameMapScene.cpp \
         ../../Classes/menu/Setting.cpp \
         ../../Classes/menu/StartMenuScene.cpp \
         ../../Classes/mini_games/AlphabetWriting.cpp \
         ../../Classes/mini_games/Alphamole.cpp \
         ../../Classes/mini_games/AlphamoleLevel.cpp \
         ../../Classes/mini_games/AlphamonFeedLevelScene.cpp \
         ../../Classes/mini_games/AlphamonFeedScene.cpp \
         ../../Classes/mini_games/ATM.cpp \
         ../../Classes/mini_games/Baja.cpp \
         ../../Classes/mini_games/BajaWordScene.cpp \
         ../../Classes/mini_games/Bounce.cpp \
         ../../Classes/mini_games/Balloon.cpp \
         ../../Classes/mini_games/BalloonHero.cpp \
         ../../Classes/mini_games/Bingo.cpp \
         ../../Classes/mini_games/BlastLetter.cpp \
         ../../Classes/mini_games/BlastLetterNode.cpp \
         ../../Classes/mini_games/BubbleShooter.cpp \
         ../../Classes/mini_games/Cannon_Ball_Listener.cpp \
         ../../Classes/mini_games/Cannon_Ball_Main.cpp \
         ../../Classes/mini_games/Card.cpp \
         ../../Classes/mini_games/CarDraw.cpp \
         ../../Classes/mini_games/CarDrawNode.cpp \
         ../../Classes/mini_games/CatGameScene.cpp \
         ../../Classes/mini_games/CatScene.cpp \
         ../../Classes/mini_games/Chain.cpp \
         ../../Classes/mini_games/ChocolateFactory.cpp \
         ../../Classes/mini_games/Circle.cpp \
         ../../Classes/mini_games/CrossTheBridgeScene.cpp \
         ../../Classes/mini_games/Dash.cpp \
         ../../Classes/mini_games/Decomon.cpp \
         ../../Classes/mini_games/DecomonGallery.cpp \
         ../../Classes/mini_games/DinoGame.cpp \
         ../../Classes/mini_games/Door.cpp \
         ../../Classes/mini_games/DoorNode.cpp \
         ../../Classes/mini_games/Drop.cpp \
         ../../Classes/mini_games/EndlessRunner.cpp \
         ../../Classes/mini_games/Item.cpp \
         ../../Classes/mini_games/Jasmin_Listenerfile.cpp \
         ../../Classes/mini_games/Jasmin_Mainfile.cpp \
         ../../Classes/mini_games/jazz.cpp \
         ../../Classes/mini_games/JumpingNumbers.cpp \
         ../../Classes/mini_games/Line.cpp \
         ../../Classes/mini_games/Memory.cpp \
         ../../Classes/mini_games/MemoryHero.cpp \
         ../../Classes/mini_games/MemoryJungle.cpp \
         ../../Classes/mini_games/SortIt.cpp \
         ../../Classes/mini_games/Order.cpp \
         ../../Classes/mini_games/Owl.cpp \
         ../../Classes/mini_games/PatchTheWallScene.cpp \
         ../../Classes/mini_games/Pillar.cpp \
         ../../Classes/mini_games/Pop.cpp \
         ../../Classes/mini_games/PopCount.cpp \
         ../../Classes/mini_games/Shape.cpp \
         ../../Classes/mini_games/Shop.cpp \
         ../../Classes/mini_games/SmashTheRockLevelScene.cpp \
         ../../Classes/mini_games/SmashTheRockScene.cpp \
         ../../Classes/mini_games/Spirograph.cpp \
         ../../Classes/mini_games/spot.cpp \
         ../../Classes/mini_games/SpriteCreate.cpp \
         ../../Classes/mini_games/Stack.cpp \
         ../../Classes/mini_games/Step.cpp \
         ../../Classes/mini_games/Shoot.cpp \
         ../../Classes/mini_games/Table.cpp \
         ../../Classes/mini_games/Talk.cpp \
         ../../Classes/mini_games/TraceScene.cpp \
         ../../Classes/mini_games/Train.cpp \
         ../../Classes/mini_games/TreasureHunt.cpp \
         ../../Classes/mini_games/TreasureHuntNode.cpp \
         ../../Classes/mini_games/Units.cpp \
         ../../Classes/mini_games/Wembley.cpp \
		 ../../Classes/mini_games/Phonicsfree.cpp \
		 ../../Classes/mini_games/AlphaArrange.cpp \
	 	 ../../Classes/mini_games/AlphaPhonics.cpp \
		 ../../Classes/mini_games/Find.cpp \
		 ../../Classes/mini_games/MathLearning.cpp \
		 ../../Classes/mini_games/BasicMultiplication.cpp \
		 ../../Classes/mini_games/BasicLetterCase.cpp \
         ../../Classes/misc/CharacterConfiguration.cpp \
         ../../Classes/misc/ChooseCharacter.cpp \
         ../../Classes/misc/PhotoCaptureScene.cpp \
         ../../Classes/puzzle/Alphabet.cpp \
         ../../Classes/puzzle/AlphabetGrid.cpp \
         ../../Classes/puzzle/CharGenerator.cpp \
         ../../Classes/puzzle/DuelScene.cpp \
         ../../Classes/puzzle/Grapheme.cpp \
         ../../Classes/puzzle/GraphemeGrid.cpp \
         ../../Classes/puzzle/PegWord.cpp \
         ../../Classes/puzzle/StoryWordBoard.cpp \
         ../../Classes/puzzle/WordBoard.cpp \
         ../../Classes/puzzle/WordScene.cpp \
         ../../Classes/dot/Dot.cpp \
         ../../Classes/dot/DotNum.cpp \
         ../../Classes/dot/DotsLayer.cpp \
         ../../Classes/dot/DotsQuizLayer.cpp \
         ../../Classes/dot/ConnectTheDots.cpp \
         ../../Classes/splash/SplashScene.cpp \
         ../../Classes/sqlite3/Sqlite3Helper.cpp \
         ../../Classes/sqlite3/sqlite3.c \
         ../../Classes/story/CopyRight.cpp \
         ../../Classes/story/FillInTheBlanks.cpp \
         ../../Classes/story/Meaning.cpp \
         ../../Classes/story/MultipleChoice.cpp \
         ../../Classes/story/Picture.cpp \
         ../../Classes/story/QuestionHandler.cpp \
         ../../Classes/story/ScrollableCatalogue.cpp \
         ../../Classes/story/StoryCoverPage.cpp \
         ../../Classes/story/StoryPlaying.cpp \
         ../../Classes/util/MatrixUtil.cpp \
         ../../Classes/util/Calculator.cpp \
         ../../Classes/util/CommonLabel.cpp \
         ../../Classes/util/CommonLabelTTF.cpp \
         ../../Classes/util/CommonText.cpp \
		 ../../Classes/util/CommonTextField.cpp \
		 ../../Classes/util/Speaker.cpp

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/util/lib
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/lipiengine
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/reco/shaperec/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/reco/shaperec/featureextractor/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/reco/shaperec/featureextractor/pointfloat
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/reco/shaperec/nn
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/reco/shaperec/preprocessing
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/ext/util/logger

# _COCOS_HEADER_ANDROID_BEGIN
# _COCOS_HEADER_ANDROID_END


LOCAL_STATIC_LIBRARIES := cocos2dx_static
LOCAL_STATIC_LIBRARIES += cocos_extension_static	
LOCAL_STATIC_LIBRARIES += cocos_localstorage_static

# _COCOS_LIB_ANDROID_BEGIN
# _COCOS_LIB_ANDROID_END

include $(BUILD_SHARED_LIBRARY)

$(call import-module,.)
$(call import-module,extensions)
$(call import-module,storage/local-storage)

# _COCOS_LIB_IMPORT_ANDROID_BEGIN
# _COCOS_LIB_IMPORT_ANDROID_END
