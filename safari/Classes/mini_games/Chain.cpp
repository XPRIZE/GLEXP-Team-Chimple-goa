#include "Chain.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

Scene* Chain::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = Chain::create();

	// add layer as a child to scene
	scene->addChild(layer);
	/*layer->_menuContext = MenuContext::create(layer, Chain::gameName());
	scene->addChild(layer->_menuContext);*/

	return scene;
}

// on 'init' you need to initialize your instance
bool Chain::init()
{
	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("crossthebridge.plist");

	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}
	auto gameBG = CSLoader::createNode("crossthebridge/MainScene.csb");
	this->addChild(gameBG, 1);

	return true;
}
