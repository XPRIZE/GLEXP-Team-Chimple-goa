//
//  BalloonHero.cpp
//
//  Created by Jyoti Prakash on 03/10/16.
//
//

#include "BalloonHero.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"


USING_NS_CC;

//TextGenerator::getInstance()->getSynonyms(9)
//TextGenerator::getInstance()->getAntonyms(9)
//TextGenerator::getInstance()->getHomonyms(9)



BalloonHero::BalloonHero(){

}

BalloonHero::~BalloonHero() {

}


Scene *BalloonHero::createScene() {

	auto scene = Scene::create();
	auto layer = BalloonHero::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BalloonHero::classname());
	scene->addChild(layer->_menuContext);

	return scene;

}

BalloonHero *BalloonHero::create() {

	BalloonHero * balloonHero = new (std::nothrow) BalloonHero();
	if (balloonHero && balloonHero->init()) {
		balloonHero->autorelease();
		return balloonHero;
	}
	CC_SAFE_DELETE(balloonHero);
	return nullptr;

}

bool BalloonHero::init() {


	if (!Layer::init()) {
		return false;
	}
	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("balloonhero/balloonhero.plist");
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("balloonhero/balloonhero.plist");


	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_balloonHero = CSLoader::createNode("balloonhero/balloonhero.csb");

	//_balloonHero->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_balloonHero->setAnchorPoint(Vec2(0, 0));
	this->addChild(_balloonHero);
	
	 
	_foreGround = _balloonHero->getChildByName("foreground");
	auto moveForeground = MoveTo::create(4, Vec2(_foreGround->getPositionX(), -1000));

	_foreGround->runAction(moveForeground);


	_fireFly = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/firefly.csb");

	_fireFly->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_fireFly->setAnchorPoint(Vec2(0.5, 0.5));
	_fireFly->setScale(0.5, 0.5);
	_fireFly->setContentSize(_fireFly->getChildByName("Sprite")->getContentSize());
	this->addChild(_fireFly, 1);
	setupTouch();
	
	_fireTimeline = CSLoader::createTimeline("balloonhero/firefly.csb");
	_fireFly->runAction(_fireTimeline);
	_fireTimeline->play("fly" ,true);

	generateObjectsAndMove();


	this->scheduleUpdate();
	return true;
}

void BalloonHero::startGame() {

	//_menuContext->showStartupHelp(CC_CALLBACK_0(Memory::dummy, this));
	//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp,_menuContext)), NULL));

}



void BalloonHero::setupTouch() {

	
	auto listener = EventListenerTouchOneByOne::create();
	auto firefly = (Sprite *)_fireFly;
	listener->onTouchBegan = CC_CALLBACK_2(BalloonHero::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(BalloonHero::onTouchEnded, this);
	listener->onTouchMoved = CC_CALLBACK_2(BalloonHero::onTouchMoved, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, firefly);
	

}


bool BalloonHero::onTouchBegan(Touch* touch, Event* event) {

	
	auto target = event->getCurrentTarget();
	
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());

	if (target->getChildByName("firefly")->getBoundingBox().containsPoint(locationInNode))
	{
		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void BalloonHero::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");

	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());


}

void BalloonHero::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");

	auto target = event->getCurrentTarget();
	
		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
		 // to indicate that we have consumed it.
	
}


