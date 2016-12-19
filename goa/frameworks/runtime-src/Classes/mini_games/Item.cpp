
#include "Item.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>
#include "../menu/HelpLayer.h"
#include "../util/CommonLabel.h"

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
				{ "box1Fish","item_box_5" },
				{ "box2Fish","item_box_5_1" },
				{ "box1","item_box_5" },
				{ "box2","item_box_5_1" },
				{ "box3","item_box_5_0" },
				{ "done","item_done_4" },
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

	
	
	return true;
	
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
	else if (menu->getCurrentLevel() <= 25)
	{
		background = CSLoader::createNode(_scenePath.at("bg1"));
	}
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);
	_done = background->getChildByName(_scenePath.at("done"));
	_done->setName("done");
	//_done->setPositionX(_done->getPositionX() - extraX);
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _done);
	

	

	if (menu->getCurrentLevel() <= 5)
	{
		auto bubble1 = background->getChildByName("item_bubble_3");
		auto bubble2 = background->getChildByName("item_bubble_3_2");

		auto fishTop1 = CSLoader::createNode(_scenePath.at("fish1"));
		fishTop1->setPositionX(bubble1->getPositionX()+ extraX);
		fishTop1->setPositionY(bubble1->getPositionY() + 60);
		fishTop1->setAnchorPoint(Vec2(0.5, 0.5));
		this->addChild(fishTop1);
		fishTop1->setContentSize(Size(600, 200));
		//fishTop1->setScale(0.5);
		auto timeline1 = CSLoader::createTimeline(_scenePath.at("fish1"));
		fishTop1->runAction(timeline1);
		timeline1->gotoFrameAndPause(0);

		auto fishTop2 = CSLoader::createNode(_scenePath.at("fish2"));
		fishTop2->setPositionX(bubble2->getPositionX() + extraX);
		fishTop2->setPositionY(bubble2->getPositionY() + 60);
		fishTop2->setAnchorPoint(Vec2(0.5, 0.5));
		this->addChild(fishTop2);
		fishTop2->setContentSize(Size(600, 200));
		//fishTop2->setScale(0.5);
		auto timeline2 = CSLoader::createTimeline(_scenePath.at("fish2"));
		fishTop2->runAction(timeline2);
		timeline2->gotoFrameAndPause(0);
		fish1Create();
		fish2Create();
		numCreate();
		if (menu->getCurrentLevel() == 1 )
		{
			gameHelp();
		}
		
	}
	else if (menu->getCurrentLevel() <= 25)
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

	auto help = HelpLayer::create(Rect(bubble1->getPositionX() + extraX, bubble1->getPositionY(), bubble1->getContentSize().width + 200, bubble1->getContentSize().height), Rect(_box1->getPositionX() + extraX, _box1->getPositionY(), 250, 270));
	help->setName("help");
	help->clickAndDrag(bubble1->getPosition(), Vec2(visibleSize.width*0.1, visibleSize.height / 2));
	this->addChild(help);
}


void Item::update(float dt)
{
}

