//
//  CommonText.cpp
//  goa
//
//  Created by Srikanth Talapadi on 17/12/2016.
//
//

#include "CommonText.h"
#include "../menu/MenuContext.h"

USING_NS_CC;

bool CommonText::touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event) {
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    
    if(rect.containsPoint(n))
    {
        CCLOG("in CommonText::touchSpeak");
        MenuContext::pronounceWord(this->getString());
    }
    
    CCLOG("CommonText::touchSpeak");
    return false;
}

bool CommonText::init() {
    if(ui::Text::init()) {
        _listener = EventListenerTouchOneByOne::create();
        _listener->onTouchBegan = CC_CALLBACK_2(CommonText::touchSpeak, this);
//        _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
        _eventDispatcher->addEventListenerWithFixedPriority(_listener, -1);
        return true;
    }
    return false;
}

CommonText *CommonText::create() {
    CommonText *commonText = new (std::nothrow) CommonText();
    if(commonText && commonText->init()) {
        commonText->autorelease();
        return commonText;
    }
    CC_SAFE_DELETE(commonText);
    return nullptr;
}

CommonText::CommonText() {
    
}

CommonText::~CommonText() {
    
}
