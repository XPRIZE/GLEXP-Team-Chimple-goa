//
//  LevelHelpOverlay.cpp
//  goa
//
//  Created by Srikanth Talapadi on 23/12/2016.
//
//

#include "LevelHelpOverlay.h"
#include "MenuContext.h"

USING_NS_CC;

LevelHelpOverlay *LevelHelpOverlay::create(std::string gameName) {
    LevelHelpOverlay* lhs = new (std::nothrow) LevelHelpOverlay();
    if(lhs && lhs->initWithGame(gameName))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

LevelHelpOverlay::LevelHelpOverlay() {
    
}
LevelHelpOverlay::~LevelHelpOverlay() {
    
}

bool LevelHelpOverlay::initWithGame(std::string gameName) {
    if(!LevelHelpScene::initWithGame(gameName)) {
        return false;
    }
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 128.0));
    greyLayer->setContentSize(visibleSize);
    addChild(greyLayer, -1);
    auto bg = getChildByName("bg");
    bg->removeChildByName("Panel_2");
    bg->removeChildByName("Panel_3");
    bg->removeChildByName("Panel_4");
    auto listener = EventListenerTouchOneByOne::create();
    listener->setSwallowTouches(true);
    listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
    {
        return true;
    };
    _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);

    return true;
}

void LevelHelpOverlay::gotoGame(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            if(_vp != NULL && _vp->isPlaying()) {
                _vp->stop();
            }
        #endif
        
        _currentVideo++;
        if(_currentVideo < _videos.size()) {
            removeChild(getChildByName("bg")->getChildByName("screen_1")->getChildByName("video"));
            getChildByName("bg")->getChildByName("screen_1")->removeChild(_resumeButton);
            if(_currentVideo + 1 == _videos.size()) {
                _text->setString(LangUtil::getInstance()->translateString(_helpText));
            } else {
                _text->setString(LangUtil::getInstance()->translateString(_videoNames[_currentVideo]));
            }            
            videoPlayStart();
        } else {
            auto menuContext = static_cast<MenuContext *>(getParent());
            removeFromParent();
            menuContext->removeMenu();
        }
    }
}

void LevelHelpOverlay::decideIndexOfVideo() {
    // nothing to do here - play everything
}
