//
//  MenuContext.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "MenuContext.h"
#include "ui/CocosGUI.h"
#include "../StartMenuScene.h"
#include "../lang/SafariAnalyticsManager.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;
using namespace cocos2d::ui;

static const int MAX_POINTS_TO_SHOW = 16;

MenuContext* MenuContext::create(Node* main, std::string gameName, bool launchCustomEventOnExit) {
    MenuContext* menuContext = new (std::nothrow) MenuContext();
    if(menuContext && menuContext->init(main)) {
        menuContext->autorelease();
        menuContext->_launchCustomEventOnExit = launchCustomEventOnExit;
        menuContext->gameName = gameName;
        return menuContext;
    }
    CC_SAFE_DELETE(menuContext);
    return nullptr;
    
}

bool MenuContext::init(Node* main) {
    if(!Node::init()) {
        return false;
    }
    _main = main;
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _menuButton = Button::create("menu/menu.png", "menu/menu.png", "menu/menu.png", Widget::TextureResType::LOCAL);
    _menuButton->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
    _menuButton->setPosition(Vec2(origin.x + visibleSize.width - 150, origin.y + visibleSize.height - 150));
    addChild(_menuButton, 1);
    
    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 50);
    _label->setPosition(Vec2(125, 125));
    _menuButton->addChild(_label);
    
    _pointMeter = Slider::create();
    _pointMeter->loadBarTexture("menu/blank.png");
    _pointMeter->loadProgressBarTexture("menu/coinstack.png");
    _pointMeter->setScale9Enabled(true);
    _pointMeter->setTouchEnabled(false);
    _pointMeter->setPosition(Vec2(128, 256));
    _menuButton->addChild(_pointMeter);
    
    return true;
}

void MenuContext::pauseNodeAndDescendants(Node *pNode)
{
    pNode->pause();
    for(const auto &child : pNode->getChildren())
    {
        this->pauseNodeAndDescendants(child);
    }
}
// resume nodes
void MenuContext::resumeNodeAndDescendants(Node *pNode)
{
    pNode->resume();
    for(const auto &child : pNode->getChildren())
    {
        this->resumeNodeAndDescendants(child);
    }
}

void MenuContext::expandMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(clickedButton == _menuButton) {
            if(_menuSelected) {
                auto moveTo = MoveTo::create(0.5, _menuButton->getPosition());
                auto elastic = EaseBackIn::create(moveTo);
                auto callbackRemoveMenu = CallFunc::create(CC_CALLBACK_0(MenuContext::removeMenu, this));
                _menu->runAction(Sequence::create(elastic, callbackRemoveMenu, NULL));
            } else {
                Size visibleSize = Director::getInstance()->getVisibleSize();
                _greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 128.0));
                _greyLayer->setContentSize(visibleSize);
                addChild(_greyLayer, -1);
                _menu = Button::create("menu/back.png", "menu/back.png", "menu/back.png", Widget::TextureResType::LOCAL);
                _menu->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
                _menu->setPosition(_menuButton->getPosition());
                addChild(_menu);
                auto moveTo = MoveTo::create(0.5, Vec2(150, _menuButton->getPosition().y));
                auto elastic = EaseBackOut::create(moveTo);
                _menu->runAction(elastic);
                pauseNodeAndDescendants(_main);
                _menuSelected = true;
            }
        } else if (clickedButton == _menu) {
            if(_launchCustomEventOnExit) {
                EventCustom event("on_menu_exit");
                _eventDispatcher->dispatchEvent(&event);

            } else {
                Director::getInstance()->replaceScene(StartMenu::createScene());
            }
            
        }
    }
}

void MenuContext::removeMenu() {
    removeChild(_menu);
    _menu = nullptr;
    removeChild(_greyLayer);
    _greyLayer = nullptr;
    resumeNodeAndDescendants(_main);
    _menuSelected = false;
}

void MenuContext::pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose, cocos2d::Vec2 position) {
    if((choose && targetAlphabet == chosenAlphabet) || (!choose && targetAlphabet != chosenAlphabet)) {
        _points++;
        auto sequence = Sequence::create(
            CallFunc::create(CC_CALLBACK_0(MenuContext::happyFace, this)),
            CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, 1)),
            DelayTime::create(1),
            CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
            NULL);
        runAction(sequence);
    } else {
        _points--;
        auto sequence = Sequence::create(
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::sadFace, this)),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, -1)),
                                         DelayTime::create(1),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
                                         NULL);
        runAction(sequence);
    }
    _label->setString("Points: " + to_string(_points));
    std::string targetAlphabetStr (1, targetAlphabet);
    std::string chosenAlphabetStr (1, chosenAlphabet);

    SafariAnalyticsManager::getInstance()->insertAnalyticsInfo(targetAlphabetStr.c_str(), chosenAlphabetStr.c_str(), gameName.c_str());
}

void MenuContext::finalizePoints() {
    
}

void MenuContext::increasePoints(int points) {
    _pointMeter->setPercent(_pointMeter->getPercent() + points * 100 / MAX_POINTS_TO_SHOW);
}

void MenuContext::happyFace() {
    _menuButton->loadTextureNormal("menu/happy.png");
}

void MenuContext::sadFace() {
    _menuButton->loadTextureNormal("menu/frown.png");
}

void MenuContext::normalFace() {
    _menuButton->loadTextureNormal("menu/menu.png");
}

Node* MenuContext::jumpOut(std::string nodeCsbName, bool frameAnimate, float duration) {
    auto node = CSLoader::createNode(nodeCsbName);
    auto pos = _menuButton->getPosition();
    node->setPosition(pos);
    node->setScale(0.2);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    auto jumpTo = MoveTo::create(duration, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    auto elastic = EaseBackOut::create(jumpTo);
    auto scaleTo = ScaleTo::create(duration, 1);
    if(frameAnimate) {
        cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline(nodeCsbName);
        node->runAction(anim);
        anim->gotoFrameAndPause(0);
        auto spawn = Spawn::create(elastic, scaleTo, NULL);
        auto callback = CC_CALLBACK_0(MenuContext::playAnimationTemp, this, anim);
        auto sequence = Sequence::create(spawn, CallFunc::create(callback), NULL);
        node->runAction(sequence);
    } else {
        auto spawn = Spawn::create(elastic, scaleTo, NULL);
        node->runAction(spawn);
    }
    return node;
}

void MenuContext::playAnimationTemp(cocostudio::timeline::ActionTimeline* timeline) {
    timeline->gotoFrameAndPlay(1, false);
}


MenuContext::MenuContext() :
_points(0),
_label(nullptr),
_menuSelected(false),
_greyLayer(nullptr)
{
    
}

MenuContext::~MenuContext() {
    
}

