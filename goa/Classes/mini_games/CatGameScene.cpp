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

}

CatGame::~CatGame()
{
}

CatGame * CatGame::create()
{
	CatGame* hippoGame = new(std::nothrow) CatGame();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * CatGame::createScene(Lesson* lesson)
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
	_buildingLayer1 = Layer::create();
	_buildingLayer1->setPositionX(0);
	this->addChild(_buildingLayer1);
	auto node = CSLoader::createNode("hippo/hippo.csb");
	_buildingLayer1->addChild(node);
	_buildingLayer2 = Layer::create();
	_buildingLayer2->setPositionX(_buildingLayer1->getContentSize().width);
	this->addChild(_buildingLayer2);
	auto node1 = CSLoader::createNode("hippo/hippo.csb");
	_buildingLayer2->addChild(node1);

	_buildingLayer = Layer::create();
	_buildingLayer->setPositionX(0);
	this->addChild(_buildingLayer);

	_backgroundBarrier = nullptr;

	_catLayer = Layer::create();
	_catLayer->setPositionX(0);
	_catLayer->setContentSize(Size(200, 200));
	this->addChild(_catLayer);
	_catNode = CSLoader::createNode("hippo/catanimation.csb");
	_catNode->setContentSize(Size(200, 200));
	_catLayer->addChild(_catNode, 1);
	_catAnimation = CSLoader::createTimeline("hippo/catanimation.csb");
	_catNode->runAction(_catAnimation);
	auto test1 = (Node *)LayerColor::create(Color4B(128, 128, 128, 200.0));
	test1->setContentSize(Size(Director::getInstance()->getVisibleSize().width, 600));
	this->addChild(test1, 1);
	this->scheduleUpdate();
	tailAnimation();
	auto followAction = Follow::createWithOffset(_catNode, -(Director::getInstance()->getVisibleSize().width*0.26), 50);
	_catLayer->runAction(followAction);
	//generateBuildingLayer("stright");
	return true;
}


