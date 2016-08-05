#include "Jasmin_Mainfile.h"

USING_NS_CC;

float Jasmin_Mainfile::height;
float Jasmin_Mainfile::width;
float Jasmin_Mainfile::originX;
float Jasmin_Mainfile::originY;

Scene* Jasmin_Mainfile::createScene()
{
    auto scene = Scene::create();    
    auto layer = Jasmin_Mainfile::create();
    scene->addChild(layer);

    return scene;
}

// on "init" you need to initialize your instance
bool Jasmin_Mainfile::init()
{
    if (!Layer::init())
    {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	Jasmin_Mainfile::height = visibleSize.height;
	Jasmin_Mainfile::width = visibleSize.width;
	Jasmin_Mainfile::originX = origin.x;
	Jasmin_Mainfile::originY = origin.y;

	auto sp = Sprite::create("HelloWorld.png");
	sp->setPosition(visibleSize.width/2, visibleSize.height/2);
	sp->runAction(Liquid::create(2, Size(32, 24), 1, 20));
	this->addChild(sp);

//	startGame();

    return true;
}

void startGame()
{

}
