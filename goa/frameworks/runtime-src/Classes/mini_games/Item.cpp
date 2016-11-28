
#include "Item.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>
#include "../menu/HelpLayer.h"
#include "../effects/FShake.h"
USING_NS_CC;

Item::Item()
{
	
	
}

Item::~Item()
{

}

Item * Item::create()
{
	Item* ItemGame = new (std::nothrow) Item();
	if (ItemGame && ItemGame->init()) {
		ItemGame->autorelease();
		return ItemGame;
	}
	CC_SAFE_DELETE(ItemGame);
	return nullptr;
}

cocos2d::Scene * Item::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Item::create();
	layer->setName(Item::gameName());
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Item::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Item::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
		{
			{ "candy",  
			{
				{ "plist", "item/item.plist" },
				{ "bg","item/item.csb"},
				{ "bg1","item/item1.csb" },
				{ "fish1","item/fish1.csb"},
				{ "fish2","item/fish2.csb"},
				{ "ground1","item_ground1_3"},
				{ "ground2","item_ground1_3_0" },
				{ "frog1","item/item_frog1.png" },
				{ "frog2","item/item_frog2.png" },
				{ "box1","item_box_5" },
				{ "box2","item_box_5_1" },
				{ "box2","item_box_5_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "one" },

			} },
			{ "iceLand",  
			{
				{ "bg", "layerisland/layerisland.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerisland/cake1.png" },
				{ "character", "layerisland/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy"},
				{ "cry","cry" },
				{ "animation_select", "two" }

			} },
			{ "farm", 
			{
				{ "bg", "layerfarm/layerfarm.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerfarm/cake1.png" },
				{ "character", "layerfarm/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "three" }
			} },

		}
	};

	std::vector<std::string> theme = { "candy","iceLand","farm" };
	_scenePath = differntSceneMapping.at(theme.at(0));

	
	

	
}
void Item::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Node::onEnterTransitionDidFinish();
	this->scheduleUpdate();
	if (menu->getCurrentLevel() <= 5)
	{
		background = CSLoader::createNode(_scenePath.at("bg"));
	}
	else if (menu->getCurrentLevel() <= 10)
	{
		background = CSLoader::createNode(_scenePath.at("bg1"));
	}
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);

	

	if (menu->getCurrentLevel() <= 5)
	{
		auto bubble1 = background->getChildByName("item_bubble_3");
		auto bubble2 = background->getChildByName("item_bubble_3_2");

		auto fishTop1 = CSLoader::createNode(_scenePath.at("fish1"));
		fishTop1->setPositionX(bubble1->getPositionX());
		fishTop1->setPositionY(bubble1->getPositionY() + 60);
		this->addChild(fishTop1);
		//fishTop1->setScale(0.5);
		auto timeline1 = CSLoader::createTimeline(_scenePath.at("fish1"));
		fishTop1->runAction(timeline1);
		timeline1->gotoFrameAndPause(0);

		auto fishTop2 = CSLoader::createNode(_scenePath.at("fish2"));
		fishTop2->setPositionX(bubble2->getPositionX());
		fishTop2->setPositionY(bubble2->getPositionY() + 60);
		this->addChild(fishTop2);
		//fishTop2->setScale(0.5);
		auto timeline2 = CSLoader::createTimeline(_scenePath.at("fish2"));
		fishTop2->runAction(timeline2);
		timeline2->gotoFrameAndPause(0);
		fishCreate();
		numCreate();
		
		_done = background->getChildByName("item_done_4");
		_done->setName("done");
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _done);
		gameHelp();
	}
	else if (menu->getCurrentLevel() <= 10)
	{
		auto spritecache1 = SpriteFrameCache::getInstance();
		spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));
		frogCreate();
		check();
	}
}
void Item::gameHelp()
{
	auto bubble1 = background->getChildByName("item_bubble_3");
	auto bubble2 = background->getChildByName("item_bubble_3_2");
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto help = HelpLayer::create(Rect(bubble1->getPositionX() + extraX, bubble1->getPositionY(), bubble1->getContentSize().width+200, bubble1->getContentSize().height ), Rect(_box1->getPositionX() + extraX, _box1->getPositionY(), 250, 270));
	help->setName("help");
	help->clickAndDrag(bubble1->getPosition(),Vec2(visibleSize.width*0.1, visibleSize.height/2));
	this->addChild(help);
}


