//
//  HippoGameScene.cpp
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//

/*
 # set cat movement (after correct word)
 # background scene movement
 # staircase up/down formate
*/
#include "HippoGameScene.h"
#include "HippoScene.h"
#include "../lang/TextGenerator.h"
#include "math.h"

USING_NS_CC;
Hippo * hippo;
HippoGame::HippoGame()
{
	//Hippo * hippo = new (std::nothrow) Hippo();
}

HippoGame::~HippoGame()
{
}

HippoGame * HippoGame::create()
{
	//Hippo* hippo = new (std::nothrow) Hippo();
	HippoGame* hippoGame = new(std::nothrow) HippoGame();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * HippoGame::createScene()
{
	auto layer = HippoGame::create();
	auto scene = GameScene::createWithChild(layer, "hippo");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

bool HippoGame::init()
{
	if (!Layer::init())
	{
		return false;
	}
	_xPos = 0;
	_yPos = 900;
	this->addChild(LayerGradient::create(Color4B(255, 219, 161, 255), Color4B(255, 255, 255, 255)), 0);
	auto node = CSLoader::createNode("hippo/hippo.csb");
	this->addChild(node);
	_backgroundBarrier = Sprite::create("crossthebridge/barrier.png");
	_backgroundBarrier->setVisible(false);
	_backgroundBarrier->setPosition(Vec2(Director::getInstance()->getVisibleSize().width/2, Director::getInstance()->getVisibleSize().height/2));
	this->addChild(_backgroundBarrier);
	_buildingLayer = Layer::create();
	_buildingLayer->setPositionX(0);
	this->addChild(_buildingLayer);
	auto test = (Node *)LayerColor::create(Color4B(128.0, 128.0, 128.0, 200.0));
//	_buildingLayer->addChild(test,-1);

	_buildingLayer1 = Layer::create();
	this->addChild(_buildingLayer1);
	_buildingLayer2 = Layer::create();
	this->addChild(_buildingLayer2);

	auto test111 = (Node *)LayerColor::create(Color4B(255, 140, 0, 200.0));
	//_buildingLayer1->addChild(test111,-1);

	_catLayer = Layer::create();
	_catLayer->setPositionX(0);
	_catLayer->setContentSize(Size(200,200));
//	_catLayer->addChild(test111);
	this->addChild(_catLayer);
	_catNode = CSLoader::createNode("hippo/catanim.csb");
	_catNode->setContentSize(Size(200,200));
	_catNode->setPosition(Vec2(_xPos+_catNode->getContentSize().width+450, _yPos-50));
	_catLayer->addChild(_catNode,1);
	_catAnimation = CSLoader::createTimeline("hippo/catanim.csb");
	_catNode->runAction(_catAnimation);
	_catLayer->setContentSize(_catNode->getContentSize());
//	_catAnimation->play("catanim", true);
	auto test1 = (Node *)LayerColor::create(Color4B(255, 255, 255, 200.0));
	test1->setContentSize(Size(Director::getInstance()->getVisibleSize().width, 600));
	this->addChild(test1,1);
	this->scheduleUpdate();
	//createBuilding();
	generateBuildingLayer();
	return true;
}

void HippoGame::createBuilding(cocos2d::Layer * myLayer)
{
	/*if (_xPos > Director::getInstance()->getVisibleSize().width) {

		_xPos = _xPos - Director::getInstance()->getVisibleSize().width;
	}*/
	_xPos = 0;
//	while (_xPos < 1280.0f) {
		auto build1 = Sprite::createWithSpriteFrameName("hippo/b3.png");
		build1->setPosition(Vec2(_xPos, _yPos));
		build1->setAnchorPoint(Vec2(0, 1));
		myLayer->addChild(build1);
		//	buildingLayer2->addChild(build1);
		/*auto build2 = Sprite::createWithSpriteFrameName("hippo/b3.png");
		build2->setPosition(Vec2(build1->getContentSize().width  + build1->getPositionX(), _yPos));
		build2->setAnchorPoint(Vec2(0, 1));
		_buildingLayer->addChild(build2);*/
		//	buildingLayer2->addChild(build2);
		_xPos = build1->getContentSize().width  + build1->getPositionX();
//	}
	stringGap(myLayer);
}

void HippoGame::buildingMovingAction()
{
	float distanceX = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX() ;
	float distanceY = 0;
		//_movingBarrier->getPositionY() - _backgroundBarrier->getPositionY();

	if (distanceX < 0) {
		distanceX = 0;
	}
	auto moveTo = MoveBy::create(1, Vec2(-distanceX, 0));
	_buildingLayer->runAction(moveTo);
	auto moveTo1 = MoveBy::create(1, Vec2(-distanceX, 0));
	_buildingLayer1->runAction(moveTo1);
	runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveTo), CallFunc::create([=]() {
		hippo = new (std::nothrow) Hippo();
		hippo->_catNode1 = _catLayer;
		hippo->_catAnimation1 = _catAnimation;
		hippo->_movingPositionX = distanceX;
		hippo->_movingPositionY = distanceY;
		hippo->_stringPositionX1 = _stringPositionX;
		hippo->_stringPositionY1 = _stringPositionY;
		hippo->_gapNodes1 = _gapNodes;
		hippo->initWithWord(_randomWord);
		this->addChild(hippo, 1);
		
	}), NULL));
	
}

