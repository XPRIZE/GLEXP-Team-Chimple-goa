#include "Jasmin_Mainfile.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../hero/RPGConfig.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonText.h"

USING_NS_CC;

Scene* Jasmin_Mainfile::createScene(Lesson* lesson) {
	auto layer = Jasmin_Mainfile::create();
    layer->setLesson(lesson);
	auto scene = GameScene::createWithChild(layer, "jasmine");
	layer->_menuContext = scene->getMenuContext();

	return scene;
}

Node* Jasmin_Mainfile::loadNode() {
	auto node = CSLoader::createNode("jasmine/jasminemainscene.csb");
	return node;
}

void Jasmin_Mainfile::createAnswer() {
//    auto help = HelpLayer::create(Rect(1200, 400, 400, 300), Rect(300, 400, 400, 300));
//    addChild(help, 5);
//    help->clickAndDrag(Vec2(1200, 400), Vec2(200, 1600));
	Size _size = Director::getInstance()->getVisibleSize();

	auto _node = CSLoader::createNode("jasmine/hint.csb");
	_node->setPosition(Vec2(_size.width/2, _size.height - _node->getBoundingBox().size.height));
	addChild(_node);

	auto label = CommonText::create();
	label->setString(_word);
	label->setFontSize(std::max(float(50.0), float(200 - (_word.length() - 1) * 10)));
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(_size.width / 2, _size.height*92/100));
	addChild(_answer);

}

void Jasmin_Mainfile::createChoice() {

//	audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
//	audioBg->playEffect("jasmine/jasmin_background.ogg", true);

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
	float hei = Director::getInstance()->getVisibleSize().height;
	if (correct) {
        MenuContext::pronounceWord(_word);
		_grid->touchEndedCallback = nullptr;
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
			animation->setAnimationEndCallFunc("correct", CC_CALLBACK_0(Jasmin_Mainfile::startFlowerAnimation, this, tree, random_val, item));
		}

		CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
		success->playEffect("sounds/sfx/success.ogg", false);
	}
	else
	{
		for (int item = 0; item < _positionX.size(); ++item)
		{
			int random_val = std::rand() % (4 - 1 + 1) + 1;

			std::ostringstream fileName(std::ostringstream::ate);
			fileName.str("jasmine/plant");
			fileName << random_val;
			fileName << ".csb";

			auto tree = CSLoader::createNode(fileName.str());
			tree->setPosition(Vec2(_positionX[item], hei * 47 / 100));
			addChild(tree);

			auto animation = CSLoader::createTimeline(fileName.str());
			tree->runAction(animation);
			animation->play("wrong", false);
			animation->setAnimationEndCallFunc("wrong", CC_CALLBACK_0(Jasmin_Mainfile::removeAnimation, this, tree));
		}

		CocosDenshion::SimpleAudioEngine *error = CocosDenshion::SimpleAudioEngine::getInstance();
		error->playEffect("sounds/sfx/error.ogg", false);
	}
}

void Jasmin_Mainfile::removeAnimation(Node *nd)
{
	removeChild(nd);
}

void Jasmin_Mainfile::startFlowerAnimation(Node *nd, int random_val, int animationNumber)
{
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

			if(animationNumber==_numGraphemes-1)
			eyeTimeline->setAnimationEndCallFunc("bloom", CC_CALLBACK_0(Jasmin_Mainfile::playAnimation, this));
		}
	}
}

void Jasmin_Mainfile::playAnimation()
{
//	audioBg->stopAllEffects();
//	Director::getInstance()->replaceScene(Spirograph::createScene());

	Size _size = Director::getInstance()->getVisibleSize();


	auto _node = CSLoader::createNode("jasmine/win.csb");
	_node->setPosition(Vec2(_size.width / 2, _size.height / 2));
	_node->setAnchorPoint(Vec2(.5, .5));
	addChild(_node);

	auto _timeline = CSLoader::createTimeline("jasmine/win.csb");
	_node->runAction(_timeline);
	_timeline->play("win", false);
	_timeline->setAnimationEndCallFunc("win", CC_CALLBACK_0(Jasmin_Mainfile::showScore, this));
}

void Jasmin_Mainfile::showScore()
{
	_menuContext->showScore();
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

Jasmin_Mainfile::~Jasmin_Mainfile(void) {
//	audioBg->stopAllEffects();

}
