#include "spot.h"
#include "../util/CommonText.h"


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

	_slots.resize(6);

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	_level = _menuContext->getCurrentLevel();
	_answerValue = _level + 10;


	_menuContext->setMaxPoints(12);

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
	
	
	questionPlate = CSLoader::createNode("spot/spot.csb");
	questionPlate->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height * 0.1));
	questionPlate->setAnchorPoint(Vec2(0.5, 0.5));
	questionPlate->setPosition(Vec2(numberOfPages * visibleSize.width * 0.5 + visibleSize.width * 0.03, (visibleSize.height * 0.07)));



	Vector <Node*> children = _bg->getChildren();
	int size = children.size();
	
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}


	switch (_menuContext->getCurrentLevel()) {

	case 1:_incrementValue = 3; break;
	case 2:_incrementValue = 2; break;
	case 3:_incrementValue = 1; break;
	case 4:_incrementValue = 3; break;
	case 5:_incrementValue = 2; break;
	case 6:_incrementValue = 1; break;

	}

	for (int i = 0; i < 6; i++) {

		switch (i) {

		case 0:_slots[0].count = 0; _slots[0].animalName = "buffaloes"; _slots[0].animalIcon = "spot/buffaloicon.png"; break;
		case 1:_slots[1].count = 0; _slots[1].animalName = "cows"; _slots[1].animalIcon = "spot/cowicon.png";   break;
		case 2:_slots[2].count = 0;  _slots[2].animalName = "goats"; _slots[2].animalIcon = "spot/goaticon.png";   break;
		case 3:_slots[3].count = 0; _slots[3].animalName = "horses"; _slots[3].animalIcon = "spot/horseicon.png";   break;
		case 4:_slots[4].count = 0; _slots[4].animalName = "pigs"; _slots[4].animalIcon = "spot/pigicon.png";   break;
		case 5:_slots[5].count = 0; _slots[5].animalName = "sheeps"; _slots[5].animalIcon = "spot/sheepicon.png";   break;

		}

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

	platePosition = questionPlate->getChildByName("cal")->getPosition();


	//questionPlate->getChildByName("cal")->setPosition(platePosition - Vec2(platePosition.x * 0.25,0));

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), questionPlate->getChildByName("cal"));

	

	

	_label1 = CommonText::create();
	_label1->setFontName(LangUtil::getInstance()->getFontFile());
	_label1->setString(LangUtil::getInstance()->translateString("How many"));
	_label1->setFontSize(100);
	_label1->setPosition(Vec2((visibleSize.width * 0.20), (visibleSize.height * 0.03)));
	_label1->setAnchorPoint(Vec2(0, 0));
	_label1->setName("label1");
	_label1->setTextColor(Color4B::BLUE);
	_label1->setColor(Color3B::RED);
	_label1->setScaleX(1);
	_label1->setScaleY(1);

	///label 2

	_label2 = CommonText::create();
	_label2->setFontName(LangUtil::getInstance()->getFontFile());
_label2->setString(LangUtil::getInstance()->translateString("are there?"));
	_label2->setFontSize(100);
	//_label2->setPosition(Vec2((visibleSize.width * 0.24), (visibleSize.height * 0.04)));
	_label2->setAnchorPoint(Vec2(0, 0));
	_label2->setName("label2");
	_label2->setTextColor(Color4B::BLUE);
	_label2->setColor(Color3B::RED);
	_label2->setScaleX(1);
	_label2->setScaleY(1);

	//_scrollView->addChild(_label,15);

	_scrollView->addChild(_bg, 10);
	
	//_scrollView->addChild(questionPlate, 10);
	this->addChild(questionPlate, 14);
	questionPlate->addChild(_label1, 15);
	questionPlate->addChild(_label2, 15);


	CCLOG("%d", _answerValue);

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("spot/spot.plist");

	cocos2d::Sprite * animalSprite = Sprite::createWithSpriteFrameName(_slots[_currentSlot].animalIcon);
	//animalSprite->setPosition(400, 1600);
	animalSprite->setScale(0.7, 0.7);
	animalSprite->setAnchorPoint(Vec2(0.5, 0.5));
	animalSprite->setName("animalsprite");
	questionPlate->addChild(animalSprite);

	//questionPlate->getChildByName("animalsprite")->setPosition(platePosition - Vec2(platePosition.x * 0.50, 0));

	questionPlate->getChildByName("animalsprite")->setPosition(_label1->getPosition() + Vec2(platePosition.x * 0.23, platePosition.y * 0.40));


	_label2->setPosition(animalSprite->getPosition() + Vec2(platePosition.x * 0.05, - platePosition.y * 0.40));
	///

	questionPlate->getChildByName("cal")->setPosition(_label2->getPosition()  + Vec2(platePosition.x * 0.25, platePosition.y * 0.45));

		cocostudio::timeline::ActionTimeline * _windmillTimeline;
		_windmillTimeline = CSLoader::createTimeline("spot/windmill.csb");
		_bg->getChildByName("windmill")->runAction(_windmillTimeline);
		_windmillTimeline->play("fly", true);


	cocostudio::timeline::ActionTimeline * _smokeTimeline;
	_smokeTimeline = CSLoader::createTimeline("spot/smoke.csb");
	_scrollView->getChildByName("bg")->getChildByName("smoke")->runAction(_smokeTimeline);
	_smokeTimeline->play("fly", true);

	///

	//auto actionRotate = RotateBy::create(3, 360);
	//questionPlate->runAction(actionRotate);

	this->scheduleUpdate();

}

