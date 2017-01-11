#include "AppDelegate.h"
#include "MapScene.h"
#include "StartMenuScene.h"
#include "ScrollableGameMapScene.hpp"
#include "lang/SafariAnalyticsManager.h"
#include "PhotoCaptureScene.hpp"
#include "menu/Introduction.hpp"

#include "audio/include/SimpleAudioEngine.h"
#include "scripting/js-bindings/auto/jsb_cocos2dx_3d_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_3d_extension_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_builder_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_extension_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_navmesh_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_physics3d_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_spine_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_studio_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_ui_auto.hpp"
#include "scripting/js-bindings/manual/3d/jsb_cocos2dx_3d_manual.h"
#include "scripting/js-bindings/manual/chipmunk/js_bindings_chipmunk_registration.h"
#include "scripting/js-bindings/manual/cocosbuilder/js_bindings_ccbreader.h"
#include "scripting/js-bindings/manual/cocostudio/jsb_cocos2dx_studio_manual.h"
#include "scripting/js-bindings/manual/extension/jsb_cocos2dx_extension_manual.h"
#include "scripting/js-bindings/manual/jsb_opengl_registration.h"
#include "scripting/js-bindings/manual/localstorage/js_bindings_system_registration.h"
#include "scripting/js-bindings/manual/navmesh/jsb_cocos2dx_navmesh_manual.h"
#include "scripting/js-bindings/manual/network/XMLHTTPRequest.h"
#include "scripting/js-bindings/manual/network/jsb_socketio.h"
#include "scripting/js-bindings/manual/network/jsb_websocket.h"
#include "scripting/js-bindings/manual/physics3d/jsb_cocos2dx_physics3d_manual.h"
#include "scripting/js-bindings/manual/spine/jsb_cocos2dx_spine_manual.h"
#include "scripting/js-bindings/manual/ui/jsb_cocos2dx_ui_manual.h"
#include "scripting/js-bindings/auto/chimpleautogenbindings.hpp"
#include "scripting/js-bindings/auto/textgeneratorautobindings.hpp"
#include "scripting/js-bindings/auto/wordgeneratorautobindings.hpp"
#include "scripting/js-bindings/auto/wordscenegeneratorautobindings.hpp"
#include "scripting/js-bindings/auto/storywordgeneratorautobindings.hpp"
#include "storage/local-storage/LocalStorage.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "scripting/js-bindings/auto/jsb_cocos2dx_experimental_video_auto.hpp"
#include "scripting/js-bindings/auto/jsb_cocos2dx_experimental_webView_auto.hpp"
#include "scripting/js-bindings/manual/experimental/jsb_cocos2dx_experimental_video_manual.h"
#include "scripting/js-bindings/manual/experimental/jsb_cocos2dx_experimental_webView_manual.h"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#include "scripting/js-bindings/auto/jsb_cocos2dx_audioengine_auto.hpp"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "cocos/scripting/js-bindings/manual/platform/android/CCJavascriptJavaBridge.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
#include "cocos/scripting/js-bindings/manual/platform/ios/JavaScriptObjCBridge.h"
#endif

USING_NS_CC;
using namespace CocosDenshion;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
extern "C"
{
    jboolean Java_org_cocos2dx_javascript_AppActivity_updateInformation(JNIEnv* env, jobject thiz, jstring jsonStr)
    {
        const char* cjsonStr = env->GetStringUTFChars(jsonStr, NULL);
        std::string inputStr(cjsonStr);
        
        CCLOG("enemy information %s", cjsonStr);
        
        Director::getInstance()->getEventDispatcher()->dispatchCustomEvent("enemy_information_received_event", static_cast<void*>(&inputStr));
        
        
        return true;
    }
    
    jboolean Java_org_cocos2dx_javascript_AppActivity_launchGameWithPeer(JNIEnv* env, jobject thiz,jstring jsonStr)
    {
        const char* cjsonStr = env->GetStringUTFChars(jsonStr, NULL);
        std::string inputStr(cjsonStr);
        localStorageSetItem("connectionResult", inputStr);
        
        Director::getInstance()->getEventDispatcher()->dispatchCustomEvent("launch_game_with_peer_event");
        return true;
    }
    

    jboolean Java_org_cocos2dx_javascript_AppActivity_discoveredBluetoothDevices(JNIEnv* env, jobject thiz, jstring jsonStr)
    {
        const char* cjsonStr = env->GetStringUTFChars(jsonStr, NULL);
        std::string inputStr(cjsonStr);
        
        CCLOG("discovered information %s", inputStr.c_str());
        localStorageSetItem("discoveredBluetoothDevices", inputStr);
        
        EventCustom event("peer_information_received_event");
        //event.setUserData(static_cast<void*>(&inputStr));
        Director::getInstance()->getEventDispatcher()->dispatchEvent(&event);
        
        return true;
    }
}
#endif

