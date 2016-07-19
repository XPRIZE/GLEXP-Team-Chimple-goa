//
//  Alphamon.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 02/07/16.
//
//

#include "Alphamon.h"
#include "../effects/FShake.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

const int Alphamon::MAX_HP = 100;

Alphamon::Alphamon():
_monster(nullptr),
_hpMeter(nullptr),
_powerMeter(nullptr){
    _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(Alphamon::onTouchBegan, this);
    _listener->onTouchEnded = CC_CALLBACK_2(Alphamon::onTouchEnded, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
}

Alphamon::~Alphamon() {
    
}

Alphamon *Alphamon::createWithAlphabet(char alphabet) {
    Alphamon *alphamon = new (std::nothrow) Alphamon();
    if(alphamon && alphamon->initWithAlphabet(alphabet)) {
        alphamon->autorelease();
        return alphamon;
    }
    CC_SAFE_DELETE(alphamon);
    return nullptr;
    
}

bool Alphamon::initWithAlphabet(char alphabet) {
    _alphabet = alphabet;
    _monster = CSLoader::createNode(std::string("english/")+alphabet+".csb");
    addChild(_monster);
    _monster->setScale(0.6);
    
    _alphaNode = static_cast<Label*>(_monster->getChildByName("BitmapFontLabel_1"));
    if(!_alphaNode) {
        _alphaNode = static_cast<Label*>(_monster->getChildByName("BitmapFontLabel_2"));
    }
    
//    auto alphaPosition = alphaNode->getPosition();
//    alphaNode->setPosition(Vec2::ZERO);
//    _monster->removeChild(alphaNode, false);
//    
//    auto target = Sprite::create("star.png");
//    auto maskedFill = ClippingNode::create(alphaNode);
//    maskedFill->setPosition(alphaPosition);
//    maskedFill->setAlphaThreshold(0.9);
//    maskedFill->addChild(target);
//    Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
//    target->getTexture()->setTexParameters(tp);
//    target->setTextureRect(Rect(0, 0, 1400, 1400));
//    _monster->addChild(maskedFill, -1);
//    _monster->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
    auto timeline =  CSLoader::createTimeline(std::string("english/")+alphabet+".csb");
    _monster->runAction(timeline);
    timeline->gotoFrameAndPlay(0, true);
    setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
    breatheAction();
//    if(_alphabet == 'A') {
//        auto mouthTimeline = CSLoader::createTimeline("mouth_ani/mouth_e.csb");
//        _monster->getChildByName("FileNode_4")->runAction(mouthTimeline);
//        //    mouthTimeline->gotoFrameAndPlay(0, true);
//        mouthTimeline->play("eat", false);
//        mouthTimeline->setAnimationEndCallFunc("eat", CC_CALLBACK_0(Alphamon::setHealth, this, 100));
//    }
    
    
    return true;
}

void Alphamon::breatheAction() {
    auto scaleBy = ScaleBy::create(0.6, 1.07, 0.95);
    auto rev = scaleBy->reverse();
    auto seq = Sequence::create(scaleBy, rev, NULL);
    auto forever = RepeatForever::create(seq);
    _monster->runAction(forever);
}

ActionInterval *Alphamon::shakeAction() {
    FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
    return TargetedAction::create(_monster, shake);
}

void Alphamon::setHealth(int value) {
    _hp = value;
    if(!_hpMeter) {
        _hpMeter = HPMeter::createWithPercent(_hp); //currently points are percentage
        _hpMeter->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
        addChild(_hpMeter);
        _hpMeter->setPosition(Vec2(0, 425));
    } else {
        auto timer = ActionTween::create(1, "percent", _hpMeter->getPercent(), value);
        _hpMeter->runAction(timer);        
    }
}

int Alphamon::getHealth() {
    return _hp;
}

void Alphamon::changeHealth(int value) {
    setHealth(_hp + value);
}

void Alphamon::setPower(int value) {
//    auto timer = ActionTween::create(1, "percent", _powerMeter->getPercent(), value);
//    _powerMeter->runAction(timer);
    _powerMeter->setPercent(value);
}

int Alphamon::getPower() {
    return _powerMeter->getPercent();
}

void Alphamon::changePower(int value) {
    setPower(_powerMeter->getPercent() + value);
}

char Alphamon::getAlphabet() {
    return _alphabet;
}

void Alphamon::startMyTurn() {
    _powerMeter = HPMeter::createWithPercent(0);
    _powerMeter->setPosition(Vec2(0, -250));
    addChild(_powerMeter);
}

void Alphamon::endMyTurn() {
    if(_drawNode) {
        removeChild(_drawNode);
        _drawNode = nullptr;
    }
    if(_powerMeter) {
        removeChild(_powerMeter);
        _powerMeter = nullptr;
    }
}

void Alphamon::enableTouch(bool value) {
    _listener->setEnabled(value);
}

bool Alphamon::onTouchBegan(Touch* touch, Event* event){
    auto n = convertTouchToNodeSpace(touch);
    auto rect = getBoundingBox();
    //adjust for the font height since baloo bhai has extra space
    rect.setRect(rect.origin.x, rect.origin.y + rect.size.height / 3, rect.size.width, rect.size.height / 3);
    if(rect.containsPoint(n))
    {
//        CCLOG("onTouchBegan %c", _alphabet);
        return true; // to indicate that we have consumed it.
    }
    
    return false; // we did not consume this event, pass thru.
}

void Alphamon::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    auto n = convertTouchToNodeSpace(touch);
    auto rect = getBoundingBox();
    
    if(rect.containsPoint(n))
    {
//        CCLOG("onTouchEnded %c", _alphabet);
        EventCustom event("alphamon_pressed");
        char *data = new char[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);

    }
}

cocos2d::Rect Alphamon::getBoundingBox() const {
    return _alphaNode->getBoundingBox();
}