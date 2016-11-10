//
//  JumpingNumber.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/11/16
//
//

#include "JumpingNumbers.h"
#include "../menu/HelpLayer.h"


USING_NS_CC;

JumpingNumber::JumpingNumber()
{
}

JumpingNumber::~JumpingNumber()
{

}

JumpingNumber * JumpingNumber::create()
{
	JumpingNumber* JumpingNumberGame = new (std::nothrow) JumpingNumber();
	if (JumpingNumberGame && JumpingNumberGame->init()) {
		JumpingNumberGame->autorelease();
		return JumpingNumberGame;
	}
	CC_SAFE_DELETE(JumpingNumberGame);
	return nullptr;
}

cocos2d::Scene * JumpingNumber::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = JumpingNumber::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "jumpingNumbers");
	scene->addChild(layer->menu);
	return scene;
}



bool JumpingNumber::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
	auto bg = CSLoader::createNode("jumping_numbers/jumping_numbers.csb");
	this->addChild(bg);


	_levelMapping = {

		{ 1,  //level number
		{
			{ 1, 11 } //{starting number , ending number}
		} },
		{ 2,
		{
			{ 11, 21 }
		} },
		{ 3,
		{
			{ 21, 31 }
		} },
		{ 4,
		{
			{ 31, 41 }
		} },
		{ 5,
		{
			{ 41, 51 }
		} },
		{ 6,
		{
			{ 51, 61 }
		} },
		{ 7,
		{
			{ 61, 71 }
		} },
		{ 8,
		{
			{ 71, 81 }
		} },
		{ 9,
		{
			{ 81, 91 }
		} },
		{ 10,
		{
			{ 91, 101 }
		} },
		{ 11,
		{
			{ 2, 22 }
		} },
		{ 12,
		{
			{ 3, 33 }
		} },
		{ 13,
		{
			{ 4, 44 }
		} },
		{ 14,
		{
			{ 5, 55 }
		} },
		{ 15,
		{
			{ 6, 66 }
		} },
		{ 16,
		{
			{ 7, 77 }
		} },
		{ 17,
		{
			{ 8, 88 }
		} },
		{ 18,
		{
			{ 9, 99 }
		} },
		{ 19,
		{
			{ 10, 110 }
		} },
		{ 20,
		{
			{ 1, 21 }
		} },
		{ 21,
		{
			{ 21, 41 }
		} },
		{ 22,
		{
			{ 41, 61 }
		} },
		{ 23,
		{
			{ 61, 81 }
		} },
		{ 24,
		{
			{ 81, 101 }
		} },
		{ 25,
		{
			{ 2, 22 }
		} },
		{ 26,
		{
			{ 22, 42 }
		} },
		{ 27,
		{
			{ 42, 62 }
		} },
		{ 28,
		{
			{ 62, 82 }
		} },
		{ 29,
		{
			{ 82, 102 }
		} },
	};

	return true;
}

void JumpingNumber::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto character = CSLoader::createNode("jumping_numbers/rabbit.csb");
	character->setPositionX(250);
	character->setPositionY(visibleSize.height/2);
	character->setName("character");
	this->addChild(character,2);
	_stepPositionX = visibleSize.width * 0.25;
//	creatSteps(1);
	auto level = _levelMapping.at(menu->getCurrentLevel());
	auto firstNumber = level.begin()->first;
	_lastNumber = level.begin()->second;
	_passingNumber = firstNumber;
	_numberDifference = (_lastNumber - firstNumber) / 10;
	stepsCreate(_passingNumber);
}

void JumpingNumber::stepsCreate(int numberLabel)
{
	auto score = numberLabel;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 1; i < 4; i++) {
		auto step = Sprite::createWithSpriteFrameName("jumping_numbers/step.png");
		step->setPositionX(_stepPositionX);
		step->setPositionY(visibleSize.height/4 * i);
		this->addChild(step,1);

		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(JumpingNumber::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, step);

		std::stringstream ss;
		ss << score;
		std::string str = ss.str();
		step->setName(str);
		auto number_label = Label::createWithSystemFont(str, "Arial", 90);
		number_label->setPositionX(step->getContentSize().width / 2);
		number_label->setPositionY(step->getContentSize().height / 2);
		number_label->setColor(ccc3(0, 0, 0));
		step->addChild(number_label);

		auto scale1 = ScaleTo::create(1, 1.2);
		auto scale2 = ScaleTo::create(0.7, 0.5);
		auto scale3 = ScaleTo::create(0.8, 1);

		auto seq1 = Sequence::create(scale2, scale3, NULL);
		step->runAction(seq1);
		score++;
		_stepReff.push_back(step);
	}

	_stepPositionX += visibleSize.width * 0.18;

	if (_stepIndex == 7) {
		auto step = Sprite::createWithSpriteFrameName("jumping_numbers/base.png");
		step->setPositionX(_stepPositionX + (visibleSize.width* 0.18)*2);
		step->setPositionY(visibleSize.height / 2);
		step->setName("base");
		this->addChild(step,1);

		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(JumpingNumber::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, step);
	}
}