void spot::update(float delta) {

	if (_calculateFlag == 0 && !_calculator->checkAnswer(_answerValue) && _calculator->isEnterPressed()) {

		_calculateFlag = 1;
		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		audioBg->playEffect("res/sounds/sfx/error.ogg", false);
		_calculator->deductPoint();
		auto deductPoints = CallFunc::create([=] {

			_calculateFlag = 0;
		});
		_menuContext->pickNumber(_answerValue, _calculator->_answer, _menuContext->IDENTIFY);
		auto deductPointsSequenceOne = Sequence::create(DelayTime::create(0.5), deductPoints, NULL);
		this->runAction(deductPointsSequenceOne);
	}

	//isEnterPressed
	if (_calculateFlag == 0 && _calculator->checkAnswer(_answerValue) && _calculator->isEnterPressed()) {

		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		audioBg->playEffect("res/sounds/sfx/success.ogg", false);

		CCLOG("correct answer");
		_calculateFlag = 1;
		_menuContext->pickNumber(_answerValue, _calculator->_answer, _menuContext->IDENTIFY);
		auto ShowScore = CallFunc::create([=] {

			
			
			if (_currentSlot == 5) {
				
				_calculator->setVisible(false);
				if (_calculator->getFinalPoints() <= 0) {

					_menuContext->addPoints(12  * 0.33);

				}else
				_menuContext->addPoints(_calculator->getFinalPoints());

				_menuContext->showScore();

			}
			else {

				changeQuestion();
			}

		});


		auto changeQuestionSequence = CallFunc::create([=] {

			_calculateFlag = 0;
		});

		auto scoreSequenceOne = Sequence::create(DelayTime::create(0.5), ShowScore, DelayTime::create(3),changeQuestionSequence,NULL);
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
	_calculator->createCalculator(Vec2((visibleSize.width *  0.5) + (visibleSize.width * 0.37), (visibleSize.height *  0.33) + (visibleSize.height *  0.05)), Vec2(0.5, 0.5), 0.7, 0.7);
	this->addChild(_calculator, 20);
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(false);
	_calculator->setMaxPoints(12);

}

void spot::addAnimals() {

	std::string animalsName[] = { "","buffalo", "cow", "goat", "horse","pig","sheep" };

	Vector <Node*> children = _bg->getChildren();
	int size = children.size();

	for (int i = 1; i<=24;) {
		
		

		std::ostringstream nodeName;
		nodeName.clear();
		nodeName <<i;
		std::string nodeStr = nodeName.str();

		Node * monsterItem = _bg->getChildByName(nodeStr);

		Vec2 nodePos = monsterItem->getPosition();

		int animalPicker = RandomHelper::random_int(1, 6);

		if (animalPicker == 1) { _slots[0].count++; }
		if (animalPicker == 2) { _slots[1].count++; }
		if (animalPicker == 3) { _slots[2].count++; }
		if (animalPicker == 4) { _slots[3].count++; }
		if (animalPicker == 5) { _slots[4].count++; }
		if (animalPicker == 6) { _slots[5].count++; }


		//if (_menuContext->getCurrentLevel() == animalPicker) {
	//		_answerValue++;
		//}


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
		i += _incrementValue;
	}
	
	_answerValue = _slots[_currentSlot].count;
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

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/calculator/calculator_button_click.ogg", false);

			if (_calculatorTouched == false) {
				_calculator->setVisible(true);
				_calculatorTouched = true;
				_calculator->activeSound();

			}
			else {

				_calculator->setVisible(false);
				_calculatorTouched = false;
				_calculator->deactivateSound();
			}

		}


		return true; // to indicate that we have consumed it.
	}
	return false; // to indicate that we have not consumed it.
}



void spot::changeQuestion() {

	_calculator->setVisible(false);
	_calculatorTouched = false;
	_calculator->deactivateSound();

	auto actionRotateOne = ScaleTo::create(1, 1, -1);
	auto actionRotateTwo = ScaleTo::create(1, 1, 1);
	
	//auto actionRotateTwo = RotateBy::;

	auto rotateSequence = Sequence::create(actionRotateOne, actionRotateTwo, NULL);
	questionPlate->runAction(rotateSequence);

	//auto actionRotate = ScaleTo::create(3,1,-1);
	//auto actionRotate = RotateBy::create(3, 360);
	//questionPlate->runAction(actionRotate);

	questionPlate->removeChild(questionPlate->getChildByName("animalsprite"));
	_currentSlot++;
	_answerValue = _slots[_currentSlot].count;

	cocos2d::Sprite * animalSprite = Sprite::createWithSpriteFrameName(_slots[_currentSlot].animalIcon);

	animalSprite->setScale(0.7, 0.7);
	animalSprite->setAnchorPoint(Vec2(0.5, 0.5));
	animalSprite->setName("animalsprite");
	questionPlate->addChild(animalSprite);

	//questionPlate->getChildByName("animalsprite")->setPosition(platePosition - Vec2(platePosition.x * 0.50, 0));
	//questionPlate->getChildByName("animalsprite")->setPosition(_label1->getPosition() + Vec2(platePosition.x * 0.25, platePosition.y * 0.35));

	questionPlate->getChildByName("animalsprite")->setPosition(_label1->getPosition() + Vec2(platePosition.x * 0.23, platePosition.y * 0.40));

	//questionPlate->getChildByName("animalsprite")->setPosition(_label1->getPosition() + platePosition + Vec2(platePosition.x * 0.10, 0));

	_answerValue = _slots[_currentSlot].count;
}
