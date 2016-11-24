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
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Table::gameName());
	scene->addChild(layer->menu);
	return scene;
}

void Table::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto bg = CSLoader::createNode("table/table.csb");
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

	return true;
}

void Table::helpLayer()
{
	
}

void Table::createGrid()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_grid = Node::create();
	_grid->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
	int endNumber = 4;
	this->addChild(_grid);
	float x = 0;
	float y = 0;
	for (int i = 0; i < 5; i++) {
		x = 0;
		y = i * 300;
		std::vector<cocos2d::Node*> fishVector;
		for (int j = 0; j < 5; j++) {
			int count = j;
			std::string animationName = "fish01";
			auto fish = CSLoader::createNode("table/fish01.csb");
			auto fishTimeLine = CSLoader::createTimeline("table/fish01.csb");
			if (j == 0 || (i == 4)) {
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
			if (j == 0 && i == 4) {
				str = "X";
				endNumber = 1;
			}
			auto number_label = Label::createWithSystemFont(str, "Arial", 90);
			number_label->setColor(ccc3(0, 0, 0));
			fish->addChild(number_label);
		}
		endNumber--;
		_fishMatrix.push_back(fishVector);
	}
	_grid->setContentSize(Size(1600, 1200));
	_grid->setAnchorPoint(Vec2(0.5, 0.5));
	this->scheduleOnce(schedule_selector(Table::randomFishPicking), 2);
}

void Table::randomFishPicking(float ft)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vector<FiniteTimeAction *> moveVector;
	for (int i = 0; i < 3; i++) {
		int random1 = RandomHelper::random_int(0, 3);
		int random2 = RandomHelper::random_int(1, 4);
		CCLOG("random1 = %d", random1);
		CCLOG("random2 = %d", random2);
		auto pos = _fishMatrix.at(random1).at(random2)->getPosition();
		pos.x = (visibleSize.width / 2) - (800 - pos.x);
		pos.y = (visibleSize.height / 2) - (600 - pos.y);
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
	for (int i = 0; i < _catchedFish.size(); i++) {
		auto stone = Sprite::createWithSpriteFrameName("table/stone.png");
		stone->setPosition(_catchedFish.at(i)->getPosition());
		_grid->addChild(stone);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Table::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, stone);
	}
}

bool Table::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {  // && _touched
		CCLOG("touched");
		auto calculator = new Calculator();
		calculator->createCalculator(Vec2(visibleSize.width / 2, visibleSize.height / 2), Vec2(0.5, 0.5), 1, 1);
		this->addChild(calculator);
	}
	return false;
}

