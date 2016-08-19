//
//  CatGameScene.cpp
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//

#include "CatGameScene.h"
#include "CatScene.h"
#include "../lang/TextGenerator.h"
#include "math.h"

USING_NS_CC;
Cat * hippo1;
CatGame::CatGame()
{
	//Cat * hippo1 = new (std::nothrow) Cat();
}

CatGame::~CatGame()
{
}

CatGame * CatGame::create()
{
	//Cat* hippo1 = new (std::nothrow) Cat();
	CatGame* hippoGame = new(std::nothrow) CatGame();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * CatGame::createScene()
{
	auto layer = CatGame::create();
	auto scene = GameScene::createWithChild(layer, "cat");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

bool CatGame::init()
{
	if (!Layer::init())
	{
		return false;
	}
	_xPos = 0;
	_yPos = 900;
	_buildingPath = { "hippo/b1.png","hippo/b2.png","hippo/b3.png","hippo/b4.png" ,"hippo/b5.png" };
	this->addChild(LayerGradient::create(Color4B(255, 255, 255, 255), Color4B(255, 219, 161, 255)), 0);
	auto node = CSLoader::createNode("hippo/hippo.csb");
	this->addChild(node);
	_buildingLayer = Layer::create();
	_buildingLayer->setPositionX(0);
	this->addChild(_buildingLayer);
	auto test = (Node *)LayerColor::create(Color4B(128.0, 128.0, 128.0, 200.0));
	//	_buildingLayer->addChild(test,-1);
	auto test111 = (Node *)LayerColor::create(Color4B(255, 140, 0, 200.0));
	//_buildingLayer1->addChild(test111,-1);
	_backgroundBarrier = nullptr;
	_catLayer = Layer::create();
	_catLayer->setPositionX(0);
	_catLayer->setContentSize(Size(200, 200));
	this->addChild(_catLayer);
	_catNode = CSLoader::createNode("hippo/catanimation.csb");
//	_catNode->setPosition(Vec2(600,900));
	_catNode->setContentSize(Size(200, 200));
	_catLayer->addChild(_catNode, 1);
	_catAnimation = CSLoader::createTimeline("hippo/catanimation.csb");
	_catNode->runAction(_catAnimation);
	auto test1 = (Node *)LayerColor::create(Color4B(128, 128, 128, 200.0));
	test1->setContentSize(Size(Director::getInstance()->getVisibleSize().width, 600));
	this->addChild(test1, 1);
	this->scheduleUpdate();
	tailAnimation();
	auto followAction = Follow::createWithOffset(_catNode, -(Director::getInstance()->getVisibleSize().width*0.24),90);
	_catLayer->runAction(followAction);
	//createBuilding();
	generateBuildingLayer("stright");
	return true;
}


void CatGame::generateBuildingLayer(std::string str)
{
	int randNum = RandomHelper::random_int(0, 4);
	auto build1 = Sprite::createWithSpriteFrameName(_buildingPath.at(randNum).c_str());
	build1->setPosition(Vec2(_xPos, _yPos));
	build1->setAnchorPoint(Vec2(0, 1));
	_buildingLayer->addChild(build1);
	_xPos = build1->getContentSize().width + build1->getPositionX();
	if (_backgroundBarrier == nullptr) {
		_backgroundBarrier = Sprite::create("crossthebridge/barrier.png");
		_backgroundBarrier->setVisible(false);
		_backgroundBarrier->setPosition(Vec2(_xPos, _yPos));
		this->addChild(_backgroundBarrier);
	}
	stringGap(str);
}

void CatGame::stringGap(std::string str)
{
	auto text = TextGenerator::getInstance();
	_randomWord = text->generateAWord();
	CCLOG("string   %s ", _randomWord.c_str());
	_gapNodes.clear();
	int randomNumber = text->getGraphemes(_randomWord).size();
	_wordLength = randomNumber;
	CCLOG("string size %d", _wordLength);
	_distanceY = _yPos;
	_movingBarrier = Sprite::create("crossthebridge/barrier.png");
	_movingBarrier->setPosition(Vec2(_xPos, _yPos));
	_movingBarrier->setVisible(false);
	_buildingLayer->addChild(_movingBarrier);
	_xPos = _xPos + 30;
	float gapWidth;
	while (randomNumber != 0) {
		auto gap = Sprite::createWithSpriteFrameName("hippo/block.png");
		gap->setPosition(Vec2(_xPos, _yPos - gap->getContentSize().height / 2));
		CCLOG("block position y = %f", _yPos - gap->getContentSize().height / 2);
		_stringPositionX.push_back(_xPos);
		_stringPositionY.push_back(_yPos);
		gap->setVisible(false);
		gapWidth = gap->getContentSize().width / 2;
		_buildingLayer->addChild(gap);
		_xPos = gap->getContentSize().width + gap->getPositionX();
		if (str.compare("stright") == 0) {
			//no change
		}
		else if (str.compare("up") == 0) {
			//_upCount++;
			_yPos = gap->getContentSize().height / 1.2 + gap->getPositionY();
		}
		else if (str.compare("down") == 0) {
		//	//gap->setPosition(Vec2(_xPos, _yPos));
			_yPos = -gap->getContentSize().height / 5.5 + gap->getPositionY();
		}
		_gapNodes.push_back((Node*)gap);
		randomNumber--;
	}
	if (str.compare("up") == 0) {
		_upCount++;
	}
	if (str.compare("down") == 0) {
		_downCount++;
	}
	_xPos = _xPos - gapWidth;
	_positionAfterGap = _yPos;
	buildingAfterGap(str);
}

void CatGame::tailAnimation()
{
	_catTailAnimation = CSLoader::createTimeline("hippo/catanimation.csb");
	_catNode->runAction(_catTailAnimation);
	_catTailAnimation->play("tail", true);
}

void CatGame::catMovement(std::string str)
{
	_gameState = str;
		hippo1 = new (std::nothrow) Cat();
		hippo1->_upCount = _upCount;
		hippo1->_downCount = _downCount;
		hippo1->_state = str;
		hippo1->_catNode1 = _catLayer;
		hippo1->_catAnimation1 = _catAnimation;
		hippo1->_movingPositionX = _previousX;
		hippo1->_movingPositionY = _distanceY;
		hippo1->_stringPositionX1 = _stringPositionX;
		hippo1->_stringPositionY1 = _stringPositionY;
		hippo1->_blockSetPosY = -_positionAfterGap + _previousY;
		hippo1->_gapNodes1 = _gapNodes;
		hippo1->initWithWord(_randomWord);
		hippo1->_posAfterGap = _positionAfterGap;
		this->addChild(hippo1, 1);
		

}

void CatGame::update(float ft) {
	if (hippo1 != nullptr) {
		//CCLOG("In update");
		if (hippo1->_gameContinue) {
			hippo1->_gameContinue = false;
			this->removeChild(hippo1, true);
			_catAnimation->play("run", true);
			_catTailAnimation->pause();
			for (int i = 0; i < _gapNodes.size(); i++) {
				_gapNodes.at(i)->setVisible(true);
			}
		//	_gapNodes.clear();
			_score++;
			if (_gameState.compare("down") == 0) {
				float yPosition = _positionAfterGap;
				generateBuildingLayer("down");
				float distanceX = _checkBox->getPositionX() - _movingBarrier->getPositionX();
				float distanceX1 = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX();
				auto moveBy = MoveBy::create(3, Vec2(-(2 * distanceX), -yPosition + _previousY));
				auto moveBy1 = MoveBy::create(3, Vec2(-distanceX1 + _previousX+ (2 * distanceX), 0));
				runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveBy), TargetedAction::create(_buildingLayer, moveBy1),  CallFunc::create([=]() {
					_previousX = distanceX1;
					_previousY = yPosition;
					_catAnimation->pause();
					tailAnimation();
					catMovement("down");
				}), NULL));
				
			}
			else if (_gameState.compare("up") == 0) {
				float yPosition = _positionAfterGap;
				generateBuildingLayer("stright");
				float distanceX = _checkBox->getPositionX() - _movingBarrier->getPositionX();
				float distanceX1 = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX();
				auto moveBy = MoveBy::create(3, Vec2(-(2 * distanceX), -yPosition + _previousY));
				auto moveBy1 = MoveBy::create(3, Vec2(-distanceX1 + _previousX + (2 * distanceX), 0));
				runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveBy), TargetedAction::create(_buildingLayer, moveBy1), CallFunc::create([=]() {
					_previousX = distanceX1;
					_previousY = yPosition;
					_catAnimation->pause();
					tailAnimation();
					if (_score == 5) {
						_menuContext->showScore();
					}
					catMovement("stright");
				}), NULL));

			}else {
				float yPosition = _positionAfterGap;
				generateBuildingLayer("stright");
				float distanceX = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX();
				auto moveBy = MoveBy::create(3, Vec2(-distanceX + _previousX, -yPosition + _previousY));
				runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveBy), CallFunc::create([=]() {
					_previousX = distanceX;
					_previousY = yPosition;
					_catAnimation->pause();
					tailAnimation();
					catMovement("stright");
					if (_score == 5) {
						_menuContext->showScore();
					}
				}), NULL));
						}
		}
	}
}

void CatGame::buildingAfterGap(std::string str)
{
	int randNum = RandomHelper::random_int(0, 4);
	_checkBox = Sprite::create("crossthebridge/barrier.png");
	_checkBox->setPosition(Vec2(_xPos, _yPos));
	_checkBox->setVisible(false);
	_buildingLayer->addChild(_checkBox);
	auto build2 = Sprite::createWithSpriteFrameName(_buildingPath.at(randNum).c_str());
	build2->setPosition(Vec2(_xPos, _yPos));
	build2->setAnchorPoint(Vec2(0, 1));
	_buildingLayer->addChild(build2);
	_xPos = build2->getContentSize().width + build2->getPositionX();
	if (_sceneRunFirst) {
		catMovement(str);
		_sceneRunFirst = false;
	}
}

