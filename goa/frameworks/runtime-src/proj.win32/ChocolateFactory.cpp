#include "ChocolateFactory.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

Scene* ChocolateFactory::createScene()
{
	auto scene = Scene::create();
	auto layer = ChocolateFactory::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, ChocolateFactory::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void ChocolateFactory::onEnterTransitionDidFinish()
{
}

ChocolateFactory::~ChocolateFactory()
{
}

void ChocolateFactory::update(float)
{
}
