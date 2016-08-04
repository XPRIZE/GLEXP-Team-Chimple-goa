#include "Baja.h"

USING_NS_CC;

Scene* Baja::createScene()
{
	auto scene = Scene::create();
	auto layer = Baja::create();
	scene->addChild(layer);
	return scene;
}

bool Baja::init()
{
	if (!Layer::init()){ return false; }

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto label = Label::createWithTTF("BAJA GAME", "fonts/Marker Felt.ttf",300);

	label->setPosition(Vec2(origin.x + visibleSize.width / 2,
		origin.y + visibleSize.height - label->getContentSize().height));
	this->addChild(label, 1);

	return true;
}
