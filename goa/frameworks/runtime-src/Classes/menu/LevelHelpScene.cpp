//
//  LevelHelpScene.cpp
//  goa
//
//  Created by Srikanth Talapadi on 01/12/2016.
//
//

#include "LevelHelpScene.h"
#include "MenuContext.h"
#include "../GameScene.h"
#include "storage/local-storage/LocalStorage.h"
#include "ui/CocosGUI.h"


USING_NS_CC;
using namespace cocos2d::ui;
using namespace experimental;

static const std::string CURRENT_LEVEL = ".currentLevel";

Scene *LevelHelpScene::createScene(std::string gameName) {
    auto layer = LevelHelpScene::create(gameName);
    auto scene = Scene::create();
    scene->addChild(layer);
    return scene;
}

LevelHelpScene *LevelHelpScene::create(std::string gameName) {
    LevelHelpScene* lhs = new (std::nothrow) LevelHelpScene();
    if(lhs && lhs->initWithGame(gameName))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

bool LevelHelpScene::init() {
    return true;
}

bool LevelHelpScene::initWithGame(std::string gameName) {
    if(!Node::init()) {
        return false;
    }
    _gameName = gameName;
    _currentLevel = 1;
    std::string currentLevelStr;
    localStorageGetItem(gameName + CURRENT_LEVEL, &currentLevelStr);
    if(!currentLevelStr.empty()) {
        _currentLevel = std::atoi( currentLevelStr.c_str());
    }
    return true;
}

void LevelHelpScene::onEnterTransitionDidFinish() {
    auto button = Button::create("menu/menu.png", "menu/menu.png", "menu/menu.png", Widget::TextureResType::LOCAL);
    button->addTouchEventListener(CC_CALLBACK_2(LevelHelpScene::gotoGame, this));
    button->setPosition(Vec2(1280, 900));
    addChild(button);
    
//    auto text = Text::create("At HDFC Bank, it has been our constant endeavour to extend convenience beyond your banking transactions. If you wish to send or receive money, you no longer need to remember bank account numbers or IFSC codes. Presenting HDFC Bank UPI (Unified Payment Interface) - the easiest way to do money transfers with just a Virtual Payment Address (VPA). Click here to know more", "Arial", 64);
//    text->setPosition(Vec2(1280, 300));
////    text->setContentSize(Size(1200, 400));
//    text->setTextAreaSize(Size(1200, 0));
//    text->ignoreContentAdaptWithSize(true);
//    addChild(text);
//    
//    videoPlayStart("alphamon_duel");
}

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
void LevelHelpScene::videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType) {
    switch (eventType) {
        case cocos2d::experimental::ui::VideoPlayer::EventType::PLAYING:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::PAUSED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::STOPPED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::COMPLETED:
            videoPlayOverCallback();
            break;
        default:
            break;
    }
}
#endif

void LevelHelpScene::videoPlayStart(std::string gameName)
{
    std::string videoName = "generic";
    if(!gameName.empty()) {
        videoName = gameName;
    }
    auto tv = Sprite::create("TV.png");
    tv->setScaleX(0.73);
    tv->setScaleY(0.70);
    tv->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    tv->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
    tv->setName("tv");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    //auto sprite = CCSprite::create("TV.png");
    //sprite->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
    experimental::ui::VideoPlayer* vp = experimental::ui::VideoPlayer::create();
    this->addChild(tv, 2);
    vp->setContentSize(cocos2d::Size((tv->getContentSize().width *0.73)-200, (tv->getContentSize().height*0.7) - 180 ));
    vp->setFileName("help/" + videoName +".webm");
    vp->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
    vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    vp->play();
    vp->setName("video");
    this->addChild(vp, 2);
    vp->addEventListener(CC_CALLBACK_2(LevelHelpScene::videoEventCallback, this));
#else
    videoPlayOverCallback();
#endif
    
}

void LevelHelpScene::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    this->removeChildByName("video");
    this->removeChildByName("tv");
#endif 
}


void LevelHelpScene::gotoGame(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        MenuContext::launchGameFinally(_gameName);
    }
}

LevelHelpScene::LevelHelpScene() {
    
}

LevelHelpScene::~LevelHelpScene() {
    
}
