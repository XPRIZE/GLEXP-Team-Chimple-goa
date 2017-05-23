//
//  CommonTextField.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 21/05/17.
//
//

#include "CommonTextField.hpp"
#include "../menu/MenuContext.h"

USING_NS_CC;



bool CommonTextField::touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event) {
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

void CommonTextField::onEnterTransitionDidFinish() {
    ui::TextField::onEnterTransitionDidFinish();
    auto scaleUp = ScaleTo::create(0.5, 1.1);
    auto elasticUp = EaseOut::create(scaleUp, 2.0);
    auto scaleDown = ScaleTo::create(0.5, 1.0);
    auto elasticDown = EaseIn::create(scaleDown, 2.0);
    runAction(Sequence::create(elasticUp, elasticDown, NULL));
}

void CommonTextField::onExitTransitionDidStart() {
    ui::TextField::onExitTransitionDidStart();
    _eventDispatcher->removeEventListener(_listener);
    _listener = nullptr;
}

bool CommonTextField::init() {
    if(ui::TextField::init()) {
        _listener = EventListenerTouchOneByOne::create();
        _listener->onTouchBegan = CC_CALLBACK_2(CommonTextField::touchSpeak, this);
        _eventDispatcher->addEventListenerWithFixedPriority(_listener, -1);
        return true;
    }
    return false;
}

CommonTextField *CommonTextField::create() {
    CommonTextField *commonText = new (std::nothrow) CommonTextField();
    if(commonText && commonText->init()) {
        commonText->autorelease();
        return commonText;
    }
    CC_SAFE_DELETE(commonText);
    return nullptr;
}


CommonTextField::CommonTextField():_originalText("") {
    
}

CommonTextField::~CommonTextField() {
    
}

std::string CommonTextField::getOriginalText() {
    return _originalText;
}


void CommonTextField::setOriginalText(std::string text) {
    _originalText = text;
}