void HippoGame::stringGap(cocos2d::Layer * myLayer)
{
	if (_xPos > Director::getInstance()->getVisibleSize().width) {

		//_xPos = _xPos - Director::getInstance()->getVisibleSize().width;
	}
	auto text = TextGenerator::getInstance();
	_randomWord = text->generateAWord();
	CCLOG("string   %s ", _randomWord.c_str());

	int randomNumber = text->getGraphemes(_randomWord).size();
	_wordLength = randomNumber;
	CCLOG("string size %d", _wordLength);

	_checkBox= Sprite::create("crossthebridge/barrier.png");
	_checkBox->setPosition(Vec2(_xPos-100, _yPos));
	myLayer->addChild(_checkBox);
	while (randomNumber != 0) {
		auto gap = Sprite::createWithSpriteFrameName("hippo/block.png");
		//gap->setOpacity(100);
		gap->setPosition(Vec2(_xPos , _yPos - gap->getContentSize().height/2));
	//	gap->setAnchorPoint(Vec2(0, 1));
		_stringPositionX.push_back(_xPos );
		_stringPositionY.push_back(_yPos);
		_gapNodes.push_back((Node*)gap);
		gap->setVisible(false);
		myLayer->addChild(gap);
		if (((int)ceil(_wordLength / 2.0)) == randomNumber) {
			_movingBarrier = Sprite::create("crossthebridge/barrier.png");
			_movingBarrier->setPosition(Vec2(_xPos,_yPos));
			_movingBarrier->setVisible(false);
			myLayer->addChild(_movingBarrier);
		}

		//	buildingLayer2->addChild(gap);
		_xPos = gap->getContentSize().width + gap->getPositionX() ;
		//if (str.compare("stright") == 0) {
		//	//no change
		//}
		//else if (str.compare("up") == 0) {
		//	_yPos = gap->getContentSize().height/2.5 + gap->getPositionY();
		//}
		//else if (str.compare("down") == 0) {
		//	yPos = -gap->getContentSize().height + gap->getPositionY();
		//}
		//yPos			= gap->getContentSize().height + gap->getPositionY();
		randomNumber--;
	}
	
	afterStringGap(myLayer);
}

void HippoGame::afterStringGap(cocos2d::Layer * myLayer)
{
	auto build1 = Sprite::createWithSpriteFrameName("hippo/b3.png");
	build1->setPosition(Vec2(_xPos-(build1->getContentSize().width*0.19), _yPos));
	build1->setAnchorPoint(Vec2(0, 1));
	myLayer->addChild(build1);
	_sceneMovingBarrier = Sprite::create("crossthebridge/barrier.png");
	_sceneMovingBarrier->setPosition(Vec2(_xPos, _yPos));
	_sceneMovingBarrier->setVisible(false);
	CCLOG("after string gap %f", _sceneMovingBarrier->getPositionX());
	myLayer->addChild(_sceneMovingBarrier);
	_xPos = build1->getContentSize().width + build1->getPositionX();
	//if (_wordLength < 4) {
		auto build2 = Sprite::createWithSpriteFrameName("hippo/b3.png");
		build2->setPosition(Vec2(_xPos - (build2->getContentSize().width*0.19), _yPos));
		build2->setAnchorPoint(Vec2(0, 1));
		_xPos = build2->getContentSize().width + build2->getPositionX();
		myLayer->addChild(build2);
//	}

	buildingMovingAction();
	
	myLayer->setContentSize(Size(_xPos,1800));
	if (!_layerChange) {
		_buildingLayer1->setPositionX(_xPos);
	} else{
		_buildingLayer->setPositionX(_xPos);
	}
	_sceneToScenDiff = _xPos - _sceneMovingBarrier->getPositionX();
	//this->addChild(_buildingLayer1);
}

