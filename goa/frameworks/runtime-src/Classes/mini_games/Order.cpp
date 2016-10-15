//
//  Order.cpp 
//  goa
//
//  Created by Kirankumar CS on 05/10/16
//
//

#include "Order.h"
#include "../lang/TextGenerator.h"
#include <algorithm>

USING_NS_CC;

Order::Order()
{
}

Order::~Order()
{

}

Order * Order::create()
{
	Order* dashGame = new (std::nothrow) Order();
	if (dashGame && dashGame->init()) {
		dashGame->autorelease();
		return dashGame;
	}
	CC_SAFE_DELETE(dashGame);
	return nullptr;
}

cocos2d::Scene * Order::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Order::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Order::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Order::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	_myScore = 0;
	_enemyScore = 0;
	
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {

		{ "farm",  //rayyan designs
		{
			{ "plist", "orderfarm/orderfarm.plist" },
			{ "bg", "orderfarm/orderfarm.csb" },
			{ "box", "orderfarm/box.png" },
			{ "character", "orderfarm/cart.csb" },
			{ "random_animation", "swing" },
			{ "winning_animation","eat" },
			{ "child1", "mainground"},
			{ "child2", "cart1"},
			{ "otherCharacter", "cart2" }
		} },
		{ "hero",  //prathap designs
		{
			{ "plist", "orderhero/orderhero.plist" },
			{ "bg", "orderhero/orderhero.csb" },
			{ "box", "orderhero/box.png" },
			{ "character", "orderhero/ramp.csb" },
			{ "random_animation", "swing" },
			{ "winning_animation","win" },
			{ "child1", "FileNode_2" },
			{ "child2", "ramp1" },
			{ "otherCharacter", "ramp2" }
		} },
		{ "candy",  //teju design
		{
			{ "plist", "ordercandy/ordercandy.plist" },
			{ "bg", "ordercandy/ordercandy.csb" },
			{ "box", "ordercandy/box.png" },
			{ "character", "ordercandy/fluffy.csb" },
			{ "random_animation", "swing" },
			{ "winning_animation","eat" },
			{ "child1", "mainground" },
			{ "child2", "cart1" },
			{ "otherCharacter", "cart2" }
		} },
	};

	std::map<std::string, std::map<std::string, float>> differentPointsConfig = {
		{"farm",
			{
				{"targetDistance", 1350.0f}
			}
		},
		{ "hero",
			{
				{ "targetDistance", 1125.0f }
			} 
		},
		{ "candy",
			{
				{ "targetDistance", 800.0f }
			} 
		}
	};

	std::vector<std::string> theme = { "farm","hero","candy" };
	_themeName = theme.at(2);// cocos2d::RandomHelper::random_int(0, 2));
	_scenePath = differntSceneMapping.at(_themeName);//cocos2d::RandomHelper::random_int(0, 2)));

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));// "orderhero/orderhero.plist");

	_bg = CSLoader::createNode(_scenePath.at("bg"));//dash/OrderScene.csb
	if (visibleSize.width > 2560) {
		_bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(_bg);
	
	if (_themeName.compare("farm") == 0) {
		animationWithRandomInterval();
	}
	//

	_sortedList = TextGenerator::getInstance()->getOrderedConcepts(1);

	auto randomList = _sortedList;
	std::random_shuffle(randomList.begin(), randomList.end());

	//std::copy()
	//orderfarm/woodblock.png
	//random vector
	std::vector<std::string> str1 = { "l","k","j","a","g","h","f","c","d","e","b","i"};
	std::string str = "1";
	for (short i = 0; i < 12; i++) {	
		auto obj1 = Sprite::createWithSpriteFrameName(_scenePath.at("box"));
		obj1->setPositionX(visibleSize.width / 2);
		obj1->setAnchorPoint(Vec2(0.5,0.5));
		obj1->setPositionY(visibleSize.height * 0.1 + i * (obj1->getContentSize().height  * 1));
		obj1->setName(randomList.at(i));
		str = str + str;
		_boxes.pushBack(obj1);
		this->addChild(obj1);
		 auto topLabel = Label::createWithSystemFont(randomList.at(i).c_str(), "Arial", 100);
		topLabel->setPositionX(obj1->getContentSize().width / 2);
		topLabel->setPositionY(obj1->getContentSize().height / 2);
		topLabel->setColor(Color3B(255, 255, 255));
		obj1->addChild(topLabel);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Order::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(Order::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(Order::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, obj1);
		_lastBoxPosition = visibleSize.height * 0.1 + (i) * (obj1->getContentSize().height  * 1);
	}
	_cartMove = differentPointsConfig.at(_themeName).at("targetDistance") / str1.size();

	runAction(RepeatForever::create(Sequence::create(DelayTime::create(10 + (rand() % 60) / 30.0), CallFunc::create([=]() {
		int score = cocos2d::RandomHelper::random_int(0, 12);
		otherPlayer(score);
	}), NULL)));


	return true;
}

bool Order::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {
		_yy = target->getPositionY();
		_color = target->getColor();
		target->setColor(Color3B(151, 154, 154));
		return true;
	}
	return false;
}

