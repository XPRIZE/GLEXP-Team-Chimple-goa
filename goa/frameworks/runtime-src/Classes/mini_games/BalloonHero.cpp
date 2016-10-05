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
	this->addChild(_fireFly, 1);
	setupTouch();
	
	_fireTimeline = CSLoader::createTimeline("balloonhero/firefly.csb");
	_fireFly->runAction(_fireTimeline);
	_fireTimeline->play("fly" ,true);



	Sprite * cloud = Sprite::createWithSpriteFrameName("balloonhero/cloud1.png");
	cloud->setPosition(200, 1500);
	cloud->setAnchorPoint(Vec2(0.5,0.5));
	this->addChild(cloud);


	Sprite * cloud1 = Sprite::createWithSpriteFrameName("balloonhero/cloud1.png");
	cloud1->setPosition(900, 1500);
	cloud1->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(cloud1);



	auto moveCloud1 = MoveTo::create(2, Vec2(200, 0));
	auto moveCloud2 = MoveTo::create(2, Vec2(900, 0));

	
	auto refixCloud = CallFunc::create([=] {
		
		cloud->setPosition(200, 1500);
	
	});

	auto refixCloud1 = CallFunc::create([=] {

		cloud1->setPosition(900, 1500);

	});

	auto tweenSequence = Sequence::create(moveCloud1, refixCloud, NULL);

	auto repeat = RepeatForever::create(tweenSequence);

	cloud->runAction(repeat);


	auto tweenSequence1 = Sequence::create(moveCloud2, refixCloud1, NULL);

	auto repeat1 = RepeatForever::create(tweenSequence1);

	cloud1->runAction(repeat1);


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
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());

	if (target->getChildByName("firefly")->getBoundingBox().containsPoint(locationInNode))
	{

		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
		 // to indicate that we have consumed it.
	}
}