void CatGame::generateBuildingLayer(std::string str)
{
	auto text = TextGenerator::getInstance();
    int level = std::ceil(_menuContext->getCurrentLevel() / 8.0);
    level = MIN(level, 5);
	_randomWord = text->generateAWord(level);
	_gapNodes.clear();
	_wordLength = text->getGraphemes(_randomWord).size();
	
	if (_score != 5) {
		_maxPoints += _wordLength;
		_menuContext->setMaxPoints(_maxPoints * 2);
	}
	int randNum = RandomHelper::random_int(0, 4);
	auto build1 = Sprite::createWithSpriteFrameName(_buildingPath.at(randNum).c_str());
	build1->setPosition(Vec2(_xPos, _yPos));
	build1->setAnchorPoint(Vec2(0, 1));
	build1->setName(str+ "build");
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
	int randomNumber = _wordLength;
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
		CCLOG("block position y = %f", _yPos);
		_stringPositionX.push_back(_xPos);
		_stringPositionY.push_back(_yPos);
		gap->setName(str+"gap");
		gap->setVisible(false);
		gapWidth = gap->getContentSize().width / 2;
		_buildingLayer->addChild(gap);
		_xPos = gap->getContentSize().width + gap->getPositionX();
		if (str.compare("stright") == 0) {
			//no change
		}
		else if (str.compare("up") == 0) {
			_yPos = gap->getContentSize().height / 1.2 + gap->getPositionY();
		}
		_gapNodes.push_back((Node*)gap);
		randomNumber--;
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

void CatGame::callAPI(std::string str)
{
	_gameState = str;
		hippo1 = new (std::nothrow) Cat();
		hippo1->_state = str;
		hippo1->_score = _score;
		hippo1->_menuContext = _menuContext;
		hippo1->_movingPositionX = _previousX;
		hippo1->_movingPositionY = _distanceY;
		hippo1->_gapNodes1 = _gapNodes;
		hippo1->initWithWord(_randomWord);
		hippo1->_posAfterGap = _positionAfterGap;
		this->addChild(hippo1, 1);
}

void CatGame::update(float ft) {
	if (hippo1 != nullptr) {
		if (hippo1->_gameContinue) {
			hippo1->_gameContinue = false;
			this->removeChild(hippo1, true);
			_catAnimation->play("run", true);
			_catTailAnimation->pause();

			for (int i = 0; i < _gapNodes.size(); i++) {
				_gapNodes.at(i)->setVisible(true);
			}
			_score++;
			_menuContext->wordPairList(_randomWord);
			 if (_gameState.compare("up") == 0) {
				float yPosition = _positionAfterGap;
				float distanceX = _checkBox->getPositionX() - _movingBarrier->getPositionX();
				generateBuildingLayer("stright");
				_catAnimation->pause();
				_catAnimation->play("run", true);
				float distanceX1 = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX();
				auto moveBG = MoveBy::create(5.5, Vec2((-distanceX1 + _previousX) * 0.05, 0));
				_buildingLayer1->runAction(moveBG);
				auto moveBG1 = MoveBy::create(5.5, Vec2((-distanceX1 + _previousX) * 0.05, 0));
				_buildingLayer2->runAction(moveBG1);
				auto moveBy0 = MoveBy::create(1, Vec2(-_gapNodes.at(0)->getContentSize().width, 0));
				auto moveBy = JumpBy::create(0.5* _wordLength, Vec2(-(1 * distanceX ), -yPosition + _previousY), 20, _wordLength );
				auto moveBy1 = MoveBy::create(3, Vec2(-distanceX1 + _previousX + (1 * distanceX) + _gapNodes.at(0)->getContentSize().width, 0));
				runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveBy0), CallFunc::create([=]() {
					_catAnimation->pause();
					_catAnimation->play("jump", true); }),
					TargetedAction::create(_buildingLayer, moveBy), CallFunc::create([=]() {
					_catAnimation->pause();
					_catAnimation->play("run", true);
				}), TargetedAction::create(_buildingLayer, moveBy1), CallFunc::create([=]() {
					_previousX = distanceX1;
					_previousY =  yPosition;
					_catAnimation->pause();
					tailAnimation();
					Vector <Node*> children = _buildingLayer->getChildren();
					for (auto item = children.rbegin(); item != children.rend(); ++item) {
						Node * monsterItem = *item;
						std::string str = monsterItem->getName().c_str();
						if (str.find("up") == 0) {
							CCLOG("child %s", str.c_str());
							_buildingLayer->removeChildByName(str);
						}
					}
					callAPI("stright");
				}), NULL));
				if (_score == 5) {
					this->scheduleOnce(schedule_selector(CatGame::gameEnd), 1.5);
				}
			}else {
				float yPosition = _positionAfterGap;
				generateBuildingLayer("up");
				float distanceX = _movingBarrier->getPositionX() - _backgroundBarrier->getPositionX();
				auto moveBG = MoveBy::create(3, Vec2((-distanceX+ _previousX) * 0.05, 0));
				_buildingLayer1->runAction(moveBG);
				auto moveBG1 = MoveBy::create(3, Vec2((-distanceX + _previousX) * 0.05, 0));
				_buildingLayer2->runAction(moveBG1);
				auto moveBy = MoveBy::create(3, Vec2(-distanceX + _previousX, 0));
				runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveBy), CallFunc::create([=]() {
					_previousX = distanceX;
					_previousY = yPosition;
					_catAnimation->pause();
					tailAnimation();
					callAPI("up");
					Vector <Node*> children = _buildingLayer->getChildren();
					for (auto item = children.rbegin(); item != children.rend(); ++item) {
						Node * monsterItem = *item;
						std::string str = monsterItem->getName().c_str();
						if (str.find("stright") == 0) {
							CCLOG("child %s", str.c_str());
							_buildingLayer->removeChildByName(str);
						}
					}
					
				}), NULL));
				if (_score == 5) {
					this->scheduleOnce(schedule_selector(CatGame::gameEnd), 1.5);
				}
				
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
	build2->setName(str + "build");
	_buildingLayer->addChild(build2);
	_xPos = build2->getContentSize().width + build2->getPositionX();
	if (_wordLength <4) {
		int randNum = RandomHelper::random_int(0, 4);
		auto build2 = Sprite::createWithSpriteFrameName(_buildingPath.at(randNum).c_str());
		build2->setPosition(Vec2(_xPos, _yPos));
		build2->setAnchorPoint(Vec2(0, 1));
		build2->setName(str + "build1");
		_buildingLayer->addChild(build2);
		_xPos = build2->getContentSize().width + build2->getPositionX();
	}
	if (_sceneRunFirst) {
		callAPI(str);
		_sceneRunFirst = false;
	}
}

void CatGame::onEnterTransitionDidFinish()
{
	Node::onEnterTransitionDidFinish();
	generateBuildingLayer("stright");
}

void CatGame::gameEnd(float ft)
{
	_menuContext->setMaxPoints(_maxPoints * 2);
	_catAnimation->pause();
	tailAnimation();
	auto str = LangUtil::getInstance()->translateString("List of words");
	_menuContext->showAnswer("Words", str);
}

