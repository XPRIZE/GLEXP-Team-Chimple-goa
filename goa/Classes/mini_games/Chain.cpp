#include "Chain.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../util/CommonText.h"

USING_NS_CC;

std::string Chain::_SS;

Scene* Chain::createScene()
{
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("chain/chain.plist");
	// 'layer' is an autorelease object
	auto layer = Chain::create();

	// 'scene' is an autorelease object
	auto scene = GameScene::createWithChild(layer, "chain");

	layer->_menuContext = scene->getMenuContext();
	return scene;
}
Chain::~Chain(void)
{
	this->removeAllChildrenWithCleanup(true);
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
	auto label = CommonText::create();
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
        MenuContext::pronounceWord(_word);
		_grid->touchEndedCallback = nullptr;
        _eventDispatcher->removeCustomEventListeners("grapheme_anim_done");
        _eventDispatcher->removeCustomEventListeners("chars_recognized");
        _eventDispatcher->removeCustomEventListeners("clearPrintedCharacters");
        
		if (!Chain::_SS.compare("monkey"))
		{

					auto callShowScore = CCCallFunc::create([=] {
						_menuContext->showScore();
					});
					auto callAnimation = CCCallFunc::create([=] {
						for (int i = 0; i < _numGraphemes; i++) {
							auto timeLine = CSLoader::createTimeline("chain/animation.csb");
							_answerVector.at(i).second->getChildren().at(1)->getChildren().at(0)->setAnchorPoint(Vec2(0.47, 0.33));
							_answerVector.at(i).second->runAction(timeLine);
							timeLine->play("monkeyeat", true);
					
							timeLine->setTimeSpeed(0.5);
						}
					});
					this->runAction(Sequence::create(DelayTime::create(1.2), callAnimation, DelayTime::create(4), callShowScore, NULL));
		}
		else if (!Chain::_SS.compare("elephant"))
		{

					auto callShowScore = CCCallFunc::create([=]
					{
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
					this->runAction(Sequence::create(DelayTime::create(1.2), eleAnimation, DelayTime::create(4), callShowScore, NULL));
		}
		else if (!Chain::_SS.compare("flamingo"))
		{

//			Director::getInstance()->getEventDispatcher()->removeAllEventListeners();
					auto callShowScore = CCCallFunc::create([=]
					{
						_menuContext->showScore();
					//	_choice->removeAllChildrenWithCleanup(true);
					});
					auto flamingoAnimation = CCCallFunc::create([=] {

						for (std::size_t i = 0; i < _flamContainer.size(); i++)
						{
							//_isEnabled = true;
							//this->removeChild(_answerVector.at(i).second);
							//_answerVector.at(i).second->setVisible(false);
							_answerVector.at(i).second->removeFromParent();
							cocostudio::timeline::ActionTimeline *timeline = CSLoader::createTimeline("chain/flemingo.csb");
							_flamContainer[i]->runAction(timeline);
							timeline->play("flamingo", true);
							auto moveTo = MoveTo::create(RandomHelper::random_int(1, 5), Vec2(visibleSize.width - 200, 1500));
							_flamContainer[i]->runAction(moveTo);
						}
					});
					this->runAction(Sequence::create(DelayTime::create(1.2), flamingoAnimation, DelayTime::create(3), callShowScore, NULL));
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

		auto moveTo = MoveTo::create(1, toPosition);
		auto rotateTo = RotateBy::create(1, 360);
		auto mySpawn = Spawn::createWithTwoActions(moveTo, rotateTo);
		auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
		
		if (!Chain::_SS.compare("monkey"))
		{
			 auto scaleTo = ScaleTo::create(1, 0.3);
			 auto rotateTo = RotateBy::create(1, 360);
			 auto mySpawn_1 = Spawn::createWithTwoActions(scaleTo, rotateTo);
			_letterBG->runAction(mySpawn_1);
			auto sequence = Sequence::create(mySpawn, callback, NULL);
			runAction(sequence);
		//	_monkeyTimeline->play("monkeyflip", false);
		}
		else
		{
			auto sequence = Sequence::create(moveTo, callback, NULL);
			runAction(sequence);
		}
	}
	else
	{
        auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
		auto moveTo = MoveTo::create(1, toPosition);
		auto rotateTo = RotateBy::create(1, 360);
		auto mySpawn = Spawn::createWithTwoActions(moveTo, rotateTo);
		if (!Chain::_SS.compare("monkey"))
		{
			auto scaleTo = ScaleTo::create(1, 0.8);
			auto rotateTo = RotateBy::create(1, 360);
			auto mySpawn_1 = Spawn::createWithTwoActions(scaleTo, rotateTo);
			_letterBG->runAction(mySpawn_1);
            runAction(Sequence::createWithTwoActions(mySpawn, callback));
		//	_monkeyTimeline->play("monkeyflip", false);
		}
		else
		{
			runAction(Sequence::createWithTwoActions(moveTo, callback));
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
