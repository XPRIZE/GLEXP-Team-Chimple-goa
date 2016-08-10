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
Chain::~Chain(void)
{
	

}
Chain::Chain(void)
{


}
Node* Chain::loadNode() {
	auto node = CSLoader::createNode("chain/chain.csb");

	gameBg = node;
	Vector <Node*> children = gameBg->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node* monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("monkey") == 0)
		{
			monsterItem->setVisible(false);
		}
		CCLOG("name : %s", str.c_str());
		}

	return node;
}
void Chain::createChoice() {
	
float wid = visibleSize.width;
float hei = visibleSize.height;
 
_numGraphemes = 3;

Sprite* sampleMonkey = (Sprite *)gameBg->getChildByName("monkey_22");
Sprite* rope = (Sprite *)gameBg->getChildByName("toprope_20");
auto choicePanel = sampleMonkey->getBoundingBox().size.width * _numGraphemes;
auto partition = (wid - choicePanel) / 2;
auto ropeLength =  choicePanel;
auto ropeScaleInX = ropeLength / rope->getBoundingBox().size.width;
rope->setPosition(Vec2(partition,rope->getPosition().y));
rope->setAnchorPoint(Vec2(0, 0.5));
rope->setScaleX(ropeScaleInX);

Sprite* treeLeft = (Sprite *)gameBg->getChildByName("maintree_19");
Sprite* treeRight= (Sprite *)gameBg->getChildByName("maintree_17");
treeLeft->setPosition(Vec2(partition, treeLeft->getPosition().y));
treeRight->setPosition(Vec2(partition+ choicePanel, treeRight->getPosition().y));
treeLeft->setAnchorPoint(Vec2(1, 0.5));
treeRight->setAnchorPoint(Vec2(0, 0.5));

	_choice = Node::create();
	_choice->setPosition(Vec2(partition, (hei*.60)));
	addChild(_choice);
	for (int i = 0; i < _numGraphemes; i++) {
		//auto choiceNode = Node::create();
		auto choiceNode = Sprite::createWithSpriteFrameName("chain/monkey.png");
		choiceNode->setPosition(Vec2(i * sampleMonkey->getBoundingBox().size.width, 0));
		choiceNode->setScale(0.7);
		choiceNode->setAnchorPoint(Vec2(0, 0.5));
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
