#include "Jasmin_Mainfile.h"
#include "editor-support/cocostudio/CocoStudio.h"

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

	auto bg = CSLoader::createNode("jasmine/jasminemainscene.csb");
	bg->setPosition(Vec2(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2));
	bg->setAnchorPoint(Vec2(.5, .5));
	this->addChild(bg);

	startGame();

    return true;
}

void Jasmin_Mainfile::startGame()
{
	auto tg = TextGenerator::getInstance();
	auto str = tg->generateAWord();
	auto matrix = tg->generateMatrix(str, 2, 8);
}
