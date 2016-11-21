//
//  ATM.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/11/16
//
//

#include "ATM.h"
#include "../menu/HelpLayer.h"


USING_NS_CC;

ATM::ATM()
{
}

ATM::~ATM()
{

}

ATM * ATM::create()
{
	ATM* ATMGame = new (std::nothrow) ATM();
	if (ATMGame && ATMGame->init()) {
		ATMGame->autorelease();
		return ATMGame;
	}
	CC_SAFE_DELETE(ATMGame);
	return nullptr;
}

cocos2d::Scene * ATM::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = ATM::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, ATM::gameName());
	scene->addChild(layer->menu);
	return scene;
}

void ATM::onEnterTransitionDidFinish()
{
}



bool ATM::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	return true;
}

