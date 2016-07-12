LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

$(call import-add-path,$(LOCAL_PATH)/../../cocos2d)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/external)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos)

LOCAL_MODULE := cocos2dcpp_shared

LOCAL_MODULE_FILENAME := libcocos2dcpp

LOCAL_SRC_FILES := hellocpp/main.cpp \
<<<<<<< HEAD
../../Classes/AppDelegate.cpp \
../../Classes/ExternalSkeletonCharacter.cpp \
../../Classes/FallingState.cpp \
../../Classes/GestureLayer.cpp \
../../Classes/HelloWorldScene.cpp \
../../Classes/JumpingState.cpp \
../../Classes/StandingState.cpp \
../../Classes/MessageContent.cpp \
../../Classes/MessageReceiver.cpp \
../../Classes/MessageSender.cpp \
../../Classes/PhysicsShapeCache.cpp \
../../Classes/RPGConfig.cpp \
../../Classes/SkeletonCharacter.cpp \
../../Classes/SpeechBubbleView.cpp \
../../Classes/sqlite3.c \
../../Classes/Sqlite3Helper.cpp \
../../Classes/State.cpp \
../../Classes/StateMachine.cpp \
../../Classes/WalkingState.cpp 
=======
                   ../../Classes/AppDelegate.cpp \
                   ../../Classes/HelloWorldScene.cpp \
					../../Classes/alphamon/Alphamon.cpp \
					../../Classes/alphamon/HPMeter.cpp \
					../../Classes/alphamon/SelectAlphamonScene.cpp \
					../../Classes/DuelScene.cpp \
					../../Classes/GestureLayer.cpp \
					../../Classes/PhysicsShapeCache.cpp \
					../../Classes/puzzle/Alphabet.cpp \
					../../Classes/puzzle/AlphabetGrid.cpp \
					../../Classes/puzzle/CharGenerator.cpp \
					../../Classes/effects/FShake.cpp \
					../../Classes/RPGConfig.cpp \
					../../Classes/SkeletonCharacter.cpp \
					../../Classes/TraceScene.cpp \
					../../Classes/StateMachine.cpp

>>>>>>> origin/master

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
