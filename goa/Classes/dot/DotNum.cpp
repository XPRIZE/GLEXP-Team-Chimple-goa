//
//  DotNum.cpp
//  goa
//
//  Created by Srikanth Talapadi on 01/04/17.
//
//

#include "DotNum.hpp"
#include "Dot.hpp"
#include "../menu/MenuContext.h"
#include "DotsLayer.hpp"


USING_NS_CC;

DotNum* DotNum::create(int num, bool isShowFinger) {
    DotNum *dotNum = new (std::nothrow) DotNum();
    if(dotNum && dotNum->init(num, isShowFinger)) {
        dotNum->autorelease();
        return dotNum;
    }
    CC_SAFE_DELETE(dotNum);
    return nullptr;
}

DotNum::DotNum() {
    
}

DotNum::~DotNum() {
    
}

bool DotNum::init(int num, bool isShowFinger) {
    if(!Node::init()) {
        return false;
    }
    _isShowFinger = isShowFinger;
    auto wb = Sprite::create("help/whiteboard.png");
    double length = 400.0;
    wb->setScale(length * 2.0 / 1640.0);
    addChild(wb);
    _dotNode = Node::create();
    addChild(_dotNode);
    auto color = Color3B(56, 165, 212);
    _num = num;
    switch (num) {
        case 1:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            break;
        }
        case 2:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPositionY(-length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPositionY(length / 2.0);
            break;
        }
        case 3:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPositionY(length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, -length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, -length / 2.0);
            break;
        }
        case 4:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, length / 2.0);
            break;
        }
        case 5:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, length / 2.0);
            break;
        }
        case 6:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, length / 2.0);
            break;
        }
        case 7:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, length / 2.0);
            break;
        }
        case 8:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, -length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 4.0, -length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 4.0, -length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, -length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 4.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 4.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, length / 2.0);
            break;
        }
        case 9:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, length / 2.0);
            break;
        }
        case 10:
        {
            auto d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, -length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length * 3.0 / 4.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 4.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 4.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length * 3.0 / 4.0, 0.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(-length / 2.0, length / 2.0);
            
            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(0.0, length / 2.0);

            d = Dot::createWithColor(color);
            _dotNode->addChild(d);
            d->touchBeganCallback = CC_CALLBACK_2(DotNum::onTouchBegan, this);
            d->setPosition(length / 2.0, length / 2.0);
            break;
        }
        default:
            break;
    }
    return true;
}

bool DotNum::onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event) {
    Dot* dot = static_cast<Dot*>(event->getCurrentTarget());
    if(!dot->isTouched()) {
        dot->touched(true);
        dot->setColor(Color3B(181.0, 214.0, 47.0));
    }
    bool allTouched = true;
    int pressedNumber = 0;
    Vector <Node*> children = _dotNode->getChildren();
    for (auto item = children.rbegin(); item != children.rend(); ++item) {
        Dot *dot = static_cast<Dot*>(*item);
        if(dot->isTouched()) {
            pressedNumber++;
        } else {
            allTouched = false;
        }
    }
    MenuContext::pronounceWord(MenuContext::to_string(pressedNumber));
    if(_isShowFinger && allTouched) {
        enableTouch(false);
        DotsLayer* dotsLayer = static_cast<DotsLayer *>(getParent());
        dotsLayer->showFinger(this);
    }
    return true;
}

void DotNum::enableTouch(bool enabled) {
    Vector <Node*> children = _dotNode->getChildren();
    for (auto item = children.rbegin(); item != children.rend(); ++item) {
        Dot *dot = static_cast<Dot*>(*item);
        dot->enableTouch(enabled);
    }
}

int DotNum::getNum() {
    return _num;
}