static Size designResolutionSize = Size(2560, 1800);
static Size smallResolutionSize = Size(640, 450);
static Size mediumResolutionSize = Size(1280, 900);
static Size largeResolutionSize = Size(2560, 1800);

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    ScriptEngineManager::destroyInstance();
}

void AppDelegate::initGLContextAttrs()
{
    GLContextAttrs glContextAttrs = {8, 8, 8, 8, 24, 8};

    GLView::setGLContextAttrs(glContextAttrs);
}

bool AppDelegate::applicationDidFinishLaunching()
{
    // initialize director
    auto director = Director::getInstance();
    auto glview = director->getOpenGLView();
    if(!glview) {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32) || (CC_TARGET_PLATFORM == CC_PLATFORM_MAC) || (CC_TARGET_PLATFORM == CC_PLATFORM_LINUX)
        glview = GLViewImpl::createWithRect("goa", cocos2d::Rect(0, 0, 960, 640));
//        glview = GLViewImpl::createWithRect("goa", cocos2d::Rect(0, 0, 640, 450));
#else
        glview = GLViewImpl::createWithRect("goa", cocos2d::Rect(0, 0, 640, 450));
//        glview = GLViewImpl::createWithRect("goa", cocos2d::Rect(0, 0, 1280, 900));
#endif

        director->setOpenGLView(glview);
}
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32) || (CC_TARGET_PLATFORM == CC_PLATFORM_MAC) || (CC_TARGET_PLATFORM == CC_PLATFORM_LINUX)
    glview->setDesignResolutionSize(designResolutionSize.width, designResolutionSize.height, ResolutionPolicy::FIXED_HEIGHT);
#else
    glview->setDesignResolutionSize(designResolutionSize.width, designResolutionSize.height, ResolutionPolicy::FIXED_HEIGHT);
#endif

    std::vector<std::string> searchPaths;
    float scaleFactor = 1.0f;
    Size frameSize = glview->getFrameSize();
    
    if (frameSize.height > mediumResolutionSize.height)
    {
        CCLOG("resolution %s", "HDR");
        searchPaths.push_back("res/HDR");
        scaleFactor = largeResolutionSize.height/designResolutionSize.height;
    }
    else if (frameSize.height > smallResolutionSize.height)
    {
        CCLOG("resolution %s", "HD");
        searchPaths.push_back("res/HD");
        scaleFactor = mediumResolutionSize.height/designResolutionSize.height;
    }
    else
    {
        CCLOG("resolution %s", "SD");
        searchPaths.push_back("res/SD");
        scaleFactor = smallResolutionSize.height/designResolutionSize.height;
    }
    
    director->setContentScaleFactor(scaleFactor);
    FileUtils::getInstance()->setSearchPaths(searchPaths);
    
    FileUtils::getInstance()->addSearchPath("res");

    director->setDisplayStats(false);
    // set FPS. the default value is 1.0/60 if you don't call this
    director->setAnimationInterval(1.0f / 60);
    
    ScriptingCore* sc = ScriptingCore::getInstance();
    sc->addRegisterCallback(register_all_cocos2dx);
    sc->addRegisterCallback(register_cocos2dx_js_core);
    sc->addRegisterCallback(jsb_register_system);

    // extension can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_extension);
    sc->addRegisterCallback(register_all_cocos2dx_extension_manual);

    // chipmunk can be commented out to reduce the package
    sc->addRegisterCallback(jsb_register_chipmunk);
    // opengl can be commented out to reduce the package
    sc->addRegisterCallback(JSB_register_opengl);

    // builder can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_builder);
    sc->addRegisterCallback(register_CCBuilderReader);

    // ui can be commented out to reduce the package, attension studio need ui module
    sc->addRegisterCallback(register_all_cocos2dx_ui);
    sc->addRegisterCallback(register_all_cocos2dx_ui_manual);

    // studio can be commented out to reduce the package,
    sc->addRegisterCallback(register_all_cocos2dx_studio);
    sc->addRegisterCallback(register_all_cocos2dx_studio_manual);

    // spine can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_spine);
    sc->addRegisterCallback(register_all_cocos2dx_spine_manual);

    // XmlHttpRequest can be commented out to reduce the package
    sc->addRegisterCallback(MinXmlHttpRequest::_js_register);
    // websocket can be commented out to reduce the package
    sc->addRegisterCallback(register_jsb_websocket);
    // sokcet io can be commented out to reduce the package
    sc->addRegisterCallback(register_jsb_socketio);

    // 3d can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_3d);
    sc->addRegisterCallback(register_all_cocos2dx_3d_manual);

    // 3d extension can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_3d_extension);

