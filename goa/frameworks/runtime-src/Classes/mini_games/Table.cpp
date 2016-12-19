//
//  Table.cpp 
//  goa
//
//  Created by Kirankumar CS on 24/11/16
//
//

#include "Table.h"
#include "../menu/HelpLayer.h"
#include "../effects/FShake.h"
#include "../Calculator.h"
#include "../util/CommonLabel.h"

USING_NS_CC;

Table::Table()
{
}

Table::~Table()
{

}

Table * Table::create()
{
	Table* TableGame = new (std::nothrow) Table();
	if (TableGame && TableGame->init()) {
		TableGame->autorelease();
		return TableGame;
	}
	CC_SAFE_DELETE(TableGame);
	return nullptr;
}

cocos2d::Scene * Table::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Table::create();
	layer->setName(Table::gameName());
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Table::gameName());
	scene->addChild(layer->menu);
	return scene;
}

void Table::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_score = 0;
	if (menu->getCurrentLevel() < 16) {
		_config = _levelMapping.at(menu->getCurrentLevel());
	} 
	else {
		_config = _levelMapping.at(15);
	}
	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("tablelevel/tablelevel.plist");

	auto bg = CSLoader::createNode("table/table.csb");
	if (visibleSize.width > 2560) {
	//	_extraX = (visibleSize.width - 2560) / 2;
		bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(bg);
	auto child = bg->getChildren();
	for (int i = 0; i < child.size(); i++) {
		if (child.at(i)->getName().find("bubble") == 0) {
			auto bubbleTimeLine = CSLoader::createTimeline("table/bubble.csb");
			child.at(i)->runAction(bubbleTimeLine);
			bubbleTimeLine->play("bubble", true);
			//bubble
		}
	}

	_jellyFish = CSLoader::createNode("table/jelly.csb");
	_jellyFish->setPosition(Vec2(200, visibleSize.height / 2));
	this->addChild(_jellyFish,1);
	_jellyFishAction = CSLoader::createTimeline("table/jelly.csb");
	_jellyFish->runAction(_jellyFishAction);
	//jellyAction->play("jelly", true);
	createGrid();
}

bool Table::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	_levelMapping = {
		{
			1, {
				{"row",3},
				{"column",3},
				{"maxNumber",2},
				{"disableFish",1 }
			},
		},
		{
			2,{
				{ "row",3 },
				{ "column",3 },
				{ "maxNumber",2 },
				{ "disableFish",2 }
			},
		},
		{
			3,{
				{ "row",3 },
				{ "column",3 },
				{ "maxNumber",2 },
				{ "disableFish",3 }
			},
		},
		{
			4,{
				{ "row",3 },
				{ "column",3 },
				{ "maxNumber",2 },
				{ "disableFish",4 }
			},
		},
		{
			5,{
				{ "row",4 },
				{ "column",4 },
				{ "maxNumber",3 },
				{ "disableFish",1 }
			},
		},
		{
			6,{
				{ "row",4 },
				{ "column",4 },
				{ "maxNumber",3 },
				{ "disableFish",2 }
			},
		},
		{
			7,{
				{ "row",4 },
				{ "column",4 },
				{ "maxNumber",3 },
				{ "disableFish",3}
			},
		},
		{
			8,{
				{ "row",4 },
				{ "column",4 },
				{ "maxNumber",3 },
				{ "disableFish",4 }
			},
		},
		{
			9,{
				{ "row",4 },
				{ "column",4 },
				{ "maxNumber",3 },
				{ "disableFish",5 }
			},
		},
		{
			10,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",2 }
			},
		},
		{
			11,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",3 }
			},
		},
		{
			12,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",5 }
			}
		},
		{
			13,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",6 }
			},
		},
		{
			14,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",8 }
			},
		},
		{
			15,{
				{ "row",5 },
				{ "column",5 },
				{ "maxNumber",4 },
				{ "disableFish",10 }
			},
		}
};

	return true;
}

void Table::helpLayer(cocos2d::Node * node)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto pos = node->getPosition();
	pos.x = (visibleSize.width / 2) - (200 * (_config.at("row") - 1) - pos.x);
	pos.y = (visibleSize.height / 2) - (150 * (_config.at("row") - 1) - pos.y);
	auto helpLayer = HelpLayer::create(Rect(pos.x, pos.y,node->getContentSize().width,node->getContentSize().height), Rect(0,0,0,0));
	helpLayer->click(pos);
	helpLayer->setName("helpLayer");
	this->addChild(helpLayer);
	
}

