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

GraphemeGrid* Chain::createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground)
{
	return ChainGrid::create(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground);
}

Node* Chain::loadNode() {
	_node = CSLoader::createNode("chain/chain.csb");

	_gameBg = _node;
	Vector <Node*> children = _gameBg->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node* monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("monkey") == 0)
		{
			monsterItem->setVisible(false);
		}
		CCLOG("name : %s", str.c_str());
		}

	return _node;
}
void Chain::createChoice() {
	
float wid = visibleSize.width;
float hei = visibleSize.height;
 
//_numGraphemes = 1;

Sprite* sampleMonkey = (Sprite *)_gameBg->getChildByName("monkey_15_1_2");
Sprite* rope = (Sprite *)_gameBg->getChildByName("toprope_12");
auto choicePanel = sampleMonkey->getBoundingBox().size.width * _numGraphemes;
auto partition = (wid - choicePanel) / 2;
auto ropeLength =  choicePanel+60;
auto ropeScaleInX = ropeLength / rope->getBoundingBox().size.width;
rope->setPosition(Vec2(partition-30,rope->getPosition().y+40));
rope->setAnchorPoint(Vec2(0, 0.5));
rope->setScaleX(ropeScaleInX);

Sprite* treeLeft = (Sprite *)_gameBg->getChildByName("maintree_14");
Sprite* treeRight= (Sprite *)_gameBg->getChildByName("maintree_13");
treeLeft->setPosition(Vec2(partition, treeLeft->getPosition().y));
treeRight->setPosition(Vec2(partition+ choicePanel, treeRight->getPosition().y));
treeLeft->setAnchorPoint(Vec2(1, 0.5));
treeRight->setAnchorPoint(Vec2(0, 0.5));

	_choice = Node::create();
	_choice->setPosition(Vec2(partition+ (sampleMonkey->getBoundingBox().size.width/2), (hei*.58)));
	addChild(_choice);
	
	for (int i = 0; i < _numGraphemes; i++) {
		auto choiceNode = Node::create();
		//auto choiceNode = Sprite::createWithSpriteFrameName("chain/monkey.png");
		choiceNode->setPosition(Vec2(i * sampleMonkey->getBoundingBox().size.width, 40));
		choiceNode->setScale(0.8);
		choiceNode->setVisible(true);
		addChoice(choiceNode);
	}

}
std::string Chain::getGridBackground() {
	return "chain/block.png"; 
}

std::string Chain::getGraphemeUnselectedBackground() {
	return "chain/letterpanel.png";
}

std::string Chain::getGraphemeSelectedBackground() {
	return "chain/animation.csb";
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

void Chain::createAnswer() {
	auto label = ui::Text::create();
	label->setString(_word);
	label->setFontSize(200);
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(visibleSize.width/2, visibleSize.height*.935));
	addChild(_answer);

}


void Chain::gameOver(bool correct)
{
	if (correct) {
		//_menuContext->showScore();
		//_answerVector.at(0).second->setScale(0.5);
		auto callShowScore = CCCallFunc::create([=] {
			_menuContext->showScore();
			});
		auto callAnimation = CCCallFunc::create([=] {
			for (int i = 0; i < _numGraphemes; i++) {
				auto timeLine = CSLoader::createTimeline("chain/animation.csb");
				//_monkeyTimeline->setTimeSpeed(0.5);
				_answerVector.at(i).second->runAction(timeLine);
				timeLine->play("monkeyeat", true);
				_answerVector.at(i).second->getChildren().at(0)->setAnchorPoint(Vec2(0.5, 0.185));
				timeLine->setTimeSpeed(0.7);
			}
		});
		this->runAction(Sequence::create(DelayTime::create(1), callAnimation, DelayTime::create(8), callShowScore, NULL));

	}
}

ChainGrid* ChainGrid::create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
	ChainGrid *graphemeGrid = new (std::nothrow) ChainGrid();
	if (graphemeGrid && graphemeGrid->init(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground)) {
		graphemeGrid->autorelease();
		return graphemeGrid;
	}
	CC_SAFE_DELETE(graphemeGrid);
	return nullptr;

}

bool ChainGrid::init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
	if (!GraphemeGrid::init(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground)) {
		return false;
	}
	return true;
}

Grapheme* ChainGrid::createGrapheme(std::string graphemeString) {
	return ChainGrapheme::create(graphemeString);
}

Grapheme* ChainGrid::createAndAddGrapheme(std::string graphemeString) {
	auto grapheme = createGrapheme(graphemeString);
	addChild(grapheme);
	if (!_graphemeUnselectedBackground.empty()) {
		auto bg = Sprite::createWithSpriteFrameName(_graphemeUnselectedBackground);
		grapheme->setUnselectedBackground(bg);
	}
	if (!_graphemeSelectedBackground.empty()) {
		auto bg = CSLoader::createNode("chain/animation.csb");
		grapheme->setSelectedBackground(bg);
	}
	return grapheme;
}


ChainGrapheme* ChainGrapheme::create(std::string graphemeString) {
	ChainGrapheme *grapheme = new (std::nothrow) ChainGrapheme();
	if (grapheme && grapheme->init(graphemeString)) {
		grapheme->autorelease();
		return grapheme;
	}
	CC_SAFE_DELETE(grapheme);
	return nullptr;
}

bool ChainGrapheme::init(std::string graphemeString) {
	if (!Grapheme::init(graphemeString)) {
		return false;
	}
	return true;
}

void ChainGrapheme::animateToPositionAndChangeBackground(cocos2d::Vec2 toPosition) {
	_prevPosition = getPosition();
	if (!_selected) {
	
		auto moveTo = MoveTo::create(0.5, toPosition);
		auto scaleTo = ScaleTo::create(0.5, 0.3);
		auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
		auto sequence = Sequence::create(moveTo, callback, NULL);
		runAction(sequence);
		_letterBG->runAction(scaleTo);
		_monkeyTimeline->play("monkeyflip", false);
	}
	else 
	{
		changeBackground();
		auto moveTo = MoveTo::create(0.5, toPosition);
		auto scaleTo = ScaleTo::create(0.5, 0.8);
		runAction(moveTo);
		_letterBG->runAction(scaleTo);
		_monkeyTimeline->play("monkeyflip", false);
	}
}
void ChainGrapheme::setSelectedBackground(Node* selectedBackground)
{
	_selectedBackground = selectedBackground;
	_letterBG = selectedBackground;
	addChild(_selectedBackground, -1);
	if (!_selected) {
		_selectedBackground->setVisible(false);
	}
	_monkeyTimeline = CSLoader::createTimeline("chain/animation.csb");
	_selectedBackground->runAction(_monkeyTimeline);
	_selectedBackground->setScale(0.3);
	_selectedBackground->getChildren().at(0)->setAnchorPoint(Vec2(0.5,0.185));
}