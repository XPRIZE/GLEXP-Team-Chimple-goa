#include "Shop.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"


Scene* Shop::createScene()
{
	auto scene = Scene::create();
	auto layer = Shop::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Shop::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Shop::onEnterTransitionDidFinish()
{
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("shoping/shoping.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	_vegePrice = {

		{ "Pineapple",	5 },
		{ "corn",		3 },
		{ "carrot",    6 },
		{ "pumpkin",	8 },
		{ "capsico",	4 },
		{ "cabbage",   1 },
		{ "spinach",	7 },
		{ "tomato",	9 },
		{ "Brinjal",   2 },
	};


	// BackGround
	auto shopingBackground = CSLoader::createNode("shoping/bg.csb");
	this->addChild(shopingBackground, 0);
	shopingBackground->setName("bg");
	auto myGameWidth = 0;
	if (visibleSize.width > 2560) {
		myGameWidth = (visibleSize.width - 2560) / 2;
		shopingBackground->setPositionX(myGameWidth);
	}
	
	_vegetableNodeName = { "Pineapple", "corn", "carrot", "pumpkin", "capsico", "cabbage", "spinach", "tomato", "Brinjal" };
	
	customerEnter(shopingBackground, _vegetableNodeName);

	auto tabel = this->getChildByName("bg")->getChildByName("table_16");
	auto weightMech = this->getChildByName("bg")->getChildByName("weightmech_281");
	auto fruitStand1 = this->getChildByName("bg")->getChildByName("level2");
	auto bag = this->getChildByName("bg")->getChildByName("bag");
	tabel->setZOrder(1);
	weightMech->setZOrder(1);
	fruitStand1->setZOrder(1);
	fruitStand1->setPositionX(fruitStand1->getPositionX() + 50);
	bag->setZOrder(1);

	_menuContext->setMaxPoints(9);
	
	//vege dislpay note
	 chooseVegeForShop(_vegetableNodeName);
	 textOnMachine();

	Vector <Node*> children = shopingBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;	
		std::string str = monsterItem->getName().c_str();
		if (str.find("coin") == 0)
		{
			monsterItem->setZOrder(1);
		}
		CCLOG("name : %s", str.c_str());
	}
	this->scheduleUpdate();
}