void Order::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	if (touch->getLocation().y > (visibleSize.height * 0.1) && (touch->getLocation().y < (_lastBoxPosition))) {
		//for (short i = 0; i < _boxes.size(); i++) {
		//	if (target != _boxes.at(i)) {
		//	auto swapTarget = _boxes.at(i);
		//	if (target->getBoundingBox().containsPoint(Vec2(swapTarget->getPositionX() + (swapTarget->getContentSize().width / 2), swapTarget->getPositionY() + (swapTarget->getContentSize().height / 2)))) {
		//		CCLOG(" %s  box intersect with %s", swapTarget->getName().c_str(), target->getName().c_str());
		//		CCLOG("Name = %s", swapTarget->getName().c_str());
		//		CCLOG("y difference with touch began = %f ", _yy - touch->getLocation().y);
		//		CCLOG("y difference with previous = %f ", touch->getPreviousLocation().y - touch->getLocation().y);
		//			if (touch->getPreviousLocation().y - touch->getLocation().y <  -4 /* -target->getContentSize().height/2 */) {
		//				CCLOG("box move up");
		//				if (_boxes.at(i)->getPositionY() - (_boxes.at(i)->getContentSize().height) >= (visibleSize.height * 0.1 )) {
		//				//	auto moveBy = MoveBy::create(1, Vec2(0, -(_boxes.at(i)->getContentSize().height)));
		//				//	_boxes.at(i)->runAction(moveBy);
		//					_boxes.at(i)->setPositionY(_boxes.at(i)->getPositionY() - (_boxes.at(i)->getContentSize().height));
		//				//	_yy = _boxes.at(i)->getPositionY() - (_boxes.at(i)->getContentSize().height);
		//				}	
		//			}
		//			else if (touch->getPreviousLocation().y - touch->getLocation().y > 5 /*target->getContentSize().height / 2*/)
		//			{
		//				CCLOG("box move down");
		//				if (target->getPositionY() < _lastBoxPosition) {
		//				//	auto moveBy = MoveBy::create(1, Vec2(0, +(_boxes.at(i)->getContentSize().height)));
		//				//	_boxes.at(i)->runAction(moveBy);
		//					_boxes.at(i)->setPositionY(_boxes.at(i)->getPositionY() + (_boxes.at(i)->getContentSize().height));
		//				//	_yy = _boxes.at(i)->getPositionY() + (_boxes.at(i)->getContentSize().height);
		//				}
		//			}
		//		}
		//	}
		//}


//##########################################################################################################################################
//   swaping the arrays
		float yy = target->getPositionY() - visibleSize.height *0.1;
		float num = yy / (target->getContentSize().height * 1);
		int qqq = (int)round(num);
		CCLOG(" index = %d", qqq);

		for (short i = 0; i < _boxes.size(); i++) {
			if (_boxes.at(i) != target) {
				float posY = (_boxes.at(i)->getPositionY()) - visibleSize.height * 0.1;
				int index = (int)posY / (target->getContentSize().height * 1);
				if (qqq == index) {
					CCLOG("touch difference = %f", touch->getPreviousLocation().y - touch->getLocation().y);
					if (touch->getPreviousLocation().y - touch->getLocation().y > 5) {
						if (qqq == _boxes.size() - 1) {
							_boxes.at(i)->setPositionY(((qqq) *target->getContentSize().height * 1) + (visibleSize.height* 0.1));
						} 
						else {
							_boxes.at(i)->setPositionY(((qqq + 1) *target->getContentSize().height * 1) + (visibleSize.height* 0.1));
						}
						
						break;
					}
					else if (touch->getPreviousLocation().y - touch->getLocation().y < -4) {
						if (qqq == 0) {
							_boxes.at(i)->setPositionY(((qqq)*target->getContentSize().height * 1) + (visibleSize.height* 0.1));
						}
						else {
							_boxes.at(i)->setPositionY(((qqq - 1)*target->getContentSize().height * 1) + (visibleSize.height* 0.1));
									}
						break;
					}
				}
			}
		}
		target->setPositionY(touch->getLocation().y);
	}
	
}

