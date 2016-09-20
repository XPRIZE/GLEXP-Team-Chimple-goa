#include "Stack.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Stack::Stack() {

}

Stack::~Stack() {

}


Scene* Stack::createScene()
{
	auto scene = Scene::create();
	auto layer = Stack::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Stack::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool Stack::init()
{
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	return true;
}

