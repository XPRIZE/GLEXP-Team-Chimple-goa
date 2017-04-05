#include "AlphaArrange.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include <sstream>
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

AlphaArrange::AlphaArrange() {
}

AlphaArrange::~AlphaArrange() {
}


Scene* AlphaArrange::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaArrange::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaArrange::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

bool AlphaArrange::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void AlphaArrange::onEnterTransitionDidFinish()
{
	
}
