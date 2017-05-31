#include "Units.h"


USING_NS_CC;

Scene* Units::createScene()
{
	auto scene = Scene::create();
	auto layer = Units::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Units::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

Units *Units::create() {
	Units *units = new (std::nothrow) Units();
	if (units && units->init()) {
		units->autorelease();
		return units;
	}
	CC_SAFE_DELETE(units);
	return nullptr;

}

bool Units::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void Units::onEnterTransitionDidFinish() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	
	_level = _menuContext->getCurrentLevel();
	_answerValue = _level + 30;


	_menuContext->setMaxPoints(3);
	

	_bg = CSLoader::createNode("unit/unit.csb");
	_bg->setName("bg");
	_bg->setAnchorPoint(Vec2(0.5, 0.5));
	_bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	this->addChild(_bg);


	Vector <Node*> children = _bg->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}
	/*
	for (int i = 21; i <= 40; i++) {

		std::ostringstream cookie;
		cookie << "pizzatoppings_" << i;
		std::string cookieStr = cookie.str();

		Sprite* cookieAdd = Sprite::createWithSpriteFrameName("unit/pizzatoppings.png");

		std::ostringstream belowcookie;
		belowcookie << "pizzatoppings_" << (i-10);
		std::string belowcookieStr = belowcookie.str();
		Vec2 belowCookiePos = _bg->getChildByName(belowcookieStr)->getPosition();

		cookieAdd->setPosition(belowCookiePos + Vec2(0, 55));
		
		cookieAdd->setScale(1.8);
		cookieAdd->setName(cookieStr);
		_bg->addChild(cookieAdd);


	}

	*/
	hideUnwated(_level);
	float delay = 0.5;
	outlet_1 = _bg->getChildByName("outlet_1")->getPosition();
	outlet_2 = _bg->getChildByName("outlet_2")->getPosition();

	_pizza1 = CSLoader::createNode("unit/pizza.csb");

	_pizza1->setScale(0.6, 0.6);
	_pizza1->setAnchorPoint(Vec2(0.5, 0.5));
	_pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - (visibleSize.height * 0.30) + origin.y));

	this->addChild(_pizza1);


	_pizza2 = CSLoader::createNode("unit/pizza.csb");

	_pizza2->setScale(0.6, 0.6);
	_pizza2->setAnchorPoint(Vec2(0.5, 0.5));
	_pizza2->setPosition(Vec2(visibleSize.width / 2 + origin.x + (visibleSize.width * 0.16), outlet_2.y - (visibleSize.height * 0.30) + origin.y));

	this->addChild(_pizza2);



	_pizza3 = CSLoader::createNode("unit/pizza.csb");

	_pizza3->setScale(0.6, 0.6);
	_pizza3->setAnchorPoint(Vec2(0.5, 0.5));
	_pizza3->setPosition(Vec2(visibleSize.width / 2 + origin.x + (visibleSize.width * 0.32), outlet_2.y - (visibleSize.height * 0.30) + origin.y));

	this->addChild(_pizza3);


	_pizza4 = CSLoader::createNode("unit/pizza.csb");

	_pizza4->setScale(0.6, 0.6);
	_pizza4->setAnchorPoint(Vec2(0.5, 0.5));
	_pizza4->setPosition(Vec2(visibleSize.width / 2 + origin.x + (visibleSize.width * 0.48), outlet_2.y - (visibleSize.height * 0.30) + origin.y));

	this->addChild(_pizza4);

	addCalculator();


	_openTimeline = CSLoader::createTimeline("unit/botton.csb");
	_bg->getChildByName("FileNode_3")->runAction(_openTimeline);


	//auto handle = _bg->getChildByName("FileNode_3");
	auto handle = _bg->getChildByName("click");
	//handle->setPosition(handle->getPosition() + Vec2(50,50));
	//handle->setContentSize(Size(218, 101));
	handle->setName("handle");
	
	//auto E = DrawNode::create();
	//this->addChild(E, 10);
	//->drawRect(Vec2(handle->getPosition()),
	//	Vec2(218 + handle->getPositionX(), 101 + handle->getPositionY()),
	//	Color4F(0, 0, 255, 22));

	
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Units::onTouchBegan, this);
	listener->setSwallowTouches(false);

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), handle);


	Sprite* calculatorButton = Sprite::createWithSpriteFrameName("unit/cal.png");
	calculatorButton->setName("calbutton");
	calculatorButton->setAnchorPoint(Vec2(0.5, 0.5));
	calculatorButton->setPosition(Vec2((visibleSize.width * 0.18), (visibleSize.height * 0.41)));
	this->addChild(calculatorButton);
	calculatorButton->setVisible(false);

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), calculatorButton);

	
	if (_menuContext->getCurrentLevel() == 1 && orderIteration == 0) {

		auto box1 = handle;
		
		auto box1pos = box1->getPosition() + Vec2( visibleSize.width * 0.06,  visibleSize.height * 0.13);// +Vec2(visibleSize.width * 0.03, visibleSize.height * 0.05);
		//box1->setPosition(Vec2(box1pos.x + visibleSize.width * 0.07, box1pos.y + visibleSize.height * 0.15));

		if (Director::getInstance()->getVisibleSize().width == 2560) {
			box1pos = box1->getPosition() + Vec2(visibleSize.width * 0.04, visibleSize.height * 0.13);

		}

		_help = HelpLayer::create(Rect(box1pos.x , box1pos.y, box1->getContentSize().height, box1->getContentSize().width), Rect(0,0,0,0));

		
		_help->click(Vec2(box1pos));


		

		this->addChild(_help);
	}


	this->scheduleUpdate();

}

