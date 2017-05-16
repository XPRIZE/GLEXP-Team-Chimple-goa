#include "BasicMultiplication.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* BasicMultiplication::createScene()
{
	auto scene = Scene::create();
	auto layer = BasicMultiplication::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BasicMultiplication::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BasicMultiplication *BasicMultiplication::create() {
	BasicMultiplication *blast = new (std::nothrow) BasicMultiplication();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool BasicMultiplication::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BasicMultiplication::onEnterTransitionDidFinish() {
	
	LearningPlay();
	this->scheduleUpdate();
}

void BasicMultiplication::update(float delta) {

}

void BasicMultiplication::LearningPlay() {

	Node* bg = CSLoader::createNode("basicmultiplication/basicmultiplication.csb");
	addChild(bg);
	bg->setName("bg");
	topBoardSetting();

	std::map<int, std::string> animationPath = {
		{ 1,	"elephant_animation/elephant_animation.csb" },
		{ 2,	"Giraffe_animation/Giraffe_animation.csb" },
		{ 3,    "gorillacoin/gorillacoin.csb" },
		{ 4 ,	"lion_animation/lion.csb"},
		{ 5,	"owl/owlanimation.csb"},
		{ 6,	"zebra_animation/zebra_animation.csb"}
	};

	_animationName = animationPath.at(RandomHelper::random_int(1,6));
}

void BasicMultiplication::topBoardSetting() {

	int row = _menuContext->getCurrentLevel();
	int column = RandomHelper::random_int(1, 10);

	if (row > 6)
		row = 6;

	_answer = row * column;
	_row = row;
	_column = column;

	std::ostringstream topBoardEquation;
	topBoardEquation << row << " X " << column << " = ";
	_topBoardEquation = topBoardEquation.str();

	auto board = getChildByName("bg")->getChildByName("bg")->getChildByName("board");

	auto labelNumber = CommonLabelTTF::create(_topBoardEquation, "Helvetica", 150);
	labelNumber->setColor(Color3B::WHITE);
	labelNumber->setPosition(Vec2(board->getContentSize().width/2, board->getContentSize().height/2));
	board->addChild(labelNumber);
	labelNumber->setName("board");

	gridGrayAndListnerController(row , column);

}

void BasicMultiplication::gridGrayAndListnerController(int row , int column ) {

	// Here apply only on correct grid
	for (int rows = 1; rows <= 6; rows++) {
		for (int columns = 1; columns <= 10; columns++) {
			auto sprite = getGridWithIndex(rows, columns);

			if (rows <= row && columns <= column)
				addEventsOnGrid(sprite);
			else
				sprite->setColor(Color3B::GRAY);
		}
	}

}


void BasicMultiplication::addEventsOnGrid(cocos2d::Sprite* object)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = touch->getLocation();
	
		if (target->getBoundingBox().containsPoint(locationInNode)) {
			target->setColor(Color3B(255, 198, 44));

			auto action1 = ScaleTo::create(0.1,1.1);
			auto action2 = ScaleTo::create(0.1, 1);

			auto scaleAction = Sequence::create(action1,action2,NULL);
			target->runAction(scaleAction);

			topBoardEquationController((Sprite*)target);

			return false;
		}
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, object);
}

void BasicMultiplication::topBoardEquationController(Sprite* target) {

	auto board = (CommonLabelTTF*)getChildByName("bg")->getChildByName("bg")->getChildByName("board")->getChildByName("board");

	if (target->getTag() != 528) {
		_counter++;
		std::ostringstream topBoardEquation;
		topBoardEquation << _topBoardEquation << _counter;
		board->setString(topBoardEquation.str());
		target->setTag(528);
	}

	IndexValuePopup((Sprite*)target);

	if (_counter == _answer) {

		auto sequence = Sequence::create(CallFunc::create([=]() {
			playAnimationAnimal();
		}),
			DelayTime::create(2),
			CallFunc::create([=]() {
			auto gridPanel = getChildByName("bg")->getChildByName("grid");
			
			auto action = MoveTo::create(1, Vec2(gridPanel->getPositionX() - 2560, gridPanel->getPositionY()));
			EaseBackIn *easeAction = EaseBackIn::create(action);
			gridPanel->runAction(easeAction);
		}),
			NULL);

		this->runAction(sequence);

	}
}

void BasicMultiplication::playAnimationAnimal() {

	for (int rows = 1; rows <= 6; rows++) {
		for (int columns = 1; columns <= 10; columns++) {
			auto sprite = getGridWithIndex(rows, columns);

			if (rows <= _row && columns <= _column) {
			
				sprite->setColor(Color3B::WHITE);
				auto animationAnimalTimeline = CSLoader::createTimeline(_animationName);
				auto animationAnimal = CSLoader::createNode(_animationName);
				animationAnimal->runAction(animationAnimalTimeline);
				animationAnimal->setScale(0.5);

				auto size = sprite->getContentSize();

				sprite->addChild(animationAnimal);
				animationAnimal->setPosition(Vec2(sprite->getContentSize().width/2,sprite->getContentSize().height/2));
				animationAnimalTimeline->gotoFrameAndPlay(0, true);
			}
		}
	}

}

void BasicMultiplication::IndexValuePopup(Sprite* target) {

	string TargetName = target->getName();
	std::ostringstream gridIndexName;
	std::ostringstream gridIndexNamecolumn;

	gridIndexName << TargetName[0] << "r";
	auto rightIndexName = gridIndexName.str();

	if (TargetName.length() > 4) 
		gridIndexNamecolumn << 10 << "c";
	else
		gridIndexNamecolumn << TargetName[2] << "c";
	
	auto leftIndexName = gridIndexNamecolumn.str();

	auto gridIndexRow = (TextFieldTTF*)getChildByName("bg")->getChildByName("grid")->getChildByName(rightIndexName);
	auto gridIndexColumn = (TextFieldTTF*)getChildByName("bg")->getChildByName("grid")->getChildByName(leftIndexName);

	auto action1 = ScaleTo::create(0.1, 1.4);
	auto action2 = ScaleTo::create(0.1, 1);

	auto scaleAction1 = Sequence::create(action1, action2, NULL);
	gridIndexRow->runAction(scaleAction1);

	auto action3 = ScaleTo::create(0.1, 1.4);
	auto action4 = ScaleTo::create(0.1, 1);

	auto scaleAction2 = Sequence::create(action3, action4, NULL);
	gridIndexColumn->runAction(scaleAction2);
}

string BasicMultiplication::getGridNameInString(int row, int column) {
	std::ostringstream gridName;	
	gridName << row << "r" << column << "c";
	return gridName.str();
}

Sprite* BasicMultiplication::getGridWithIndex(int row, int column) {

	auto gridName = getGridNameInString(row, column);
	auto grid = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName(gridName);
	grid->setTag(1);
	return grid;
}

void BasicMultiplication::QuizPlay() {
	auto size = Director::getInstance()->getVisibleSize();

	auto topBoard = createSprite("topBoard",size.width * 0.8 , size.height* 0.2 , size.width/2, size.height * 0.75,1);
}

Sprite* BasicMultiplication::createSprite(string name,int width, int height,int posiX,int posiY,int scaleXY) {

	auto sprite = Sprite::create();
	sprite->setTextureRect(Rect(0, 0,width,height));
	sprite->setPosition(Vec2(posiX,posiY));
	sprite->setName(name);
	addChild(sprite);
	return sprite;
}

BasicMultiplication::~BasicMultiplication(void)
{
	this->removeAllChildrenWithCleanup(true);
}
