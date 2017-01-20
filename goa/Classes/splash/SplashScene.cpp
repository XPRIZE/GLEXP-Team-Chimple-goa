//
//  SplashScene.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 11/01/17.
//
//

#include "SplashScene.hpp"
#include "../menu/MapScene.h"
#include "../menu/StartMenuScene.h"
#include "../menu/ScrollableGameMapScene.hpp"
#include "../lang/SafariAnalyticsManager.h"
#include "../misc/PhotoCaptureScene.hpp"
#include "../menu/Introduction.hpp"

#include "audio/include/SimpleAudioEngine.h"
#include "storage/local-storage/LocalStorage.h"


USING_NS_CC;

Scene* SplashScene::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = SplashScene::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    // return the scene
    return scene;
}

// on "init" you need to initialize your instance
bool SplashScene::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    this->loadDepedencies();
    
    this->scheduleOnce( schedule_selector( SplashScene::GoToMainMenuScene ), DISPLAY_TIME_SPLASH_SCENE );

    
    Node* animationNode = CSLoader::createNode("chimpleloading/chimpleloading.csb");
    animationNode->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
    animationNode->setAnchorPoint(Vec2(0.5,0.5));
    this->addChild(animationNode,1);
    
    cocostudio::timeline::ActionTimeline * _animationTimeLine = CSLoader::createTimeline("chimpleloading/chimpleloading.csb");
    animationNode->runAction(_animationTimeLine);
    _animationTimeLine->gotoFrameAndPlay(0);

    
    return true;
}


void SplashScene::loadDepedencies() {
    localStorageInit(FileUtils::getInstance()->getWritablePath() + "/goa.sqlite");
}

void SplashScene::GoToMainMenuScene( float dt )
{
    Director::getInstance()->replaceScene(ScrollableGameMapScene::createScene());    
}
