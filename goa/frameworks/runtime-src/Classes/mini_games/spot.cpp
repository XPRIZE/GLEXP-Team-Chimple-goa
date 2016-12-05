#include "spot.h"


USING_NS_CC;

Scene* spot::createScene()
{
	auto scene = Scene::create();
	auto layer = spot::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, spot::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}


spot *spot::create() {
	spot *spots = new (std::nothrow) spot();
	if (spots && spots->init()) {
		spots->autorelease();
		return spots;
	}
	CC_SAFE_DELETE(spots);
	return nullptr;

}

spot::spot():_answerValue(0) {



}

bool spot::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void spot::onEnterTransitionDidFinish() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	_level = _menuContext->getCurrentLevel();
	_answerValue = _level + 10;


	_menuContext->setMaxPoints(3);

	const int numberOfPages = 3;


	_bg = CSLoader::createNode("spot/background.csb"); 
	_bg->setName("bg");
	_bg->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height));


	_bg->setAnchorPoint(Vec2(0.5, 0.5));
	_bg->setPosition(Vec2(numberOfPages * visibleSize.width / 2, visibleSize.height/2));
	//backgroundSpriteMapTile->setScaleY(0.9);
	
	//_layer = Layer::create();
	//_layer->setContentSize(Size(visibleSize.width * 3, visibleSize.height));
	//_layer->setPosition(Vec2(0, 0));
	//addChild(_layer);
	
	
	Node *questionPlate = CSLoader::createNode("spot/spot.csb");
	questionPlate->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height * 0.1));
	questionPlate->setAnchorPoint(Vec2(0.5, 0.5));
	questionPlate->setPosition(Vec2(numberOfPages * visibleSize.width / 2 + visibleSize.width * 0.03, visibleSize.height / 14));



	Vector <Node*> children = _bg->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}


	_scrollView = ui::ScrollView::create();
	
	_scrollView->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	_scrollView->setContentSize(visibleSize);
	_scrollView->setInnerContainerSize(_bg->getContentSize());
	this->addChild(_scrollView);
	_answerValue = 0;
	addAnimals();


	addCalculator();


	auto scrollRight = CallFunc::create([=] {
		_scrollView->scrollToRight(3, true);
	});
	
	auto scrollLeft = CallFunc::create([=] {
		_scrollView->scrollToLeft(3, true);
	});


	auto scrollSequence = Sequence::create(DelayTime::create(1), scrollRight, DelayTime::create(1), scrollLeft,   NULL);
	this->runAction(scrollSequence);

	//_scrollView->scrollToRight(3, true);
	

	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(spot::onTouchBegan, this);
	listener->setSwallowTouches(false);

	Vec2 platePosition = questionPlate->getChildByName("cal")->getPosition();

	questionPlate->getChildByName("cal")->setPosition(platePosition - Vec2(platePosition.x * 0.25,0));

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), questionPlate->getChildByName("cal"));

	std::string countAnimal;
	std::string animalIcon;

	switch (_menuContext->getCurrentLevel()) {

	case 1:countAnimal = "buffaloes"; animalIcon = "spot/buffaloicon.png";  break;
	case 2:countAnimal = "cows"; animalIcon = "spot/cowicon.png";   break;
	case 3:countAnimal = "goats"; animalIcon = "spot/goaticon.png";   break;
	case 4:countAnimal = "horses"; animalIcon = "spot/horseicon.png";   break;
	case 5:countAnimal = "pigs"; animalIcon = "spot/pigicon.png";   break;
	case 6:countAnimal = "sheeps"; animalIcon = "spot/sheepicon.png";   break;

	}

	


	_label = ui::Text::create();
	_label->setFontName("fonts/Marker Felt.ttf");
	_label->setString(LangUtil::getInstance()->translateString("How many         are there?"));
	_label->setFontSize(100);
	_label->setPosition(Vec2(visibleSize.width / 4, visibleSize.height / 25));
	_label->setAnchorPoint(Vec2(0, 0));
	_label->setName("label");
	_label->setTextColor(Color4B::BLUE);
	_label->setColor(Color3B::RED);
	_label->setScaleX(1);
	_label->setScaleY(1);


	//_scrollView->addChild(_label,15);

	_scrollView->addChild(_bg, 10);
	
	//_scrollView->addChild(questionPlate, 10);
	this->addChild(questionPlate, 14);
	questionPlate->addChild(_label, 15);
	CCLOG("%d", _answerValue);

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("spot/spot.plist");

	cocos2d::Sprite * animalSprite = Sprite::createWithSpriteFrameName(animalIcon);
	//animalSprite->setPosition(400, 1600);
	animalSprite->setScale(0.7, 0.7);
	animalSprite->setAnchorPoint(Vec2(0.5, 0.5));
	animalSprite->setName("animalsprite");
	questionPlate->addChild(animalSprite);

	questionPlate->getChildByName("animalsprite")->setPosition(platePosition - Vec2(platePosition.x * 0.50, 0));



	///

	

		cocostudio::timeline::ActionTimeline * _windmillTimeline;
		_windmillTimeline = CSLoader::createTimeline("spot/windmill.csb");
		_bg->getChildByName("windmill")->runAction(_windmillTimeline);
		_windmillTimeline->play("fly", true);

	
	

	cocostudio::timeline::ActionTimeline * _smokeTimeline;
	_smokeTimeline = CSLoader::createTimeline("spot/smoke.csb");
	_scrollView->getChildByName("bg")->getChildByName("smoke")->runAction(_smokeTimeline);
	_smokeTimeline->play("fly", true);

	///

	this->scheduleUpdate();

}

