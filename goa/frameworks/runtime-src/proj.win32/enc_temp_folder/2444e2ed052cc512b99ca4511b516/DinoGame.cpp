//
//  Decomon.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/12/16
//
//

#include "DinoGame.h"

USING_NS_CC;

cocos2d::Scene * DinoGame::createScene()
{
	auto scene = Scene::create();
	auto layer = DinoGame::create();
	scene->addChild(layer);

	layer->_menu = MenuContext::create(layer, "dino");
	scene->addChild(layer->_menu);
	return scene;
}

DinoGame * DinoGame::create()
{
	DinoGame* dinoGame = new (std::nothrow) DinoGame();
	if (dinoGame && dinoGame->init()) {
		dinoGame->autorelease();
		return dinoGame;
	}
	CC_SAFE_DELETE(dinoGame);
	return nullptr;
}


DinoGame::DinoGame()
{
}

DinoGame::~DinoGame()
{
	
}



bool DinoGame::init() {
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto bg = CSLoader::createNode("dino/dinobg.csb");
	this->addChild(bg);
	
	return true;
}

void DinoGame::onEnterTransitionDidFinish()
{
	std::vector<std::string> alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
	auto level1 = CSLoader::createNode("dino/level1.csb");
	this->addChild(level1);

	for (int i = 0; i < alphabets.size(); i++) {
		std::string child = alphabets.at(i) + "_1";
		auto alpha = level1->getChildByName(child);
		std::string alphaNode = "random_1_" + alphabets.at(i);
		auto randomNode = level1->getChildByName(alphaNode);
		auto moveTo = MoveTo::create(2, randomNode->getPosition());
		alpha->runAction(moveTo);

		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(DinoGame::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(DinoGame::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(DinoGame::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, alpha);
	}



}

bool DinoGame::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {

		return true;
	}
	return false;
}

void DinoGame::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	target->setPosition(touch->getLocation());
}

void DinoGame::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
}