#if CC_USE_3D_PHYSICS && CC_ENABLE_BULLET_INTEGRATION
    // Physics 3d can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_physics3d);
    sc->addRegisterCallback(register_all_cocos2dx_physics3d_manual);
#endif

#if CC_USE_NAVMESH
    sc->addRegisterCallback(register_all_cocos2dx_navmesh);
    sc->addRegisterCallback(register_all_cocos2dx_navmesh_manual);
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    sc->addRegisterCallback(register_all_cocos2dx_experimental_video);
    sc->addRegisterCallback(register_all_cocos2dx_experimental_video_manual);
    sc->addRegisterCallback(register_all_cocos2dx_experimental_webView);
    sc->addRegisterCallback(register_all_cocos2dx_experimental_webView_manual);
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
    sc->addRegisterCallback(register_all_cocos2dx_audioengine);
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    sc->addRegisterCallback(JavascriptJavaBridge::_js_register);
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
    sc->addRegisterCallback(JavaScriptObjCBridge::_js_register);
#endif
    
    sc->addRegisterCallback(register_all_chimpleautogenbindings);
    sc->addRegisterCallback(register_all_textgeneratorautobindings);
    sc->addRegisterCallback(register_all_wordgeneratorautobindings);
    sc->addRegisterCallback(register_all_wordscenegeneratorautobindings);
    sc->addRegisterCallback(register_all_storywordgeneratorautobindings);
    
    sc->start();
    sc->runScript("script/jsb_boot.js");
#if defined(COCOS2D_DEBUG) && (COCOS2D_DEBUG > 0)
    sc->enableDebugger();
#endif
    ScriptEngineProtocol *engine = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(engine);
    
    ScriptingCore::getInstance()->runScript("main.js");

    SafariAnalyticsManager* safariManager = SafariAnalyticsManager::getInstance();
    
    ScriptingCore::getInstance()->runScript("src/LoadGameConfig.js");
//    director->runWithScene(ScrollableGameMapScene::createScene());
    director->runWithScene(Introduction::createScene());
    
    
//    std::string cachedCharacterInformation;
//    bool cachedInfoFound = this->findCachedCharacterConfiguration(&cachedCharacterInformation);
//    
//    ScriptingCore::getInstance()->runScript("src/LoadGameConfig.js");
//    
//    if(cachedInfoFound && !cachedCharacterInformation.empty())
//    {
//        director->runWithScene(ScrollableGameMapScene::createScene());
//    } else {
//        ScriptingCore::getInstance()->runScript("src/start/characterConfigure.js");
//    }
//    
//
//    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//        director->runWithScene(ScrollableGameMapScene::createScene());
//        std::string userPhotoUrl = safariManager->getLatestUserPhoto();
//        if(!userPhotoUrl.empty()) {
//            Director::getInstance()->getTextureCache()->addImage(userPhotoUrl);
//            director->runWithScene(ScrollableGameMapScene::createScene());
//        } else {
//            director->runWithScene(PhotoCaptureScene::createScene());
//        }
//    #else
//        director->runWithScene(ScrollableGameMapScene::createScene());
//    #endif
    
    Application::getInstance()->getCurrentLanguage();
    return true;
}

bool AppDelegate::findCachedCharacterConfiguration(std::string* cachedCharacterInformation) {
    return localStorageGetItem("cachedCharacterConfig", cachedCharacterInformation);
}

// This function will be called when the app is inactive. Note, when receiving a phone call it is invoked.
void AppDelegate::applicationDidEnterBackground()
{
    auto director = Director::getInstance();
    director->stopAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_hide");
    SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    SimpleAudioEngine::getInstance()->pauseAllEffects();
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
    auto director = Director::getInstance();
    director->startAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_show");
    SimpleAudioEngine::getInstance()->resumeBackgroundMusic();
    SimpleAudioEngine::getInstance()->resumeAllEffects();
}