void HippoGame::sceneMovingAction()
{
	CCLOG("scene Moving %f", _sceneMovingBarrier->getPositionX());
	float distanceX = _sceneMovingBarrier->getPositionX();
		//Director::getInstance()->getVisibleSize().width;
	auto moveTo = MoveBy::create(5, Vec2(-distanceX-_sceneToScenDiff, 0));
	_buildingLayer->runAction(moveTo);
	auto moveTo2 = MoveBy::create(5, Vec2(-distanceX- _sceneToScenDiff, 0));
	_buildingLayer1->runAction(moveTo2);
	auto moveTo1 = MoveBy::create(5, Vec2(-distanceX -_sceneToScenDiff, 0));
	//_catLayer->runAction(moveTo1);
	runAction(Sequence::create(TargetedAction::create(_catLayer, moveTo1), CallFunc::create([=]() {
		catMovement();
	}), NULL));
	//buildingMovingAction();
//	catMovement();
}

void HippoGame::update(float ft) {
	if (hippo != nullptr) {
		//CCLOG("In update");
		if (hippo->_gameContinue) {
			hippo->_gameContinue = false;
			this->removeChild(hippo, true);
			//	stringGap();
			CCLOG("update Cat Posotion %f", _catLayer->getPositionX());
			if (!_layerChange) {
				
				_gapNodes.clear();
				
				_buildingLayer1->removeAllChildren();
				createBuilding(_buildingLayer1);
				_layerChange = true;
				/*runAction(Sequence::create(CallFunc::create([=]() {
					sceneMovingAction();
				}), CallFunc::create([=]() {
					_layerChange = true;
					_buildingLayer1->removeAllChildren();
					createBuilding(_buildingLayer1);
				}), NULL));*/
			}
			else {
				
				_gapNodes.clear();
				
				_buildingLayer->removeAllChildren();
				createBuilding(_buildingLayer);
				_layerChange = false;
			/*	runAction(Sequence::create(CallFunc::create([=]() {
					sceneMovingAction();
				}), CallFunc::create([=]() {
					_layerChange = false;
					_buildingLayer->removeAllChildren();
					createBuilding(_buildingLayer);
				}), NULL));*/
				
						}
			sceneMovingAction();
			/*runAction(Sequence::create(CallFunc::create([=]() {
				sceneMovingAction();
			}), CallFunc::create([=]() {
				buildingMovingAction();
			}), NULL));*/
			
		}
	}

	if (_catLayer->getPositionX() < 0) {
		if (!_catAnimation->isPlaying()) {
			_catAnimation->play("catanim", false);
		}
		_catLayer->setPositionX(0);
	}
	if ((_catLayer->getPositionX() + _catNode->getContentSize().width + 450) > Director::getInstance()->getVisibleSize().width) {
		if (!_catAnimation->isPlaying()) {
			_catAnimation->play("catanim", false);
		}
		_catLayer->setPositionX(Director::getInstance()->getVisibleSize().width - _catNode->getContentSize().width - 450);
	}
}

void HippoGame::generateBuildingLayer()
{
	createBuilding(_buildingLayer);
	//buildingMovingAction();
}

void HippoGame::catMovement()
{
	float distanceX = _checkBox->getPositionX() - _catLayer->getPositionX();
	auto moveTo1 = MoveBy::create(1, Vec2(distanceX -  _catNode->getContentSize().width - 450, 0));
	_catAnimation->play("catanim", true);
	runAction(Sequence::create(TargetedAction::create(_catLayer, moveTo1), CallFunc::create([=]() {
		_catAnimation->pause();
	}), NULL));
	//_catLayer->runAction(moveTo1);

}
