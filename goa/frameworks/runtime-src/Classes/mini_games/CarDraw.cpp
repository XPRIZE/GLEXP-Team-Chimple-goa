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
#include "../menu/HelpLayer.h"
#include "../util/CommonLabel.h"

USING_NS_CC;

CarDraw::CarDraw()
{
	_audio = nullptr;
}

CarDraw::~CarDraw()
{
	if (_audio != nullptr) {
		_audio->stopBackgroundMusic();
	}
	
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
	this->removeChildByName("gameHelpLayer");
	this->removeChildByName("Alphabet");
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
	cocos2d::ui::Button* refreshButton = _carDrawNodeLiPi->_button;
	
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
	if (_carStrokes.at(0)->getNumberOfPoints() > 20) {
		refreshButton->setEnabled(false);
	}
		//refreshButton->setEnabled(false);
}

void CarDraw::characterRecogination(std::vector<string> str)
{
	bool flage = false;

	if (str.size() > 0) {
		/*if ((str.at(0).compare("o") == 0 || str.at(0).compare("0") == 0) && (_myChar.compare("O") == 0)) {
			menu->addPoints(5);
			cocos2d::ui::Button* refreshButton = _carDrawNodeLiPi->_button;
			refreshButton->setEnabled(false);
			flage = true;
			_carDrawNodeLiPi->writingEnable(false);
		}*/
        
        for (std::vector<std::string>::iterator itStr = str.begin() ; itStr != str.end(); ++itStr)
        {
            std::string res = *itStr;
            if(res.compare(_myChar) == 0 && _gameEnd)
            {
				menu->addPoints(5);
				cocos2d::ui::Button* refreshButton = _carDrawNodeLiPi->_button;
				refreshButton->setEnabled(false);
                flage = true;
				_gameEnd = false;
                _carDrawNodeLiPi->writingEnable(false);
            }
        }
	}

	if (flage) {
		//this->unschedule(schedule_selector(CarDraw::clearScreen));
		carMoving();
		CCLOG("right");
	}
	else {
		cocos2d::ui::Button* refreshButton = _carDrawNodeLiPi->_button;
		refreshButton->setEnabled(true);
		//this->unschedule(schedule_selector(CarDraw::clearScreen));
		//this->scheduleOnce(schedule_selector(CarDraw::clearScreen), 4);
	}
}

void CarDraw::gameHelpLayer()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto helpLayer = HelpLayer::create(Rect(visibleSize.width / 2, visibleSize.height / 2, visibleSize.width / 2.8, visibleSize.height * 0.8), Rect(0, 0, 0, 0));
	std::vector <Point> points;
	float boxWidth = (visibleSize.width / 2.8)/2;
	float boxHeight = (visibleSize.height * 0.8)/2;
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2 , visibleSize.height / 2 + boxHeight*0.7));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	helpLayer->writing(points);
	this->addChild(helpLayer);
	helpLayer->setName("gameHelpLayer");
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
	
	return true;
}

void CarDraw::carMoving()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto car = Sprite::createWithSpriteFrameName("cardraw/car.png");
	car->setRotation(_prevDegree);
	this->addChild(car);
	car->setScale(-0.65);
	_audio = CocosDenshion::SimpleAudioEngine::getInstance();
	_audio->playBackgroundMusic("sounds/sfx/carSound.wav", true);
	//audio->playEffect("sounds/sfx/carSound.wav", true);
	Vector< FiniteTimeAction * > fta;
	Vector< FiniteTimeAction * > rotateAction;
	for (int i = 0; i < _carStrokes.size(); i++) {
		for (int j = 1; j <_carStrokes.at(i)->getNumberOfPoints(); j++) {
			float x = _carStrokes.at(i)->getPointAt(j).x;//+ visibleSize.width / 2;
			float y = _carStrokes.at(i)->getPointAt(j).y;// +visibleSize.height / 2;

			auto distance = ccpDistance(_carStrokes.at(i)->getPointAt(j - 1), _carStrokes.at(i)->getPointAt(j));
			_distance.push_back(distance);
			auto moveAction = MoveTo::create(distance/300, Vec2(x, visibleSize.height-y));
			fta.pushBack(moveAction);


			Point p1 = Vec2(_carStrokes.at(i)->getPointAt(j - 1).x, -_carStrokes.at(i)->getPointAt(j - 1).y + visibleSize.height);
			Point p2 = Vec2(_carStrokes.at(i)->getPointAt(j).x, -_carStrokes.at(i)->getPointAt(j).y + visibleSize.height);

			auto diff = p1 - p2;
			auto angle = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));
			CCLOG("Angle = %f", angle);
			if ((_carPreviousAngle - angle < 30) && (_carPreviousAngle - angle > -30)) {
				angle = (_carPreviousAngle + angle)/2;
			}
			_carPreviousAngle = angle;
			CCLOG(" after Angle = %f", angle);

			auto rotateAction1 = RotateTo::create(distance / 300, angle);
			rotateAction.pushBack(rotateAction1);
		}	