void Units::update(float delta) {
	
	if (_calculateFlag == 0 && _calculator->isEnterPressed() && !_calculator->checkAnswer(_answerValue)) {

		_calculateFlag = 1;
		_calculator->deductPoint();
		_menuContext->pickNumber(_answerValue, _calculator->_answer, _menuContext->IDENTIFY);
		auto openSequence = CallFunc::create([=] {

			_calculateFlag = 0;
		});

		auto deductPointSequence = Sequence::create(DelayTime::create(0.5), openSequence, NULL);
		this->runAction(deductPointSequence);

	}
	
		if (_calculateFlag == 0 && _calculator->checkAnswer(_answerValue) && _calculator->isEnterPressed()) {
		
		CCLOG("correct answer");
		_calculateFlag = 1;

		_menuContext->pickNumber(_answerValue,_calculator->_answer,_menuContext->IDENTIFY);

		auto ShowScore = CallFunc::create([=] {
			
			//_menuContext->addPoints(1);
			//_menuContext->addPoints(3);
			CCLOG("points : %d", _calculator->getFinalPoints());
			
			
			if (_gameOverFlag == 1) {
				

				if (_calculator->getFinalPoints() <= 0) {
					_menuContext->addPoints(3 * 0.33);
				}else
					_menuContext->addPoints(_calculator->getFinalPoints());

				_menuContext->showScore();
			}

		});

		auto openSequence = CallFunc::create([=] {

			_calculateFlag = 0;
		});
	
		auto scoreSequenceOne = Sequence::create(DelayTime::create(0.5), ShowScore, openSequence, NULL);
		this->runAction(scoreSequenceOne);
		
		}
		
}

Units::~Units(void)
{
	this->removeAllChildrenWithCleanup(true);
}


void Units::gameHelpLayer()
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


