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

USING_NS_CC;
using namespace cocos2d::ui;

MenuContext* MenuContext::create() {
    MenuContext* menuContext = new (std::nothrow) MenuContext();
    if(menuContext && menuContext->init()) {
        menuContext->autorelease();
        return menuContext;
    }
    CC_SAFE_DELETE(menuContext);
    return nullptr;
    
}

bool MenuContext::init() {
    if(!Node::init()) {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _menuButton = Button::create("menu/menu.png", "menu/menu.png", "menu/menu.png", Widget::TextureResType::LOCAL);
    _menuButton->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
    _menuButton->setPosition(Vec2(origin.x + visibleSize.width - 150, origin.y + visibleSize.height - 150));
    addChild(_menuButton, 1);
    
    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 50);
    _label->setPosition(Vec2(125, 125));
    _menuButton->addChild(_label);
    
    return true;
}

void MenuContext::expandMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(clickedButton == _menuButton) {
            if(_menuSelected) {
                removeChild(_menu);
                _menu = nullptr;
                removeChild(_greyLayer);
                _greyLayer = nullptr;
                _menuSelected = false;
            } else {
                Size visibleSize = Director::getInstance()->getVisibleSize();
                _greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 128.0));
                _greyLayer->setContentSize(visibleSize);
                addChild(_greyLayer, -1);
                _menu = Button::create("menu/close.png", "menu/close.png", "menu/close.png", Widget::TextureResType::LOCAL);
                _menu->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
                _menu->setPosition(_menuButton->getPosition());
                addChild(_menu);
                auto moveTo = MoveTo::create(0.5, Vec2(150, _menuButton->getPosition().y));
                auto elastic = EaseBackOut::create(moveTo);
                _menu->runAction(elastic);
                _menuSelected = true;
            }
        } else if (clickedButton == _menu) {
            Director::getInstance()->replaceScene(StartMenu::createScene());
        }
    }
}

void MenuContext::pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose, cocos2d::Vec2 position) {
    if((choose && targetAlphabet == chosenAlphabet) || (!choose && targetAlphabet != chosenAlphabet)) {
        _points++;
    } else {
        _points--;
    }
    _label->setString("Points: " + to_string(_points));
}

void MenuContext::finalizePoints() {
    
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

