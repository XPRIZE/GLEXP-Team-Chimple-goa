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

void Jasmin_Mainfile::createAnswer() {
	auto label = ui::Text::create();
	label->setString(_word);
	label->setFontSize(200);
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(1280, 1600));
	addChild(_answer);

}

void Jasmin_Mainfile::createChoice() {
	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	_choice = Node::create();
	_choice->setPosition(Vec2(0, hei*43/100));
	addChild(_choice);

	const float squareWidth = Director::getInstance()->getVisibleSize().width / _numGraphemes;

	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jasmine/seedpouch.png");
		choiceNode->setPosition(Vec2((i + 0.5) * squareWidth, 0));
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