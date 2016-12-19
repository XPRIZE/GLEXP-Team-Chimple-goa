//
//  CommonLabel.cpp
//  goa
//
//  Created by Srikanth Talapadi on 18/12/2016.
//
//

#include "CommonLabel.h"
#include "../menu/MenuContext.h"

USING_NS_CC;

bool CommonLabel::touchSpeak(Touch* touch, Event* event) {
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    if(rect.containsPoint(n))
    {
        MenuContext::pronounceWord(this->getString());
    }
    return false;
}

void CommonLabel::onEnterTransitionDidFinish() {
    Label::onEnterTransitionDidFinish();
    auto scaleUp = ScaleTo::create(0.5, 1.1);
    auto elasticUp = EaseOut::create(scaleUp, 2.0);
    auto scaleDown = ScaleTo::create(0.5, 1.0);
    auto elasticDown = EaseIn::create(scaleDown, 2.0);
    runAction(Sequence::create(elasticUp, elasticDown, NULL));
    
    MenuContext::pronounceWord(this->getString());
}

void CommonLabel::onExitTransitionDidStart() {
    Label::onExitTransitionDidStart();
    _eventDispatcher->removeEventListener(_listener);
    _listener = nullptr;
}

CommonLabel* CommonLabel::createWithSystemFont(const std::string& text, const std::string& font, float fontSize, const Size& dimensions, TextHAlignment hAlignment, TextVAlignment vAlignment) {
    auto ret = new (std::nothrow) CommonLabel(hAlignment,vAlignment);
    
    if (ret && ret->init())
    {
        ret->setSystemFontName(font);
        ret->setSystemFontSize(fontSize);
        ret->setDimensions(dimensions.width, dimensions.height);
        ret->setString(text);
        
        ret->autorelease();
        
        return ret;
    }
    
    return nullptr;
    
}

CommonLabel * CommonLabel::createWithTTF(const std::string& text, const std::string& fontFilePath, float fontSize, const Size& dimensions, TextHAlignment hAlignment, TextVAlignment vAlignment) {
    auto ret = new (std::nothrow) CommonLabel(hAlignment,vAlignment);
    
    if (ret && ret->initWithTTF(text, fontFilePath, fontSize, dimensions, hAlignment, vAlignment))
    {
        ret->autorelease();
        return ret;
    }
    
    CC_SAFE_DELETE(ret);
    return nullptr;
}

CommonLabel* CommonLabel::createWithTTF(const TTFConfig& ttfConfig, const std::string& text, TextHAlignment hAlignment, int maxLineWidth) {
    auto ret = new (std::nothrow) CommonLabel(hAlignment);
    
    if (ret && ret->initWithTTF(ttfConfig, text, hAlignment, maxLineWidth))
    {
        ret->autorelease();
        return ret;
    }
    
    CC_SAFE_DELETE(ret);
    return nullptr;
}

CommonLabel* CommonLabel::createWithBMFont(const std::string& bmfontPath, const std::string& text, const TextHAlignment& hAlignment, int maxLineWidth, const Vec2& imageOffset) {
    auto ret = new (std::nothrow) CommonLabel(hAlignment);
    
    if (ret && ret->setBMFontFilePath(bmfontPath, imageOffset) && ret->init())
    {
        ret->setMaxLineWidth(maxLineWidth);
        ret->setString(text);
        ret->autorelease();
        
        return ret;
    }
    
    delete ret;
    return nullptr;
}


bool CommonLabel::init() {
    if(Label::init()) {
        _listener = EventListenerTouchOneByOne::create();
        _listener->onTouchBegan = CC_CALLBACK_2(CommonLabel::touchSpeak, this);
        _eventDispatcher->addEventListenerWithFixedPriority(_listener, -1);
        return true;
    }
    return false;
}

bool CommonLabel::initWithTTF(const std::string& text, const std::string& fontFilePath, float fontSize, const Size& dimensions, TextHAlignment hAlignment, TextVAlignment vAlignment) {
    if(Label::initWithTTF(text, fontFilePath, fontSize, dimensions, hAlignment, vAlignment)) {
        if(init()) {
            return true;
        }
    }
    return false;
}

bool CommonLabel::initWithTTF(const TTFConfig& ttfConfig, const std::string& text, TextHAlignment hAlignment, int maxLineWidth) {
    if(Label::initWithTTF(ttfConfig, text, hAlignment, maxLineWidth)) {
        if(init()) {
            return true;
        }
    }
    return false;
}

CommonLabel::CommonLabel(TextHAlignment hAlignment/* = TextHAlignment::LEFT*/,
                         TextVAlignment vAlignment/* = TextVAlignment::TOP*/)
: Label::Label(hAlignment, vAlignment)
{
    
}

CommonLabel::~CommonLabel() {
    
}
