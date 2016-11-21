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
	std::vector<std::string> childName = { "correct_button_20" , "Sprite_81","hundred","one" };
	for (int i = 0; i < 4; i++) {
		auto listenChild = bg->getChildByName(childName.at(i));
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, listenChild);
	}
	_ten_XPosition = visibleSize.width / 1.45;

	_hundreadLabel = Label::createWithTTF("0 X ", "fonts/digital.ttf", 100);
	_hundreadLabel->setPositionX(visibleSize.width / 1.45);
	_hundreadLabel->setPositionY(visibleSize.height / 2);
	this->addChild(_hundreadLabel);

	auto sprite = Sprite::createWithSpriteFrameName("ATM/100.png");
	sprite->setPosition(Vec2(visibleSize.width / 1.15, visibleSize.height / 2));
	this->addChild(sprite);
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
			tenNotePressed();
		}
		else if (target->getName().compare("Sprite_81") == 0) {
			hundredNotePressed();
		}
	}
	return false;
}

void ATM::oneNotePressed()
{
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("1", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/1.png");
}

void ATM::tenNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("100", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/100.png");
	sprite->setPosition(Vec2(myAtm->getPositionX(),myAtm->getPositionY()-100));
	this->addChild(sprite);
	_hundredCount++;
	auto move = MoveTo::create(2, Vec2(_ten_XPosition, 1400));
	_ten_XPosition += visibleSize.width*0.05;
	sprite->runAction(move);


	std::stringstream ss;
	ss << _hundredCount;
	std::string str = ss.str();
	_hundreadLabel->setString(str+" X ");

}

void ATM::hundredNotePressed()
{
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("10", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/100.png");
}
