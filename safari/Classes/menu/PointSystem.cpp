//
//  PointSystem.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "PointSystem.h"

USING_NS_CC;

PointSystem* PointSystem::create() {
    PointSystem* pointSystem = new (std::nothrow) PointSystem();
    if(pointSystem && pointSystem->init()) {
        pointSystem->autorelease();
        return pointSystem;
    }
    CC_SAFE_DELETE(pointSystem);
    return nullptr;
    
}

bool PointSystem::init() {
    if(!Node::init()) {
        return false;
    }
    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 100);
    addChild(_label);
    return true;
}

void PointSystem::chooseAlphabet(char targetAlphabet, char chosenAlphabet, cocos2d::Vec2 position) {
    if(targetAlphabet == chosenAlphabet) {
        _points++;
    } else {
        _points--;
    }
    _label->setString("Points: " + std::to_string(_points));
}

void PointSystem::finalizePoints() {
    
}

PointSystem::PointSystem() :
_points(0),
_label(nullptr)
{
    
}

PointSystem::~PointSystem() {
    
}