void Table::createGrid()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_grid = Node::create();
	_grid->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
	int endNumber = _config.at("maxNumber");
	this->addChild(_grid);
	float x = 0;
	float y = 0;
	for (int i = 0; i < _config.at("column"); i++) {
		x = 0;
		y = i * 300;
		std::vector<cocos2d::Node*> fishVector;
		for (int j = 0; j < _config.at("row"); j++) {
			int count = j;
			std::string animationName = "fish01";
			auto fish = CSLoader::createNode("table/fish01.csb");
			auto fishTimeLine = CSLoader::createTimeline("table/fish01.csb");
			if (j == 0 || (i == _config.at("row")-1)) {
				fish = CSLoader::createNode("table/fish02.csb");
				fishTimeLine = CSLoader::createTimeline("table/fish02.csb");
				animationName = "fish02";
				if (j==0)
					count = 1;
			}
			fish->setPosition(Vec2(x, y));
			_grid->addChild(fish);
			x += 400;
			fish->runAction(fishTimeLine);
			fishTimeLine->play(animationName,true);
			fishVector.push_back(fish);

			std::stringstream ss;
			ss << (endNumber * count);
			std::string str = ss.str();
			if (j == 0 && i == _config.at("row")-1) {
				str = "X";
				endNumber = 1;
			}
			fish->setName(str);
			auto number_label = CommonLabel::createWithSystemFont(str, "Arial", 90);
			number_label->setColor(Color3B(0, 0, 0));
			fish->addChild(number_label);
		}
		endNumber--;
		_fishMatrix.push_back(fishVector);
	}
	_grid->setContentSize(Size(400 * (_config.at("row")-1), 300* (_config.at("row")-1)));
	_grid->setAnchorPoint(Vec2(0.5, 0.5));
	this->scheduleOnce(schedule_selector(Table::randomFishPicking), 2);
}

void Table::randomFishPicking(float ft)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vector<FiniteTimeAction *> moveVector;
	for (int i = 0; i < _config.at("disableFish"); i++) {
		int random1 = RandomHelper::random_int(0, _config.at("row")-2);
		int random2 = RandomHelper::random_int(1, _config.at("row")-1);
		CCLOG("random1 = %d", random1);
		CCLOG("random2 = %d", random2);
		auto it = std::find(_catchedFish.begin(), _catchedFish.end(), _fishMatrix.at(random1).at(random2));
		while (it != _catchedFish.end()) {
			random1 = RandomHelper::random_int(0, _config.at("row")-2);
			random2 = RandomHelper::random_int(1, _config.at("row")-1);
			it = std::find(_catchedFish.begin(), _catchedFish.end(), _fishMatrix.at(random1).at(random2));
		}
		auto pos = _fishMatrix.at(random1).at(random2)->getPosition();
		pos.x = (visibleSize.width / 2) - (200 * (_config.at("row") - 1) - pos.x);
		pos.y = (visibleSize.height / 2) - (150 * (_config.at("row") - 1) - pos.y);
		_catchedFish.pushBack(_fishMatrix.at(random1).at(random2));
		auto move = MoveTo::create(1, pos);
		moveVector.pushBack(move);
		auto showScore = CallFunc::create([=]() {
			_jellyFishAction->play("jelly", false);
			auto scale = FadeOut::create(1.0f);
			_fishMatrix.at(random1).at(random2)->runAction(scale);
		});
		moveVector.pushBack(showScore);
		moveVector.pushBack(DelayTime::create(1.2));
	}
	auto move = MoveTo::create(1, Vec2(200, visibleSize.height / 2));
	moveVector.pushBack(move);
	auto callFunction = CallFunc::create([=]() {
		askMissingNumber();
	});
	moveVector.pushBack(callFunction);
	_jellyFish->runAction(Sequence::create(moveVector));

}