void Order::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	bool flag = false;
	std::vector<int> overlapChecking = { 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 };
	std::vector<int> userArrayIndex;
	std::vector<int> missedIndex;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	target->setColor(_color);
	CCLOG("y position = %f", target->getPositionY());
	//CCLOG("y position previous = %f", _yy);
	CCLOG("y position updated = %f", touch->getLocation().y);
	float yy = touch->getLocation().y - visibleSize.height *0.1;
	float num = yy / (target->getContentSize().height * 1);
	int qqq = (int)round(num );
	//CCLOG(" index = %d", qqq);
	if (qqq < 0) {
		qqq = 0;
	}
	else if (qqq == _boxes.size()) {
		qqq--;
	}
	target->setPositionY(visibleSize.height* 0.1 + ((qqq) * (target->getContentSize().height * 1)));
	for (short i = 0; i < _boxes.size(); i++) {
		//overlapChecking.pushBack(0);
		if (target != _boxes.at(i)) {
			float index = (_boxes.at(i)->getPositionY() - visibleSize.height*0.1) / (target->getContentSize().height * 1);
			userArrayIndex.push_back((int)round(index));
			int temp= overlapChecking.at((int)round(index)) + 1;
			overlapChecking.at((int)round(index)) = temp;
			if (qqq == (int)round(index)) {
				CCLOG("overlaped");
			}
		}
		else {
			userArrayIndex.push_back(qqq);
			overlapChecking.at(qqq)++;
		}
	}

	for (short j = 0; j < _boxes.size(); j++) {
		if (overlapChecking.at(j) == 0) {
			missedIndex.push_back(j);
		}
	}
	int zeroIndex =0;
	for (short i = 0; i < _boxes.size(); i++) {
		CCLOG(" %s block Name %d contains %d boxes", _boxes.at(i)->getName().c_str(), userArrayIndex.at(i), overlapChecking.at(i));
		//	float index = (_boxes.at(i)->getPositionY() - visibleSize.height*0.1) / target->getContentSize().height;
		if (overlapChecking.at(userArrayIndex.at(i)) >1) {
			_boxes.at(i)->setPositionY(visibleSize.height*0.1 + missedIndex.at(zeroIndex) * _boxes.at(i)->getContentSize().height * 1);
			overlapChecking.at(userArrayIndex.at(i))--;
			overlapChecking.at(zeroIndex) = 1;
			userArrayIndex.at(i) = missedIndex.at(zeroIndex);
			zeroIndex++;
		}
	}