void Item::frogCreate()
{
	auto ground1 = background->getChildByName(_scenePath.at("ground1"));
	auto ground2 = background->getChildByName(_scenePath.at("ground2"));

	auto plus = background->getChildByName("item_plus_8");
//	plus->setPositionX(plus->getPositionX() - extraX);
	auto equal = background->getChildByName("item_equal_9");
//	equal->setPositionX(equal->getPositionX() - extraX);

	_frog1Num = RandomHelper::random_int(1, 5);
	CCLOG("frog1num 1st = %d", _frog1Num);
	auto num1 = RandomHelper::random_int(0, 7);
	for (int i = 0; i <_frog1Num; i++)
	{
		
		auto frog1 = Sprite::createWithSpriteFrameName(_scenePath.at("frog1"));
		frog1->setPosition(_frogX1.at(num1 % 8), _frogY1.at(num1%8));
		frog1->setScale(0.5);
		ground1->addChild(frog1);
		num1++;
	//	_frogX1.erase(_frogX1.begin() + num1);
	//	_frogY1.erase(_frogY1.begin() + num1);
	}
	_frog2Num = RandomHelper::random_int(1, 5);
	CCLOG("frog2num 1st = %d", _frog2Num);
	auto num2 = RandomHelper::random_int(0, 7);
	for (int i = 0; i < _frog2Num; i++)
	{
		auto frog2 = Sprite::createWithSpriteFrameName(_scenePath.at("frog2"));
		frog2->setPosition(_frogX2.at(num2 % 8), _frogY2.at(num2 % 8));
		frog2->setScale(0.5);
		ground2->addChild(frog2);
		num2++;
	}


}
void Item::check()
{
	auto box1 = background->getChildByName(_scenePath.at("box1"));
	box1->setName("box1");
//	box1->setPositionX(box1->getPositionX() - extraX);
	_boxRef.push_back(box1);
	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, box1);

	auto box2 = background->getChildByName(_scenePath.at("box2"));
	box2->setName("box2");
//	box2->setPositionX(box2->getPositionX() - extraX);
	_boxRef.push_back(box2);
	auto listener2 = EventListenerTouchOneByOne::create();
	listener2->setSwallowTouches(true);
	listener2->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener2, box2);

	auto box3 = background->getChildByName(_scenePath.at("box3"));
	box3->setName("box3");