void Item::update(float dt)
{
	if (_flag == true)
	{
		_flag = false;
		if (_calculator->checkAnswer(_frog1Num))
		{
			CCLOG("true..........");
		}

	}
}

void Item::frogCreate()
{
	auto ground1 = background->getChildByName(_scenePath.at("ground1"));
	auto ground2 = background->getChildByName(_scenePath.at("ground2"));

	_frog1Num = RandomHelper::random_int(1, 5);
	for (int i = 0; i <_frog1Num; i++)
	{
		auto num1 = RandomHelper::random_int(0, 7);
		auto frog1 = Sprite::createWithSpriteFrameName(_scenePath.at("frog1"));
		frog1->setPosition(_frogX1.at(num1), _frogY1.at(num1));
		frog1->setScale(0.5);
		ground1->addChild(frog1);
	//	_frogX1.erase(_frogX1.begin() + num1);
	//	_frogY1.erase(_frogY1.begin() + num1);
	}
	_frog2Num = RandomHelper::random_int(1, 5);
	for (int i = 0; i < _frog2Num; i++)
	{
		auto frog2 = Sprite::createWithSpriteFrameName(_scenePath.at("frog2"));
		frog2->setPosition(_frogX2.at(i), _frogY2.at(i));
		frog2->setScale(0.5);
		ground2->addChild(frog2);
	}


}
void Item::check()
{
	auto box1 = background->getChildByName(_scenePath.at("box1"));
	box1->setName("box1");
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, box1);
	
}
void Item::numCreate()
{
	_box1 = background->getChildByName(_scenePath.at("box1"));
	_box2 = background->getChildByName(_scenePath.at("box2"));

	_num1 = cocos2d::RandomHelper::random_int(1, 5);
	std::stringstream ss1;
	ss1 << _num1;
	std::string str1 = ss1.str();
	auto number_label1 = Label::createWithSystemFont(str1, "Arial", 90);
	number_label1->setPositionX(_box1->getContentSize().width/2);
	number_label1->setPositionY(_box1->getContentSize().height/2);
	_box1->addChild(number_label1,2);

	_num2 = cocos2d::RandomHelper::random_int(1, 5);
	std::stringstream ss2;
	ss2 << _num2;
	std::string str2 = ss2.str();
	auto number_label2 = Label::createWithSystemFont(str2, "Arial", 90);
	number_label2->setPositionX(_box2->getContentSize().width / 2);
	number_label2->setPositionY(_box2->getContentSize().height / 2);
	_box2->addChild(number_label2,2);
}
void Item::fishCreate()
{
	auto bubble1 = background->getChildByName("item_bubble_3");
	auto bubble2 = background->getChildByName("item_bubble_3_2");

	_fish1 = CSLoader::createNode(_scenePath.at("fish1"));
	_fish1->setPositionX(bubble1->getPositionX());
	_fish1->setPositionY(bubble1->getPositionY() + 60);
	this->addChild(_fish1, 1);
	//_fish1->setScale(0.5);
	_fish1->setName("fish1");
	_timeline1 = CSLoader::createTimeline(_scenePath.at("fish1"));
	_fish1->runAction(_timeline1);
	_timeline1->gotoFrameAndPause(0);


	_fish1->setContentSize(Size(500, 100));
	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	listener1->onTouchMoved = CC_CALLBACK_2(Item::onTouchMoved, this);
	listener1->onTouchEnded = CC_CALLBACK_2(Item::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, _fish1);

	_fish2 = CSLoader::createNode(_scenePath.at("fish2"));
	_fish2->setPositionX(bubble2->getPositionX());
	_fish2->setPositionY(bubble2->getPositionY() + 60);
	this->addChild(_fish2, 1);
	_fish2->setName("fish2");
	//_fish2->setScale(0.5);
	_timeline2 = CSLoader::createTimeline(_scenePath.at("fish2"));
	_fish2->runAction(_timeline2);
	_timeline2->gotoFrameAndPause(0);

	_fish2->setContentSize(Size(500, 100));
	auto listener2 = EventListenerTouchOneByOne::create();
	listener2->setSwallowTouches(true);
	listener2->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	listener2->onTouchMoved = CC_CALLBACK_2(Item::onTouchMoved, this);
	listener2->onTouchEnded = CC_CALLBACK_2(Item::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener2, _fish2);
}
void Item::scoreBoard(float dt)
{
	menu->showScore();
}
void Item::result()
{
	
	if (_num1 == _count1 && _num2 == _count2)
	{
		CCLOG("Done.........");
		for (int i = 0; i < _fishMove.size(); i++)
		{
			auto action = MoveBy::create(4.0, Vec2(3000, 0));
			_fishMove.at(i)->runAction(action);
			this->scheduleOnce(schedule_selector(Item::scoreBoard), 2);
		}
	}
	else
	{
		CCLOG("None.........");
		FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
		_done->runAction(shake);
		for (int i = 0; i < _fishMove.size(); i++)
		{

			this->removeChild(_fishMove.at(i));
			_count1 = 0;
			_count2 = 0;
		}
		_fishMove.clear();
	}
}
bool Item::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	//auto  location = target->convertToNodeSpace(touch->getLocation());
	auto  location = touch->getLocation();
	Rect rect = CCRectMake(target->getPositionX()- target->getContentSize().width/2, target->getPositionY()- target->getContentSize().height/2, target->getContentSize().width, target->getContentSize().height);
	if (rect.containsPoint(location))
	{
		if (target->getName().compare("done") == 0)
		{

			result();
		}
		if (target->getName().compare("box1") == 0)
		{
			CCLOG("box1");
			_flag = true;
			addCalculator();
		}
		return true;
	}
	return false;
}

