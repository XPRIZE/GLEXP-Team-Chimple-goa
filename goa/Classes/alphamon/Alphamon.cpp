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
#include "../lang/LangUtil.h"

USING_NS_CC;

const int Alphamon::MAX_HP = 100;

Alphamon::Alphamon():
_monster(nullptr),
_hpMeter(nullptr),
_powerMeter(nullptr),
_hp(0),
_power(0)
{
    _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(Alphamon::onTouchBegan, this);
    _listener->onTouchEnded = CC_CALLBACK_2(Alphamon::onTouchEnded, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
}

Alphamon::~Alphamon() {
    
}

Alphamon *Alphamon::createWithAlphabet(std::string alphabet) {
    Alphamon *alphamon = new (std::nothrow) Alphamon();
    if(alphamon && alphamon->initWithAlphabet(alphabet)) {
        alphamon->autorelease();
        return alphamon;
    }
    CC_SAFE_DELETE(alphamon);
    return nullptr;
    
}

bool Alphamon::initWithAlphabet(std::string alphabet) {
    _alphabet = alphabet;
    std::string animFile = LangUtil::getInstance()->getMonsterAnimationFileName(alphabet);
    _monster = CSLoader::createNode(animFile);
    setName(alphabet);
    addChild(_monster);
//    _monster->setScale(0.6);
    
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
    auto timeline =  CSLoader::createTimeline(animFile);
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

    auto blinkAction = CallFunc::create(CC_CALLBACK_0(Alphamon::alphamonEyeAnimation, this, "blink", false));
    _monster->runAction(RepeatForever::create(Sequence::create(DelayTime::create(5 + (rand() % 60) / 30.0 ), blinkAction, NULL)));
}

ActionInterval *Alphamon::shakeAction() {
    FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
    return TargetedAction::create(_monster, shake);
}

void Alphamon::setHealth(int value, std::string color) {
    _hp = value;
    if(!_hpMeter) {
        _hpMeter = HPMeter::createWithTextureAndPercent("battle_ground/white_bar.png", "battle_ground/" + color + "_bar.png", "", _hp); //currently points are percentage
        _hpMeter->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
        addChild(_hpMeter);
        _hpMeter->setPosition(Vec2(0, 600));
        _hpMeter->setScaleX(0.7);
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
    _power = value;
    if(_powerMeter) {
        auto timer = ActionTween::create(1, "percent", _powerMeter->getPercent(), value);
        _powerMeter->runAction(timer);
    }
}

int Alphamon::getPower() {
    return _powerMeter->getPercent();
}

void Alphamon::changePower(int value) {
    setPower(_power + value);
}

void Alphamon::showPower(bool left) {
    if(!_powerMeter) {
        _powerMeter = HPMeter::createWithTextureAndPercent("battle_ground/white_bar.png", "battle_ground/yellow_bar.png", "", 0);
        _powerMeter->setRotation(-90);
        _powerMeter->setAnchorPoint(Vec2::ANCHOR_BOTTOM_LEFT);
        if(left) {
            _powerMeter->setPosition(Vec2(-300, 0));
        } else {
            _powerMeter->setPosition(Vec2(300, 0));            
        }
        _powerMeter->setScaleX(0.7);
        addChild(_powerMeter);
        setPower(_power);
    }
}

void Alphamon::hidePower() {
    if(_powerMeter) {
        removeChild(_powerMeter);
        _powerMeter = nullptr;
    }
}

std::string Alphamon::getAlphabet() {
    return _alphabet;
}

void Alphamon::startMyTurn() {
    setPower(0);
}

void Alphamon::endMyTurn() {
    if(_drawNode) {
        removeChild(_drawNode);
        _drawNode = nullptr;
    }
    hidePower();
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
        std::string *data = new std::string[1];
        data[0] = _alphabet;
        event.setUserData(data);
        _eventDispatcher->dispatchEvent(&event);

    }
}

// eye animation parameter animation name = blink and loop 
void Alphamon::alphamonEyeAnimation(std::string animationName, bool loop) {
	Vector <Node*> children = _monster->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("eye") == 0) {
			auto eyeTimeline = CSLoader::createTimeline(CCString::createWithFormat("eye_ani/%s.csb", str.c_str())->getCString());
			monsterItem->runAction(eyeTimeline);
			//eyeTimeline->gotoFrameAndPlay(0, true);
			eyeTimeline->play(animationName, loop);
			eyeAnimation.pushBack(eyeTimeline);
			// add eye animation part
		}
	}
}
// leg animation parameter animation name = walk and loop 
void Alphamon::alphamonLegAnimation(std::string animationName, bool loop) {
	Vector <Node*> children = _monster->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("skate") == 0) {
			auto legTimeline = CSLoader::createTimeline(CCString::createWithFormat("leg_ani/%s.csb", str.c_str())->getCString());
			monsterItem->runAction(legTimeline);
			legTimeline->play(animationName, loop);
			legAnimation.pushBack(legTimeline);
		}
	}
}
// eye animation parameter animation name = eat  and spit
//loop 
void Alphamon::alphamonMouthAnimation(std::string animationName, bool loop) {
	Vector <Node*> children = _monster->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("mouth") == 0) {
			auto mouthTimeline = CSLoader::createTimeline(CCString::createWithFormat("mouth_ani/%s.csb", str.c_str())->getCString());
			monsterItem->runAction(mouthTimeline);
			mouthTimeline->play(animationName, loop);
			mouthAnimation.pushBack(mouthTimeline);
		}
	}
}

void Alphamon::blinkAction() {
	//continuous blinking action
	alphamonEyeAnimation("blink", true);
}

void Alphamon::eatAction() {
	//continuous eat action
	alphamonMouthAnimation("eat", true);
}

void Alphamon::walkAction() {
	//continuous walk action
	alphamonLegAnimation("walk", true);
}

void Alphamon::stopBlinkAction() {
	//stop blink action
	for (int i = 0; i < eyeAnimation.size(); i++) {
		eyeAnimation.at(i)->pause();
	}
}

void Alphamon::stopEatAction() {
	//stop eat action
	for (int i = 0; i < mouthAnimation.size(); i++) {
		mouthAnimation.at(i)->pause();
	}
}

void Alphamon::stopWalkAction() {
	//stop walk action
	for (int i = 0; i < legAnimation.size(); i++) {
		legAnimation.at(i)->pause();
	}
}

cocos2d::Vector<cocos2d::Node*> Alphamon::getAlphamonChildren()
{
	return _monster->getChildren();
}

cocos2d::Rect Alphamon::getBoundingBox() const {
    return _alphaNode->getBoundingBox();
}

cocos2d::Vec2 Alphamon::getCenterPosition() {
    return Vec2(getPositionX(), getPositionY() + _alphaNode->getContentSize().height / 2);
}
