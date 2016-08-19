#include "Chain.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

std::string Chain::_SS;

Scene* Chain::createScene()
{
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("chain/chain.plist");
	//Chain::_SS = "flamingo";
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
	std::string chainSceneType[] = { "monkey","elephant","flamingo" };
	Chain::_SS = chainSceneType[RandomHelper::random_int(0, 2)];
	//Chain::_SS = "elephant";
	if (!Chain::_SS.compare("monkey"))
	{
		_node = CSLoader::createNode("chain/chain.csb");
	}
	else if (!Chain::_SS.compare("elephant"))
	{
		_node = CSLoader::createNode("chain/chain01.csb");
	}
	else if (!Chain::_SS.compare("flamingo"))
	{
		_node = CSLoader::createNode("chain/chain02.csb");
	}

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

	CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("chain/misc/chainMisc.wav", true);
	CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("chain/misc/chainMisc.wav");
//	_numGraphemes = 3;
	if (!Chain::_SS.compare("monkey"))
	{
		Sprite* wordPanel = (Sprite *)_gameBg->getChildByName("wordpanel_21");
		wordPanel->setPosition(Vec2(visibleSize.width/2,wordPanel->getPosition().y));
		Sprite* sampleMonkey = (Sprite *)_gameBg->getChildByName("monkey_15_1_2");
		Sprite* rope = (Sprite *)_gameBg->getChildByName("toprope_12");
		auto choicePanel = sampleMonkey->getBoundingBox().size.width * _numGraphemes;
		auto partition = (wid - choicePanel) / 2;
		auto ropeLength = choicePanel + 60;
		auto ropeScaleInX = ropeLength / rope->getBoundingBox().size.width;
		rope->setPosition(Vec2(partition - 30, rope->getPosition().y + 40));
		rope->setAnchorPoint(Vec2(0, 0.5));
		rope->setScaleX(ropeScaleInX);

		Sprite* treeLeft = (Sprite *)_gameBg->getChildByName("maintree_14");
		Sprite* treeRight = (Sprite *)_gameBg->getChildByName("maintree_13");
		treeLeft->setPosition(Vec2(partition, treeLeft->getPosition().y));
		treeRight->setPosition(Vec2(partition + choicePanel, treeRight->getPosition().y));
		treeLeft->setAnchorPoint(Vec2(1, 0.5));
		treeRight->setAnchorPoint(Vec2(0, 0.5));

		_choice = Node::create();
		_choice->setPosition(Vec2(partition + (sampleMonkey->getBoundingBox().size.width / 2), (hei*.58)));
		addChild(_choice);

		for (int i = 0; i < _numGraphemes; i++) {
			auto choiceNode = Node::create();
			//auto choiceNode = Sprite::createWithSpriteFrameName("chain/monkey.png");
			choiceNode->setPosition(Vec2(i*sampleMonkey->getBoundingBox().size.width, 40));
			choiceNode->setScale(0.8);
			choiceNode->setAnchorPoint(Vec2(0.1, 0.5));
			choiceNode->setVisible(true);
			addChoice(choiceNode);
		}
	}
	else if (!Chain::_SS.compare("elephant"))
	{
		Sprite* wordPanel = (Sprite *)_gameBg->getChildByName("wordpanel_21");
		wordPanel->setPosition(Vec2(visibleSize.width / 2, wordPanel->getPosition().y));
		Sprite* ele = (Sprite *)_gameBg->getChildByName("ele_35");
		ele->setVisible(false);
		auto gap = Director::getInstance()->getVisibleSize().width / _numGraphemes;
		_choice = Node::create();
		_choice->setPosition(Vec2(0, (hei*.56)));
		addChild(_choice);

		for (int i = 0; i < _numGraphemes; i++) {
			//auto choiceNode = Node::create();
			auto choiceNode = CSLoader::createNode("chain/elephant.csb");
			choiceNode->setPosition(Vec2((i + 0.4)*gap, 0));
			choiceNode->getChildren().at(0)->setAnchorPoint(Vec2(0.47, 0.25));
			choiceNode->setScale(0.8);
			choiceNode->setVisible(true);
			addChoice(choiceNode);
			_eleContainer.push_back(choiceNode);

		}
	}
	else if (!Chain::_SS.compare("flamingo"))
	{
		Sprite* wordPanel = (Sprite *)_gameBg->getChildByName("wordpanel_21");
		wordPanel->setPosition(Vec2(visibleSize.width / 2, wordPanel->getPosition().y));
		auto gap = Director::getInstance()->getVisibleSize().width / _numGraphemes;
		_choice = Node::create();
		_choice->setPosition(Vec2(0, (hei*.58)));
		addChild(_choice);

		for (int i = 0; i < _numGraphemes; i++) {
			auto choiceNode = CSLoader::createNode("chain/flemingo.csb");
			choiceNode->setPosition(Vec2((i + 0.4)*gap, 00));
			choiceNode->getChildren().at(0)->setAnchorPoint(Vec2(0.50, 0.6));
			choiceNode->setScale(0.8);
			choiceNode->setVisible(true);
			addChoice(choiceNode);
			_flamContainer.push_back(choiceNode);
		}
	}
}
std::string Chain::getGridBackground() {
	return "chain/block.png";
}