void spot::update(float delta) {

	//isEnterPressed
	if (_calculateFlag == 0 && _calculator->checkAnswer(_answerValue)) {

		CCLOG("correct answer");
		_calculateFlag = 1;

		auto ShowScore = CallFunc::create([=] {

			_menuContext->addPoints(3);
			_menuContext->showScore();

		});


		auto scoreSequenceOne = Sequence::create(DelayTime::create(0.5), ShowScore, NULL);
		this->runAction(scoreSequenceOne);

	}
}

spot::~spot(void)
{
	this->removeAllChildrenWithCleanup(true);
}


void spot::gameHelpLayer()
{


	Size visibleSize = Director::getInstance()->getVisibleSize();
	_help = HelpLayer::create(Rect(visibleSize.width / 2, visibleSize.height / 2, visibleSize.width / 2.8, visibleSize.height * 0.4), Rect(0, 0, 0, 0));
	std::vector <Point> points;
	float boxWidth = (visibleSize.width / 2.8) / 2;
	float boxHeight = (visibleSize.height * 0.4) / 2;
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2, visibleSize.height / 2 + boxHeight*0.7));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	_help->writing(points);
	this->addChild(_help);
	_help->setName("gameHelpLayer");
}







void spot::addCalculator() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(visibleSize.width/2 + 1000, visibleSize.height/3 + 100), Vec2(0.5, 0.5), 0.7, 0.7);
	this->addChild(_calculator, 20);
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(false);

}

void spot::addAnimals() {

	std::string animalsName[] = { "","buffalo", "cow", "goat", "horse","pig","sheep" };

	Vector <Node*> children = _bg->getChildren();
	int size = children.size();
	for (int i = 1; i<=24; ++i) {
		

		std::ostringstream nodeName;
		nodeName.clear();
		nodeName <<i;
		std::string nodeStr = nodeName.str();

		Node * monsterItem = _bg->getChildByName(nodeStr);

		Vec2 nodePos = monsterItem->getPosition();

		int animalPicker = RandomHelper::random_int(1, 6);


		if (_menuContext->getCurrentLevel() == animalPicker) {
			_answerValue++;
		}


		Node *animal = CSLoader::createNode("spot/" + animalsName[animalPicker] +".csb");

		//questionPlate->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height * 0.1));
		animal->setAnchorPoint(Vec2(0.5, 0.5));
		animal->setPosition(nodePos);

		_scrollView->addChild(animal,15);

		cocostudio::timeline::ActionTimeline * _animalTimeline;
		_animalTimeline = CSLoader::createTimeline("spot/" + animalsName[animalPicker] + ".csb");
		animal->runAction(_animalTimeline);
		_animalTimeline->play("eat", true);
		//std::string str = monsterItem->getName().c_str();
		//CCLOG("name : %s", str.c_str());
	}
	

}


bool spot::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = Vec2(0, 0);

	locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	


	auto bb = target->getBoundingBox();

	if (bb.containsPoint(locationInNode)) {

		CCLOG("touched");
	

		if (target->getName() == "cal") {

			_calculator->resetCalculator();

			if (_calculatorTouched == false) {
				_calculator->setVisible(true);
				_calculatorTouched = true;

			}
			else {

				_calculator->setVisible(false);
				_calculatorTouched = false;
			}

		}


		return true; // to indicate that we have consumed it.
	}
	return false; // to indicate that we have not consumed it.
}

