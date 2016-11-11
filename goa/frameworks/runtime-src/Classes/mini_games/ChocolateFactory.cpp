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
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	_dropCurrentTheme ="drophero";

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}
	else if (!_dropCurrentTheme.compare("drophero"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/drophero.plist");
	}
	else
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/dropcity.plist");
	}

	// BackGround
	auto dropBackground = CSLoader::createNode("drophero/drophero.csb");
	this->addChild(dropBackground, 0);
}

ChocolateFactory::~ChocolateFactory()
{
}

void ChocolateFactory::update(float)
{
}
