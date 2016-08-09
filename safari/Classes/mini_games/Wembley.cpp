#include "Wembley.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

float Wembley::height;
float Wembley::width;
float Wembley::originX;
float Wembley::originY;

Scene* Wembley::createScene()
{
	auto scene = Scene::create();
	auto layer = Wembley::create();
	scene->addChild(layer);

	return scene;
}

// on "init" you need to initialize your instance
bool Wembley::init()
{
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	Wembley::height = visibleSize.height;
	Wembley::width = visibleSize.width;
	Wembley::originX = origin.x;
	Wembley::originY = origin.y;

	auto bg = CSLoader::createNode("wembley/wembleybg.csb");
	bg->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
	bg->setAnchorPoint(Vec2(.5, .5));
	this->addChild(bg);

	startGame();

	return true;
}

void Wembley::startGame()
{
	auto tg = TextGenerator::getInstance();
	auto str = tg->generateAWord();
	auto matrix = tg->generateMatrix(str, 2, 8);
}
