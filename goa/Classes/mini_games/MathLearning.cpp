#include "MathLearning.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;


Scene* MathLearning::createScene()
{
	auto scene = Scene::create();
	auto layer = MathLearning::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, MathLearning::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void MathLearning::onEnterTransitionDidFinish()
{

	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("find/find.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto findBackground = CSLoader::createNode("find/find.csb");
	this->addChild(findBackground, 0);
	findBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		findBackground->setPositionX(myGameWidth);
	}
	this->scheduleUpdate();
}

MathLearning::MathLearning()
{
}

MathLearning::~MathLearning()
{
}

void MathLearning::update(float dt)
{
}
