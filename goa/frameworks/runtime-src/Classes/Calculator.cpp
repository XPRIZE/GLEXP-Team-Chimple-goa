//
//  Calculator.cpp
//  
//
//  Created by Jyoti Prakash on 17/11/16..
//
//

#include "Calculator.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Calculator::Calculator() :
	_answer(0),
	_done(0)
{

}

Calculator::~Calculator() {

}




void  Calculator::createCalculator(Vec2 position, Vec2 anchor, float scaleX, float scaleY) {
	/*
	_node = CSLoader::createNode("filename");
	_node->setPosition(position);
	_node->setScale(scaleX, scaleY);
	_node->setAnchorPoint(anchor);

	addChild(_node);
	
	//Adding event handlers to all buttons of calculator
	for (int i = 0; i < 10; i++) {


		std::ostringstream sstreami;
		sstreami << i;
		std::string queryi = sstreami.str();

		auto number = _node->getChildByName(queryi);
		number->setTag(i);
		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(Calculator::onTouchBegan, this);

		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, number);

	}

	//Adding event handler to submbit button in calculator
	auto calculate = _node->getChildByName("calculate");
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Calculator::onTouchBegan, this);

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, calculate);
	*/

}

//Call checkAnswer in update to check answer
bool Calculator::checkAnswer(int value) {
	if (_done == 1) {
		if (_answer == value)
			return true;
		else
			return false;
	}
	return false;

}


bool Calculator::onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event)
{
	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	
	if (target->getBoundingBox().containsPoint(locationInNode)) {
		
		if (target->getName() != "calculate") {
			_answer = 10 * _answer + target->getTag();
		}
		else {
			_done = 1;
		}

		return true;
	}
	return false;
}