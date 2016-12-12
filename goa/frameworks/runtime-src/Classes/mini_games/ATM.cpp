//
//  ATM.cpp 
//  goa
//
//  Created by Kirankumar CS on 21/11/16
//
//

#include "ATM.h"
#include "../menu/HelpLayer.h"
#include "../effects/FShake.h"

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

	_levelMapping = {

		{ 1,  //level number
		{
			{ 1, 20 } //{starting number , ending number}
		} },
		{ 2,
		{
			{ 1, 40 }
		} },
		{ 3,
		{
			{ 1, 60 }
		} },
		{ 4,
		{
			{ 1, 80 }
		} },
		{ 5,
		{
			{ 1, 100 }
		} },
		{ 6,
		{
			{ 100, 150 }
		} },
		{ 7,
		{
			{ 150, 200 }
		} },
		{ 8,
		{
			{ 200, 250 }
		} },
		{ 9,
		{
			{ 250, 300 }
		} },
		{ 10,
		{
			{ 300, 350 }
		} },
		{ 11,
		{
			{ 350, 400 }
		} },
		{ 12,
		{
			{ 400, 450 }
		} },
		{ 13,
		{
			{ 450, 500 }
		} },
		{ 14,
		{
			{ 500, 550 }
		} },
		{ 15,
		{
			{ 550, 600 }
		} },
		{ 16,
		{
			{ 600, 650 }
		} },
		{ 17,
		{
			{ 650, 700 }
		} },
		{ 18,
		{
			{ 700, 750 }
		} },
		{ 19,
		{
			{ 750, 800 }
		} },
		{ 20,
		{
			{ 800, 850 }
		} },
		{ 21,
		{
			{ 850, 900 }
		} },
		{ 22,
		{
			{ 900, 950 }
		} },
		{ 23,
		{
			{ 950, 1000 }
		} },
		{ 24,
		{
			{ 1000,1100 }
		} },
		{ 25,
		{
			{ 1,1000}
		} }
	};





	return true;
}

void ATM::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto bg = CSLoader::createNode("ATM/ATM.csb");
	bg->setName("bg");
	if (visibleSize.width > 2560) {
		_extraX = (visibleSize.width - 2560) / 2;
		bg->setPositionX((visibleSize.width - 2560)/2);
	}
	this->addChild(bg);
	_touched = true;
	
	auto level = _levelMapping.at(menu->getCurrentLevel());
	auto firstNumber = level.begin()->first;
	auto lastNumber = level.begin()->second;

	
	_targetedNumber = cocos2d::RandomHelper::random_int(firstNumber, lastNumber);
	
	

	menu->setMaxPoints(_targetedNumber);

	std::vector<std::string> childName = { "correct_button" , "ten","hundred","one" };
	for (int i = 0; i < 4; i++) {
		auto listenChild = bg->getChildByName(childName.at(i));
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, listenChild);
		_listner.push_back(listener);
	}
	_ten_XPosition = (2560 / 1.41) + _extraX;//(2560 / 1.41) + _extraX;
	_hundredXPosition = (2560 / 1.41) + _extraX;
	_one_XPosition = (2560 / 1.41) + _extraX;
	_hundreadLabel = Label::createWithTTF("0", "fonts/digital.ttf", 200);
	_hundreadLabel->setColor(Color3B(0, 0, 0));
	_hundreadLabel->setPositionX(bg->getChildByName("board_7")->getContentSize().width/2 );
	_hundreadLabel->setPositionY(bg->getChildByName("board_7")->getContentSize().height/2 + 20);
	bg->getChildByName("board_7")->addChild(_hundreadLabel);


	std::stringstream ss;
	ss << _targetedNumber;
	std::string str = ss.str();

	auto targetLabel = Label::createWithTTF(str, "fonts/digital.ttf", 200);
	targetLabel->setColor(Color3B(0, 0, 0));
	targetLabel->setPositionX(bg->getChildByName("atm_machine_67")->getContentSize().width/2);
	targetLabel->setPositionY(bg->getChildByName("atm_machine_67")->getContentSize().height * 0.915);
	bg->getChildByName("atm_machine_67")->addChild(targetLabel);

	if (menu->getCurrentLevel() == 1) {
		helpLayer();
	}
}