/*		for (int k = 0; k < _carStrokes.at(i)->getNumberOfPoints() - 10; k = k + 10) {
			float avgTime = 0.0f;
			//if (k > 0 && k< _carStrokes.size() - 10) {
				float avgAngle = 0.0f;
				for (int kk = 0; kk < 10; kk++) {
					Point p1 = Vec2(_carStrokes.at(i)->getPointAt(k - 1).x,  - _carStrokes.at(i)->getPointAt(k - 1).y + visibleSize.height);
					Point p2 = Vec2(_carStrokes.at(i)->getPointAt(kk+k).x, -_carStrokes.at(i)->getPointAt(kk + k).y + visibleSize.height);

					auto diff = p1 - p2;
					auto angle = CC_RADIANS_TO_DEGREES(atan2(diff.x, diff.y));
					
					if ((angle) > 179) {
						CCLOG("180");
						angle = _carPreviousAngle;
					}
					avgTime += _distance.at(k + kk);
					avgAngle += angle;
				}
				int angleee = ((avgAngle / 10) + _carPreviousAngle) / 2;
				CCLOG("angle %d", angleee);
				_carPreviousAngle = angleee;
				if (i == 0) {
					auto rotateAction1 = RotateTo::create(avgTime/100, angleee);
					rotateAction.pushBack(rotateAction1);
					//rotateAction.pushBack(DelayTime::create(0.5));
					
				}
				else {
					auto rotateAction1 = RotateTo::create(avgTime/100, angleee);
					rotateAction.pushBack(rotateAction1);
				}
				
				//rotateAction.pushBack(DelayTime::create(0.51));
		//	}
			/*else if (k> _carStrokes.size() - 5) {
				auto diff = _carStrokes.at(i)->getPointAt(k - 1) - _carStrokes.at(i)->getPointAt(k);
				auto angle = CC_RADIANS_TO_DEGREES(atan2((int)diff.x, (int)diff.y));
				CCLOG("111111s angle %f", angle);
				auto rotateAction1 = RotateTo::create(0.05f, angle);
				rotateAction.pushBack(rotateAction1);
			}*/
	//	}
	}
	auto showScore = CallFunc::create([=]() {
		_audio->stopBackgroundMusic();
		menu->showScore();
		 });


	auto rotateScore = CallFunc::create([=]() {
		CCLOG("rotation done!!!");
		//menu->showScore();
	});
	rotateAction.pushBack(rotateScore);
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
	CCLOG("clearScreen");
	menu->addPoints(-1);
	_carStrokes.clear();
//	_carDrawNodeLiPi->clearDrawing(nullptr, cocos2d::ui::Widget::TouchEventType::ENDED);
	gameStart();
}

void CarDraw::gameStart()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	if ((menu->getCurrentLevel() > 0) && (menu->getCurrentLevel() < 27)) {
		if (menu->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) {
			int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
			auto mychar = LangUtil::getInstance()->getAllCharacters()[randomNumber];
			_myChar = LangUtil::convertUTF16CharToString(mychar);
		}
		else {
			_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
		}

	}
	else if ((menu->getCurrentLevel() > 26) && (menu->getCurrentLevel() < 53)) {
		int level = menu->getCurrentLevel() - 27;
		if (level > LangUtil::getInstance()->getNumberOfCharacters()) {
			int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
			auto mychar = LangUtil::getInstance()->getAllLowerCaseCharacters()[randomNumber];
			_myChar = LangUtil::convertUTF16CharToString(mychar);
		}
		else {
			_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllLowerCaseCharacters()[level]);
		}

	}
	else {
		int level = menu->getCurrentLevel() - 53;
		auto mychar = LangUtil::getInstance()->getAllNumbers()[level];
		_myChar = LangUtil::convertUTF16CharToString(mychar);

	}
	//_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
	auto myLabel = CommonLabel::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), _myChar);
	myLabel->setPositionX(visibleSize.width/2);
	myLabel->setPositionY(visibleSize.height / 2);
	myLabel->setScale(3);
	this->addChild(myLabel);
	if (_helpLayerFlag && menu->getCurrentLevel() == 1) {
		_helpLayerFlag = false;
		myLabel->setName("Alphabet");
	}
	else {
		auto fadeOut = FadeOut::create(2.0f);
		myLabel->runAction(fadeOut);
	}

}

void CarDraw::onEnterTransitionDidFinish()
{
	_helpLayerFlag = true;
	gameStart();
	menu->setMaxPoints(5);
	if (menu->getCurrentLevel() == 1) {
		gameHelpLayer();
	}
}
