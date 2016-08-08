#include "Jasmin_Mainfile.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;

Scene* Jasmin_Mainfile::createScene() {
	auto layer = Jasmin_Mainfile::create();
	auto scene = GameScene::createWithChild(layer, "jasmine");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* Jasmin_Mainfile::loadNode() {
	auto node = CSLoader::createNode("jasmine/jasminemainscene.csb");
	return node;
}

void Jasmin_Mainfile::createChoice() {
	float wid = Director::getInstance()->getVisibleSize().width;

	_choice = Node::create();
	_choice->setPosition(Vec2(wid*15/100, 900));
	addChild(_choice);


	float gap;
	_numGraphemes = 6;
	if (_numGraphemes == 2)
		gap = wid * 70 / 100;
	else if (_numGraphemes == 3)
		gap = wid * 34 / 100;
	else if (_numGraphemes == 4)
		gap = wid * 22 / 100;
	else if (_numGraphemes == 5)
		gap = wid * 17/100;
	else if (_numGraphemes == 6)
		gap = wid * 14 / 100;

	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jasmine/seedpouch.png");
		choiceNode->setPosition(Vec2(i * gap, 0));
		addChoice(choiceNode);
	}
}

std::string Jasmin_Mainfile::getGridBackground() {
	return "jasmine/tile.png";
}

Jasmin_Mainfile* Jasmin_Mainfile::create() {
	Jasmin_Mainfile* word = new (std::nothrow) Jasmin_Mainfile();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}