void Units::createOrder(int id) {
	
	static int delay = 0.5;
	float time = 0.5;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::ostringstream sstreama;
	std::ostringstream sstreamb;
	
	if (orderIteration == 0) {

		sstreama << "pizzatoppings_" << id;
		sstreamb << "pizzatoppings_" << id;
	}

	if (orderIteration == 1) {

		sstreama << "pizzatoppings_" << id;
		sstreamb << "pizzatoppings_" << (id-10);
	}

	if (orderIteration == 2) {

		sstreama << "pizzatoppings_" << id;
		sstreamb << "pizzatoppings_" << (id-20);
	}

	if (orderIteration == 3) {

		sstreama << "pizzatoppings_" << id;
		sstreamb << "pizzatoppings_" << (id-30);
	}

	std::string querya = sstreama.str();
	std::string queryb = sstreamb.str();


	auto moveObjectToOutletOne = MoveTo::create(time, outlet_1);
	auto moveObjectToOutletTwo = MoveTo::create(time, outlet_2);
	
	Vec2 position;
	if (orderIteration == 0) {

		position = Vec2(_pizza1->getPosition() + Vec2(_pizza1->getChildByName(queryb)->getPositionX()/2, _pizza1->getChildByName(queryb)->getPositionY()) - Vec2(visibleSize.width * 0.03, 0));
		//position = Vec2(_pizza1->getChildByName(queryb)->getPosition());
	
	}

	if (orderIteration == 1) {

		position = Vec2(_pizza2->getPosition()  + Vec2(_pizza2->getChildByName(queryb)->getPositionX() / 2, _pizza2->getChildByName(queryb)->getPositionY()) - Vec2(visibleSize.width * 0.03, 0));
		//position = Vec2(_pizza2->getChildByName(queryb)->getPosition());

	}


	if (orderIteration == 2) {

		position = Vec2(_pizza3->getPosition() + Vec2(_pizza3->getChildByName(queryb)->getPositionX() / 2, _pizza3->getChildByName(queryb)->getPositionY()) - Vec2(visibleSize.width * 0.03, 0));
		//position = Vec2(_pizza1->getChildByName(queryb)->getPosition());

	}

	if (orderIteration == 3) {

		position = Vec2(_pizza4->getPosition() + Vec2(_pizza4->getChildByName(queryb)->getPositionX() / 2, _pizza4->getChildByName(queryb)->getPositionY()) - Vec2(visibleSize.width * 0.03, 0));
		//position = Vec2(_pizza2->getChildByName(queryb)->getPosition());

	}

	auto moveObjectToOrderContainer = MoveTo::create(time, position);
	


	auto switchParentSequence = CallFunc::create([=] {
	
		_bg->getChildByName(querya)->setGlobalZOrder(1);

	});


	auto orderSequence = CallFunc::create([=] {
	/*	if (id == 10 && orderIteration == 0) {

			createPizza();
		}
		if (id == 10 + _level && orderIteration == 1) {

			createPizza();
		}
	*/
		createPizza();
	});

	delay += 0.5;
	auto moveSequenceOne = Sequence::create(moveObjectToOutletOne, switchParentSequence,moveObjectToOutletTwo, moveObjectToOrderContainer, orderSequence,NULL);
	_bg->getChildByName(querya)->runAction(moveSequenceOne);

}

/*
void Units::addCookiesToPizza(int pizzaToppingStartId, int pizzaToppingEndId, int cookiesStartId, int cookiesEndId) {


	//std::ostringstream sstreamb;
	//sstreamb << "pizzatoppings_" << id;
	//std::string queryb = sstreamb.str();


	for (int i = cookiesStartId, j = pizzaToppingStartId; i <= cookiesEndId; i++, j++) {

		std::ostringstream cookie;
		cookie << "pizzatoppings_" << i;
		std::string cookieStr = cookie.str();

		std::ostringstream pizza;
		pizza << "pizzatoppings_" << j;
		std::string pizzaStr = pizza.str();

		

		_tempCookie = _bgCopy->getChildByName(cookieStr);
		
		removeChild(_bg->getChildByName(cookieStr));
		_bg->getChildByName(cookieStr)->removeFromParent();
		_tempCookie->setPosition(_pizza1->getChildByName(pizzaStr)->getPosition());
		_pizza1->addChild(_tempCookie);

	}

	//auto movePizza = MoveTo::create(1, _bg->getChildByName("roll_29")->getPosition() + Vec2(100, 0));
	//_bg->getChildByName("roll_29")->runAction(moveTrack);

	

	auto movePizza = MoveTo::create(1, _pizza1->getPosition() - Vec2(800, 0));

	auto moveSequenceOne = Sequence::create(DelayTime::create(1), movePizza, NULL);
	
	_pizza1->runAction(moveSequenceOne);

}

*/