void Table::askMissingNumber()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i < _catchedFish.size(); i++) {
		auto stone = Sprite::createWithSpriteFrameName("tablelevel/fish0.png");
		stone->setPosition(_catchedFish.at(i)->getPosition());
		stone->setName(_catchedFish.at(i)->getName());
		_grid->addChild(stone);
	//	auto scale = ScaleBy::create(0.05, 2);
	//	stone->runAction(RepeatForever::create(Sequence::create(scale, scale->reverse(), NULL)));
		_catchedFish.at(i)->setPosition(Vec2(visibleSize.width,visibleSize.height/2));
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(false);
		listener->onTouchBegan = CC_CALLBACK_2(Table::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, stone);

		if (menu->getCurrentLevel() == 1) {
			helpLayer(stone);
		}
	}
}

void Table::gameEnd(float ft)
{
	menu->showScore();
}

void Table::calculatedResult(std::string result)
{
	CCLOG("table calculator!!!!!!!!!!!  === %s",result.c_str());
	
	_numberOfAttempt++;
	if (_targetedFishName.compare(result) == 0) {
		for (int i = 0; i < _catchedFish.size(); i++) {
			if (_catchedFish.at(i)->getName().compare(result) == 0) {
				menu->addPoints(1);
				this->removeChildByName("calculator");
				this->removeChildByName("hintLabel");
				_score++;
				
				_catchedFish.at(i)->setOpacity(255);
				
				auto fadeOut = FadeOut::create(2);
				_target->runAction(fadeOut);
				auto move = MoveTo::create(2, _targetPosition);
				_catchedFish.at(i)->runAction(Sequence::create(move, CallFunc::create([=]() {
					_grid->removeChild(_target);
					_touched = true;
				}), NULL));
				_catchedFish.erase(_catchedFish.begin() + i);
				break;
			}
		}
	} 
	else {
		this->removeChildByName("calculator");
		this->removeChildByName("hintLabel");
		menu->addPoints(-1);
		FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
		_target->runAction(Sequence::create(shake, CallFunc::create([=](){
			_touched = true;
		}),NULL));
	}
	if (_score == _config.at("disableFish")) {
		menu->setMaxPoints(_config.at("disableFish"));
		this->scheduleOnce(schedule_selector(Table::gameEnd), 2);
	}
}

bool Table::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location) && _touched) {  // 
		CCLOG("touched");
		this->removeChildByName("helpLayer");
		_touched = false;
		_targetedFishName = target->getName().c_str();
		_fishNumber = atoi(target->getName().c_str());
		auto testX = target->getPositionY() / 300;
		auto testY = target->getPositionX() / 400;
		CCLOG("X = %f", testX);
		CCLOG("Y = %f", testY);
		int indexY = target->getPositionY() / 300;
		int indexX = target->getPositionX() / 400;
		CCLOG("X = %d", indexX);
		CCLOG("Y = %d", indexY);
		std::string option1 = _fishMatrix.at(indexY).at(0)->getName();
		std::string option2 = _fishMatrix.at(_config.at("column")-1).at(indexX)->getName();
		auto hintLabel = Label::createWithTTF(option1+" X "+option2+" = ?", "fonts/digital.ttf", 200);
		hintLabel->setColor(Color3B(255, 255, 255));
		
		hintLabel->setName("hintLabel");
		this->addChild(hintLabel);

		_calculator = new Calculator();
		_calculator->createCalculator(Vec2(0,0), Vec2(0.5, 0.5), 1, 1);
		auto calculatorBack = _calculator->getChildren().at(0)->getChildByName("back");
		_calculator->setName("calculator");
		_calculator->setContentSize(calculatorBack->getContentSize());
		if (touch->getLocation().x > visibleSize.width / 2) {
			hintLabel->setPositionX(calculatorBack->getContentSize().width / 2);
			hintLabel->setPositionY(calculatorBack->getContentSize().height * 1.2);
			_calculator->setPosition(Vec2(calculatorBack->getContentSize().width / 2, calculatorBack->getContentSize().height / 2));
		}
		else {
			hintLabel->setPositionX(visibleSize.width - calculatorBack->getContentSize().width / 2);
			hintLabel->setPositionY(calculatorBack->getContentSize().height * 1.2);
			_calculator->setPosition(Vec2(visibleSize.width - calculatorBack->getContentSize().width / 2, calculatorBack->getContentSize().height / 2));
		}
		_target = target;
		_targetPosition = target->getPosition();
		this->addChild(_calculator,1);
		_checkResult = true;
	}
	return false;
}

