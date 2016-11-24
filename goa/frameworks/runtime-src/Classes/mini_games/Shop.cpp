#include "Shop.h"
#include "../menu/HelpLayer.h"
#include <math.h> 


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

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		shopingBackground->setPositionX(myGameWidth);
	}
	auto tabel = this->getChildByName("bg")->getChildByName("table_16");
	auto weightMech = this->getChildByName("bg")->getChildByName("weightmech_281");
	tabel->setZOrder(3);
	weightMech->setZOrder(3);

	vector<string> vegetableNodeName = { "Pineapple", "corn", "carrot", "pumpkin", "capsico", "cabbage", "spinach", "tomato", "Brinjal" };
	vector<string> characters = { "men", "men_0", "men_1", "men_2", "women", "women_0", "women_1", "women_2", "women_3" };


	int randomValue = RandomHelper::random_int(0, 8);

	cocostudio::timeline::ActionTimeline* customerWalkAnim = CSLoader::createTimeline("shoping/"+characters[randomValue] + ".csb");;
	Sprite* customer = (Sprite *)CSLoader::createNode("shoping/" + characters[randomValue] + ".csb");
	setAllSpriteProperties(customer, -1, visibleSize.width*1.3, visibleSize.height*.2, true, 0.5, 0.5, 1, 0.6, 0.6);
	customer->runAction(customerWalkAnim);
	customerWalkAnim->play("walk", true);
	shopingBackground->addChild(customer);

	customer->runAction(Sequence::create(MoveTo::create(4, Vec2(visibleSize.width*.8, visibleSize.height*.2)),
		CCCallFunc::create([=] {	customerWalkAnim->pause();
	
									for (int j = 0; j < vegetableNodeName.size(); j++)
									{
										for (int k = 0; k < shopingBackground->getChildren().size(); k++)
										{
											std::string str = shopingBackground->getChildren().at(k)->getName().c_str();
											if (str.find(vegetableNodeName.at(j)) == 0)
											{
												Sprite* obj = (Sprite*)shopingBackground->getChildren().at(k);
												addTouchEvents(obj);
											}
										}
									}
	}), NULL));

	//vege dislpay note
	 chooseVegeForShop(vegetableNodeName);

	auto labelNode = this->getChildByName("bg")->getChildByName("hit");
	_textString1 = "?";
	_textString2 = "?";
	_textString3 = "?";

	auto textOnDisplay = _textString1+" + "+ _textString2 + " = "+ _textString3;
	_label = setAllLabelProperties(textOnDisplay, 0, labelNode->getPositionX()+visibleSize.width*0.026,labelNode->getPositionY(), true, 0.5, 0.5, 0, 1, 1, 85);
	_label->setColor(cocos2d::Color3B(255, 192, 203)); 
	this->addChild(_label, 0);
	

	Vector <Node*> children = shopingBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;	
		std::string str = monsterItem->getName().c_str();
		
		CCLOG("name : %s", str.c_str());
	}
	this->scheduleUpdate();
}

Shop::~Shop()
{
}

