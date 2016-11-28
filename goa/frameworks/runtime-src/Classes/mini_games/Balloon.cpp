#include "Balloon.h"
#include "../menu/HelpLayer.h"
#include <math.h> 


Scene* Balloon::createScene()
{
	auto scene = Scene::create();
	auto layer = Balloon::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Balloon::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Balloon::onEnterTransitionDidFinish()
{
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("shoping/shoping.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();
}
Balloon::~Balloon()
{

}

void Balloon::update(float dt)
{
	
}
