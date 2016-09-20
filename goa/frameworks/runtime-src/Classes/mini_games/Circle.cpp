
#include "Circle.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

Circle::Circle()
{
	CCLOG("circle");
}

Circle::~Circle()
{

}

Circle * Circle::create()
{
	Circle* CircleGame = new (std::nothrow) Circle();
	if (CircleGame && CircleGame->init()) {
		CircleGame->autorelease();
		return CircleGame;
	}
	CC_SAFE_DELETE(CircleGame);
	return nullptr;
}

cocos2d::Scene * Circle::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Circle::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "Circle");
	scene->addChild(layer->menu);
	return scene;
}

bool Circle::init()
{

	if (!Layer::init())
	{
		return false;
	}


	return true;
}