void BalloonHero::generateObjectsAndMove() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::vector<int> durations = {3,4,5,6};
	std::vector<float> startPosX = { 400,1000,1600,2200 };
	std::vector<float> startPosY = { 1600,1700,1800,1900 };
	

	std::vector<float> endPosX = { 400,1000,1600,2200 };
	std::vector<float> endPosY = { -300,-300,-300,-300 };



	std::vector<std::string> objects = { "balloonhero/meteor.png","balloonhero/cloud1.png" ,"balloonhero/cloud2.png", "balloonhero/cloud3.png" , "balloonhero/cloud4.png" ,"balloonhero/safe.png" };

	/*_meteor = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/meteor.csb");

	_meteor->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_meteor->setAnchorPoint(Vec2(0.5, 0.5));
	_meteor->setScale(0.5, 0.5);
	this->addChild(_meteor, 0);
	*/


	_cloud1 = Sprite::createWithSpriteFrameName("balloonhero/cloud1.png");
	_cloud1->setPosition(400, 1600);
	_cloud1->setScale(0.7, 0.7);
	_cloud1->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud1);


	_cloud2 = Sprite::createWithSpriteFrameName("balloonhero/cloud2.png");
	_cloud2->setPosition(1000, 1700);
	_cloud2->setScale(0.7, 0.7);
	_cloud2->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud2);


	_cloud3 = Sprite::createWithSpriteFrameName("balloonhero/cloud3.png");
	_cloud3->setPosition(1600, 1800);
	_cloud3->setScale(0.7, 0.7);
	_cloud3->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud3);


	_cloud4 = Sprite::createWithSpriteFrameName("balloonhero/cloud4.png");
	_cloud4->setPosition(2200, 1900);
	_cloud4->setScale(0.7, 0.7);
	_cloud4->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud4);



	auto moveCloud1 = MoveTo::create(4, Vec2(400, -300));
	auto moveCloud2 = MoveTo::create(5, Vec2(1000, -300));
	auto moveCloud3 = MoveTo::create(4, Vec2(1600, -300));
	auto moveCloud4 = MoveTo::create(6, Vec2(2200, -300));


	auto refixCloud1 = CallFunc::create([=] {
		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud1->removeAllChildren();
		
		_cloud1->setName("a");
		if (numberPicker == 0) {

			_cloud1->setName("m");
			
		}
		if (numberPicker == 5) {
			
			auto label = ui::Text::create();
			label->setString("jack");
			label->setFontSize(100);
			label->setFontName("fonts/Marker Felt.ttf");
			label->setPosition(Vec2(140, 40));
			label->setAnchorPoint(Vec2(0, 0));
			label->setTextColor(Color4B::BLUE);
			label->setName("jack");
			_cloud1->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(objects[numberPicker]);
		
		_cloud1->setSpriteFrame(textureA);
		_cloud1->setPosition(400, 1600);

	});

	auto refixCloud2 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud2->removeAllChildren();

		_cloud2->setName("a");
		if (numberPicker == 0) {

			_cloud2->setName("m");

		}

		if (numberPicker == 5) {

			auto label = ui::Text::create();
			label->setString("jack");
			label->setFontSize(100);
			label->setFontName("fonts/Marker Felt.ttf");
			label->setPosition(Vec2(140, 40));
			label->setAnchorPoint(Vec2(0, 0));
			label->setTextColor(Color4B::BLUE);
			label->setName("jack");
			_cloud2->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(objects[numberPicker]);

		_cloud2->setSpriteFrame(textureA);

		_cloud2->setPosition(1000, 1700);

	});

	auto refixCloud3 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud3->removeAllChildren();

		_cloud3->setName("a");
		if (numberPicker == 0) {

			_cloud3->setName("m");

		}

		if (numberPicker == 5) {

			auto label = ui::Text::create();
			label->setString("jack");
			label->setFontSize(100);
			label->setFontName("fonts/Marker Felt.ttf");
			label->setPosition(Vec2(140, 40));
			label->setAnchorPoint(Vec2(0, 0));
			label->setTextColor(Color4B::BLUE);
			label->setName("jack");
			_cloud3->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(objects[numberPicker]);

		_cloud3->setSpriteFrame(textureA);

		_cloud3->setPosition(1600, 1800);

	});

	auto refixCloud4 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud4->removeAllChildren();
		_cloud4->setName("a");
		if (numberPicker == 0) {

			_cloud4->setName("m");

		}


		if (numberPicker == 5) {

			auto label = ui::Text::create();
			label->setString("jack");
			label->setFontSize(100);
			label->setFontName("fonts/Marker Felt.ttf");
			label->setPosition(Vec2(140, 40));
			label->setAnchorPoint(Vec2(0, 0));
			label->setTextColor(Color4B::BLUE);
			label->setName("jack");
			_cloud4->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(objects[numberPicker]);

		_cloud4->setSpriteFrame(textureA);

		_cloud4->setPosition(2200, 1900);

	});

	auto tweenSequence1 = Sequence::create(moveCloud1, refixCloud1, NULL);

	auto repeat1 = RepeatForever::create(tweenSequence1);

	_cloud1->runAction(repeat1);


	auto tweenSequence2 = Sequence::create(moveCloud2, refixCloud2, NULL);

	auto repeat2 = RepeatForever::create(tweenSequence2);

	_cloud2->runAction(repeat2);

	auto tweenSequence3 = Sequence::create(moveCloud3, refixCloud3, NULL);

	auto repeat3 = RepeatForever::create(tweenSequence3);

	_cloud3->runAction(repeat3);

	auto tweenSequence4 = Sequence::create(moveCloud4, refixCloud4, NULL);

	auto repeat4 = RepeatForever::create(tweenSequence4);

	_cloud4->runAction(repeat4);


}