Shop::~Shop()
{

}
void Shop::textOnMachine()
{
	auto myGameWidth = 0;
	if (visibleSize.width > 2560) {
		myGameWidth = (visibleSize.width - 2560) / 2;
	}
	if (_label != NULL)
	{
		this->getChildByName("bg")->removeChild(_label, true);
	}
	auto labelNode = this->getChildByName("bg")->getChildByName("weightshow_520");
	auto labelNode1 = this->getChildByName("bg")->getChildByName("hit");
	_textString1 = "?";
	_textString2 = "?";
	_textString3 = "?";

	auto textOnDisplay = _textString1 + " + " + _textString2 + " = " + _textString3;
	_label = setAllLabelProperties(textOnDisplay, 0, labelNode1->getPositionX(), labelNode1->getPositionY() + labelNode1->getContentSize().width * 0.35, true, 0.5, 0.5, 0, 1, 1, 80);
	_label->setColor(cocos2d::Color3B(229, 78, 78));
	this->getChildByName("bg")->addChild(_label, 0);
}
void Shop::customerEnter(Node* Bg, vector<string> vegetableNodeName)
{
	auto machine = this->getChildByName("bg")->getChildByName("weightshow_520");
	auto bag = this->getChildByName("bg")->getChildByName("bag");

	for (int k = 0; k < Bg->getChildren().size(); k++)
	{
		std::string str = Bg->getChildren().at(k)->getName().c_str();
		if (str.find("coin") == 0)
		{
			for (int v = 0; v < Bg->getChildren().at(k)->getChildren().size(); v++)
			{
				auto a = Bg->getChildren().at(k)->getChildren().at(v);
				a->setVisible(false);
			}
		}
	}
	vector<string> characters = { "men", "men_0", "men_1", "men_2", "women", "women_0", "women_1", "women_2", "women_3" };

	int randomValue = RandomHelper::random_int(0, 8);

	_customerWalkAnim = CSLoader::createTimeline("shoping/" + characters[randomValue] + ".csb");;
	_customer = (Sprite *)CSLoader::createNode("shoping/" + characters[randomValue] + ".csb");
	 setAllSpriteProperties(_customer, -1, visibleSize.width*1.3, visibleSize.height*.2, true, 0.5, 0.5, 1, 0.6, 0.6);
	_customer->runAction(_customerWalkAnim);
	_customerWalkAnim->play("walk", true);
	_customer->setName("customer");
	 Bg->addChild(_customer);
	 auto gaps = ((bag->getPositionX() + machine->getPositionX()) / 2);
	_customer->runAction(Sequence::create(MoveTo::create(3, Vec2(gaps + machine->getContentSize().width*0.4, visibleSize.height*.2)),
		CCCallFunc::create([=] {	_customerWalkAnim->pause();
	if (_gameCounter == 0)
	{
		for (int j = 0; j < vegetableNodeName.size(); j++)
		{
			for (int k = 0; k < Bg->getChildren().size(); k++)
			{
				std::string str = Bg->getChildren().at(k)->getName().c_str();
				if (str.find(vegetableNodeName.at(j)) == 0)
				{
					Sprite* obj = (Sprite*)Bg->getChildren().at(k);
					addTouchEvents(obj);
				}
			}
		}
	}
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	auto myGameWidth = 0;
	if (visibleSize.width > 2560) {
		myGameWidth = (visibleSize.width - 2560) / 2;
	}
	if (gameCurrentLevel == 1 && _gameCounter==0)
	{
		auto nodeForHelp = this->getChildByName("bg")->getChildByName("corn");
		auto a = nodeForHelp->getPositionX()+ myGameWidth;// + visibleSize.width*.038
		auto b = nodeForHelp->getPositionY() - nodeForHelp->getContentSize().height*.25;

		auto nodeForDropPos = this->getChildByName("bg")->getChildByName("item_1");
		auto c = nodeForDropPos->getPositionX() + myGameWidth + visibleSize.width*0.049;
		auto d = nodeForDropPos->getPositionY() + visibleSize.height*0.045;

		_help = HelpLayer::create(Rect(a, b, visibleSize.width*0.12, visibleSize.height*.2),
			Rect(c, d - 30, visibleSize.width*0.12, visibleSize.height*.12));
		_help->clickAndDrag(Vec2(a, b), Vec2(c, d - 30));
		this->addChild(_help, 5);
	}
	}), NULL));
}
void Shop::update(float dt)
{
	
	if (_calculateFlag && _calculator->checkAnswer(_total) && _calculator->isEnterPressed())
	{
		auto myGameWidth = 0;
		if (visibleSize.width > 2560) {
			myGameWidth = (visibleSize.width - 2560) / 2;
		}
		this->removeChild(_calculator, true);
		_isEnterPressedCounter++;
		auto myBg = this->getChildByName("bg");
		auto node1 = myBg->getChildByName("bag")->getChildren().at(1);
		auto node2 = myBg->getChildByName("bag")->getChildren().at(2);
		auto bag = this->getChildByName("bg")->getChildByName("bag");
		auto pos = this->getChildByName("bg")->getChildByName("bag")->getPosition();
		_gameCounter++;
		std::ostringstream total;
		total << _total;
		std::string totalPrice = total.str();

		_textString3 = totalPrice;
		_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);
		_calculateFlag = false;
		 auto ShowScore = CallFunc::create([=] {
			_menuContext->showScore();
		});
		auto vegeIntoBag = CallFunc::create([=] {
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/success.ogg", false);
			auto bag = this->getChildByName("bg")->getChildByName("bag");
			auto posiX = bag->getPositionX();
			auto posiY = visibleSize.height*0.42;

			for (int l = 0; l < _vegeOnWeighingMachine.size(); l++)
			{
				_vegeOnWeighingMachine[l]->setZOrder(0);
				_vegeOnWeighingMachine[l]->runAction(JumpTo::create(1.5, Vec2(posiX, posiY), 400, 1));
			}
		});
		auto vegeDisappear = CallFunc::create([=] {
			for (int l = 0; l < _vegeOnWeighingMachine.size(); l++)
			{
				_vegeOnWeighingMachine[l]->setVisible(false);
			}
		});
		auto vegeAppear = CallFunc::create([=] {
			auto index = 0;
			for (int l = 0; l < _vegeOnWeighingMachine.size(); l++)
			{
				if (_vegeOnWeighingMachine[0]->getName().substr(0, 4).compare(_vegeOnWeighingMachine[l]->getName().substr(0, 4)))
				{
					index = l;
					break;
				}
			}
			auto str1 = _vegeOnWeighingMachine[0]->getName();
			auto str2 = _vegeOnWeighingMachine[index]->getName();

			for (int i = 0; i < node1->getChildren().size(); i++)
			{
				auto a = (Sprite*)node1->getChildren().at(i);
				auto b = a->getName();
				auto c = b.substr(0, 4);
				if (!str1.find(c))
					a->setVisible(true);
			}
			for (int j = 0; j < node2->getChildren().size(); j++)
			{
				auto a = (Sprite*)node2->getChildren().at(j);
				auto b = a->getName();
				auto c = b.substr(0, 4);
				if (!str2.find(c))
					a->setVisible(true);
			}
			for (int l = _vegeOnWeighingMachine.size() - 1; l >= 0; l--)
			{
				myBg->removeChildByName(_vegeOnWeighingMachine.at(l)->getName(), true);
			}

			_customer->setScaleX(-0.6);
			_customer->runAction(MoveTo::create(3, Vec2(visibleSize.width*1.3, visibleSize.height*.2)));
			_customerWalkAnim->play("walk", true);
			bag->runAction(MoveTo::create(3, Vec2(visibleSize.width*1.3, bag->getPositionY())));
			bag->setZOrder(0);
		});
		
		auto coinAppear = CallFunc::create([=] {
			int counter = 0;
			float delay = 0.5;
			for (int k = 0; k < myBg->getChildren().size(); k++)
			{
				std::string coinParent = myBg->getChildren().at(k)->getName().c_str();
				if (coinParent.find("coin") == 0)
				{
					for (int v = 0; v < myBg->getChildren().at(k)->getChildren().size(); v++)
					{
						this->runAction(Sequence::create(DelayTime::create(delay),
							CallFunc::create([=] {
							auto a = myBg->getChildren().at(k)->getChildren().at(v);
							a->setVisible(true);
							auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
							audio->playEffect("sounds/sfx/coins_on_coins.ogg", false);
						}),NULL));
						delay = delay + 0.1;
						counter++;
						if (counter == _total) {
							break;
						}
					}
				}
				if (counter == _total) {
					counter = 0;
					break;
				}
			}
		/*	this->runAction(Sequence::create(
			CallFunc::create([=] {
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/shop_coins.ogg", false);
			}),   
			DelayTime::create(0.6),
		    CallFunc::create([=] {
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/shop_coins.ogg", false);
			}),
			NULL));*/
		});
		auto Wait = _total*0.1 + 0.5;
		auto scoreSequenceOne = Sequence::create(coinAppear, DelayTime::create(Wait),vegeIntoBag, DelayTime::create(1.5), vegeDisappear, vegeAppear, DelayTime::create(3), CallFunc::create([=] {
				
			
				if (_gameCounter == 3)
				{
					 auto a = _isEnterPressedCounter;
					 _menuContext->addPoints(9);

					 if (_menuContext->getPoints() <= 0) {

						 _menuContext->addPoints(_menuContext->getPoints() * -1);
						 _menuContext->addPoints(9 * 0.33);
					 }
					_menuContext->showScore();
				}
				else
				{
					for (int i = 0; i < node1->getChildren().size(); i++)
					{
						auto a = (Sprite*)node1->getChildren().at(i);	a->setVisible(false);
					}
					for (int j = 0; j < node2->getChildren().size(); j++)
					{
						auto a = (Sprite*)node2->getChildren().at(j);	a->setVisible(false);
					}
					myBg->removeChildByName("note", true);
					myBg->removeChildByName("customer", true);
					//this->removeChild(_calculator, true);
					bag->setZOrder(2);
					bag->setPosition(Vec2(pos));
					customerEnter(myBg, _vegetableNodeName);
					chooseVegeForShop(_vegetableNodeName);
					bag->setZOrder(2);
					bag->setPosition(Vec2(pos));
					textOnMachine();
					_labelCounter = 0;
					_isItemOnePlaced = false;
					_isItemTwoPlaced = false;
					_flagForItemOne = true;
					_flagForItemTwo = true;
					_isItemOneCompleted = 0;
					_isItemTwoCompleted = 0;
					_vegeOnWeighingMachine.clear();
				}

			}), NULL);
			this->runAction(scoreSequenceOne);
	}
	if (_calculateFlag && !_calculator->checkAnswer(_total) && _calculator->isEnterPressed())
	{
		_calculateFlag = false;
		auto openSequence = CallFunc::create([=] {
			_calculateFlag = true;
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/error.ogg", false);
		});
		this->runAction(Sequence::create(DelayTime::create(0.5), openSequence, NULL));
		_menuContext->addPoints(-1);
		CCLOG("points : %d", _menuContext->getPoints());
		_isEnterPressedCounter++;
	}
}

