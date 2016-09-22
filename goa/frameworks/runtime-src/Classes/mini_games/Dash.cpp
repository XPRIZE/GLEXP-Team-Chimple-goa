//
//  Dash.cpp 
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//



#include "Dash.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

Dash::Dash()
{
}

Dash::~Dash()
{

}

Dash * Dash::create()
{
	Dash* dashGame = new (std::nothrow) Dash();
	if (dashGame && dashGame->init()) {
		dashGame->autorelease();
		return dashGame;
	}
	CC_SAFE_DELETE(dashGame);
	return nullptr;
}

cocos2d::Scene * Dash::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Dash::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "dash");
	scene->addChild(layer->menu);
	return scene;
}


bool Dash::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("dash/dash.plist");

	auto bg = CSLoader::createNode("dash/DashScene.csb");
	this->addChild(bg);

	_synonyms = TextGenerator::getInstance()->getSynonyms(5);
	//CCLOG("synonyms = %s", _synonyms.at(1));
	//DelayTime::create(5 + (rand() % 60) / 30.0 )

	for (auto it = _synonyms.begin(); it != _synonyms.end(); ++it) {
		//_mapkey contains keys
		_mapKey.push_back(it->first);
	}

	_stepLayer = Layer::create();
	_stepLayer->setPositionX(0);
	this->addChild(_stepLayer);

	int char_height = 500;
	for (int j = 4; j > 0; j--) {  // j reffer to number of Players
		for (int i = 1; i < 15; i++) {  // i reffer to number of steps (words)
			auto obj1 = Sprite::createWithSpriteFrameName("dash/step.png");
			obj1->setPositionX((visibleSize.width / 5) * i +(obj1->getContentSize().width/2)*j);
			obj1->setPositionY(visibleSize.height * 0.4 +( (obj1->getContentSize().height/3) * j));
			obj1->setAnchorPoint(Vec2(1, 0.5));
			_stepLayer->addChild(obj1);
		}
	}

	_character = CSLoader::createNode("dash/character.csb");
	_character->setPositionX((visibleSize.width / 5));
	_character->setPositionY(visibleSize.height * 0.4 + 220);
	this->addChild(_character);
	
	for (int j = 0; j < 2; j++) {  
		for (int i = 0; i < 2; i++) {  
			auto obj1 = Sprite::createWithSpriteFrameName("dash/big_button.png");
			obj1->setPositionX(obj1->getContentSize().width/2 + visibleSize.width/2 *(i));
			obj1->setPositionY(obj1->getContentSize().height/1.3 + (visibleSize.height * 0.14) * (j));
			this->addChild(obj1);
			_choiceButton.pushBack(obj1);
		}
	}

	_otherCharacter = CSLoader::createNode("dash/character.csb");
	_otherCharacter->setPositionX((visibleSize.width / 5) + 220);
	_otherCharacter->setPositionY((visibleSize.height * 0.4 * 1) + 320);
	_stepLayer->addChild(_otherCharacter);


	wordGenerateWithOptions();


	auto defaultCharacter = CallFunc::create(CC_CALLBACK_0(Dash::otherCharacterJumping, this));
	runAction(RepeatForever::create(Sequence::create(DelayTime::create(10 + (rand() % 60) / 30.0), defaultCharacter, NULL)));
	return true;
}

void Dash::wordCheck()
{
	auto mouthTimeline = CSLoader::createTimeline(("dash/character.csb"));
	_character->runAction(mouthTimeline);
	mouthTimeline->play("jumping", false);
}

void Dash::myCharacterJumping()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(2, Vec2(0, 0), 200, 1);
	_character->runAction(jump);
	wordCheck();
	auto moveTo = MoveBy::create(2, Vec2(-(visibleSize.width / 5), 0));
	_stepLayer->runAction(moveTo);
}

void Dash::otherCharacterJumping()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(2, Vec2(visibleSize.width / 5, 0), 200, 1);
	_otherCharacter->runAction(jump);
}

void Dash::wordGenerateWithOptions()
{
	std::vector<std::string> answer;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int size = _mapKey.size();
	_gameWord = _mapKey.at(cocos2d::RandomHelper::random_int(0, size-1));
	answer.push_back(_synonyms.at(_gameWord));
	_topLabel = Label::createWithSystemFont(_gameWord.c_str(), "Arial", 100);
	_topLabel->setPositionX(visibleSize.width/2);
	_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height);
	this->addChild(_topLabel);

	int randomInt1 = cocos2d::RandomHelper::random_int(0, size - 1);
	for (int j = 0; j < 3; j++) {
		answer.push_back(_synonyms.at(_mapKey.at(randomInt1 % size)));
		randomInt1++;
	}
	int answerSize = answer.size() - 1;
	//CCLOG(answer);
	int randomInt = cocos2d::RandomHelper::random_int(0, answerSize);
	for (int i = 0; i < _choiceButton.size(); i++) {
		
		auto str = answer.at(randomInt % (answerSize + 1));
		auto myLabel = Label::createWithSystemFont(str, "Arial", 100);
		myLabel->setName(str);
		myLabel->setPositionX(_choiceButton.at(i)->getPositionX());
		myLabel->setPositionY(_choiceButton.at(i)->getPositionY());
		myLabel->setColor(Color3B(0, 0, 0));
		this->addChild(myLabel);
		_choiceLabel.pushBack(myLabel);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Dash::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, myLabel);
		randomInt++;
	}

}

bool Dash::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	if (target->getBoundingBox().containsPoint(touch->getLocation())) {
		if (target->getName().compare(_synonyms.at(_gameWord)) == 0) {
		//	CCLOG("11111111111111111");
			this->removeChild(_topLabel);
			for (int i = 0; i < _choiceLabel.size(); i++) {
				this->removeChild(_choiceLabel.at(i));
			}
			_choiceLabel.clear();
			myCharacterJumping();
			wordGenerateWithOptions();
		}
		else {
			auto mouthTimeline = CSLoader::createTimeline(("dash/character.csb"));
			_character->runAction(mouthTimeline);
			mouthTimeline->play("sad_wrong", false);
			}
	}
	return false;
}