bool ATM::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location) && _touched) {  // && _touched
		_touched = false;
		auto  audio = CocosDenshion::SimpleAudioEngine::getInstance();
		auto scale = ScaleBy::create(0.1, 0.75);
		target->runAction(Sequence::create(scale, scale->reverse(), NULL));
		this->removeChildByName("help");

		CCLOG(" target Name = %s", target->getName().c_str());
		if (target->getName().compare("one") == 0) {
			audio->playEffect("sounds/sfx/atm.ogg", false);
			_gameScore = _gameScore + 1;
			if (_targetedNumber < _gameScore) {
				menu->addPoints(-1);
			}
			else {
				menu->addPoints(1);
			}
			oneNotePressed();
		}
		else if (target->getName().compare("hundred") == 0) {
			audio->playEffect("sounds/sfx/atm.ogg", false);
			_gameScore = _gameScore + 100;
			if (_targetedNumber < _gameScore) {
				menu->addPoints(-100);
			}
			else {
				menu->addPoints(100);
			}
			hundredNotePressed();
		}
		else if (target->getName().compare("ten") == 0) {
			audio->playEffect("sounds/sfx/atm.ogg", false);
			_gameScore = _gameScore + 10;
			if (_targetedNumber < _gameScore) {
				menu->addPoints(-10);
			}
			else {
				menu->addPoints(10);
			}
			tenNotePressed();
		}
		else if (target->getName().compare("oneNote") == 0) {
			//tenNotePressed();
			_gameScore = _gameScore - 1;
			//menu->addPoints(-1);
			if (_targetedNumber < _gameScore) {
				menu->addPoints(0.5);
			}
			else {
				menu->addPoints(-1);
			}
			rePositionOneNotes(target);
		}
		else if (target->getName().compare("tenNote") == 0) {
			//tenNotePressed();
			_gameScore = _gameScore - 1;
			if (_targetedNumber < _gameScore) {
				menu->addPoints(5);
			}
			else {
				menu->addPoints(-10);
			}
			rePositionTenNotes(target);
		}
		else if (target->getName().compare("hundredNote") == 0) {
			//tenNotePressed();
			_gameScore = _gameScore - 1;
			if (_targetedNumber < _gameScore) {
				menu->addPoints(50);
			}
			else {
				menu->addPoints(-100);
			}
			rePositionHundredNotes(target);
		}
		else if (target->getName().compare("correct_button") == 0) {
			answerCheck();
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
	sprite->setPosition(Vec2(myAtm->getPositionX()+ _extraX, myAtm->getPositionY() - 100));
	sprite->setName("oneNote");
	sprite->setVisible(false);
	this->addChild(sprite);
	_oneCount++;
	_totalCount++;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);

	cocos2d::MoveTo * move;
	if (_oneCount < 6) {
		move = MoveTo::create(1, Vec2(_one_XPosition, 1350));
	 }
	else if (_oneCount == 6) {
		_one_XPosition = (2560 / 1.41) + _extraX;
		move = MoveTo::create(1, Vec2(_one_XPosition, 1150));
	}
	else if (_oneCount > 6 && _oneCount < 11) {
		move = MoveTo::create(1, Vec2(_one_XPosition, 1150));
	}
	if (_oneCount == 10) {
		///
		CCLOG("disable the listener");
		_listner.at(3)->setEnabled(false);
	}
	_one_XPosition += visibleSize.width*0.05;
	sprite->runAction(Sequence::create(DelayTime::create(1.3), CallFunc::create([=]() { sprite->setVisible(true); }), move, CallFunc::create([=]() {
		_touched = true;
		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, sprite);
	}), NULL));
	_onesSprite.push_back(sprite);
	
	
}

void ATM::tenNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("10", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/10.png");
	sprite->setPosition(Vec2(myAtm->getPositionX()+ _extraX,myAtm->getPositionY()-100));
	sprite->setName("tenNote");
	sprite->setVisible(false);
	this->addChild(sprite);
	_tensCount++;
	_totalCount += 10;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);

	cocos2d::MoveTo * move;
	if (_tensCount < 6) {
		move = MoveTo::create(1, Vec2(_ten_XPosition, 950));
	}
	else if (_tensCount == 6) {
		_ten_XPosition = (2560 / 1.41) + _extraX;
		move = MoveTo::create(1, Vec2(_ten_XPosition, 750));
	}
	else if (_tensCount > 6 ) {
		move = MoveTo::create(1, Vec2(_ten_XPosition, 750));
	}
	if (_tensCount == 10) {
		CCLOG("disable the listener");
		_listner.at(1)->setEnabled(false);
	}
	_ten_XPosition += visibleSize.width*0.05;
	//sprite->runAction(move);
	_tensSprite.push_back(sprite);
	sprite->runAction(Sequence::create(DelayTime::create(1.3), CallFunc::create([=]() { sprite->setVisible(true); }), move, CallFunc::create([=]() {
		_touched = true;
		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, sprite);
	}), NULL));
}

void ATM::hundredNotePressed()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto myAtm = this->getChildByName("bg")->getChildByName("notemachine");
	auto timeLine = CSLoader::createTimeline("ATM/notemachine.csb");
	myAtm->runAction(timeLine);
	timeLine->play("100", false);
	auto sprite = Sprite::createWithSpriteFrameName("ATM/100.png");
	sprite->setPosition(Vec2(myAtm->getPositionX()+ _extraX, myAtm->getPositionY() - 100));
	sprite->setName("hundredNote");
	sprite->setVisible(false);
	this->addChild(sprite);
	_hundredCount++;
	_totalCount += 100;
	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();
	_hundreadLabel->setString(str);
	cocos2d::MoveTo * move;
	if (_hundredCount < 6) {
		move = MoveTo::create(1, Vec2(_hundredXPosition, 550));
	}
	else if (_hundredCount == 6) {
		_hundredXPosition = (2560 / 1.41) + _extraX;
		move = MoveTo::create(1, Vec2(_hundredXPosition, 350));	
	}
	else if (_hundredCount > 6) {
		move = MoveTo::create(1, Vec2(_hundredXPosition, 350));
	}
	if (_hundredCount == 10) {
		CCLOG("disable the listener");
		_listner.at(2)->setEnabled(false);
	}
	_hundredXPosition += visibleSize.width*0.05;
	//sprite->runAction(move);
	_hundredsSprite.push_back(sprite);
	
	sprite->runAction(Sequence::create(DelayTime::create(1.3), CallFunc::create([=]() { sprite->setVisible(true); }), move, CallFunc::create([=]() {
		_touched = true;
		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(ATM::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, sprite);
	}), NULL));
}