///////////////// for testing
//	for (short i = 0; i < _boxes.size(); i++) {
//		CCLOG(" %s block Name %d contains %d boxes", _boxes.at(i)->getName().c_str(), userArrayIndex.at(i), overlapChecking.at(i));
//	}
////////////////////////////////////////


	checkUserSortList(userArrayIndex);
}

void Order::checkUserSortList(std::vector<int> list)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int score = 0;
	std::vector<std::string> str1 = { "a","b","c","d","e","f","g","h","i","j", "k", "l" };
	for (short i = 0; i < _boxes.size(); i++) {
		//CCLOG("user list Name %s", _boxes.at(list.at(i))->getName().c_str());
		float index = (_boxes.at(i)->getPositionY() - visibleSize.height*0.1) / (_boxes.at(i)->getContentSize().height * 1);
		if (_boxes.at(i)->getName().compare(_sortedList.at((int)round(index))) == 0) {
			CCLOG("%s is in correct position", _sortedList.at((int)round(index)).c_str());
			score++;
			//cartAnimation("swing", false);//
			//animationWithRandomInterval();
		}
	}

	float cartMove = _cartMove * (score - _myScore);
	auto moveBy = MoveBy::create(2, Vec2(0, cartMove));
	auto moveBucket = MoveBy::create(2, Vec2(0, cartMove));
	if (_themeName.compare("hero") == 0) {
		auto bucket = _bg->getChildByName("FileNode_2")->getChildByName("paintbucket");
		bucket->runAction(moveBucket);
	}
	auto cart = _bg->getChildByName(_scenePath.at("child1"))->getChildByName(_scenePath.at("child2"));
	_myScore = score;
	cart->runAction(Sequence::create(moveBy, CallFunc::create([=]() {
		if (_myScore == 12) {
			winAnimation();
			//cartAnimation("eat", true);
		}
	}), NULL));
	
	if (_myScore > 0) {
		_cartFloating = true;
	}
	else {
		_cartFloating = false;
	}
	

}

void Order::animationWithRandomInterval()
{
	auto swingAction = CallFunc::create(CC_CALLBACK_0(Order::cartAnimation, this, "swing", false));
	runAction(RepeatForever::create(Sequence::create(DelayTime::create(2 + (rand() % 60) / 30.0), swingAction, NULL)));
}

void Order::cartAnimation(std::string animationName, bool loop)
{
	auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
	auto cart = _bg->getChildByName(_scenePath.at("child1"))->getChildByName(_scenePath.at("child2"));
	cart->runAction(timeline);
	if (_cartFloating && _myScore != 12) {
		timeline->play(animationName, loop);
	} 
}

void Order::winAnimation()
{
	auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
	auto cart = _bg->getChildByName(_scenePath.at("child1"))->getChildByName(_scenePath.at("child2"));
	runAction(Sequence::create(CallFunc::create([=]() {
		cart->runAction(timeline);
		timeline->play(_scenePath.at("winning_animation"), true);

	}), DelayTime::create(2), CallFunc::create([=]() {
		menu->showScore();
	}), NULL));
	
	if (_themeName.compare("hero") == 0) {
		auto moveBucket = MoveBy::create(2, Vec2(-200, 0));
		auto bucket = _bg->getChildByName("FileNode_2")->getChildByName("paintbucket");
		bucket->runAction(moveBucket);
	}

}

void Order::otherPlayer(int score)
{
	float cartMove = _cartMove * (score - _enemyScore);
	auto moveBy = MoveBy::create(2, Vec2(0, cartMove));
	auto cart = _bg->getChildByName(_scenePath.at("child1"))->getChildByName(_scenePath.at("otherCharacter"));
	cart->runAction(moveBy);
	auto moveBucket = MoveBy::create(2, Vec2(0, cartMove));
	if (_themeName.compare("hero") == 0) {
		auto bucket = _bg->getChildByName("FileNode_2")->getChildByName("paintbucket2");
		bucket->runAction(moveBucket);
	}
	_enemyScore = score;
}
