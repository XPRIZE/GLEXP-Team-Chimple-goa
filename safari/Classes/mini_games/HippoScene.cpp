//
//  HippoScene.cpp
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//


#include "HippoScene.h"
#include "HippoGameScene.h"

USING_NS_CC;

Scene* Hippo::createScene() {
	auto layer = Hippo::create();
	auto scene = GameScene::createWithChild(layer, "hippo");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* Hippo::loadNode() {
//	this->addChild(LayerGradient::create(Color4B(255, 219, 161, 255), Color4B(255, 255, 255, 255)), 0);
//	auto keyBoardLayer =  Layer::create();
//	auto test1 = (Node *)LayerColor::create(Color4B(255, 255, 255, 200.0));
//	test1->setContentSize(Size(Director::getInstance()->getVisibleSize().width, 600));
//	keyBoardLayer->addChild(test1);
//	this->addChild(keyBoardLayer,1);
	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("hippo/hippo.plist");
	auto node = Node::create();
//	auto node = CSLoader::createNode("hippo/hippo.csb");
	return node;
}


std::string Hippo::getGridBackground() {
	return "hippo/button.png";
}

void Hippo::createChoice()
{
	_choice = Node::create();
	_choice->setName("createChoice");
//	_choice->setPosition(Vec2(1280, 900));
	addChild(_choice);
	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("hippo/block.png");
		//auto dsg = HippoGame::stringPosition.at(i);
		//choiceNode->setAnchorPoint(Vec2(0, 1));
		//choiceNode->setPosition(Vec2(i * 200, 0));//HippoGame::stringPosition.at(i)
		choiceNode->setOpacity(100);
		choiceNode->setName("hippo_block");
		float x = _gapNodes1.at(i)->getPositionX() - _movingPositionX;
		float y = _gapNodes1.at(i)->getPositionY() + _blockSetPosY;
		_posAfterGapX = x;
		choiceNode->setPosition(x, y);
	//	choiceNode->setPosition(_stringPositionX1.at(i), _stringPositionY1.at(i));
		addChoice(choiceNode);
	}
}

std::string Hippo::getGraphemeUnselectedBackground() {
	return "hippo/button_clicked.png";
}
std::string Hippo::getGraphemeSelectedBackground() {
	return "hippo/block.png";
}

void Hippo::createAnswer()
{
	auto label = ui::Text::create();
	label->setString(_word);
	label->setFontSize(100);
	label->setPosition(Vec2());
	_answer = Sprite::createWithSpriteFrameName("hippo/board.png");
	_answer->addChild(label);
	label->setPosition(Vec2(_answer->getContentSize().width/2, _answer->getContentSize().height/2));
	_answer->setPosition(Vec2(Director::getInstance()->getVisibleSize().width/2, Director::getInstance()->getVisibleSize().height - _answer->getContentSize().height/2));
	addChild(_answer);
}

void Hippo::gameOver(bool correct)
{
	if (correct) {
		auto moveTo = MoveBy::create(3, Vec2(_posAfterGapX , _posAfterGap - _movingPositionY));
	//	_catAnimation1->play("catanim", true);
		//runAction(Sequence::create(TargetedAction::create(_catNode1, moveTo), CallFunc::create([=]() {
			//_catAnimation1->pause();
		//	child->setRotation(0);
			_gameContinue = true;
			_state = "";
	//	}), NULL));
		//auto lastCharInfo = _gapNodes1.at(_numGraphemes - 1);
	/*	auto child = _catNode1->getChildByName("Node");
		float x = child->getPositionX();
		cocos2d::MoveBy* moveTo;
		
		/*CCLOG(" last block position %f", (lastCharInfo->getPositionY()));
		CCLOG("cat movements %f", lastCharInfo->getPositionY() - _movingPositionY + lastCharInfo->getContentSize().height / 2);
		CCLOG("cat movements aaaaaaaa %f", _posAfterGap - _movingPositionY);
		if (_state.compare("up") == 0) {
			moveTo = MoveBy::create(3, Vec2(_posAfterGapX - x, _posAfterGap - _movingPositionY));
			_catAnimation1->play("catanim", true);
			child->setRotation(-50.0f);
		}
		else if (_state.compare("down") == 0) {
			moveTo = MoveBy::create(3, Vec2(_posAfterGapX , _posAfterGap - _movingPositionY));
			_catAnimation1->play("catanim", true);
			child->setRotation(50.0f);
		}
		else {
			moveTo = MoveBy::create(3, Vec2(_posAfterGapX - x, _posAfterGap - _movingPositionY));
			_catAnimation1->play("catanim", true);
			child->setRotation(0);
		}

		runAction(Sequence::create(TargetedAction::create(_catNode1, moveTo), CallFunc::create([=]() {
			_catAnimation1->pause();
			child->setRotation(0);
			_gameContinue = true;
			_state = "";
		}), NULL));
		//_catNode1->runAction(moveTo);
		//_catAnimation1->play("catanim", true);
		*/
	}
}

Hippo* Hippo::create() {
	Hippo* hippo = new (std::nothrow) Hippo();
	if (hippo && hippo->init())
	{
		hippo->autorelease();
		return hippo;
	}
	CC_SAFE_DELETE(hippo);
	return nullptr;
}