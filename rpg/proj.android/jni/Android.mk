LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

$(call import-add-path,$(LOCAL_PATH)/../../cocos2d)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/external)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos)

LOCAL_MODULE := cocos2dcpp_shared

LOCAL_MODULE_FILENAME := libcocos2dcpp

LOCAL_SRC_FILES := hellocpp/main.cpp \
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


LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes

# _COCOS_HEADER_ANDROID_BEGIN
# _COCOS_HEADER_ANDROID_END


LOCAL_STATIC_LIBRARIES := cocos2dx_static

# _COCOS_LIB_ANDROID_BEGIN
# _COCOS_LIB_ANDROID_END

include $(BUILD_SHARED_LIBRARY)

$(call import-module,.)

# _COCOS_LIB_IMPORT_ANDROID_BEGIN
# _COCOS_LIB_IMPORT_ANDROID_END
