#include "Drop.h"

USING_NS_CC;

Scene* Drop::createScene()
{
	auto scene = Scene::create();
	auto layer = Drop::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, "drop");
	scene->addChild(layer->_menuContext);
	return scene;
}

bool Drop::init()
{
	if (!Layer::init()) { return false; }

	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	return true;
}

void Drop::update(float delta) {


}

Drop::~Drop(void)
{
	this->removeAllChildrenWithCleanup(true);
}