void Item::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	//target->setPosition(touch->getLocation());
	
	if (touch->getLocation().y > visibleSize.height * 0.25)
	{
		target->setPosition(touch->getLocation());
	}
}

void Item::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	bool flag = false;
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	
	

	if (target->getName().compare("fish1") == 0)
	{
		auto timeline = CSLoader::createTimeline(_scenePath.at("fish1"));
		_fish1->runAction(timeline);
		_fish1->runAction(Sequence::create(CallFunc::create([=]() {
			timeline->play("splash", false);
		}), DelayTime::create(1.0f), CallFunc::create([=]() {
			
		}), CallFunc::create([=]() {
			
			timeline->play("fish1", true);

		}),NULL));
		_eventDispatcher->removeEventListenersForTarget(target);
		fishCreate();
		_count1++;
		_fishMove.push_back(target);
	}
	else if (target->getName().compare("fish2") == 0)
	{
		auto timeline = CSLoader::createTimeline(_scenePath.at("fish2"));
		_fish2->runAction(timeline);
		_fish2->runAction(Sequence::create(CallFunc::create([=]() {
			timeline->play("splash", false);
		}), DelayTime::create(1.0f), CallFunc::create([=]() {

		}), CallFunc::create([=]() {

			timeline->play("fish2", true);

		}), NULL));
		_eventDispatcher->removeEventListenersForTarget(target);
		fishCreate();
		_count2++;
		_fishMove.push_back(target);
	}

	if (touch->getLocation().y > visibleSize.height * 0.75 || touch->getLocation().y < visibleSize.height * 0.25)
	{
		if (target->getName().compare("fish1") == 0)
		{
			_count1--;
		}
		else if (target->getName().compare("fish2") == 0)
		{
			_count2--;
		}
		this->removeChild(target);
		_fishMove.pop_back();
	}
	if (_num1 == _count1)
	{
		this->removeChildByName("help");
	}
	

}
	

void Item::addCalculator() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(800, 800), Vec2(0.5, 0.5), 0.5, 0.5);
	this->addChild(_calculator, 10);
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(true);

}
void Item::calculatedResult(std::string result)
{
	CCLOG("table calculator!!!!!!!!!!!  === %s", result.c_str());
  /*	if (_targetedFishName.compare(result) == 0) {
		for (int i = 0; i < _catchedFish.size(); i++) {
			if (_catchedFish.at(i)->getName().compare(result) == 0) {
				_catchedFish.at(i)->setOpacity(100);
				auto move = MoveTo::create(1, _targetPosition);
				_catchedFish.at(i)->runAction(move);
				_catchedFish.erase(_catchedFish.begin() + i);
				break;
			}
		}
	}*/


}