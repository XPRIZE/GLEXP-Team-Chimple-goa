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

	auto level1 = CSLoader::createNode("dino/level1.csb");
	this->addChild(level1);
	return true;
}

void DinoGame::onEnterTransitionDidFinish()
{
}
