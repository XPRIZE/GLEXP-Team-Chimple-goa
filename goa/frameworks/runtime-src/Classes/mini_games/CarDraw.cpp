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


void CarDraw::draw(cocos2d::DrawNode * paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint)
{
	paintingNode->drawSegment(fromPoint, currentPoint, 5, Color4F(27 / 255.0f, 190 / 255.0f, 78 / 255.0f, 1.0f));
}

void CarDraw::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
	CCLOG("111");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	Point localPoint = target->getParent()->getParent()->convertToNodeSpace(touchPoint);
	CCLOG("localPoint.x 1111 %f", localPoint.x);
	CCLOG("localPoint.y 1111 %f", localPoint.y);
	localPoint.x += visibleSize.width / 2;
	localPoint.y += visibleSize.height / 2;
	Point previous = touch->getPreviousLocation();
	//_road->drawSegment(previous, localPoint, 50, Color4F(1.0f, 1.0f, 1.0f, 1.0f));
	_car->setPosition(localPoint);
	auto diff = _car->getPosition() - touch->getLocation();
	_prevDegree = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));

}

void CarDraw::postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
	CCLOG("2222");
	auto target = event->getCurrentTarget();
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Point localPoint = target->getParent()->getParent()->convertToNodeSpace(touchPoint);
	CCLOG("localPoint.x 2222 %f", localPoint.x);
	CCLOG("localPoint.y 2222 %f", localPoint.y);
	localPoint.x += visibleSize.width / 2;
	localPoint.y += visibleSize.height / 2;
	Point previous = touch->getPreviousLocation();

	/*float dot = localPoint.x*100 + localPoint.y*100;
	float det = localPoint.x * 100 - localPoint.y*100;
	float angle = atan2(det, dot);
	float degree = angle * 180 / 22.7;
	_car->setRotation(degree);*/
	_road->drawSegment(previous, localPoint, 5, Color4F(1.0f, 1.0f, 1.0f, 1.0f));
	_car->setPosition(localPoint);
	auto diff = _car->getPosition() - touch->getLocation();
	auto angle = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));
	_car->setRotation(_car->getRotation() + (angle - _prevDegree));
	_prevDegree = angle;

}

void CarDraw::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
	CCLOG("3333");
}


bool CarDraw::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto bg = CSLoader::createNode("cardraw/cardraw.csb");
	this->addChild(bg);

	_car = bg->getChildByName("car_1");
	auto carDrawLiPi = carDrawNode::create(visibleSize.width, visibleSize.height, Vec2(visibleSize.width / 2, visibleSize.height / 2));
	carDrawLiPi->setOpacity(50);
	carDrawLiPi->setParent(this);
	this->addChild(carDrawLiPi);

	_road = DrawNode::create();
	this->addChild(_road);
	//cardraw / car.png
	_car = Sprite::createWithSpriteFrameName("cardraw/car.png");
	_car->setPosition(Vec2(200, 200));
	this->addChild(_car);

	return true;
}