//	box3->setPositionX(box3->getPositionX() - extraX);
	_boxRef.push_back(box3);
	auto listener3 = EventListenerTouchOneByOne::create();
	listener3->setSwallowTouches(true);
	listener3->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener3, box3);
	
	_hintLabel1 = Label::createWithTTF("?", "fonts/digital.ttf", 200);
	_hintLabel1->setColor(Color3B(255, 255, 255));
	_hintLabel1->setPositionX(box1->getContentSize().width / 2);
	_hintLabel1->setPositionY(box1->getContentSize().height / 2);
	_hintLabel1->setName("hintLabel1");
	box1->addChild(_hintLabel1);

	_hintLabel2 = Label::createWithTTF("?", "fonts/digital.ttf", 200);
	_hintLabel2->setColor(Color3B(255, 255, 255));
	_hintLabel2->setPositionX(box1->getContentSize().width / 2);
	_hintLabel2->setPositionY(box1->getContentSize().height / 2);
	_hintLabel2->setName("hintLabel2");
	box2->addChild(_hintLabel2);

	_hintLabel3 = Label::createWithTTF("?", "fonts/digital.ttf", 200);
	_hintLabel3->setColor(Color3B(255, 255, 255));
	_hintLabel3->setPositionX(box1->getContentSize().width / 2);
	_hintLabel3->setPositionY(box1->getContentSize().height / 2);
	_hintLabel3->setName("hintLabel3");
	box3->addChild(_hintLabel3);

	if (menu->getCurrentLevel() <= 15)
	{
		_fillNum = cocos2d::RandomHelper::random_int(0, 2);
		if (_fillNum == 0)
		{
			Label* box1Label = (Label*)box1->getChildByName("hintLabel1");
			std::stringstream ss;
			ss << _frog1Num;
			std::string str = ss.str();
			box1Label->setString(str.c_str());
			_eventDispatcher->removeEventListenersForTarget(box1);
			_frogCount1 = atoi(str.c_str());
		}
		else if (_fillNum == 1)
		{
			Label* box1Label = (Label*)box2->getChildByName("hintLabel2");
			std::stringstream ss;
			ss << _frog2Num;
			std::string str = ss.str();
			box1Label->setString(str.c_str());
			_eventDispatcher->removeEventListenersForTarget(box2);
			_frogCount2 = atoi(str.c_str());
		}
		else if (_fillNum == 2)
		{
			Label* box1Label = (Label*)box3->getChildByName("hintLabel3");
			std::stringstream ss;
			ss << (_frog1Num + _frog2Num);
			std::string str = ss.str();
			box1Label->setString(str.c_str());
			_eventDispatcher->removeEventListenersForTarget(box3);
			_frogCount3 = atoi(str.c_str());
		}

	}

}
void Item::numCreate()
{
	_box1 = background->getChildByName(_scenePath.at("box1Fish"));
	_box2 = background->getChildByName(_scenePath.at("box2Fish"));

	_num1 = cocos2d::RandomHelper::random_int(1, 5);
	CCLOG("randNum =%d", _num1);
	std::stringstream ss1;
	ss1 << _num1;
	std::string str1 = ss1.str();
	auto number_label1 = CommonLabel::createWithSystemFont(str1, "Arial", 90);
	number_label1->setPositionX(_box1->getContentSize().width / 2);
	number_label1->setPositionY(_box1->getContentSize().height / 2);
	_box1->addChild(number_label1, 2);

	_num2 = cocos2d::RandomHelper::random_int(1, 5);
	std::stringstream ss2;
	ss2 << _num2;
	std::string str2 = ss2.str();
	auto number_label2 = CommonLabel::createWithSystemFont(str2, "Arial", 90);
	number_label2->setPositionX(_box2->getContentSize().width / 2);
	number_label2->setPositionY(_box2->getContentSize().height / 2);
	_box2->addChild(number_label2, 2);
}
void Item::fish1Create()
{
	auto bubble1 = background->getChildByName("item_bubble_3");
	auto bubble2 = background->getChildByName("item_bubble_3_2");

	_fish1 = CSLoader::createNode(_scenePath.at("fish1"));
	_fish1->setPositionX(bubble1->getPositionX()+ extraX);
	_fish1->setPositionY(bubble1->getPositionY() + 60);
    _fish1->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_fish1, 1);
	//_fish1->setScale(0.5);
	_fish1->setName("fish1");
	_timeline1 = CSLoader::createTimeline(_scenePath.at("fish1"));
	_fish1->runAction(_timeline1);
	_timeline1->gotoFrameAndPause(0);


	_fish1->setContentSize(Size(600, 200));
	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	listener1->onTouchMoved = CC_CALLBACK_2(Item::onTouchMoved, this);
	listener1->onTouchEnded = CC_CALLBACK_2(Item::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, _fish1);

	
}
void Item::fish2Create()
{
	auto bubble2 = background->getChildByName("item_bubble_3_2");
	_fish2 = CSLoader::createNode(_scenePath.at("fish2"));
	_fish2->setPositionX(bubble2->getPositionX() + extraX);
	_fish2->setPositionY(bubble2->getPositionY() + 60);
	_fish2->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_fish2, 1);
	_fish2->setName("fish2");
	//_fish2->setScale(0.5);
	_timeline2 = CSLoader::createTimeline(_scenePath.at("fish2"));
	_fish2->runAction(_timeline2);
	_timeline2->gotoFrameAndPause(0);

	_fish2->setContentSize(Size(600, 200));
	auto listener2 = EventListenerTouchOneByOne::create();
	listener2->setSwallowTouches(true);
	listener2->onTouchBegan = CC_CALLBACK_2(Item::onTouchBegan, this);
	listener2->onTouchMoved = CC_CALLBACK_2(Item::onTouchMoved, this);
	listener2->onTouchEnded = CC_CALLBACK_2(Item::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener2, _fish2);

}

