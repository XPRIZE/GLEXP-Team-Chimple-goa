//
//  Calculator.cpp
//  
//
//  Created by Jyoti Prakash on 17/11/16..
//
//

#include "Calculator.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"

USING_NS_CC;

Calculator::Calculator() :
	_answer(0),
	_done(0),
	_answerText("")
{

}

Calculator::~Calculator() {

}


Node*  Calculator::createCalculator(Vec2 position, Vec2 anchor, float scaleX, float scaleY) {
	
	_node = CSLoader::createNode("calculator/calculator.csb");
	_node->setPosition(position);
	_node->setScale(scaleX, scaleY);
	_node->setAnchorPoint(anchor);

	
	
	_answerText = "0";
	
	_label = ui::Text::create();
	_label->setFontName("fonts/Marker Felt.ttf");
	_label->setString(_answerText);
	_label->setFontSize(100);
	_label->setPosition(Vec2(100, 50));
	_label->setAnchorPoint(Vec2(0, 0));
	_label->setName("label");
	_label->setTextColor(Color4B::BLUE);
	_label->setColor(Color3B::RED);
	_label->setScaleX(scaleX);
	_label->setScaleY(scaleY);
	

	_node->getChildByName("screen")->addChild(_label);
	
	
	addChild(_node, 4);



	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Calculator::onTouchBegan, this);
	listener->setSwallowTouches(false);


	//Adding event handlers to all buttons of calculator
	for (int i = 0; i < 10; i++) {


		std::ostringstream sstreami;
		sstreami << i;
		std::string queryi = sstreami.str();

		auto number = _node->getChildByName(queryi);
		number->setTag(i);
		
		cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), number);

	}

	//Adding event handler to submbit button in calculator
	auto calculate = _node->getChildByName("enter");
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), calculate);
	

	auto reset = _node->getChildByName("reset");
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), reset);


	auto backspace = _node->getChildByName("backspace");
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), backspace);

	return _node;

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
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	
	if (target->getBoundingBox().containsPoint(locationInNode)) {
	

		if (target->getName() != "enter" && target->getName() != "backspace" && target->getName() != "reset") {
			_answer = 10 * _answer + target->getTag();
		}

		if(target->getName() == "enter")
		{
			_done = 1;
		}

		if (target->getName() == "backspace")
		{
			_answer = _answer / 10 ;
		}

		if (target->getName() == "reset")
		{
			_answer = 0;
		}

		std::ostringstream sstreamb;
		sstreamb.clear();
		sstreamb << _answer;
		std::string queryb = sstreamb.str();

		auto answerText = (cocos2d::ui::Text *)_node->getChildByName("screen")->getChildByName("label");
		answerText->setString(queryb);

		return true;
	}
	return false;
}