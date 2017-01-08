LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs

LOCAL_MODULE_FILENAME := libcocos2djs

#ifeq ($(USE_ARM_MODE),1)
#LOCAL_ARM_MODE := arm
#endif

LOCAL_SRC_FILES := hellojavascript/main.cpp \
					../../Classes/alphamon/Alphamon.cpp \
					../../Classes/alphamon/HPMeter.cpp \
					../../Classes/alphamon/SelectAlphamonScene.cpp \
					../../Classes/AppDelegate.cpp \
					../../Classes/effects/FShake.cpp \
					../../Classes/ExternalSkeletonCharacter.cpp \
					../../Classes/FallingState.cpp \
					../../Classes/GestureLayer.cpp \
					../../Classes/HelloWorldScene.cpp \
					../../Classes/JumpingState.cpp \
					../../Classes/MessageContent.cpp \
					../../Classes/MessageReceiver.cpp \
					../../Classes/MessageSender.cpp \
					../../Classes/PhysicsShapeCache.cpp \
					../../Classes/puzzle/Alphabet.cpp \
					../../Classes/puzzle/AlphabetGrid.cpp \
					../../Classes/puzzle/CharGenerator.cpp \
					../../Classes/puzzle/DuelScene.cpp \
					../../Classes/puzzle/WordScene.cpp \
					../../Classes/puzzle/WordBoard.cpp \
					../../Classes/puzzle/Grapheme.cpp \
					../../Classes/puzzle/GraphemeGrid.cpp \
					../../Classes/puzzle/PegWord.cpp \
					../../Classes/puzzle/StoryWordBoard.cpp \
					../../Classes/RPGConfig.cpp \
					../../Classes/RPGSprite.cpp \
					../../Classes/RunningState.cpp \
					../../Classes/SkeletonCharacter.cpp \
					../../Classes/SpeechBubbleView.cpp \
					../../Classes/sqlite3.c \
					../../Classes/Sqlite3Helper.cpp \
					../../Classes/StandingState.cpp \
					../../Classes/State.cpp \
					../../Classes/StateMachine.cpp \
					../../Classes/WalkingState.cpp \
					../../Classes/SkeletonConfiguration.cpp \
					../../Classes/mini_games/PatchTheWallScene.cpp \
					../../Classes/mini_games/EndlessRunner.cpp \
					../../Classes/mini_games/SpriteCreate.cpp \
					../../Classes/mini_games/SmashTheRockScene.cpp \
					../../Classes/mini_games/SmashTheRockLevelScene.cpp \
					../../Classes/mini_games/CrossTheBridgeScene.cpp \
					../../Classes/mini_games/TraceScene.cpp \
					../../Classes/mini_games/AlphamonFeedLevelScene.cpp \
					../../Classes/mini_games/AlphamonFeedScene.cpp \
					../../Classes/mini_games/Cannon_Ball_Listener.cpp \
					../../Classes/mini_games/Cannon_Ball_Main.cpp \
					../../Classes/mini_games/Jasmin_Mainfile.cpp \
					../../Classes/mini_games/Chain.cpp \
					../../Classes/mini_games/jazz.cpp \
					../../Classes/mini_games/Wembley.cpp \
					../../Classes/mini_games/Baja.cpp \
					../../Classes/mini_games/PopCount.cpp \
					../../Classes/mini_games/BajaWordScene.cpp \
					../../Classes/mini_games/CatGameScene.cpp \
					../../Classes/mini_games/CatScene.cpp \
					../../Classes/mini_games/Train.cpp \
					../../Classes/mini_games/Pop.cpp \
					../../Classes/mini_games/AlphamoleLevel.cpp \
					../../Classes/mini_games/Alphamole.cpp \
					../../Classes/mini_games/Memory.cpp \
                    ../../Classes/mini_games/MemoryJungle.cpp \
                    ../../Classes/mini_games/MemoryHero.cpp \
					../../Classes/mini_games/Stack.cpp \
					../../Classes/mini_games/Talk.cpp \
					../../Classes/mini_games/Card.cpp \
					../../Classes/mini_games/Step.cpp \
					../../Classes/mini_games/ATM.cpp \
					../../Classes/mini_games/Circle.cpp \
					../../Classes/mini_games/Pillar.cpp \
					../../Classes/mini_games/Dash.cpp \
					../../Classes/mini_games/Decomon.cpp \
					../../Classes/mini_games/DecomonGallery.cpp \
                    ../../Classes/mini_games/BalloonHero.cpp \
                    ../../Classes/mini_games/Drop.cpp \
					../../Classes/mini_games/Order.cpp \
					../../Classes/mini_games/Owl.cpp \
					../../Classes/mini_games/BlastLetter.cpp \
					../../Classes/mini_games/BlastLetterNode.cpp \
					../../Classes/mini_games/TreasureHunt.cpp \
					../../Classes/mini_games/TreasureHuntNode.cpp \
                    ../../Classes/mini_games/Units.cpp \
					../../Classes/mini_games/Line.cpp \
					../../Classes/mini_games/ChocolateFactory.cpp \
					../../Classes/mini_games/Shop.cpp \
					../../Classes/mini_games/Balloon.cpp \
					../../Classes/mini_games/Item.cpp \
                    ../../Classes/mini_games/Table.cpp \
                    ../../Classes/mini_games/spot.cpp \
					../../Classes/menu/MenuContext.cpp \
					../../Classes/menu/LevelHelpScene.cpp \
					../../Classes/menu/LevelMenu.cpp \
					../../Classes/menu/LevelHelpOverlay.cpp \
					../../Classes/menu/HelpLayer.cpp \
					../../Classes/menu/Award.cpp \
					../../Classes/lang/LangUtil.cpp \
					../../Classes/lang/EnglishUtil.cpp \
					../../Classes/lang/KannadaUtil.cpp \
					../../Classes/lang/TextGenerator.cpp \
					../../Classes/StartMenuScene.cpp \
					../../Classes/AlphamonSprite.cpp \
					../../Classes/SkeletonPosition.cpp  \
					../../Classes/I18nUtils.cpp  \
					../../Classes/MO.cpp  \
					../../Classes/Entry.cpp  \
					../../Classes/LanguageManager.cpp \
					../../Classes/GameScene.cpp \
					../../Classes/MapScene.cpp \
					../../Classes/MapIsland.cpp	\
					../../Classes/lang/SafariAnalyticsManager.cpp \
					../../Classes/GameMapScene.cpp \
					../../Classes/menu/ScoreBoardContent.cpp \
					../../Classes/lang/WordManager.cpp \
					../../Classes/WordSprite.cpp \
					../../Classes/lang/WordInfo.cpp \
					../../Classes/ScrollableGameMapScene.cpp \
					../../Classes/PhotoCaptureScene.cpp \
					../../Classes/mini_games/Spirograph.cpp	\
					../../Classes/mini_games/Bingo.cpp \
					../../Classes/WordSceneLipiTKNode.cpp\
					../../Classes/util/CommonText.cpp	\
					../../Classes/util/CommonLabel.cpp	\
					../../Classes/util/CommonLabelTTF.cpp	\
					../../Classes/util/logger/LTKLogger.cpp	\
					../../Classes/util/logger/logger.cpp	\
					../../Classes/common/LTKCaptureDevice.cpp \
				    ../../Classes/common/LTKChannel.cpp \
					../../Classes/common/LTKException.cpp \
					../../Classes/common/LTKScreenContext.cpp \
					../../Classes/common/LTKTrace.cpp \
					../../Classes/common/LTKTraceFormat.cpp \
					../../Classes/common/LTKTraceGroup.cpp \
					../../Classes/util/lib/LTKCheckSumGenerate.cpp \
					../../Classes/util/lib/LTKConfigFileReader.cpp \
					../../Classes/util/lib/LTKErrors.cpp \
					../../Classes/util/lib/LTKImageWriter.cpp \
					../../Classes/util/lib/LTKInkFileReader.cpp \
					../../Classes/util/lib/LTKInkFileWriter.cpp \
					../../Classes/util/lib/LTKInkUtils.cpp \
					../../Classes/util/lib/LTKLinuxUtil.cpp \
					../../Classes/util/lib/LTKLoggerUtil.cpp \
					../../Classes/util/lib/LTKOSUtilFactory.cpp \
					../../Classes/util/lib/LTKStrEncoding.cpp \
					../../Classes/util/lib/LTKStringUtil.cpp \
					../../Classes/util/lib/LTKVersionCompatibilityCheck.cpp \
					../../Classes/lipiengine/lipiengine.cpp \
					../../Classes/lipiengine/LipiEngineModule.cpp \
					../../Classes/reco/shaperec/common/LTKShapeRecoConfig.cpp \
					../../Classes/reco/shaperec/common/LTKShapeRecognizer.cpp \
					../../Classes/reco/shaperec/common/LTKShapeRecoResult.cpp \
					../../Classes/reco/shaperec/common/LTKShapeRecoUtil.cpp \
					../../Classes/reco/shaperec/common/LTKShapeSample.cpp \
					../../Classes/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractor.cpp \
					../../Classes/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractorFactory.cpp \
					../../Classes/reco/shaperec/featureextractor/pointfloat/PointFloat.cpp \
					../../Classes/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeature.cpp \
					../../Classes/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeatureExtractor.cpp \
					../../Classes/reco/shaperec/nn/NN.cpp \
					../../Classes/reco/shaperec/nn/NNShapeRecognizer.cpp \
					../../Classes/reco/shaperec/nn/NNAdapt.cpp \
					../../Classes/reco/shaperec/preprocessing/LTKPreprocessor.cpp \
					../../Classes/reco/shaperec/preprocessing/preprocessing.cpp \
					../../Classes/Calculator.cpp \
					../../Classes/Setting.cpp \
					../../Classes/mini_games/CarDraw.cpp \
					../../Classes/mini_games/CarDrawNode.cpp \
					../../Classes/mini_games/Door.cpp \
					../../Classes/mini_games/DoorNode.cpp \
					../../Classes/mini_games/JumpingNumbers.cpp \
					../../Classes/mini_games/Shape.cpp \
					../../Classes/mini_games/DinoGame.cpp \
					../../Classes/mini_games/AlphabetWriting.cpp \
					../../Classes/story/QuestionHandler.cpp \
					../../Classes/story/MultipleChoice.cpp \
                    ../../Classes/AsyncTask.cpp \
                    ../../Classes/LipiTKNode.cpp \
                    ../../Classes/LipiTKInterface.cpp \
                    ../../Classes/LipiTKProcessTask.cpp \
                    ../../Classes/LipiTKResult.cpp \
                    ../../Classes/Stroke.cpp \
					../../Classes/WordBubble.cpp \
					../../Classes/lang/SwahiliUtil.cpp \
					../../Classes/CopyRight.cpp \
					../../Classes/ChooseCharacter.cpp \
					../../Classes/StoryPlaying.cpp \
					../../Classes/StoryCoverPage.cpp
					
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../../extensions
LOCAL_C_INCLUDES += $(LOCAL_PATH)/include/
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/util/lib
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/lipiengine
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/reco/shaperec/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/reco/shaperec/featureextractor/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/reco/shaperec/featureextractor/pointfloat
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/reco/shaperec/nn
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/reco/shaperec/preprocessing
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes/util/logger

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_STATIC_LIBRARIES += cocos_extension_static	

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)


$(call import-module, scripting/js-bindings/proj.android)
$(call import-module,.)
$(call import-module,extensions)
