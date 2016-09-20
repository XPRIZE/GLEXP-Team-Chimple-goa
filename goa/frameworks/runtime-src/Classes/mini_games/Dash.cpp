//
//  Dash.cpp 
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//



#include "Dash.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

Dash::Dash()
{
}

Dash::~Dash()
{

}

Dash * Dash::create()
{
	Dash* dashGame = new (std::nothrow) Dash();
	if (dashGame && dashGame->init()) {
		dashGame->autorelease();
		return dashGame;
	}
	CC_SAFE_DELETE(dashGame);
	return nullptr;
}

cocos2d::Scene * Dash::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Dash::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "dash");
	scene->addChild(layer->menu);
	return scene;
}

bool Dash::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("dash/dash.plist");

	auto bg = CSLoader::createNode("dash/DashScene.csb");
	this->addChild(bg);


	auto stepLayer = Layer::create();
	stepLayer->setPositionX(0);
	this->addChild(stepLayer);

	int char_height = 500;
	for (int j = 4; j > 0; j--) {  // j reffer to number of Players
		for (int i = 1; i < 15; i++) {  // i reffer to number of steps (words)
			auto obj1 = Sprite::createWithSpriteFrameName("dash/step.png");
			obj1->setPositionX((visibleSize.width / 5) * i +(obj1->getContentSize().width/2)*j);
			obj1->setPositionY(visibleSize.height * 0.4 +( (obj1->getContentSize().height/3) * j));
			obj1->setAnchorPoint(Vec2(1, 0.5));
			stepLayer->addChild(obj1);
		}
	}

	auto moveTo = MoveBy::create(15, Vec2(-visibleSize.width * 2, 0));
	stepLayer->runAction(moveTo);
	
	return true;
}