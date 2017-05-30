//
//  StoryTextField.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 30/05/17.
//
//

#include "StoryTextField.hpp"
#include "../menu/MenuContext.h"

USING_NS_CC;



bool StoryTextField::touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event) {
    if(!MenuContext::isGameStatic() && isVisible() && getOpacity() > 0) {
        auto n = getParent()->convertTouchToNodeSpace(touch);
        auto rect = this->getBoundingBox();
        if(rect.containsPoint(n))
        {
            MenuContext::pronounceWord(this->getOriginalText(), false);
        }
    }
    return false;
}

void StoryTextField::onEnterTransitionDidFinish() {
    ui::TextField::onEnterTransitionDidFinish();
}

void StoryTextField::onExitTransitionDidStart() {
    ui::TextField::onExitTransitionDidStart();
    _eventDispatcher->removeEventListener(_listener);
    _listener = nullptr;
}

bool StoryTextField::init() {
    if(ui::TextField::init()) {
        _listener = EventListenerTouchOneByOne::create();
        _listener->onTouchBegan = CC_CALLBACK_2(StoryTextField::touchSpeak, this);
        _eventDispatcher->addEventListenerWithFixedPriority(_listener, -1);
        return true;
    }
    return false;
}

StoryTextField *StoryTextField::create() {
    StoryTextField *commonText = new (std::nothrow) StoryTextField();
    if(commonText && commonText->init()) {
        commonText->autorelease();
        return commonText;
    }
    CC_SAFE_DELETE(commonText);
    return nullptr;
}

StoryTextField::StoryTextField():_originalText("") {
    
}

StoryTextField::~StoryTextField() {
    
}

std::string StoryTextField::getOriginalText() {
    return _originalText;
}


void StoryTextField::setOriginalText(std::string text) {
    _originalText = text;
}


