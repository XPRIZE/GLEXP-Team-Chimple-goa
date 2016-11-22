//
//  ATM.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/11/16
//
//

#include "ATM.h"
#include "../menu/HelpLayer.h"


USING_NS_CC;

ATM::ATM()
{
}

ATM::~ATM()
{

}

ATM * ATM::create()
{
	ATM* ATMGame = new (std::nothrow) ATM();
	if (ATMGame && ATMGame->init()) {
		ATMGame->autorelease();
		return ATMGame;
	}
	CC_SAFE_DELETE(ATMGame);
	return nullptr;
}

cocos2d::Scene * ATM::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = ATM::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, ATM::gameName());
	scene->addChild(layer->menu);
	return scene;
}




bool ATM::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	
	//this->addChild(myLabel);




	return true;
}

void ATM::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto bg = CSLoader::createNode("ATM/ATM.csb");
	bg->setName("bg");
	this->addChild(bg);
	std::vector<std::string> childName = { "correct_button" , "ten","hundred","one" };
	for (int i = 0; i < 4; i++) {
		auto listenChild = bg->getChildByName(childName.at(i));
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, listenChild);
		_listner.push_back(listener);
	}
	_ten_XPosition = visibleSize.width / 1.45;
	_hundredXPosition = visibleSize.width / 1.45;
	_one_XPosition = visibleSize.width / 1.45;
	_hundreadLabel = Label::createWithTTF("0", "fonts/digital.ttf", 200);
	_hundreadLabel->setColor(Color3B(0, 0, 0));
	_hundreadLabel->setPositionX(bg->getChildByName("board_7")->getContentSize().width/2 );
	_hundreadLabel->setPositionY(bg->getChildByName("board_7")->getContentSize().height/2 + 40);
	bg->getChildByName("board_7")->addChild(_hundreadLabel);
	
}

bool ATM::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {
		CCLOG("clicked");
		CCLOG(" target Name = %s", target->getName().c_str());
		if (target->getName().compare("one") == 0) {
			oneNotePressed();
		}
		else if (target->getName().compare("hundred") == 0) {
			hundredNotePressed();
		}
		else if (target->getName().compare("ten") == 0) {
			tenNotePressed();
		}
	}
	return false;
}

void ATM::oneNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("1", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/1.png");
	sprite->setPosition(Vec2(myAtm->getPositionX(), myAtm->getPositionY() - 100));
	this->addChild(sprite);
	_oneCount++;
	_totalCount++;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);

	cocos2d::MoveTo * move;
	if (_oneCount < 6) {
		move = MoveTo::create(2, Vec2(_one_XPosition, 600));
	 }
	else if (_oneCount == 6) {
		_one_XPosition = visibleSize.width / 1.45;
		move = MoveTo::create(2, Vec2(_one_XPosition, 400));
	}
	else if (_oneCount > 6 && _oneCount < 11) {
		move = MoveTo::create(2, Vec2(_one_XPosition, 400));
	}
	if (_oneCount == 10) {
		///
		CCLOG("disable the listener");
		_listner.at(3)->setEnabled(false);
	}
	_one_XPosition += visibleSize.width*0.05;
	sprite->runAction(move);
}

void ATM::tenNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("10", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/10.png");
	sprite->setPosition(Vec2(myAtm->getPositionX(),myAtm->getPositionY()-100));
	this->addChild(sprite);
	_tensCount++;
	_totalCount += 10;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);

	cocos2d::MoveTo * move;
	if (_tensCount < 6) {
		move = MoveTo::create(2, Vec2(_ten_XPosition, 1000));
	}
	else if (_tensCount == 6) {
		_ten_XPosition = visibleSize.width / 1.45;
		move = MoveTo::create(2, Vec2(_ten_XPosition, 800));
	}
	else if (_tensCount > 6) {
		move = MoveTo::create(2, Vec2(_ten_XPosition, 800));
	}
	else if (_tensCount == 11) {
		///
	}
	_ten_XPosition += visibleSize.width*0.05;
	sprite->runAction(move);
}

void ATM::hundredNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("100", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/100.png");
	sprite->setPosition(Vec2(myAtm->getPositionX(), myAtm->getPositionY() - 100));
	this->addChild(sprite);
	_hundredCount++;

	_totalCount += 100;


	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);


	cocos2d::MoveTo * move;
	if (_hundredCount < 6) {
		move = MoveTo::create(2, Vec2(_hundredXPosition, 1400));
	}
	else if (_hundredCount == 6) {
		_hundredXPosition = visibleSize.width / 1.45;
		move = MoveTo::create(2, Vec2(_hundredXPosition, 1200));	
	}
	else if (_hundredCount > 6) {
		move = MoveTo::create(2, Vec2(_hundredXPosition, 1200));
	}
	else if (_hundredCount == 11) {
		///
	}
	_hundredXPosition += visibleSize.width*0.05;
	sprite->runAction(move);
}
