#include "Train.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

cocos2d::Scene * Train::createScene()
{
	auto scene = Scene::create();

	auto layer = Train::create();
	scene->addChild(layer);

	return scene;
}

bool Train::init()
{
	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	float width = (visibleSize.width * .90) / 3;

	auto node = CSLoader::createNode("train/train.csb");
	node->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
	node->setAnchorPoint(Vec2(.5, .5));
	this->addChild(node);

	auto train = Sprite::createWithSpriteFrameName("train/train.png");
	train->setPosition(Vec2(visibleSize.width * 8/100, visibleSize.height * 75 / 100));
	addChild(train);

	for (int i = 0; i < 3; i++)
	{
		auto sprite = Sprite::createWithSpriteFrameName("train/tunnel_front.png");
		sprite->setPosition(Vec2(visibleSize.width * .10 + (i + .5) * width , visibleSize.height * 75 / 100));
//		sprite->setScale(.9);
		addChild(sprite);
	}


	return true;
}