std::string Chain::getGraphemeUnselectedBackground() {
	return "chain/letterpanel.png";
}

std::string Chain::getGraphemeSelectedBackground() {
	if (!Chain::_SS.compare("monkey"))
	{
		return "chain/animation.csb";
	}
	else if (!Chain::_SS.compare("elephant"))
	{
		return "";
	}
	else if (!Chain::_SS.compare("flamingo"))
	{
		return "";
	}
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
	_answer->setPosition(Vec2(visibleSize.width / 2, visibleSize.height*.935));
	addChild(_answer);
}
void Chain::gameOver(bool correct)
{
	if (correct) {

		if (!Chain::_SS.compare("monkey"))
		{
					auto callShowScore = CCCallFunc::create([=] {
						CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
						_menuContext->showScore();
					});
					auto callAnimation = CCCallFunc::create([=] {
						for (int i = 0; i < _numGraphemes; i++) {
							auto timeLine = CSLoader::createTimeline("chain/animation.csb");
							_answerVector.at(i).second->getChildren().at(1)->getChildren().at(0)->setAnchorPoint(Vec2(0.509, 0.33));
							_answerVector.at(i).second->runAction(timeLine);
							timeLine->play("monkeyeat", true);
					
							timeLine->setTimeSpeed(0.5);
						}
					});
					this->runAction(Sequence::create(DelayTime::create(1), callAnimation, DelayTime::create(5), callShowScore, NULL));
		}
		else if (!Chain::_SS.compare("elephant"))
		{
					auto callShowScore = CCCallFunc::create([=]
					{
						CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
						_menuContext->showScore();
					});
					auto eleAnimation = CCCallFunc::create([=] {
						for (std::size_t i = 0; i < _eleContainer.size(); i++)
						{
							cocostudio::timeline::ActionTimeline *timeline = CSLoader::createTimeline("chain/elephant.csb");
							_eleContainer[i]->runAction(timeline);
							timeline->play("elephant", true);
							timeline->setTimeSpeed(0.5);
						}
					});
					this->runAction(Sequence::create(DelayTime::create(1), eleAnimation, DelayTime::create(5), callShowScore, NULL));
		}
		else if (!Chain::_SS.compare("flamingo"))
		{
					auto callShowScore = CCCallFunc::create([=]
					{
						CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
						_menuContext->showScore();
						_choice->removeAllChildrenWithCleanup(true);
					});
					auto flamingoAnimation = CCCallFunc::create([=] {

						for (std::size_t i = 0; i < _flamContainer.size(); i++)
						{
							_answerVector.at(i).second->setVisible(false);
							cocostudio::timeline::ActionTimeline *timeline = CSLoader::createTimeline("chain/flemingo.csb");
							_flamContainer[i]->runAction(timeline);
							timeline->play("flamingo", true);
							auto moveTo = MoveTo::create(RandomHelper::random_int(1, 5), Vec2(visibleSize.width - 200, 1500));
							_flamContainer[i]->runAction(moveTo);
						}
					});
					this->runAction(Sequence::create(DelayTime::create(1), flamingoAnimation, DelayTime::create(5), callShowScore, NULL));
		}
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
		if (!Chain::_SS.compare("monkey"))
		{
			auto bg = CSLoader::createNode("chain/animation.csb");
			grapheme->setSelectedBackground(bg);
		}
		else if (!Chain::_SS.compare("elephant"))
		{
		}
		else if (!Chain::_SS.compare("flamingo"))
		{
		}
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
		auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
		auto sequence = Sequence::create(moveTo, callback, NULL);
		runAction(sequence);
		if (!Chain::_SS.compare("monkey"))
		{
			auto scaleTo = ScaleTo::create(0.5, 0.3);
			_letterBG->runAction(scaleTo);
			_monkeyTimeline->play("monkeyflip", false);
		}

	}
	else
	{
		changeBackground();
		auto moveTo = MoveTo::create(0.5, toPosition);
		runAction(moveTo);
		if (!Chain::_SS.compare("monkey"))
		{
			auto scaleTo = ScaleTo::create(0.5, 0.8);
			_letterBG->runAction(scaleTo);
			_monkeyTimeline->play("monkeyflip", false);
		}
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
	_selectedBackground->getChildren().at(0)->setAnchorPoint(Vec2(0.47, 0.33));
	_selectedBackground->setScale(0.3);
}