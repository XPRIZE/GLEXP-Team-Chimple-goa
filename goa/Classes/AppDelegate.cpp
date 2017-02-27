#include "AppDelegate.h"

#include <time.h>
#include "menu/MapScene.h"
#include "menu/StartMenuScene.h"
#include "menu/ScrollableGameMapScene.hpp"
#include "lang/SafariAnalyticsManager.h"
#include "misc/PhotoCaptureScene.hpp"
#include "menu/Introduction.hpp"
#include "splash/SplashScene.hpp"

#include "audio/include/SimpleAudioEngine.h"
#include "storage/local-storage/LocalStorage.h"

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
    auto console = director->getConsole()->listenOnTCP(1234);
    auto glview = director->getOpenGLView();
    if(!glview) {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32) || (CC_TARGET_PLATFORM == CC_PLATFORM_MAC) || (CC_TARGET_PLATFORM == CC_PLATFORM_LINUX)
        glview = GLViewImpl::createWithRect("goa", cocos2d::Rect(0, 0, 960, 675));
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
    srand (time(NULL));
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
    director->runWithScene(SplashScene::createScene());
    
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
