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

	Size _size = Director::getInstance()->getVisibleSize();

	auto _node = CSLoader::createNode("jasmine/hint.csb");
	_node->setPosition(Vec2(_size.width/2, _size.height - _node->getBoundingBox().size.height));
	addChild(_node);

	auto label = ui::Text::create();
	label->setString(_word);
	label->setFontSize(200);
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(_size.width / 2, _size.height*92/100));
	addChild(_answer);

}

void Jasmin_Mainfile::createChoice() {
	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	_choice = Node::create();
	_choice->setPosition(Vec2(0, hei*43/100));
	addChild(_choice);
	const float squareWidth = Director::getInstance()->getVisibleSize().width / _numGraphemes;
	const float squareHeight = Director::getInstance()->getVisibleSize().height;

	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jasmine/seedpouch.png");
		choiceNode->setPosition(Vec2((i + 0.5) * squareWidth, 0));
		addChoice(choiceNode);

		_positionX.push_back((i + 0.5) * squareWidth);
		_positionY.push_back(squareHeight * 5 / 100);
	}
}

std::string Jasmin_Mainfile::getGridBackground() {
	return "jasmine/tile.png";
}

void Jasmin_Mainfile::gameOver(bool correct) {
	if (correct) {
		float hei = Director::getInstance()->getVisibleSize().height;
		for (int item = 0; item < _positionX.size(); ++item)
		{
			int random_val = std::rand() % (4 - 1 + 1) + 1;

			std::ostringstream fileName (std::ostringstream::ate);
			fileName.str("jasmine/plant");
			fileName << random_val;
			fileName << ".csb";

			std::string s = fileName.str();

			auto tree = CSLoader::createNode(fileName.str());
			tree->setPosition(Vec2(_positionX[item] , hei*47/100));
			addChild(tree);

			auto animation = CSLoader::createTimeline(fileName.str());
			tree->runAction(animation);
			animation->play("correct", false);
			animation->setAnimationEndCallFunc("correct", CC_CALLBACK_0(Jasmin_Mainfile::startFire, this, tree, random_val));
		}
	}
	else
	{
		for (int item = 0; item < _positionX.size(); ++item)
		{
			int random_val = std::rand() % (4 - 1 + 1) + 1;

			auto tree = CSLoader::createNode("jasmine/plant" + std::to_string(random_val) + ".csb");
			tree->setPosition(Vec2(_positionX[item], _positionY[item]));
			addChoice(tree);

			auto animation = CSLoader::createTimeline("jasmine/plant" + std::to_string(random_val) + ".csb");
			tree->runAction(animation);
			animation->play("wrong", false);
//			animation->setAnimationEndCallFunc("wrong", CC_CALLBACK_0(Jasmin_Mainfile::startFire, this, tree, random_val));
		}
	}
}

void Jasmin_Mainfile::startFire(Node *nd, int random_val)
{
//	auto animation = CSLoader::createTimeline("jasmine/flower" + std::to_string(random_val) + ".csb");
	Vector <Node*> children = nd->getChildren();

	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("flower") == 0) {
			std::ostringstream fileName (std::ostringstream::ate);
			fileName.str("jasmine/flower");
			fileName << random_val;
			fileName << ".csb";

			auto eyeTimeline = CSLoader::createTimeline(fileName.str());
			monsterItem->runAction(eyeTimeline);
			eyeTimeline->play("bloom", false);
		}
	}
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