bool Units::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = Vec2(0,0);



	if (target->getName() == "handle") {
		locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	}

	if (target->getName() == "calbutton") {
		locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

		
	}


	auto bb = target->getBoundingBox();

	if (bb.containsPoint(locationInNode)) {

		CCLOG("touched");
		if (target->getName() == "handle" && orderIteration<=3) {
			if (handleTriggered == 0) {
				
				auto flag = 0;
				if (_menuContext->getCurrentLevel() == 1 && flag == 0 && orderIteration == 0) {
					this->removeChild(_help);
					flag = 1;
				}


				_openTimeline->play("open", false);
				
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/calculator/gear_triggered.ogg", false);

				createNthOrder();
				handleTriggered = 1;

			}
		}

		if (target->getName() == "calbutton" && _gameOverFlag == 1) {

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


void Units::addCalculator() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(visibleSize.width * 0.18, visibleSize.height * 0.72), Vec2(0.5, 0.5), 0.7, 0.7);
	this->addChild(_calculator,10);
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(false);
	_calculator->setMaxPoints(3);

}

void Units::hideUnwated(int level) {


	for (int i = 31 + level; i <= 40; i++) {

		std::ostringstream cookie;
		cookie << "pizzatoppings_" << i;
		std::string cookieStr = cookie.str();

		_bg->getChildByName(cookieStr)->setVisible(false);

	}

}


void Units::createNthOrder() {

	for (int i = _startCookieId; i <= _endCookieId; i++) {

		createOrder(i);

	}
	if (orderIteration == 0) {
		_startCookieId = 11;
		_endCookieId = 20;
	}

	if (orderIteration == 1) {
		_startCookieId = 21;
		_endCookieId = 30;
	}

	if (orderIteration == 2) {
		_startCookieId = 31;
		_endCookieId = _startCookieId + _menuContext->getCurrentLevel() - 1;
	}

}