void BalloonHero::update(float delta) {

	auto _fireflyBB = _fireFly->getBoundingBox();
	auto _cloud1BB = _cloud1->getBoundingBox();
	auto _cloud2BB = _cloud2->getBoundingBox();
	auto _cloud3BB = _cloud3->getBoundingBox();
	auto _cloud4BB = _cloud4->getBoundingBox();


	if (_fireflyBB.intersectsRect(_cloud1BB) && _cloud1->getName() == "m") {


		_meteor2 = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/meteor.csb");

		_meteor2->setPosition(Vec2(_cloud1->getPositionX(), _cloud1->getPositionY()));
		_meteor2->setAnchorPoint(Vec2(0.5, 0.5));
		_meteor2->setScale(0.5, 0.5);
		this->addChild(_meteor2, 0);

		_cloud1->setVisible(false);
		

		auto  _Timeline = CSLoader::createTimeline("balloonhero/meteor.csb");
		_meteor2->runAction(_Timeline);
		_Timeline->play("blast", false);

		_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor1Animation, this));

		

	}
	
	if (_fireflyBB.intersectsRect(_cloud2BB) && _cloud2->getName() == "m") {

		_meteor2 = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/meteor.csb");

		_meteor2->setPosition(Vec2(_cloud2->getPositionX(), _cloud2->getPositionY()));
		_meteor2->setAnchorPoint(Vec2(0.5, 0.5));
		_meteor2->setScale(0.5, 0.5);
		this->addChild(_meteor2, 0);

		_cloud2->setVisible(false);


		auto  _Timeline = CSLoader::createTimeline("balloonhero/meteor.csb");
		_meteor2->runAction(_Timeline);
		_Timeline->play("blast", false);

		_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor2Animation, this));
	}
	if (_fireflyBB.intersectsRect(_cloud3BB) && _cloud3->getName() == "m") {

		_meteor3 = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/meteor.csb");

		_meteor3->setPosition(Vec2(_cloud3->getPositionX(), _cloud3->getPositionY()));
		_meteor3->setAnchorPoint(Vec2(0.5, 0.5));
		_meteor3->setScale(0.5, 0.5);
		this->addChild(_meteor3, 0);

		_cloud3->setVisible(false);


		auto  _Timeline = CSLoader::createTimeline("balloonhero/meteor.csb");
		_meteor3->runAction(_Timeline);
		_Timeline->play("blast", false);

		_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor3Animation, this));
	}
	if (_fireflyBB.intersectsRect(_cloud4BB) && _cloud4->getName() == "m") {

		_meteor4 = (cocos2d::Sprite *)CSLoader::createNode("balloonhero/meteor.csb");

		_meteor4->setPosition(Vec2(_cloud4->getPositionX(), _cloud4->getPositionY()));
		_meteor4->setAnchorPoint(Vec2(0.5, 0.5));
		_meteor4->setScale(0.5, 0.5);
		this->addChild(_meteor4, 0);

		_cloud4->setVisible(false);


		auto  _Timeline = CSLoader::createTimeline("balloonhero/meteor.csb");
		_meteor4->runAction(_Timeline);
		_Timeline->play("blast", false);

		_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor4Animation, this));
	}
	
	
}


void BalloonHero::generateRandomNumbers() {
/*
	int a = 4;
	//std::vector<int> randomIndex;
	_randomIndex.clear();
	while (_randomIndex.size() != 4) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, 3);
		for (int i = 0; i < _randomIndex.size(); i++) {
			if (numberPicker == _randomIndex[i]) {
				duplicateCheck = false;
			}
		}
		if (duplicateCheck) {
			_randomIndex.push_back(numberPicker);
		}
	}
	*/
}

void BalloonHero::removeMeteor1Animation() {
	this->removeChild(_meteor1);
	_cloud1->setPosition(400, -300);
	_cloud1->setVisible(true);
}

void BalloonHero::removeMeteor2Animation() {
	this->removeChild(_meteor2);
	_cloud2->setPosition(1000, -300);
	_cloud2->setVisible(true);
}

void BalloonHero::removeMeteor3Animation() {
	this->removeChild(_meteor3);
	_cloud3->setPosition(1600, -300);
	_cloud3->setVisible(true);
}

void BalloonHero::removeMeteor4Animation() {
	this->removeChild(_meteor4);
	_cloud4->setPosition(2200, -300);
	_cloud4->setVisible(true);
}