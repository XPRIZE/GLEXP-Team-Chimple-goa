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
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    //adjust for the font height since baloo bhai has extra space
    if(rect.size.height > _fontSize) {
        rect.setRect(rect.origin.x, rect.origin.y + (rect.size.height - _fontSize) / 2, rect.size.width, _fontSize);
    }
    if(rect.containsPoint(n))
    {
        CCLOG("onTouchBegan %c", _alphabet);
        auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
        audio->playEffect(LangUtil::getInstance()->getAlphabetSoundFileName(_alphabet).c_str());
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
        selected(!isSelected());
    }
    return true;
}

bool Alphabet::isSelected() {
    return _selected;
}

void Alphabet::selected(bool value) {
    _selected = value;
    if(value) {
//        setTextColor(Color4B::BLUE);
        setColor(Color3B::BLUE);
        EventCustom event("alphabet_selected");
        wchar_t *data = new wchar_t[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);
    } else {
//        setTextColor(Color4B::WHITE);
        setColor(Color3B::WHITE);
        EventCustom event("alphabet_unselected");
        wchar_t *data = new wchar_t[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);
    }
}

void Alphabet::enableTouch(bool value) {
    _listener->setEnabled(value);
}

wchar_t Alphabet::getChar() {
    return _alphabet;
}

Alphabet::Alphabet():
_fontSize(0.0),
_selected(false)
{
    _listener = EventListenerTouchOneByOne::create();
    _listener->onTouchBegan = CC_CALLBACK_2(Alphabet::onTouchBegan, this);
    _listener->onTouchEnded = CC_CALLBACK_2(Alphabet::onTouchEnded, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
    _selected = false;
}

Alphabet::~Alphabet() {}

Alphabet *Alphabet::createWithSize(wchar_t a, float fontSize) {
    Alphabet *alphabet = new (std::nothrow) Alphabet();
    if(alphabet && alphabet->initWithSize(a, fontSize)) {
        alphabet->autorelease();
        return alphabet;
    }
    CC_SAFE_DELETE(alphabet);
    return nullptr;
}

bool Alphabet::initWithSize(wchar_t alphabet, float fontSize) {
    _alphabet = alphabet;
    _fontSize = fontSize;
//    if (!Label::initWithTTF(std::string(1, _alphabet), "fonts/BalooBhai-Regular.ttf", fontSize)) {
//    if(MenuContext::LANG == "eng") {
//        Label::setBMFontFilePath("english/baloo_bhai_hdr.fnt");
//    } else if(MenuContext::LANG == "kan") {
//        Label::setBMFontFilePath("kannada/kar shivarama.fnt");
//    }
    Label::setBMFontFilePath(LangUtil::getInstance()->getBMFontFileName());
    Label::setString(LangUtil::convertUTF16CharToString(alphabet));
    setScale(fontSize / MAX_FONT_SIZE);
//        return false;
//    }
    return true;
}