void Units::createPizza() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	//3rd iteration
	if (orderIteration == 3) {

		for (int i = 31; i <= 30 + _level; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			removeChild(_bg->getChildByName(cookieStr));
			_bg->getChildByName(cookieStr)->removeFromParent();

		}

		removeChild(_pizza4);
		pizza4 = CSLoader::createNode("unit/pizza.csb");

		pizza4->setScale(0.6, 0.6);
		pizza4->setAnchorPoint(Vec2(0.5, 0.5));
		//_pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x + 700, outlet_2.y - 550 + origin.y));
		pizza4->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - (visibleSize.height * 0.30) + origin.y));
		//bg->setScale(0.5, 0.5);


		this->addChild(pizza4);


		for (int i = 1; i <= _level; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			Sprite* cookieAdd = Sprite::createWithSpriteFrameName("unit/pizzatoppings.png");
			cookieAdd->setPosition(pizza4->getChildByName(cookieStr)->getPosition());
			cookieAdd->setScale(2);
			pizza4->addChild(cookieAdd);


		}

		_openTimeline->play("close", false);
		this->getChildByName("calbutton")->setVisible(true);
		_gameOverFlag = 1;
	}

	//////2nd iteration
	if (orderIteration == 2) {


		for (int i = 21; i <= 30; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			removeChild(_bg->getChildByName(cookieStr));
			_bg->getChildByName(cookieStr)->removeFromParent();

		}

		removeChild(_pizza3);
		pizza3 = CSLoader::createNode("unit/pizza.csb");

		pizza3->setScale(0.6, 0.6);
		pizza3->setAnchorPoint(Vec2(0.5, 0.5));
		//_pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x + 700, outlet_2.y - 550 + origin.y));
		pizza3->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - (visibleSize.height * 0.30) + origin.y));
		//bg->setScale(0.5, 0.5);


		this->addChild(pizza3);
		/*
		cocos2d::ui::Text * _label = ui::Text::create();
		_label->setFontName("fonts/Marker Felt.ttf");
		_label->setString("10");
		_label->setFontSize(100);
		_label->setPosition(Vec2(-25, 5));
		_label->setAnchorPoint(Vec2(0, 0));
		_label->setName("label");
		_label->setTextColor(Color4B::BLUE);
		_label->setColor(Color3B::BLACK);
		_label->setScaleX(1);
		_label->setScaleY(1);

		pizza1->addChild(_label);
		pizza1->getChildByName("label")->setGlobalZOrder(2);
		*/

		for (int i = 1; i <= 10; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			Sprite* cookieAdd = Sprite::createWithSpriteFrameName("unit/pizzatoppings.png");
			cookieAdd->setPosition(pizza3->getChildByName(cookieStr)->getPosition());
			cookieAdd->setScale(2);
			pizza3->addChild(cookieAdd);


		}

		auto enableTrigger = CallFunc::create([=] {

			handleTriggered = 0;
			orderIteration += 1;
			_openTimeline->play("close", false);

		});

		auto movePizza1 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto movePizza2 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto movePizza3 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));


		auto movePizza4 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto moveSequenceOne = Sequence::create(DelayTime::create(1), movePizza1, NULL);

		pizza1->runAction(moveSequenceOne);


		auto moveSequenceTwo = Sequence::create(DelayTime::create(2), movePizza2, NULL);

		pizza2->runAction(moveSequenceTwo);

		auto moveSequenceThree = Sequence::create(DelayTime::create(3), movePizza3, NULL);

		pizza3->runAction(moveSequenceThree);


		auto moveSequenceFour = Sequence::create(DelayTime::create(4), movePizza4, DelayTime::create(0.5), enableTrigger, NULL);

		_pizza4->runAction(moveSequenceFour);
	}


	////1st iteration
	if (orderIteration == 1) {


		for (int i = 11; i <= 20; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			removeChild(_bg->getChildByName(cookieStr));
			_bg->getChildByName(cookieStr)->removeFromParent();

		}

		removeChild(_pizza2);
		pizza2 = CSLoader::createNode("unit/pizza.csb");

		pizza2->setScale(0.6, 0.6);
		pizza2->setAnchorPoint(Vec2(0.5, 0.5));
		//_pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x + 700, outlet_2.y - 550 + origin.y));
		pizza2->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - (visibleSize.height * 0.30) + origin.y));
		//bg->setScale(0.5, 0.5);


		this->addChild(pizza2);
		/*
		cocos2d::ui::Text * _label = ui::Text::create();
		_label->setFontName("fonts/Marker Felt.ttf");
		_label->setString("10");
		_label->setFontSize(100);
		_label->setPosition(Vec2(-25, 5));
		_label->setAnchorPoint(Vec2(0, 0));
		_label->setName("label");
		_label->setTextColor(Color4B::BLUE);
		_label->setColor(Color3B::BLACK);
		_label->setScaleX(1);
		_label->setScaleY(1);

		pizza1->addChild(_label);
		pizza1->getChildByName("label")->setGlobalZOrder(2);
		*/

		for (int i = 1; i <= 10; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			Sprite* cookieAdd = Sprite::createWithSpriteFrameName("unit/pizzatoppings.png");
			cookieAdd->setPosition(pizza2->getChildByName(cookieStr)->getPosition());
			cookieAdd->setScale(2);
			pizza2->addChild(cookieAdd);


		}

		auto enableTrigger = CallFunc::create([=] {

			handleTriggered = 0;
			orderIteration += 1;
			_openTimeline->play("close", false);

		});

		auto movePizza1 = MoveBy::create(1, - Vec2(visibleSize.width *  0.15, 0));

		auto movePizza2 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto movePizza3 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto movePizza4 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));

		auto moveSequenceOne = Sequence::create(DelayTime::create(1), movePizza1, NULL);

		pizza1->runAction(moveSequenceOne);


		auto moveSequenceTwo = Sequence::create(DelayTime::create(2), movePizza2, NULL);

		pizza2->runAction(moveSequenceTwo);

		auto moveSequenceThree = Sequence::create(DelayTime::create(3), movePizza3, NULL);

		_pizza3->runAction(moveSequenceThree);

		auto moveSequenceFour = Sequence::create(DelayTime::create(4), movePizza2, DelayTime::create(0.5), enableTrigger, NULL);

		_pizza4->runAction(moveSequenceFour);
	}


	///0th iteration

	if (orderIteration == 0) {


		for (int i = 1 ; i <= 10; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			removeChild(_bg->getChildByName(cookieStr));
			_bg->getChildByName(cookieStr)->removeFromParent();

		}

		removeChild(_pizza1);
		pizza1 = CSLoader::createNode("unit/pizza.csb");

		pizza1->setScale(0.6, 0.6);
		pizza1->setAnchorPoint(Vec2(0.5, 0.5));
		//_pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x + 700, outlet_2.y - 550 + origin.y));
		pizza1->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - (visibleSize.height * 0.30) + origin.y));
		//bg->setScale(0.5, 0.5);


		this->addChild(pizza1);
		/*
		cocos2d::ui::Text * _label = ui::Text::create();
		_label->setFontName("fonts/Marker Felt.ttf");
		_label->setString("10");
		_label->setFontSize(100);
		_label->setPosition(Vec2(-25, 5));
		_label->setAnchorPoint(Vec2(0, 0));
		_label->setName("label");
		_label->setTextColor(Color4B::BLUE);
		_label->setColor(Color3B::BLACK);
		_label->setScaleX(1);
		_label->setScaleY(1);

		pizza1->addChild(_label);
		pizza1->getChildByName("label")->setGlobalZOrder(2);
		*/

		for (int i = 1; i <= 10; i++) {

			std::ostringstream cookie;
			cookie << "pizzatoppings_" << i;
			std::string cookieStr = cookie.str();

			Sprite* cookieAdd = Sprite::createWithSpriteFrameName("unit/pizzatoppings.png");
			cookieAdd->setPosition(pizza1->getChildByName(cookieStr)->getPosition());
			cookieAdd->setScale(2);
			pizza1->addChild(cookieAdd);


		}

		auto enableTrigger = CallFunc::create([=] {
			
			handleTriggered = 0;
			orderIteration += 1;
			_openTimeline->play("close", false);

		});

		auto movePizza1 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));


		auto movePizza2 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));


		auto movePizza3 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));


		auto movePizza4 = MoveBy::create(1,  - Vec2(visibleSize.width *  0.15, 0));


		auto moveSequenceOne = Sequence::create(DelayTime::create(1), movePizza1, NULL);

		pizza1->runAction(moveSequenceOne);


		auto moveSequenceTwo = Sequence::create(DelayTime::create(2), movePizza2,  NULL);

		_pizza2->runAction(moveSequenceTwo);

		auto moveSequenceThree = Sequence::create(DelayTime::create(3), movePizza3, NULL);

		_pizza3->runAction(moveSequenceThree);


		auto moveSequenceFour = Sequence::create(DelayTime::create(4), movePizza4, DelayTime::create(0.5), enableTrigger, NULL);

		_pizza4->runAction(moveSequenceFour);
	}

}
