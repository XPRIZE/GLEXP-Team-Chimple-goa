//
//  Decomon.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/12/16
//
//

#include "DinoGame.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

cocos2d::Scene * DinoGame::createScene()
{
	auto scene = Scene::create();
	auto layer = DinoGame::create();
	scene->addChild(layer);

	layer->_menu = MenuContext::create(layer, "dino");
	scene->addChild(layer->_menu);
	return scene;
}

DinoGame * DinoGame::create()
{
	DinoGame* dinoGame = new (std::nothrow) DinoGame();
	if (dinoGame && dinoGame->init()) {
		dinoGame->autorelease();
		return dinoGame;
	}
	CC_SAFE_DELETE(dinoGame);
	return nullptr;
}


DinoGame::DinoGame()
{
}

DinoGame::~DinoGame()
{
	
}



bool DinoGame::init() {
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto bg = CSLoader::createNode("dino/dinobg.csb");
	if (visibleSize.width > 2560) {
		//_extraX = (visibleSize.width - 2560) / 2;
		bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(bg);
	_levelConfig = {
		{1,{
				{ "csb","dino/level1.csb" },
				{"png","_1"},
				{ "random","random_1_" },
				{ "fixed","dino_1_" },
			}
		},
		{2,{
				{ "csb","dino/level2.csb" },
				{ "png","_2" },
				{ "random","random_2_" },
				{ "fixed","dino_2_" },
			}
		},
		{3,
			{
				{ "csb","dino/level3.csb" },
				{ "png","_3" },
				{ "random","random_2_" },
				{ "fixed","dino_3_" },
			}
		}
	};
	return true;
}

void DinoGame::onEnterTransitionDidFinish()
{
	if (_menu->getCurrentLevel() < 4) {
		_mapping = _levelConfig.at(_menu->getCurrentLevel());
	}
	else {
		_mapping = _levelConfig.at(1);
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
	_dinoNode = CSLoader::createNode(_mapping.at("csb"));
	if (visibleSize.width > 2560) {
		_extraX = (visibleSize.width - 2560) / 2;
		_dinoNode->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(_dinoNode);
	if (_menu->getCurrentLevel() == 3) {
		auto child = _dinoNode->getChildByName("random_2_l");
		child->setPosition(Vec2(visibleSize.width*0.1, visibleSize.height*0.1));
	}
	//change the random node position
	if (_menu->getCurrentLevel() == 1) {
		auto randomNode = _dinoNode->getChildByName("random_1_k");
		randomNode->setPositionX(randomNode->getPositionX() - 100);
		randomNode->setPositionY(randomNode->getPositionY() - 50);
		auto randomNodeI = _dinoNode->getChildByName("random_1_i");
		randomNodeI->setPositionY(randomNodeI->getPositionY() + 100);
		auto randomNodeM = _dinoNode->getChildByName("random_1_m");
		randomNodeM->setPositionY(randomNodeM->getPositionY() + 50);
		randomNodeM->setPositionX(randomNodeM->getPositionX() + 50);
		auto randomNodeS = _dinoNode->getChildByName("random_1_s");
		randomNodeS->setName("random_1_m");
		randomNodeM->setName("random_1_s");
	}
	else if (_menu->getCurrentLevel() == 2) {
		auto randomNode = _dinoNode->getChildByName("random_2_h");
		randomNode->setPositionX(randomNode->getPositionX() - 100);
	}
	for (int i = 0; i < _alphabets.size(); i++) {
		std::string child = _alphabets.at(i) + _mapping.at("png");
		auto alpha = _dinoNode->getChildByName(child);
		std::string alphaNode = _mapping.at("random") + _alphabets.at(i);
		auto randomNode = _dinoNode->getChildByName(alphaNode);
		auto moveTo = MoveTo::create(2, randomNode->getPosition());
		alpha->runAction(moveTo);

		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(DinoGame::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(DinoGame::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(DinoGame::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, alpha);
	}

	_isTouched = true;
	_menu->setMaxPoints(26);
	if (_menu->getCurrentLevel() == 2) {
		alphabetHint("a");
	}
	_audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();

	if (_menu->getCurrentLevel() == 1 && _gameScore == 0) {
		this->scheduleOnce(schedule_selector(DinoGame::gameStart), 2.1);
	}

}

bool DinoGame::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)&& _isTouched) {
		_isTouched = false;
		target->stopAllActions();
		target->setScale(1);
		_previousPosition = target->getPosition();
		std::string targetName = target->getName();
		std::stringstream ss;
		ss << targetName.at(0);
		std::string mystr = ss.str();
		std::string path = "english/sounds/" + mystr + ".m4a";
		CCLOG("path = %s", path.c_str());
		_audioEffect->playEffect(path.c_str());
		return true;
	}
	return false;
}

void DinoGame::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	target->setPosition(Vec2(touch->getLocation().x - _extraX,touch->getLocation().y));
}

void DinoGame::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	std::string targetName = target->getName();
	std::stringstream ss;
	ss << targetName.at(0);
	std::string mystr = ss.str();
	std::string str = _mapping.at("fixed") + mystr;
	auto fixedNode = _dinoNode->getChildByName(str);
	if (_menu->getCurrentLevel() == 1) {
	
		if (target->boundingBox().containsPoint(fixedNode->getPosition())) {
			target->setPosition(fixedNode->getPosition());
			CCLOG("letter fixed");
			this->removeChildByName("helpLayer");
			_isTouched = true;
			_gameScore++;
			_eventDispatcher->removeEventListenersForTarget(target);
			_menu->addPoints(1);
			_audioEffect->playEffect("sounds/sfx/drop_obj.ogg");
		}
		else {
			_menu->addPoints(-1);
			_audioEffect->playEffect("sounds/sfx/error.ogg");
			auto moveTo = MoveTo::create(2, _previousPosition);
			target->runAction(Sequence::create(moveTo, CallFunc::create([=]() {
				_isTouched = true;
				CCLOG("touch End11111111111111111111111111111");
			}), NULL));
		}
	}
	else if ((_menu->getCurrentLevel() == 2) || (_menu->getCurrentLevel() == 3)) {
		str = _mapping.at("fixed") + _alphabets.at(_gameScore);
		fixedNode = _dinoNode->getChildByName(str);
		if (target->boundingBox().containsPoint(fixedNode->getPosition()) && (mystr.compare(_alphabets.at(_gameScore)) == 0)) {
			target->setPosition(fixedNode->getPosition());
			CCLOG("letter fixed");
			_isTouched = true;
			_eventDispatcher->removeEventListenersForTarget(target);
			_gameScore++;
			_menu->addPoints(1);
			_audioEffect->playEffect("sounds/sfx/drop_obj.ogg");
			if (_menu->getCurrentLevel() == 2 && _gameScore < 26) {
				alphabetHint(_alphabets.at(_gameScore));
			}
			
		}
		else {
			_audioEffect->playEffect("sounds/sfx/error.ogg");
			_menu->addPoints(-1);
			auto moveTo = MoveTo::create(2, _previousPosition);
			target->runAction(Sequence::create(moveTo, CallFunc::create([=]() {
				_isTouched = true;
				std::string child = _alphabets.at(_gameScore) + _mapping.at("png");
				if (_menu->getCurrentLevel() == 2 && target->getName().compare(child) == 0) {
					alphabetHint(_alphabets.at(_gameScore));
				}
			}), NULL));
		}
	}
	if (_gameScore == 26) {
		_menu->showScore();
	}
}

void DinoGame::alphabetHint(std::string letter)
{
	std::string child = letter + _mapping.at("png");
	auto alpha = _dinoNode->getChildByName(child);
	auto scale = ScaleBy::create(1, 0.7);
	alpha->runAction(RepeatForever::create(Sequence::create(scale, scale->reverse(), NULL)));
}

void DinoGame::helpLayer()
{
	auto child = _dinoNode->getChildByName("a_1");
	auto fixed = _dinoNode->getChildByName("dino_1_a");
	auto helpLayer = HelpLayer::create(Rect(child->getPositionX() + _extraX, child->getPositionY(), child->getContentSize().width, child->getContentSize().height), Rect(0, 0, 0, 0));
	helpLayer->clickAndDrag(Vec2(child->getPositionX() + _extraX, child->getPositionY()), Vec2(fixed->getPositionX() + _extraX, fixed->getPositionY()));
	helpLayer->setName("helpLayer");
	this->addChild(helpLayer);
}

void DinoGame::gameStart(float ft)
{
	helpLayer();
}
