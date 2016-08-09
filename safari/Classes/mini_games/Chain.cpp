#include "Chain.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Scene* Chain::createScene()
{
	// 'layer' is an autorelease object
	auto layer = Chain::create();

	// 'scene' is an autorelease object
	auto scene = GameScene::createWithChild(layer, "chain");

	layer->_menuContext = scene->getMenuContext();
	return scene;
}
Node* Chain::loadNode() {
	auto node = CSLoader::createNode("chain/chain.csb");
	return node;
}
void Chain::createChoice() {
	_choice = Node::create();
	_choice->setPosition(Vec2(1280, 900));
	addChild(_choice);
	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Node::create();
		choiceNode->setPosition(Vec2(i * 200, 0));
		addChoice(choiceNode);
	}
}
std::string Chain::getGridBackground() {
	return "chain/letterpanel.png";
}
Chain* Chain::create() {
	Chain* word = new (std::nothrow) Chain();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}


//// on 'init' you need to initialize your instance
//bool Chain::init()
//{
//	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("crossthebridge.plist");
//
//	// 1. super init first
//	if (!Layer::init())
//	{
//		return false;
//	}
//
//	auto chain = CSLoader::createNode("chain/chain.csb");
//	this->addChild(chain, 0);
//	//chain->setAnchorPoint(Vec2(0.5,0.5));
//
//	return true;
//}
