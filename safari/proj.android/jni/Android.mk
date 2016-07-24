LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

$(call import-add-path,$(LOCAL_PATH)/../../cocos2d)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/external)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos)

LOCAL_MODULE := cocos2dcpp_shared

LOCAL_MODULE_FILENAME := libcocos2dcpp

LOCAL_SRC_FILES := hellocpp/main.cpp \
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
					../../Classes/menu/MenuContext.cpp \
					../../Classes/lang/LangUtil.cpp \
					../../Classes/lang/EnglishUtil.cpp \
					../../Classes/lang/KannadaUtil.cpp \
                    ../../Classes/StartMenuScene.cpp \
                	../../Classes/AlphamonSprite.cpp \
                	../../Classes/SkeletonPosition.cpp  \
                	../../Classes/I18nUtils.cpp  \
                	../../Classes/MO.cpp  \
                	../../Classes/Entry.cpp  \
                	../../Classes/LanguageManager.cpp               	                	                	                	                	                
                	
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../../extensions

# _COCOS_HEADER_ANDROID_BEGIN
# _COCOS_HEADER_ANDROID_END


LOCAL_STATIC_LIBRARIES := cocos2dx_static
LOCAL_STATIC_LIBRARIES += cocosdenshion_static
LOCAL_STATIC_LIBRARIES += box2d_static
LOCAL_STATIC_LIBRARIES += cocos_extension_static

# _COCOS_LIB_ANDROID_BEGIN
# _COCOS_LIB_ANDROID_END

include $(BUILD_SHARED_LIBRARY)

$(call import-module,.)
$(call import-module,extensions)

# _COCOS_LIB_IMPORT_ANDROID_BEGIN
# _COCOS_LIB_IMPORT_ANDROID_END