void Shop::chooseVegeForShop(vector<string> vegetableNodeName)
{
	std::vector<int> randomIndex;
	while (randomIndex.size() != 2) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, 8);
		for (int i = 0; i < randomIndex.size(); i++) {
			if (numberPicker == randomIndex[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			randomIndex.push_back(numberPicker);
	}
	auto labelNode = this->getChildByName("bg")->getChildByName("weightshow_520");
	auto labelNode1 = this->getChildByName("bg")->getChildByName("hit");
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	vector<pair<int, int>> pairOfInt = { make_pair(1,1),make_pair(1,2), make_pair(2,1), make_pair(2,2), make_pair(1,3), make_pair(3,1), make_pair(3,2), make_pair(2,3) };
	if (gameCurrentLevel <= 10)
	{
		_oneOfThePairInt = make_pair(1, 1);
	}
	else if (gameCurrentLevel > 10 && gameCurrentLevel <= 20)
	{
		int randomValue = RandomHelper::random_int(1, 3);
		_oneOfThePairInt = pairOfInt[randomValue];
	}
	else
	{
		int randomValue = RandomHelper::random_int(4,7);
		_oneOfThePairInt = pairOfInt[randomValue];
	}
	if (_menuContext->getCurrentLevel() == 1 && _flagForChooseCorn)
	{
		_flagForChooseCorn = false;
		_expectedItemOne = "corn";
	}
	else {    	_expectedItemOne = vegetableNodeName[randomIndex[0]];   	}
	
	_expectedItemTwo = vegetableNodeName[randomIndex[1]];
	_total = _vegePrice.at(_expectedItemOne)*_oneOfThePairInt.first + _vegePrice.at(_expectedItemTwo)*_oneOfThePairInt.second;
	

	Sprite* note = (Sprite *)CSLoader::createNode("shoping/note.csb");
	setAllSpriteProperties(note, 0, labelNode->getPositionX(), labelNode->getPositionY()-visibleSize.height*0.32, true, 0, 0.5, 0.5, 0.01, 0.01);
	this->getChildByName("bg")->addChild(note, 1);
	note->setName("note");
	
	Sprite* vegeFirst = Sprite::createWithSpriteFrameName("shoping/"+ _expectedItemOne +".png");
	setAllSpriteProperties(vegeFirst, 0, note->getChildren().at(1)->getPositionX()-80, note->getChildren().at(1)->getPositionY()+note->getChildren().at(0)->getContentSize().height*0.01, true, 0.5, 0.5, 0, 2.5, 2.5);
	note->addChild(vegeFirst, 0);

	Sprite* vegeSecond = Sprite::createWithSpriteFrameName("shoping/" + _expectedItemTwo + ".png");
	setAllSpriteProperties(vegeSecond, 0, note->getChildren().at(2)->getPositionX()-80, note->getChildren().at(2)->getPositionY() - note->getChildren().at(0)->getContentSize().height*0.01, true, 0.5, 0.5, 0, 2.5, 2.5);
	note->addChild(vegeSecond, 0);

	std::ostringstream strName1;
	strName1 << _oneOfThePairInt.first;
	std::string name1 = strName1.str();

	std::ostringstream strName2;
	strName2 << _oneOfThePairInt.second;
	std::string name2 = strName2.str();

	
	auto label1 = setAllLabelProperties(" X "+name1, 0, note->getChildren().at(1)->getPositionX() + 105, note->getChildren().at(1)->getPositionY() ,  true, 0.5, 0.5, 0, 1, 1, 100);
	label1->setColor(cocos2d::Color3B(229, 78, 78));
	note->addChild(label1, 0);

	auto label2 = setAllLabelProperties(" X "+name2, 0, note->getChildren().at(2)->getPositionX() + 105, note->getChildren().at(2)->getPositionY() - note->getChildren().at(0)->getContentSize().height*0.01, true, 0.5, 0.5, 0, 1, 1, 100);
	label2->setColor(cocos2d::Color3B(229, 78, 78));
	note->addChild(label2, 0);

	auto sequence_A = ScaleTo::create(3,0.7);
	EaseElasticOut *easeAction = EaseElasticOut::create(sequence_A);
	note->runAction(Sequence::create(DelayTime::create(4), easeAction, NULL));

}
void Shop::addTouchEvents(Sprite* obj)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		
		auto a = target->getPositionX() + target->getContentSize().width * .5;
		auto b = target->getPositionY()- target->getContentSize().height/2;

		Rect rect = CCRectMake(a, b, target->getContentSize().width*1.5, target->getContentSize().height*1.5);
		if (rect.containsPoint(Vec2(touch->getLocation().x, touch->getLocation().y)) && _touched)
		{
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/shop_pick.ogg", false);

			_vegeOriginalPos = std::make_pair(target->getPositionX(), target->getPositionY());
			_touched = false;

			/*auto E = DrawNode::create();
			this->addChild(E, 10);
			E->drawRect(Vec2(a, b),
				Vec2(a + target->getContentSize().width*1.5, b + target->getContentSize().height*1.5),
				Color4F(0, 0, 255, 22));*/
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		
		auto target = event->getCurrentTarget();
		if (_menuContext->isGamePaused())
		{
			target->setPosition(Vec2(_vegeOriginalPos.first, _vegeOriginalPos.second));
		}
		target->setZOrder(5);
		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
		auto gameCurrentLevel = _menuContext->getCurrentLevel();
		if (gameCurrentLevel == 1)
		{
			this->runAction(Sequence::create(DelayTime::create(2), CCCallFunc::create([=] {this->removeChild(_help, true); }), NULL));
		}
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();

		auto item1 = this->getChildByName("bg")->getChildByName("item_1");
		auto item2 = this->getChildByName("bg")->getChildByName("item_2");

		auto a = item1->getPositionX();
		auto b = item1->getPositionY();
		auto c = item2->getPositionX();
		auto d = item2->getPositionY();

		Rect item1Rect = CCRectMake(a, b-30, 300, 150);

		Rect item2Rect = CCRectMake(c+50, d-30, 120, 120);

		Rect rect = CCRectMake(target->getPositionX() + target->getContentSize().width * .5, target->getPositionY() - target->getContentSize().height / 2,
					target->getContentSize().width*1.5, target->getContentSize().height*1.5);

		/*auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a , b - 30),
			Vec2(a + 300, b + 150),
			Color4F(0, 0, 255, 22));*/

		/*auto F = DrawNode::create();
		this->addChild(F, 10);
		F->drawRect(Vec2(c + 50, d - 30),
			Vec2(c +170, d + 90),
			Color4F(0, 0, 255, 22));*/
		
		string touchedVegeName = target->getName();
		auto myBG = this->getChildByName("bg");

		if ((rect.intersectsRect(item1Rect)) && ((!touchedVegeName.find(_expectedItemOne)) || (!touchedVegeName.find(_expectedItemTwo))) && (!_isItemOnePlaced || !_isItemTwoPlaced))
		{ 
			auto posiX = a-30;
			switch (_labelCounter) {
			case 0: posiX = a - 30;
			    	break;
			case 1: posiX = c + 40;
					break;
			case 2: posiX = a + 10;
					break;
			case 3: posiX = c ;
					break;
			case 4: posiX = a + 50;
					break;
			case 5:	posiX = c - 40;
					break;
			}


			if(!touchedVegeName.find("Pineapple") || !touchedVegeName.find("Brinjal")|| !touchedVegeName.find("pumpkin"))
				 target->runAction(MoveTo::create(0.5, Vec2(posiX , b + 45))); /*
			else if(!touchedVegeName.find("pumpkin"))
				target->runAction(MoveTo::create(0.5, Vec2(a - 30, b + 39)));*/
			else
				target->runAction(MoveTo::create(0.5, Vec2(posiX , b + 18)));

			 
			auto dropSound = CallFunc::create([=] {
				/*auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/shop_pick.ogg", false);*/
			});
			this->runAction(Sequence::create(DelayTime::create(0.5), dropSound, NULL));

			 target->setZOrder(2);
			_labelCounter++;

			if (!touchedVegeName.find(_expectedItemOne) )
			{
				_isItemOneCompleted++;
				 target->setName(_expectedItemOne);
				
			}
			else if (!touchedVegeName.find(_expectedItemTwo) )
			{
				_isItemTwoCompleted++;
				 target->setName(_expectedItemTwo);
			}
			if (_isItemOneCompleted == _oneOfThePairInt.first && _flagForItemOne)
			{
				_flagForItemOne = false;
				target->setName(_expectedItemOne);
				_expectedItemOne = "Z_A_Y_B_X_C";
				_isItemOnePlaced = true;
				_textString1 = vegetablePriceValue(target->getName(), _oneOfThePairInt.first);
				_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);
				
			}
			if (_isItemTwoCompleted == _oneOfThePairInt.second && _flagForItemTwo)
			{
				_flagForItemTwo = false;
				target->setName(_expectedItemTwo);
				_expectedItemTwo = "Z_A_Y_B_X_C";
				_isItemTwoPlaced = true;
				_textString2 = vegetablePriceValue(target->getName(), _oneOfThePairInt.second);
				_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);
			}
			target->setName(touchedVegeName);
			auto sprite = (Sprite*)myBG->getChildByName(touchedVegeName);
			myBG->getChildByName(touchedVegeName)->getEventDispatcher()->removeEventListener(listener);
			_vegeOnWeighingMachine.push_back(sprite);
			/*for (int k = 0; k < myBG->getChildren().size(); k++)
			{
				if (!(myBG->getChildren().at(k)->getName()).compare(touchedVegeName))
				{
					auto sprite = (Sprite*)myBG->getChildren().at(k);
					myBG->getChildren().at(k)->getEventDispatcher()->removeEventListener(listener);
					_vegeOnWeighingMachine.push_back(sprite);
					break;
				}
			}*/
		}
		//else if (rect.intersectsRect(item2Rect) && ((!touchedVegeName.find(_expectedItemOne)) || (!touchedVegeName.find(_expectedItemTwo))) && !_isItemTwoPlaced)
		//{
		//	if (!touchedVegeName.find("Pineapple") || !touchedVegeName.find("Brinjal")|| !touchedVegeName.find("pumpkin"))
		//		target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 45)));
		//	/*else if (!touchedVegeName.find("pumpkin"))
		//		target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 37)));*/
		//	else
		//		target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 19)));

		//	//target->setPosition(Vec2(c+40, d+25));
		//	 target->setZOrder(2);
		//	_isItemTwoPlaced = true;
		//	_labelCounter++;

		//	if (!touchedVegeName.find(_expectedItemOne))
		//	{
		//		 target->setName(_expectedItemOne);
		//		_textString2 = vegetablePriceValue(target->getName());
		//		_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);

		//		_expectedItemOne = "Z_A_Y_B_X_C";
		//	}
		//	else if (!touchedVegeName.find(_expectedItemTwo))
		//	{
		//		 target->setName(_expectedItemTwo);
		//		_textString2 = vegetablePriceValue(target->getName());
		//		_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);

		//		_expectedItemTwo = "Z_A_Y_B_X_C";
		//	}
		//	target->setName(touchedVegeName);
		//	for (int k = 0; k < myBG->getChildren().size(); k++)
		//	{
		//		if (!(myBG->getChildren().at(k)->getName()).compare(touchedVegeName))
		//		{
		//			auto sprite = (Sprite*)myBG->getChildren().at(k);
		//			myBG->getChildren().at(k)->getEventDispatcher()->removeEventListener(listener);
		//			_vegeOnWeighingMachine.push_back(sprite);
		//			break;
		//		}
		//	}
		//}
		else
		{
				this->runAction(Sequence::create(CCCallFunc::create([=] {
					for (int k = myBG->getChildren().size() - 1; k >= 0; k--)
					{
						string s = myBG->getChildren().at(k)->getName();
						string v = touchedVegeName.substr(0, 4);
						if (!s.find(v))
						{
							//myBG->getChildren().at(k)->setZOrder(0);
						}
					}
					target->runAction(MoveTo::create(0.7, Vec2(_vegeOriginalPos.first, _vegeOriginalPos.second)));
				}),
				DelayTime::create(0.7),
				CCCallFunc::create([=] {
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/shop_pick.ogg", false);

					target->setZOrder(0);
				}), NULL));
		}
		if (_labelCounter == (_oneOfThePairInt.second+ _oneOfThePairInt.first))
		{
			_calculator = new Calculator();
		    _calculator->createCalculator(Vec2(visibleSize.width*0.85,visibleSize.height*0.20), Vec2(0.5, 0.5),0.5, 0.5);
			 this->addChild(_calculator, 10);
		    _calculateFlag = true;

		/*	 auto sequence_A = ScaleTo::create(2, 0.5);
			 EaseElasticOut *easeAction = EaseElasticOut::create(sequence_A);
			 _calculator->runAction(Sequence::create(DelayTime::create(0.5), easeAction, NULL));*/
		}
		this->runAction(Sequence::create( DelayTime::create(0.7), CCCallFunc::create([=] { _touched = true; }), NULL));
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, obj);
}

string Shop::vegetablePriceValue(string str, int multiplier)
{
	std::ostringstream strName1;
	strName1 << (_vegePrice.at(str) * multiplier);
	std::string name1 = strName1.str();

	return name1;
}
LabelTTF* Shop::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
{
	auto label = CommonLabelTTF::create(letterString, "Helvetica", labelSizeInPixel);
	label->setPosition(Vec2(posX, posY));
	label->setVisible(visibility);
	label->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	label->setRotation(rotation);
	label->setName(letterString);
	label->setScaleX(scaleX);
	label->setScaleY(scaleY);
	return label;
}

void Shop::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX , posY ));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}
