//
//  CarDraw.cpp 
//  goa
//
//  Created by Kirankumar CS on 05/10/16
//
//

#include "CarDraw.h"
#include "../WordSceneLipiTKNode.h"
#include "CarDrawNode.h"

USING_NS_CC;

//carDrawNode * carDrawLiPi;

CarDraw::CarDraw()
{
}

CarDraw::~CarDraw()
{

}

CarDraw * CarDraw::create()
{
	CarDraw* hippoGame = new(std::nothrow) CarDraw();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * CarDraw::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = CarDraw::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "cardraw");
	scene->addChild(layer->menu);
	return scene;
}


//void CarDraw::draw(cocos2d::DrawNode * paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint)
//{
//}

void CarDraw::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

void CarDraw::postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

void CarDraw::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

bool CarDraw::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
//	carDrawLiPi = new (std::nothrow) 
	auto bg = CSLoader::createNode("cardraw/cardraw.csb");
	this->addChild(bg);
	//carDrawLiPi = new (std::nothrow) carDrawNode();
	//carDrawLiPi->create(visibleSize.width / 2, visibleSize.height / 2, Vec2(100, 100));
	//this->addChild(carDrawLiPi);
	return true;
}