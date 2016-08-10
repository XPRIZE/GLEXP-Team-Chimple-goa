#include "Wembley.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;

Scene* Wembley::createScene() {
	auto layer = Wembley::create();
	auto scene = GameScene::createWithChild(layer, "wembley");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* Wembley::loadNode() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
	auto node = CSLoader::createNode("wembley/wembleybg.csb");
	node->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height/2 + origin.y));
	node->setAnchorPoint(Vec2(0.5, 0.5));

	return node;
}

void Wembley::createAnswer() {

	Size _size = Director::getInstance()->getVisibleSize();

	auto label = ui::Text::create();
	label->setString(_word);
	label->setFontSize(200);
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(_size.width / 2, _size.height * 88 / 100));
	addChild(_answer);

}

void Wembley::createChoice() {
	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	_choice = Node::create();
	_choice->setPosition(Vec2(0, hei * 63 / 100));
	addChild(_choice);

	const float squareWidth = Director::getInstance()->getVisibleSize().width / _numGraphemes;
	
	for (int i = 0; i < _numGraphemes; i++) {
		
		auto choiceNode = Sprite::createWithSpriteFrameName("wembley/char.png");
		choiceNode->setPosition(Vec2((i + 0.4) * squareWidth, hei * 63 / 100));
		addChild(choiceNode);

		auto dotBall = Sprite::createWithSpriteFrameName("wembley/balldash.png");
		dotBall->setPosition(Vec2((i + 0.7) * squareWidth, hei * -10/100));
		addChoice(dotBall);
	}
}

std::string Wembley::getGridBackground() {
	return "wembley/ball.png";
}

Wembley* Wembley::create() {
	Wembley* word = new (std::nothrow) Wembley();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}