void Item::scoreBoard(float dt)
{
	if (menu->getCurrentLevel() <= 5)
	{
		menu->setMaxPoints(_num1 + _num2);
	}

	else if (menu->getCurrentLevel() <= 15)
	{ 
		auto checkNum = 4;
		if (_fillNum == 0)
		{
			checkNum--;
			CCLOG("checkNum = %d", checkNum);
		}
		else if (_fillNum == 1)
		{
			checkNum--;
			CCLOG("checkNum = %d", checkNum);
		}
		else if (_fillNum == 2)
		{
			checkNum -= 2;
			CCLOG("checkNum = %d", checkNum);
		}
		menu->setMaxPoints(checkNum);
	}
	else if (menu->getCurrentLevel() <= 25)
	{
		menu->setMaxPoints(4);
	}
	_frog1Num = 0;
	_frog2Num = 0;
	_frogCount1 = 0;
	_frogCount2 = 0;
	_frogCount3 = 0;
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
			CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("item/rain.plist");
			_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("item/rain.png"));
			//_particle->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
			this->addChild(_particle);
			this->scheduleOnce(schedule_selector(Item::scoreBoard), 4);
		}
	
		_scoreMax++;
	}
	else
	{
		CCLOG("None.........");
		FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
		_done->runAction(shake);
		
		_scoreMax++;
		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/sfx/error.ogg", false);
		for (int i = 0; i < _fishMove.size(); i++)
		{

			//this->removeChild(_fishMove.at(i));
			//_count1 = 0;
			//_count2 = 0;
		}
		_fishMove.clear();
	}
}
void Item::verify()
{
	CCLOG("_frog1Num = %d", _frog1Num);
	CCLOG("_frog2Num = %d", _frog2Num);
	CCLOG("_frogCount1 = %d", _frogCount1);
	CCLOG("_frogCount2 = %d", _frogCount2);
	CCLOG("_frogCount3 = %d", _frogCount3);
	if (_frog1Num == _frogCount1 && _fillNum !=0)
	{
		menu->addPoints(1);
	}
	else 
	{  
		if(_fillNum != 0)
		menu->addPoints(-1);
	}
	if (_frog2Num == _frogCount2 && _fillNum != 1)
	{
		menu->addPoints(1);
	}
	else 
	{
		if (_fillNum != 1)
		menu->addPoints(-1);
	}
	if ((_frog1Num + _frog2Num) == _frogCount3 && _fillNum != 2)
	{
		menu->addPoints(2);
	}
	else 
	{
		if (_fillNum != 2)
		menu->addPoints(-2);
	}
	if (_frog1Num == _frogCount1 && _frog2Num == _frogCount2 && (_frog1Num+ _frog2Num) == _frogCount3)
	{
		CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("item/rain.plist");
		_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("item/rain.png"));
		//_particle->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
		this->addChild(_particle);
		
		_scoreMax++;
		this->scheduleOnce(schedule_selector(Item::scoreBoard), 2);
	}
	else
	{
		FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
		_done->runAction(shake);
		
		_scoreMax++;
		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/sfx/error.ogg", false);
	}
}

