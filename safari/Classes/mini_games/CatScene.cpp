//
//  CatScene.cpp
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//


#include "CatScene.h"

USING_NS_CC;

Node* Cat::loadNode() {
	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("hippo/hippo.plist");
	auto node = Node::create();
	return node;
}


std::string Cat::getGridBackground() {
	return "hippo/button.png";
}

void Cat::createChoice()
{
	CCLOG("createChoice");
	_choice = Node::create();
	_choice->setName("createChoice");
	addChild(_choice);
	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("hippo/block.png");
		choiceNode->setOpacity(100);
		choiceNode->setName("hippo_block");
		float x = _gapNodes1.at(i)->getPositionX() - _movingPositionX;
		float y;
		if (_state.compare("up") == 0) {
		//	_upCounting++;
		//	if (i != 0) {
				y = _gapNodes1.at(i)->getPositionY() - (choiceNode->getContentSize().width * (_upCount-1));
			//	y = _gapNodes1.at(i)->getPositionY();
		//	}
		//	else {
		//		y = _gapNodes1.at(i)->getPositionY();
		//				}
			//y = _gapNodes1.at(i)->getPositionY() - _blockSetPosY - choiceNode->getContentSize().width;
		}
		else if (_state.compare("down") == 0) {
			y = _gapNodes1.at(i)->getPositionY() - (choiceNode->getContentSize().width * (_downCount-1));
		}
		else
			{
			y = _gapNodes1.at(i)->getPositionY() ;
					}
		_posAfterGapX = x;
		choiceNode->setPosition(x, y);
		addChoice(choiceNode);
	}
}

std::string Cat::getGraphemeUnselectedBackground() {
	return "hippo/button_clicked.png";
}
std::string Cat::getGraphemeSelectedBackground() {
	return "hippo/block.png";
}

void Cat::gameExit()
{
}

void Cat::createAnswer()
{
	CCLOG("createAnswer");
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

void Cat::gameOver(bool correct)
{
	if (correct) {
			_gameContinue = true;
			_state = "";
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

Cat* Cat::create() {
	Cat* hippo = new (std::nothrow) Cat();
	if (hippo && hippo->init())
	{
		hippo->autorelease();
		return hippo;
	}
	CC_SAFE_DELETE(hippo);
	return nullptr;
}