void ATM::rePositionOneNotes(cocos2d::Node * note)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto one = this->getChildByName("bg")->getChildByName("one");
	_one_XPosition -= visibleSize.width*0.05;
	_oneCount--;
	_totalCount--;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);
	if (_oneCount == 0) {
		_one_XPosition = (2560 / 1.41) + _extraX;
	}

	auto notes = _onesSprite.at(_onesSprite.size() - 1);
	auto move = MoveTo::create(1, Vec2(one->getPositionX()+ _extraX,one->getPositionY()));
	notes->runAction(move);
	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=]() {
		_onesSprite.pop_back();
		_touched = true;
		this->removeChild(notes);
		_listner.at(3)->setEnabled(true);
	}), NULL));
}

void ATM::rePositionTenNotes(cocos2d::Node * note)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto one = this->getChildByName("bg")->getChildByName("ten");
	_ten_XPosition -= visibleSize.width*0.05;
	_tensCount--;
	_totalCount -= 10;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);
	if (_tensCount == 0) {
		_ten_XPosition = (2560 / 1.41) + _extraX;
	}

	auto notes = _tensSprite.at(_tensSprite.size() - 1);
	auto move = MoveTo::create(1, Vec2(one->getPositionX() + _extraX, one->getPositionY()));
	notes->runAction(move);
	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=]() {
		_tensSprite.pop_back();
		_touched = true;
		this->removeChild(notes);
		_listner.at(1)->setEnabled(true);
	}), NULL));
}

void ATM::rePositionHundredNotes(cocos2d::Node * note)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto one = this->getChildByName("bg")->getChildByName("hundred");
	_hundredXPosition -= visibleSize.width*0.05;
	_hundredCount--;
	_totalCount -= 100;

	std::stringstream ss;
	ss << _totalCount;
	std::string str = ss.str();

	_hundreadLabel->setString(str);

	auto notes = _hundredsSprite.at(_hundredsSprite.size() - 1);
	if (_hundredCount == 0) {
		_hundredXPosition = (2560 / 1.41) + _extraX;
	}
	auto move = MoveTo::create(1, Vec2(one->getPositionX() + _extraX, one->getPositionY()));
	notes->runAction(move);
	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=]() {
		_hundredsSprite.pop_back();
		_touched = true;
		this->removeChild(notes);
		_listner.at(2)->setEnabled(true);
	}), NULL));
}

void ATM::answerCheck()
{
	auto  audio = CocosDenshion::SimpleAudioEngine::getInstance();
	if (_targetedNumber == _totalCount) {
		//winning
		CCLOG("win !!!!");
		//menu->addPoints(1);
		CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("ATM/particle_atm.plist");
		_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("ATM/particle_atm.png"));
		//_particle->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
		this->addChild(_particle);
		auto star = this->getChildByName("bg")->getChildByName("star");
		auto timeLine = CSLoader::createTimeline("ATM/star.csb");
		star->runAction(timeLine);
		//timeLine->play("win", true);
		audio->playEffect("sounds/sfx/success.ogg", false);
		this->runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() {
			this->removeChild(_particle);
			menu->showScore();
		}), NULL));
	}
	else {
		auto star = this->getChildByName("bg")->getChildByName("correct_button");
		FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
		star->runAction(Sequence::create(shake, CallFunc::create([=]() {
			_touched = true;
		}), NULL));
		audio->playEffect("sounds/sfx/error.ogg", false);
		//menu->addPoints(-1);	
	}
}

void ATM::helpLayer()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto note = this->getChildByName("bg")->getChildByName("one");
	float extraX = (visibleSize.width - 2560) / 2;
	if (_targetedNumber == 10 || _targetedNumber == 20) {
		note = this->getChildByName("bg")->getChildByName("ten");
	}
	auto machine = this->getChildByName("bg")->getChildByName("atm_machine_67")->getPosition();
	auto help = HelpLayer::create(Rect(note->getPositionX() + extraX, note->getPositionY(), note->getContentSize().width, note->getContentSize().height), Rect(extraX + machine.x, this->getChildByName("bg")->getChildByName("atm_machine_67")->getContentSize().height*0.4 + machine.y, 400, 200));
	help->click(Vec2(note->getPositionX() + extraX, note->getPositionY()));
	this->addChild(help);
	help->setName("help");
}
