//
//  CommonLabelTTF.cpp
//  goa
//
//  Created by Srikanth Talapadi on 18/12/2016.
//
//

#include "CommonLabelTTF.h"
#include "../menu/MenuContext.h"

USING_NS_CC;

bool CommonLabelTTF::touchSpeak(Touch* touch, Event* event) {
    if(isVisible() && getOpacity() > 0) {
        auto n = getParent()->convertTouchToNodeSpace(touch);
        auto rect = this->getBoundingBox();
        if(rect.containsPoint(n))
        {
            MenuContext::pronounceWord(this->getString());
        }
    }
    return false;
}

void CommonLabelTTF::onEnterTransitionDidFinish() {
    LabelTTF::onEnterTransitionDidFinish();
    auto scaleUp = ScaleTo::create(0.5, 1.1);
    auto elasticUp = EaseOut::create(scaleUp, 2.0);
    auto scaleDown = ScaleTo::create(0.5, 1.0);
    auto elasticDown = EaseIn::create(scaleDown, 2.0);
    runAction(Sequence::create(elasticUp, elasticDown, NULL));
    
//    MenuContext::pronounceWord(this->getString());
}

void CommonLabelTTF::onExitTransitionDidStart() {
    LabelTTF::onExitTransitionDidStart();
    _eventDispatcher->removeEventListener(_listener);
    _listener = nullptr;
}

bool CommonLabelTTF::initWithString(const std::string& string, const std::string& fontName, float fontSize, const Size &dimensions, TextHAlignment hAlignment, TextVAlignment vAlignment) {
    if(LabelTTF::initWithString(string, fontName, fontSize, dimensions, hAlignment, vAlignment)) {
        _listener = EventListenerTouchOneByOne::create();
        _listener->onTouchBegan = CC_CALLBACK_2(CommonLabelTTF::touchSpeak, this);
        _eventDispatcher->addEventListenerWithFixedPriority(_listener, -1);
        return true;
    }
    return false;
}

CommonLabelTTF *CommonLabelTTF::create() {
    CommonLabelTTF *ret = new (std::nothrow) CommonLabelTTF();
    if(ret && ret->init()) {
        ret->autorelease();
        return ret;
    }
    CC_SAFE_DELETE(ret);
    return nullptr;
}

CommonLabelTTF *CommonLabelTTF::create(const std::string& string, const std::string& fontName, float fontSize, const Size& dimensions, TextHAlignment hAlignment, TextVAlignment vAlignment) {
    CommonLabelTTF *ret = new (std::nothrow) CommonLabelTTF();
    if(ret && ret->initWithString(string, fontName, fontSize, dimensions, hAlignment, vAlignment)) {
        ret->autorelease();
        return ret;
    }
    CC_SAFE_DELETE(ret);
    return nullptr;
    
}

CommonLabelTTF::CommonLabelTTF() {
    
}

CommonLabelTTF::~CommonLabelTTF() {
    
}
