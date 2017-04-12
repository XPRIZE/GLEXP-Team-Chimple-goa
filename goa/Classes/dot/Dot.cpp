//
//  Dot.cpp
//  goa
//
//  Created by Srikanth Talapadi on 31/03/17.
//
//

#include "Dot.hpp"

USING_NS_CC;

Dot *Dot::createWithColor(cocos2d::Color3B color) {
    Dot *dot = new (std::nothrow) Dot();
    if(dot && dot->initWithColor(color)) {
        dot->autorelease();
        return dot;
    }
    CC_SAFE_DELETE(dot);
    return nullptr;
    
}

Dot::Dot():
touchBeganCallback(NULL),
touchMovedCallback(NULL),
touchEndedCallback(NULL),
_touchEnabled(true),
_isTouched(false)
{
    _listener = EventListenerTouchOneByOne::create();
    _listener->onTouchBegan = CC_CALLBACK_2(Dot::onTouchBegan, this);
    _listener->onTouchEnded = CC_CALLBACK_2(Dot::onTouchEnded, this);
    _listener->onTouchMoved = CC_CALLBACK_2(Dot::onTouchMoved, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
}

Dot::~Dot() {}

bool Dot::initWithColor(cocos2d::Color3B color) {
    if(!Sprite::initWithSpriteFrameName("hand/dot.png")) {
        return false;
    }
    _color = color;
    setColor(color);
    return true;
}

bool Dot::onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event) {
    if(_touchEnabled) {
        auto n = convertTouchToNodeSpace(touch);
        auto rect = Rect(Vec2::ZERO, this->getBoundingBox().size);
        
        if(rect.containsPoint(n))
        {
            if(touchBeganCallback) {
                return touchBeganCallback(touch, event);
            }
            return true;
        }
    }
    return false;
}

void Dot::onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event) {
    if(_touchEnabled && touchEndedCallback) {
        touchEndedCallback(touch, event);
    }
}

void Dot::onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event) {
    if(_touchEnabled && touchMovedCallback) {
        touchMovedCallback(touch, event);
    }
}

void Dot::enableTouch(bool enabled) {
    _touchEnabled = enabled;
    _listener->setEnabled(enabled);
}

void Dot::touched(bool isTouched) {
    _isTouched = isTouched;
}

bool Dot::isTouched() {
    return _isTouched;
}