bool JumpingNumber::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {
		CCLOG("onTouchBegan");
		// converting int to string
		std::stringstream ss;
		ss << _passingNumber;
		std::string str = ss.str();

		if (target->getName().compare(str) == 0) {
			_passingNumber += _numberDifference;
			this->getChildByName("character")->stopAllActions();
			_floatingStepsReff.push_back((Sprite *)target);
			_eventDispatcher->removeEventListenersForTarget(target);
			jumpAnimation(target->getPosition());
			menu->addPoints(1);
			_maxScore++;
		} 
		else if (target->getName().compare("base") == 0 && _passingNumber == _lastNumber) {
			menu->setMaxPoints(_maxScore);
			jumpAnimation(target->getPosition(), true);
		} 
		else {
			
			menu->addPoints(-1);
			this->getChildByName("character")->stopAllActions();
			wrongAnimation(target, target->getPosition());
		}
		return false;
	}
	return false;
}

void JumpingNumber::jumpAnimation(cocos2d::Point pos, bool gameEnd)
{
	
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float difference = pos.y - visibleSize.height * 0.1;
	auto dis = ccpDistance(Vec2(0, 0), Vec2(0, -difference));
	auto character = this->getChildByName("character");

	auto jumpspeed = ccpDistance(character->getPosition(), pos);
	auto jump = JumpTo::create(jumpspeed/750, pos, 100,1);
	auto move = MoveBy::create(dis/500, Vec2(0, -difference));
	
	auto stepMove = MoveBy::create(dis/500, Vec2(0, -difference));
	characterAnimation("jumping");
	character->runAction(Sequence::create(jump,move, CallFunc::create([=]() {
		if (!gameEnd) {
			for (int i = 0; i < 3; i++) {
				if (_floatingStepsReff.at(_stepIndex) != _stepReff.at(i)) {
					this->removeChild(_stepReff.at(i));
				}
			}
			_stepReff.clear();
		}
		if (_passingNumber != _lastNumber) {
			floatingCharacter();
			stepsCreate(_passingNumber);
		}
		else if (gameEnd){
			menu->showScore();
		}
		else {
			floatingCharacter();
		}
		//stepsCreate(_passingNumber);
		layerMoving(pos);
	}

	), NULL));
	if (!gameEnd) {
		_floatingStepsReff.at(_stepIndex)->runAction(Sequence::create(DelayTime::create(jumpspeed / 750), stepMove, NULL));
	}
	
}

void JumpingNumber::floatingCharacter()
{
	auto dis = ccpDistance(Vec2(0, 0), Vec2(0, -1500));
	auto character = this->getChildByName("character");
	auto move = MoveBy::create(dis/500, Vec2(0,1500));
	auto moveBack = MoveBy::create(dis / 500, Vec2(0, -1500));
	auto moveStep = MoveBy::create(dis / 500, Vec2(0, 1500));
	auto moveStepBack = MoveBy::create(dis / 500, Vec2(0, -1500));
	character->runAction(RepeatForever::create(Sequence::create(move,moveBack, NULL)));
	_floatingStepsReff.at(_stepIndex)->runAction(RepeatForever::create(Sequence::create(moveStep, moveStepBack, NULL)));
	_stepIndex++;
}

void JumpingNumber::layerMoving(cocos2d::Point position)
{

	Size visibleSize = Director::getInstance()->getVisibleSize();
	if (position.x > visibleSize.width / 2  && _stepIndex <9) {
		auto move = MoveBy::create(1, Vec2(-visibleSize.width * 0.18, 0));
		this->runAction(move);
	}
	if (_stepIndex == 8) {
		auto move = MoveBy::create(1, Vec2(-visibleSize.width * 0.04, 0));
		this->runAction(move);
	}
}

void JumpingNumber::characterAnimation(std::string str, bool loop)
{
	auto character = this->getChildByName("character");
	auto timeLineAction = CSLoader::createTimeline("jumping_numbers/rabbit.csb");
	character->runAction(timeLineAction);
	timeLineAction->play(str, loop);
}

void JumpingNumber::wrongAnimation(cocos2d::Node * sprite, cocos2d::Point position)
{
	auto character = this->getChildByName("character");
	auto jumpspeed = ccpDistance(character->getPosition(), position);
	auto jump = JumpTo::create(jumpspeed / 750, position, 100, 1);
	auto scale = ScaleTo::create(2, 0.0f);
	character->runAction(Sequence::create(jump, CallFunc::create([=]() {
		this->removeChild(sprite);
	}
	),scale, CallFunc::create([=]() {
		//Director::getInstance()->replaceScene(JumpingNumber::createScene());
		for (int i = 0; i < _floatingStepsReff.size() ; i++) {
			this->removeChild(_floatingStepsReff.at(i));
		}
		for (int j = 0; j < _stepReff.size(); j++) {
			this->removeChild(_stepReff.at(j));
		}
		_floatingStepsReff.clear();
		_stepReff.clear();
		_stepIndex = 0;
		gameRestart();
	}
	), NULL));
}

void JumpingNumber::gameRestart()
{
	this->removeChildByName("character");
	auto move = MoveTo::create(2, Vec2(0, 0));
	this->runAction(Sequence::create(move, CallFunc::create([=]() {
		JumpingNumber::onEnterTransitionDidFinish();
	}), NULL));
}