void Shop::update(float dt)
{
	if (_calculateFlag && _calculator->checkAnswer(_total))
	{
		std::ostringstream total;
		total << _total;
		std::string totalPrice= total.str();

		_textString3 = totalPrice;
		_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);
		_calculateFlag = false;
		auto ShowScore = CallFunc::create([=] {

			_menuContext->addPoints(1);
			_menuContext->showScore();

		});
		auto scoreSequenceOne = Sequence::create(DelayTime::create(1.5), ShowScore, NULL);
		this->runAction(scoreSequenceOne);
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

	_expectedItemOne = vegetableNodeName[randomIndex[0]];
	_expectedItemTwo = vegetableNodeName[randomIndex[1]];
	_expectedItemOne = "pumpkin";
	_expectedItemTwo = "corn";
	_total = _vegePrice.at(_expectedItemOne) + _vegePrice.at(_expectedItemTwo);
	//_chooseVegePriceTag = vegetablePriceValue();

	Sprite* note = (Sprite *)CSLoader::createNode("shoping/note.csb");
	setAllSpriteProperties(note, 0, visibleSize.width*.64, visibleSize.height*.15, true, 0, 0.5, 0.5, 0.01, 0.01);
	this->addChild(note, 0);
	
	Sprite* vegeFirst = Sprite::createWithSpriteFrameName("shoping/"+ _expectedItemOne +".png");
	setAllSpriteProperties(vegeFirst, 0, note->getChildren().at(1)->getPositionX(), note->getChildren().at(1)->getPositionY()+note->getChildren().at(0)->getContentSize().height*0.01, true, 0.5, 0.5, 0, 2.5, 2.5);
	note->addChild(vegeFirst, 0);

	Sprite* vegeSecond = Sprite::createWithSpriteFrameName("shoping/" + _expectedItemTwo + ".png");
	setAllSpriteProperties(vegeSecond, 0, note->getChildren().at(2)->getPositionX(), note->getChildren().at(2)->getPositionY() - note->getChildren().at(0)->getContentSize().height*0.01, true, 0.5, 0.5, 0, 2.5, 2.5);
	note->addChild(vegeSecond, 0);

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
			_vegeOriginalPos = std::make_pair(target->getPositionX(), target->getPositionY());
			_touched = false;

			auto E = DrawNode::create();
			this->addChild(E, 10);
			E->drawRect(Vec2(a, b),
				Vec2(a + target->getContentSize().width*1.5, b + target->getContentSize().height*1.5),
				Color4F(0, 0, 255, 22));
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{

		auto target = event->getCurrentTarget();
		target->setZOrder(10);
		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
		//return true;
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

		Rect item1Rect = CCRectMake(a, b-30, 120, 120);

		Rect item2Rect = CCRectMake(c+50, d-30, 120, 120);

		Rect rect = CCRectMake(target->getPositionX() + target->getContentSize().width * .5, target->getPositionY() - target->getContentSize().height / 2,
					target->getContentSize().width*1.5, target->getContentSize().height*1.5);

		auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a , b - 30),
			Vec2(a + 120, b + 90),
			Color4F(0, 0, 255, 22));

		auto F = DrawNode::create();
		this->addChild(F, 10);
		F->drawRect(Vec2(c + 50, d - 30),
			Vec2(c +170, d + 90),
			Color4F(0, 0, 255, 22));
		
		string touchedVegeName = target->getName();
		auto myBG = this->getChildByName("bg");

		if (rect.intersectsRect(item1Rect) && ((!touchedVegeName.find(_expectedItemOne)) || (!touchedVegeName.find(_expectedItemTwo))) && !_isItemOnePlaced)
		{
			if(!touchedVegeName.find("Pineapple") || !touchedVegeName.find("Brinjal")|| !touchedVegeName.find("pumpkin"))
				 target->runAction(MoveTo::create(0.5, Vec2(a - 30, b + 45))); /*
			else if(!touchedVegeName.find("pumpkin"))
				target->runAction(MoveTo::create(0.5, Vec2(a - 30, b + 39)));*/
			else
				target->runAction(MoveTo::create(0.5, Vec2(a - 30, b + 26)));

			 //target->setPosition(Vec2(a-30, b + 30));
			_isItemOnePlaced = true;
			_labelCounter++;

			if (!touchedVegeName.find(_expectedItemOne) )
			{
					 target->setName(_expectedItemOne);
				    _textString1 = vegetablePriceValue(target->getName());
					_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);
			
				_expectedItemOne = "Z_A_Y_B_X_C";
			}
			else if (!touchedVegeName.find(_expectedItemTwo) )
			{
				 target->setName(_expectedItemTwo);
				_textString1 = vegetablePriceValue(target->getName());
				_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);

				_expectedItemTwo = "Z_A_Y_B_X_C";
			}
			target->setName(touchedVegeName);
			for (int k = 0; k < myBG->getChildren().size(); k++)
			{
				
				if (!(myBG->getChildren().at(k)->getName()).compare(touchedVegeName))
					myBG->getChildren().at(k)->getEventDispatcher()->removeEventListener(listener);
			}
		}
		else if (rect.intersectsRect(item2Rect) && ((!touchedVegeName.find(_expectedItemOne)) || (!touchedVegeName.find(_expectedItemTwo))) && !_isItemTwoPlaced)
		{
			if (!touchedVegeName.find("Pineapple") || !touchedVegeName.find("Brinjal")|| !touchedVegeName.find("pumpkin"))
				target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 45)));
			/*else if (!touchedVegeName.find("pumpkin"))
				target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 37)));*/
			else
				target->runAction(MoveTo::create(0.5, Vec2(c + 40, d + 22)));

			//target->setPosition(Vec2(c+40, d+25));
			_isItemTwoPlaced = true;
			_labelCounter++;

			if (!touchedVegeName.find(_expectedItemOne))
			{
				 target->setName(_expectedItemOne);
				_textString2 = vegetablePriceValue(target->getName());
				_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);

				_expectedItemOne = "Z_A_Y_B_X_C";
			}
			else if (!touchedVegeName.find(_expectedItemTwo))
			{
				 target->setName(_expectedItemTwo);
				_textString2 = vegetablePriceValue(target->getName());
				_label->setString(_textString1 + " + " + _textString2 + " = " + _textString3);

				_expectedItemTwo = "Z_A_Y_B_X_C";
			}
			target->setName(touchedVegeName);
			for (int k = 0; k < myBG->getChildren().size(); k++)
			{
				if (!(myBG->getChildren().at(k)->getName()).compare(touchedVegeName))
				{
					myBG->getChildren().at(k)->getEventDispatcher()->removeEventListener(listener);
				}
			}
		}
		else
		{
				this->runAction(Sequence::create(CCCallFunc::create([=] {
				target->runAction(MoveTo::create(0.7, Vec2(_vegeOriginalPos.first, _vegeOriginalPos.second)));
				}), DelayTime::create(0.7),	NULL));
		}
		if (_labelCounter == 2)
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

string Shop::vegetablePriceValue(string str)
{
	std::ostringstream strName1;
	strName1 << _vegePrice.at(str);
	std::string name1 = strName1.str();

	return name1;

}
LabelTTF* Shop::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
{
	auto label = LabelTTF::create(letterString, "Helvetica", labelSizeInPixel);
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