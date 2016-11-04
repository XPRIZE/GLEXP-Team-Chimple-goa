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
	//_car->setPosition(localPoint);
	auto diff = _car->getPosition() - touch->getLocation();
	_prevDegree = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));
	_carCurrentStroke = new Stroke();
	_carCurrentStroke->addPoints(localPoint.x, localPoint.y);

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
	//_car->setPosition(localPoint);
	_carCurrentStroke->addPoints(localPoint.x, localPoint.y);
	auto diff = _car->getPosition() - touch->getLocation();
	auto angle = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));
	//_car->setRotation(_car->getRotation() + (angle - _prevDegree));
//	_prevDegree = angle;

}

void CarDraw::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
	auto target = event->getCurrentTarget();
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Point localPoint = target->getParent()->getParent()->convertToNodeSpace(touchPoint);
	CCLOG("localPoint.x 2222 %f", localPoint.x);
	CCLOG("localPoint.y 2222 %f", localPoint.y);
	localPoint.x += visibleSize.width / 2;
	localPoint.y += visibleSize.height / 2;
	CCLOG("3333");
	_carCurrentStroke->addPoints(localPoint.x, localPoint.y);
	_carStrokes.push_back(_carCurrentStroke);
}

void CarDraw::characterRecogination(std::vector<string> str)
{
	bool flage = false;
	if (str.at(0).compare(_myChar) == 0 || str.at(1).compare(_myChar) == 0) {
		flage = true;
	}
	if (flage) {
		this->unschedule(schedule_selector(CarDraw::clearScreen));
		carMoving();
		CCLOG("right");
	}
	else {
		this->unschedule(schedule_selector(CarDraw::clearScreen));
		this->scheduleOnce(schedule_selector(CarDraw::clearScreen), 4);
	}
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
	CCLOG("?????????????????game Start???????????????????");
	_car = bg->getChildByName("car_1");
	_carDrawNodeLiPi = carDrawNode::create(visibleSize.width, visibleSize.height, Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_carDrawNodeLiPi->setOpacity(50);
	_carDrawNodeLiPi->setParent(this);
	this->addChild(_carDrawNodeLiPi);
	CCLOG("//////////////////////LIPI//////////////////");
	_road = DrawNode::create();
	_road->setName("roadNode");
	this->addChild(_road);
	//cardraw / car.png
	_car = Sprite::createWithSpriteFrameName("cardraw/car.png");
	_car->setPosition(Vec2(200, 200));
	this->addChild(_car);
	
	return true;
}

void CarDraw::carMoving()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto car = Sprite::createWithSpriteFrameName("cardraw/car.png");
	car->setRotation(_prevDegree);
	this->addChild(car);
	car->setScale(0.5);
	Vector< FiniteTimeAction * > fta;
	Vector< FiniteTimeAction * > rotateAction;
	for (int i = 0; i < _carStrokes.size(); i++) {
		for (int j = 0; j <_carStrokes.at(i)->getNumberOfPoints(); j++) {
			float x = _carStrokes.at(i)->getPointAt(j).x;//+ visibleSize.width / 2;
			float y = _carStrokes.at(i)->getPointAt(j).y;// +visibleSize.height / 2;
			auto moveAction = MoveTo::create(0.05f, Vec2(x, visibleSize.height-y));
			fta.pushBack(moveAction);
		}	
		for (int k = 0; k < _carStrokes.at(i)->getNumberOfPoints() - 10; k = k + 10) {
			if (k > 0 && k< _carStrokes.size() - 10) {
				float avgAngle = 0.0f;
				for (int kk = 0; kk < 10; kk++) {
					Point p1 = Vec2(_carStrokes.at(i)->getPointAt(k - 1).x,  - _carStrokes.at(i)->getPointAt(k - 1).y + visibleSize.height);
					Point p2 = Vec2(_carStrokes.at(i)->getPointAt(kk+k).x, -_carStrokes.at(i)->getPointAt(kk + k).y + visibleSize.height);

					auto diff = p1 - p2;
					auto angle = CC_RADIANS_TO_DEGREES(atan2((int)diff.x, (int)diff.y));
					CCLOG("angle %f", angle);
					if ((angle) > 179) {
						CCLOG("180");
						angle = _carPreviousAngle;
					}
					_carPreviousAngle = angle;
					avgAngle += angle;
				}
				int angleee = ((avgAngle / 10) + _carPreviousAngle) / 2;
				auto rotateAction1 = RotateTo::create(0.05f, angleee);
				rotateAction.pushBack(rotateAction1);
				rotateAction.pushBack(DelayTime::create(0.5));
			}
			else if (k> _carStrokes.size() - 5) {
				auto diff = _carStrokes.at(i)->getPointAt(k - 1) - _carStrokes.at(i)->getPointAt(k);
				auto angle = CC_RADIANS_TO_DEGREES(atan2((int)diff.x, (int)diff.y));
				CCLOG("111111s angle %f", angle);
				auto rotateAction1 = RotateTo::create(0.05f, angle);
				rotateAction.pushBack(rotateAction1);
			}
		}
	}
	auto showScore = CallFunc::create([=]() {
		menu->showScore();
		 });

	fta.pushBack(showScore);


	auto seq = Sequence::create(fta);
	car->runAction(seq);
	auto seq1 = Sequence::create(rotateAction);
	car->runAction(seq1);
	fta.clear();
}

void CarDraw::clearScreen(float ft)
{
	//CC_CALLBACK_2()
	_carStrokes.clear();
	_carDrawNodeLiPi->clearDrawing(nullptr, cocos2d::ui::Widget::TouchEventType::ENDED);
	gameStart();
}

void CarDraw::gameStart()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
	auto myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), _myChar);
	myLabel->setPositionX(visibleSize.width/2);
	myLabel->setPositionY(visibleSize.height / 2);
	myLabel->setScale(2);
	this->addChild(myLabel);
	auto fadeOut = FadeOut::create(2.0f);
	myLabel->runAction(fadeOut);

}

void CarDraw::onEnterTransitionDidFinish()
{
	gameStart();
}
