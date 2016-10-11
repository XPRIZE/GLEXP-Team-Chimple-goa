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
					../../Classes/mini_games/Circle.cpp \
					../../Classes/mini_games/Dash.cpp \
					../../Classes/mini_games/Decomon.cpp \
                    ../../Classes/mini_games/BalloonHero.cpp \
                    ../../Classes/mini_games/Drop.cpp \
					../../Classes/mini_games/Order.cpp \
					../../Classes/mini_games/Owl.cpp \
					../../Classes/menu/MenuContext.cpp \
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
					./src/util/logger/LTKLogger.cpp	\
					./src/util/logger/logger.cpp	\
					./src/common/LTKCaptureDevice.cpp \
				    ./src/common/LTKChannel.cpp \
					./src/common/LTKException.cpp \
					./src/common/LTKScreenContext.cpp \
					./src/common/LTKTrace.cpp \
					./src/common/LTKTraceFormat.cpp \
					./src/common/LTKTraceGroup.cpp \
					./src/util/lib/LTKCheckSumGenerate.cpp \
					./src/util/lib/LTKConfigFileReader.cpp \
					./src/util/lib/LTKErrors.cpp \
					./src/util/lib/LTKImageWriter.cpp \
					./src/util/lib/LTKInkFileReader.cpp \
					./src/util/lib/LTKInkFileWriter.cpp \
					./src/util/lib/LTKInkUtils.cpp \
					./src/util/lib/LTKLinuxUtil.cpp \
					./src/util/lib/LTKLoggerUtil.cpp \
					./src/util/lib/LTKOSUtilFactory.cpp \
					./src/util/lib/LTKStrEncoding.cpp \
					./src/util/lib/LTKStringUtil.cpp \
					./src/util/lib/LTKVersionCompatibilityCheck.cpp \
					./src/lipiengine/lipiengine.cpp \
					./src/lipiengine/LipiEngineModule.cpp \
					./src/reco/shaperec/common/LTKShapeRecoConfig.cpp \
					./src/reco/shaperec/common/LTKShapeRecognizer.cpp \
					./src/reco/shaperec/common/LTKShapeRecoResult.cpp \
					./src/reco/shaperec/common/LTKShapeRecoUtil.cpp \
					./src/reco/shaperec/common/LTKShapeSample.cpp \
					./src/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractor.cpp \
					./src/reco/shaperec/featureextractor/common/LTKShapeFeatureExtractorFactory.cpp \
					./src/reco/shaperec/featureextractor/pointfloat/PointFloat.cpp \
					./src/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeature.cpp \
					./src/reco/shaperec/featureextractor/pointfloat/PointFloatShapeFeatureExtractor.cpp \
					./src/reco/shaperec/nn/NN.cpp \
					./src/reco/shaperec/nn/NNShapeRecognizer.cpp \
					./src/reco/shaperec/nn/NNAdapt.cpp \
					./src/reco/shaperec/preprocessing/LTKPreprocessor.cpp \
					./src/reco/shaperec/preprocessing/preprocessing.cpp \
					lipiJni.cpp
					
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../../extensions
LOCAL_C_INCLUDES += $(LOCAL_PATH)/include/
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/util/lib
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/lipiengine
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/reco/shaperec/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/reco/shaperec/featureextractor/common
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/reco/shaperec/featureextractor/pointfloat
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/reco/shaperec/nn
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/reco/shaperec/preprocessing
LOCAL_C_INCLUDES += $(LOCAL_PATH)/src/util/logger

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_STATIC_LIBRARIES += cocos_extension_static	

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)


$(call import-module, scripting/js-bindings/proj.android)
$(call import-module,.)
$(call import-module,extensions)
