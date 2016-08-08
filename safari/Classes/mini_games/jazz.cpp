#include "jazz.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;

Scene* jazz::createScene() {
	auto layer = jazz::create();
	auto scene = GameScene::createWithChild(layer, "jazz");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* jazz::loadNode() {
	auto node = CSLoader::createNode("jazz/MainScene.csb");
	Size visibleSize = Director::getInstance()->getVisibleSize();

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		node->setPositionX(myGameWidth);
	}
	return node;
}

void jazz::createChoice() {

	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	_choice = Node::create();
//	_choice->setPosition(Vec2(500, 900));
	_choice->setPosition(Vec2(0, hei * 43 / 100));
    addChild(_choice);
	const float squareWidth = Director::getInstance()->getVisibleSize().width / _numGraphemes;

	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jazz/drum.png");
	//	choiceNode->setPosition(Vec2(i * 400, 0));
		choiceNode->setPosition(Vec2((i + 2.1) * (squareWidth-220), 0));
		addChoice(choiceNode);
	}
}

std::string jazz::getGridBackground() {
	return "jazz/drum_below.png";
}

jazz* jazz::create() {
	jazz* word = new (std::nothrow) jazz();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}