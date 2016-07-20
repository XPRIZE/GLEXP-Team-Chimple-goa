//
//  MenuContext.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "MenuContext.h"

USING_NS_CC;

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
    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 50);
    addChild(_label);

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    setPosition(Vec2(origin.x + visibleSize.width - 100, origin.y + visibleSize.height - 100));

    return true;
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
_label(nullptr)
{
    
}

MenuContext::~MenuContext() {
    
}

