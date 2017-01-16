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
#include "lang/LangUtil.h"
#include "StartMenuScene.h"
#include "lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "mini_games/Table.h"
#include "mini_games/Item.h"
USING_NS_CC;

Calculator::Calculator() :
	_answer(0),
	_answerText(""),
	_done(0),
	_enterPressed(0),
	_activeSoundFlag(0)
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
	_label->setFontName("fonts/digital.ttf");
	_label->setString(_answerText);
	_label->setFontSize(180);
	_label->setPosition(Vec2(_node->getChildByName("screen")->getContentSize().width* 0.05, _node->getChildByName("screen")->getContentSize().height/1.75));
	_label->setAnchorPoint(Vec2(0, 0.5));
	_label->setName("label");
	_label->setTextColor(Color4B::BLUE);
	_label->setColor(Color3B::RED);
	//_label->setScaleX(scaleX);
	//_label->setScaleY(scaleY);
	
		
	_node->getChildByName("screen")->addChild(_label);
	
		
	addChild(_node, 4);
	
		
	
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Calculator::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(Calculator::onTouchEnded, this);
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
	Point locationInNode = target->getParent()-> convertToNodeSpace(touch->getLocation());
	
	if (target->getBoundingBox().containsPoint(locationInNode) && _isTouchedFinished) {

		if (_activeSoundFlag == 1) {
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/calculator/calculator_button_click.ogg", false);
		}
		_isTouchedFinished = false;
		auto scale = ScaleBy::create(0.1, 0.75);
		target->runAction(Sequence::create(scale, scale->reverse(), CallFunc::create([=]() {
			_isTouchedFinished = true;
		}),NULL));
		if (target->getName() != "enter" && target->getName() != "backspace" && target->getName() != "reset" && _answerText.length()<7) {
			
				_answer = 10 * _answer + target->getTag();
			}
			
		if (target->getName() == "enter"){
			_enterPressed = 1;
			//_maxPoints--;
			if (this->getParent()->getName().compare(TABLE) == 0) {
				CCLOG("in Tabel");
				std::ostringstream sstreamb;
				sstreamb.clear();
				sstreamb << _answer;
				std::string queryb = sstreamb.str();
				Table * table = (Table *)this->getParent();
				table->calculatedResult(queryb);

			}
			else if (this->getParent()->getName().compare(ITEM) == 0) {
				CCLOG("in ITEM");
				std::ostringstream sstreamb;
				sstreamb.clear();
				sstreamb << _answer;
				std::string queryb = sstreamb.str();
				Item * item = (Item *)this->getParent();
				item->calculatedResult(queryb);

			}
				_done = 1;
		}

		if (target->getName() == "backspace") {

				_answer = _answer / 10;

		}
				
		if (target->getName() == "reset") {
					
				_answer = 0;
		}
				
		std::ostringstream sstreamb;
		sstreamb.clear();
		sstreamb << _answer;
		std::string queryb = sstreamb.str();
		_answerText = queryb;
		auto answerText = (cocos2d::ui::Text *)_node->getChildByName("screen")->getChildByName("label");
		answerText->setString(queryb);
				
					return true;
			}
		return false;
}


void Calculator::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	
	auto target = event->getCurrentTarget();

	if (target->getName() == "enter") {
		_enterPressed = 0;
	}
}



void Calculator::resetCalculator() {

	auto answerText = (cocos2d::ui::Text *)_node->getChildByName("screen")->getChildByName("label");
	answerText->setString("0");
	_answer = 0;
}

bool Calculator::isEnterPressed() {

	if (_enterPressed == 0)
		return false;
	else
		return true;
}

void Calculator::activeSound() {

	_activeSoundFlag = 1;
}

void Calculator::deactivateSound() {

	_activeSoundFlag = 0;

}


int Calculator::getFinalPoints() {
	return _maxPoints;
}

void Calculator::setMaxPoints(int points) {

	_maxPoints = points;
}

void Calculator::deductPoint() {

	_maxPoints--;
}
