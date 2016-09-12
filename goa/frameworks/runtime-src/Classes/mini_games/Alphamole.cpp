#include "Alphamole.h"



Alphamole::Alphamole()
{
}

Alphamole::~Alphamole()
{
}

Alphamole * Alphamole::create()
{
	Alphamole* alphamonFeedLayer = new (std::nothrow) Alphamole();
	if (alphamonFeedLayer && alphamonFeedLayer->init()) {
		alphamonFeedLayer->autorelease();
		return alphamonFeedLayer;
	}
	CC_SAFE_DELETE(alphamonFeedLayer);
	return nullptr;
}

cocos2d::Scene * Alphamole::createScene()
{
	//alphaLevelString = str.c_str();
	auto scene = Scene::create();
	auto layer = Alphamole::create();
	scene->addChild(layer);

	//layer->menu = MenuContext::create(layer, "ALPHAMOLE");
	//scene->addChild(layer->menu);
	return scene;
}
