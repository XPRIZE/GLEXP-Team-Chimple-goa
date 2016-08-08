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
	_choice = Node::create();
	_choice->setPosition(Vec2(1280, 900));
	addChild(_choice);
	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jasmine/seed pouch.png");
		choiceNode->setPosition(Vec2(i * 200, 0));
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