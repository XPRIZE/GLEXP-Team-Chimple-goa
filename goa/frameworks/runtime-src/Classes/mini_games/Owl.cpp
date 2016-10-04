#include "Owl.h"

USING_NS_CC;

Scene* Owl::createScene()
{
	auto scene = Scene::create();
	auto layer = Owl::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, "owl");
	scene->addChild(layer->_menuContext);
	return scene;
}

bool Owl::init()
{
	if (!Layer::init()) { return false; }

	//CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	//framecache1->addSpriteFramesWithFile("Owl/Owl.plist");
	//CCSpriteFrameCache* framecache2 = CCSpriteFrameCache::sharedSpriteFrameCache();
	//framecache2->addSpriteFramesWithFile("endlessrunner/endlessrunner_01.plist");

	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	return true;
}

void Owl::update(float delta) {


}

Owl::~Owl(void)
{
	this->removeAllChildrenWithCleanup(true);
}
