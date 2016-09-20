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
	Dash* alphamonFeedLayer = new (std::nothrow) Dash();
	if (alphamonFeedLayer && alphamonFeedLayer->init()) {
		alphamonFeedLayer->autorelease();
		return alphamonFeedLayer;
	}
	CC_SAFE_DELETE(alphamonFeedLayer);
	return nullptr;
}

cocos2d::Scene * Dash::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Dash::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "alphamole");
	scene->addChild(layer->menu);
	return scene;
}

bool Dash::init()
{

	if (!Layer::init())
	{
		return false;
	}

	return true;


}