bool Item::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	//auto  location = target->convertToNodeSpace(touch->getLocation());
	auto  location = touch->getLocation();
	Rect rect = CCRectMake(target->getPositionX() + extraX- target->getContentSize().width/2, target->getPositionY()- target->getContentSize().height/2, target->getContentSize().width, target->getContentSize().height);
	if (rect.containsPoint(location) && _clickFlag)
	{
		_clickFlag = false;
		auto scale = ScaleBy::create(0.1, 0.75);
		target->runAction(Sequence::create(scale, scale->reverse(), CallFunc::create([=]() {
			_clickFlag = true;
		}), NULL));
		if (target->getName().compare("done") == 0)
		{
			if (menu->getCurrentLevel() <= 5)
			{
				result();
				
			}
			else if (menu->getCurrentLevel() <= 25)
			{
				verify();
			}
			
		}
		if (target->getName().compare("box1") == 0)
		{
			this->removeChildByName("calculator");
			_flag = true;
			_box1Name = "box1";
			addCalculator();
			
		}
		if (target->getName().compare("box2") == 0)
		{
			this->removeChildByName("calculator");
			_flag = true;
			_box1Name = "box2";
			addCalculator();
			
		}
		if (target->getName().compare("box3") == 0)
		{
			this->removeChildByName("calculator");
			_flag = true;
			_box1Name = "box3";
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
	bool fishFlag = false;
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	
	if (touch->getLocation().y > visibleSize.height * 0.5 || touch->getLocation().y < visibleSize.height * 0.25)
	{
		if (target->getName().compare("fish1") == 0 || target->getName().compare("fish1_in_pond") == 0)
		{
			_count1--;
		}
		else if (target->getName().compare("fish2") == 0 || target->getName().compare("fish2_in_pond") == 0)
		{
			_count2--;
		}
		
		fishFlag = true;
	//	_fishMove.pop_back();
		_clickFlag = true;
	}

	if (target->getName().compare("fish1") == 0 )
	{
		auto timeline = CSLoader::createTimeline(_scenePath.at("fish1"));
		target->runAction(timeline);
		_fish1->runAction(Sequence::create(CallFunc::create([=]() {
			timeline->play("splash", false);
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/splash.ogg", false);
			if (_count1 <= _num1)
			{
				menu->addPoints(1);
			}
			if (_count1 > _num1)
			{
				menu->addPoints(-1);
			}
			_clickFlag = true;
		}), DelayTime::create(1.0f), CallFunc::create([=]() {
			
		}), CallFunc::create([=]() {
			
			timeline->play("fish1", true);

		}),NULL));
	//	_eventDispatcher->removeEventListenersForTarget(target);
		fish1Create();
		_count1++;
		target->setName("fish1_in_pond");
		_fishMove.push_back(target);
	}
	else if (target->getName().compare("fish2") == 0)
	{
		auto timeline = CSLoader::createTimeline(_scenePath.at("fish2"));
		target->runAction(timeline);
		_fish2->runAction(Sequence::create(CallFunc::create([=]() {
			timeline->play("splash", false);
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/splash.ogg", false);
			if (_count2 <= _num2)
			{
				menu->addPoints(1);
			}
		    if (_count2 > _num2)
			{
				menu->addPoints(-1);
			}
			_clickFlag = true;
		}), DelayTime::create(1.0f), CallFunc::create([=]() {

		}), CallFunc::create([=]() {

			timeline->play("fish2", true);

		}), NULL));
	//	_eventDispatcher->removeEventListenersForTarget(target);
		fish2Create();
		_count2++;
		target->setName("fish2_in_pond");
		_fishMove.push_back(target);
	}

	if (_num1 == _count1)
	{
		this->removeChildByName("help");
	}

	if (fishFlag)
	{
		
		if ((target->getName().compare("fish1_in_pond") == 0 || target->getName().compare("fish2_in_pond") == 0) && (_fishMove.size() != 0 ))
		{
			for (int i = 0; i < _fishMove.size(); i++)
			{
				if (target == _fishMove.at(i))
				{
					_fishMove.erase(_fishMove.begin() + i);
				}
			}
			//_fishMove.pop_back();
		}
		this->removeChild(target);
    /*	if (target->getName().compare("fish1") == 0 )
		{
			fish1Create();
		}
	else if (target->getName().compare("fish2") == 0)
		{
		fish2Create();
		}*/
	}
	
}
	

void Item::addCalculator() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(visibleSize.width/2, visibleSize.height - 450), Vec2(0.5, 0.5), 0.7, 0.7);
	this->addChild(_calculator, 10);
	_calculator->setName("calculator");
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(true);

}
void Item::calculatedResult(std::string result)
{
	CCLOG("table calculator!!!!!!!!!!!  === %s", result.c_str());
	this->removeChildByName("calculator");
	if (_box1Name == "box1")
	{
		if (result.size() < 2)
		{
			_hintLabel1->setString(result.c_str());
			_frogCount1 = atoi(result.c_str());
			CCLOG("_frogCount1 = %d", _frogCount1);
		}
		
	}
	else if (_box1Name == "box2")
	{
		if (result.size() < 2)
		{
			_hintLabel2->setString(result.c_str());
			_frogCount2 = atoi(result.c_str());
			CCLOG("_frogCount2 = %d", _frogCount2);
		}
	}
	else if (_box1Name == "box3")
	{
		if (result.size() < 3)
		{
			_hintLabel3->setString(result.c_str());
			_frogCount3 = atoi(result.c_str());
			CCLOG("_frogCount3 = %d", _frogCount3);
		}
	}
	
	
}
