//
//  Alphabet.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 25/06/16.
//
//

#include "Alphabet.h"

USING_NS_CC;

bool Alphabet::onTouchBegan(Touch* touch, Event* event){
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    
    if(rect.containsPoint(n))
    {
        CCLOG("onTouchBegan %c", _alphabet);
        return true; // to indicate that we have consumed it.
    }
    
    return false; // we did not consume this event, pass thru.
}

bool Alphabet::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    CCLOG("onTouchEnded %c", _alphabet);
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    
    if(rect.containsPoint(n))
    {
        enableGlow(Color4B::BLUE);
    }
    return true;
}

Alphabet::Alphabet() {
    auto listener1 = EventListenerTouchOneByOne::create();
    listener1->onTouchBegan = CC_CALLBACK_2(Alphabet::onTouchBegan, this);
    listener1->onTouchEnded = CC_CALLBACK_2(Alphabet::onTouchEnded, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, this);
}

Alphabet::~Alphabet() {}

Alphabet *Alphabet::createWithSize(char a, float fontSize) {
    Alphabet *alphabet = new (std::nothrow) Alphabet();
    if(alphabet && alphabet->initWithSize(a, fontSize)) {
        alphabet->autorelease();
        return alphabet;
    }
    CC_SAFE_DELETE(alphabet);
    return nullptr;
}

bool Alphabet::initWithSize(char alphabet, float fontSize) {
    _alphabet = alphabet;
    if (!Label::initWithTTF(std::string(1, _alphabet), "fonts/Marker Felt.ttf", 96)) {
        return false;
    }
    return true;
}