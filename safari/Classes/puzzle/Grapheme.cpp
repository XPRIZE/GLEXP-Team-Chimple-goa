//
//  Grapheme.cpp
//  safari
//
//  Created by Srikanth Talapadi on 07/08/16.
//
//

#include "Grapheme.h"

USING_NS_CC;

Grapheme* Grapheme::create(std::string graphemeString) {
    Grapheme *grapheme = new (std::nothrow) Grapheme();
    if(grapheme && grapheme->init(graphemeString)) {
        grapheme->autorelease();
        return grapheme;
    }
    CC_SAFE_DELETE(grapheme);
    return nullptr;
}

bool Grapheme::init(std::string graphemeString) {
    if(!Node::init()) {
        return false;
    }
    _graphemeString = graphemeString;
    _text = ui::Text::create();
    _text->setFontSize(200);
    _text->setString(graphemeString);
    addChild(_text);

    auto listener = EventListenerTouchOneByOne::create();
    listener->onTouchBegan = CC_CALLBACK_2(Grapheme::onTouchBegan, this);
    listener->onTouchEnded = CC_CALLBACK_2(Grapheme::onTouchEnded, this);
    listener->onTouchMoved = CC_CALLBACK_2(Grapheme::onTouchMoved, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);
    
    return true;
}

std::string Grapheme::getGraphemeString() {
    return _graphemeString;
}

void Grapheme::setSelectedBackground(Node* selectedBackground) {
    _selectedBackground = selectedBackground;
    addChild(_selectedBackground, -1);
}

void Grapheme::setUnselectedBackground(Node* unSelectedBackground) {
    _unselectedBackground = unSelectedBackground;
    addChild(_unselectedBackground, -1);
}

void Grapheme::selected(bool sel) {
    _selected = sel;
}

bool Grapheme::isSelected() {
    return _selected;
}

void Grapheme::animateToPositionAndChangeBackground(Vec2 toPosition) {
    _prevPosition = getPosition();
    auto moveTo = MoveTo::create(1.0, toPosition);
    auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
    auto sequence = Sequence::create(moveTo, callback, NULL);
    runAction(sequence);
}

Vec2 Grapheme::getPrevPosition() {
    return _prevPosition;
}

void Grapheme::changeBackground() {
    if(_unselectedBackground) {
        _unselectedBackground->setVisible(!_selected);
    }
    if(_selectedBackground) {
        _selectedBackground->setVisible(_selected);
    }
    EventCustom event("grapheme_anim_done");
    _eventDispatcher->dispatchEvent(&event);
}

bool Grapheme::onTouchBegan(Touch* touch, Event* event){
    if(_actionManager->getNumberOfRunningActionsInTarget(this) == 0) {
        auto n = convertTouchToNodeSpace(touch);
        auto rect = _text->getBoundingBox();
        
        if(rect.containsPoint(n)) {
            CCLOG("onTouchBegan %s", _graphemeString.c_str());
            if(touchBeganCallback) {
                return touchBeganCallback(touch, event);
            }
            return true;
        }
    }
    return false; // we did not consume this event, pass thru.
}

void Grapheme::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(touchEndedCallback) {
        return touchEndedCallback(touch, event);
    }
}

void Grapheme::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(touchMovedCallback) {
        return touchMovedCallback(touch, event);
    }
}


Grapheme::Grapheme() :
_selected(false),
touchBeganCallback(NULL),
touchMovedCallback(NULL),
touchEndedCallback(NULL),
_selectedBackground(nullptr),
_unselectedBackground(nullptr)
{
    
}

Grapheme::~Grapheme() {
    
}

