//
//  Alphabet.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 25/06/16.
//
//

#include "Alphabet.h"
#include "../menu/MenuContext.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"

USING_NS_CC;

bool Alphabet::onTouchBegan(Touch* touch, Event* event){
    if(getParent()) {
        auto n = getParent()->convertTouchToNodeSpace(touch);
        auto rect = this->getBoundingBox();
        
        //adjust for the font height since baloo bhai has extra space
        if(rect.size.height > _fontSize) {
            rect.setRect(rect.origin.x, rect.origin.y + (rect.size.height - _fontSize) / 2, rect.size.width, _fontSize);
        }
        if(rect.containsPoint(n))
        {
            //        auto overlay = DrawNode::create();
            //        overlay->drawSolidRect(rect.origin, rect.size, Color4F(128.0, 128.0, 128.0, 128.0));
            //        getParent()->addChild(overlay);
            selected(!isSelected());
            auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
            audio->playEffect(LangUtil::getInstance()->getAlphabetSoundFileNameForString(_alphabet).c_str());
            if(touchBeganCallback) {
                return touchBeganCallback(touch, event);
            }
        }
    }
    
    return false; // we did not consume this event, pass thru.
}

void Alphabet::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    
    if(rect.containsPoint(n))
    {
        if(touchEndedCallback) {
            touchEndedCallback(touch, event);
        }
    }
}

void Alphabet::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(touchMovedCallback) {
        touchMovedCallback(touch, event);
    }
}

bool Alphabet::isSelected() {
    return _selected;
}

void Alphabet::selected(bool value) {
    _selected = value;
    if(value) {
        EventCustom event("alphabet_selected");
        std::string *data = new std::string[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);
    } else {
        EventCustom event("alphabet_unselected");
        std::string *data = new std::string[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);
    }
}

void Alphabet::enableTouch(bool value) {
    _listener->setEnabled(value);
}

std::string Alphabet::getChar() {
    return _alphabet;
}

Alphabet::Alphabet():
_fontSize(0.0),
_selected(false),
touchBeganCallback(NULL),
touchMovedCallback(NULL),
touchEndedCallback(NULL)
{
    _listener = EventListenerTouchOneByOne::create();
    _listener->onTouchBegan = CC_CALLBACK_2(Alphabet::onTouchBegan, this);
    _listener->onTouchEnded = CC_CALLBACK_2(Alphabet::onTouchEnded, this);
    _listener->onTouchMoved = CC_CALLBACK_2(Alphabet::onTouchMoved, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
    _selected = false;
}

Alphabet::~Alphabet() {}

Alphabet *Alphabet::createWithSize(std::string a, float fontSize) {
    Alphabet *alphabet = new (std::nothrow) Alphabet();
    if(alphabet && alphabet->initWithSize(a, fontSize)) {
        alphabet->autorelease();
        return alphabet;
    }
    CC_SAFE_DELETE(alphabet);
    return nullptr;
}

bool Alphabet::initWithSize(std::string alphabet, float fontSize) {
    _alphabet = alphabet;
    _fontSize = fontSize;
    Label::setBMFontFilePath(LangUtil::getInstance()->getBMFontFileName());
    Label::setString(alphabet);
    setScale(fontSize / MAX_FONT_SIZE);
    if(LangUtil::getInstance()->getLang() == "kan") {
        setAnchorPoint(Vec2(0.5, 0.65));
    }
    return true;
}


void Alphabet::updateChar(std::string alphabet) {
    _alphabet = alphabet;
}
