#include "Balloon.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"


Scene* Balloon::createScene()
{
	auto scene = Scene::create();
	auto layer = Balloon::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Balloon::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Balloon::onEnterTransitionDidFinish()
{
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("balloonpop/balloonpop.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto balloonBackground = CSLoader::createNode("balloonpop/balloonpop.csb");
	this->addChild(balloonBackground, 0);
	balloonBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		balloonBackground->setPositionX(myGameWidth);
	}
	Vector <Node*> children = balloonBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("Node_") == 0)
			_nodeName.push_back(str);
		CCLOG("name : %s", str.c_str());
	}
	int no1, no2, no3;
	string  textOnDisplay;
	if (gameCurrentLevel == 1 )
	{
		no1 = RandomHelper::random_int(1,6);
		no2 = RandomHelper::random_int(1,6);
		while (no2 >= no1) {
			no2 = RandomHelper::random_int(0, 6);
		}
	}
	else if (gameCurrentLevel >= 2 && gameCurrentLevel <= 6)
	{
		 no1 = RandomHelper::random_int(1, 6);
		 no2 = RandomHelper::random_int(0, 6);
		 while (no2 >= no1) {
			 no2 = RandomHelper::random_int(0, 6);
		 }
	}
	else if (gameCurrentLevel >= 7 && gameCurrentLevel <= 12)
	{
		no1 = RandomHelper::random_int(6, 12);
		no2 = RandomHelper::random_int(5, 12);
		while (no2 >= no1) {
			no2 = RandomHelper::random_int(5,12);
		}
	}
	else if (gameCurrentLevel >= 13 && gameCurrentLevel <= 18)
	{
		no1 = RandomHelper::random_int(6, 12);
		no2 = RandomHelper::random_int(0, 6);
		while (no2 >= no1) {
			no2 = RandomHelper::random_int(0, 6);
		}
	}
	else if (gameCurrentLevel >= 19 && gameCurrentLevel <= 24)
	{
		no1 = RandomHelper::random_int(1, 12);
		no2 = RandomHelper::random_int(0, 12);
		while (no2 >= no1) {
			no2 = RandomHelper::random_int(0, 12);
		}
	}
	else
	{
		no1 = RandomHelper::random_int(6, 12);
		no2 = RandomHelper::random_int(0, 6);
		no3 = RandomHelper::random_int(0, 4);
		while (no2 >= (no1-1) || no2 == 0) {
			no2 = RandomHelper::random_int(0, 6);
		}
		while (no3 > no2 || no1 < (no2+no3)) {
			no3 = RandomHelper::random_int(0, 4);
		}
	}
	_isBiggerNoAnswer = no1;
	std::ostringstream firstNo;
	firstNo << no1;
	_textString1 = firstNo.str();

	std::ostringstream secondNo;
	secondNo << no2;
	_textString2 = secondNo.str();

	_textString3 = "?";
	
	if (gameCurrentLevel < 25 )
	{
		textOnDisplay = _textString1 + " - " + _textString2 + " = ";
		_answer = no1 - no2;
	}
	else if(gameCurrentLevel >= 25 && gameCurrentLevel <= 30)
	{
		std::ostringstream thirddNo;
		thirddNo << no3;
		string string3 = thirddNo.str();

		textOnDisplay = _textString1 + " - " + _textString2 + " - " + string3 + " = ";
		_answer = no1 - no2 - no3;
	}
	
	auto label = setAllLabelProperties(textOnDisplay, 0, visibleSize.width*0.43, visibleSize.height*0.1, true, 0.5, 0.5, 0, 1, 1, 220);
	label->setColor(cocos2d::Color3B(253, 255, 233));
	this->addChild(label, 0);

	auto node = balloonBackground->getChildByName(_nodeName[0]);
	vector<string> balloonName = { "green", "red", "yellow" };
	int randomValue = RandomHelper::random_int(0, 2);
	_balloonColor = balloonName[randomValue];

	//_removedBalloonsId = { 0,1,2,3,4,5,6,7,8,9,10,11 };
	//std::vector<int> _removedBalloonsId;
	while (_removedBalloonsId.size() != no1) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, 11);
		for (int i = 0; i < _removedBalloonsId.size(); i++) {
			if (numberPicker == _removedBalloonsId[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			_removedBalloonsId.push_back(numberPicker);
	}
	/*E = DrawNode::create();
	this->addChild(E, 10);*/

	if (gameCurrentLevel < 19)
	{
		 auto textOnDisplayAnswer = _textString3;
		_label = setAllLabelProperties(textOnDisplayAnswer, 0, visibleSize.width*0.615, visibleSize.height*0.1, true, 0.5, 0.5, 0, 1, 1, 220);
		_label->setColor(cocos2d::Color3B(253, 255, 233));
		this->addChild(_label, 0);

		Sprite* check = Sprite::createWithSpriteFrameName("balloonpop/balloonpop_done.png");
		setAllSpriteProperties(check, 0, visibleSize.width*0.83, visibleSize.height*0.1, true, 0.5, 0.5, 0, 1, 1);
		this->addChild(check, 0);
		check->setName("done");
		//_pin->setScale(0.7);
		addTouchEvents(check);
	}
	else
	{
		float x;
		Sprite* calculator = Sprite::createWithSpriteFrameName("balloonpop/icon.png");
		if (gameCurrentLevel > 25)
			 x = visibleSize.width*0.69;
		else
			 x = visibleSize.width*0.61;
		setAllSpriteProperties(calculator, 0, x, visibleSize.height*0.1, true, 0.5, 0.5, 0, 1, 1);
		this->addChild(calculator, 0);
		calculator->setName("calculator");
		calculator->setScale(0.8);
		addTouchEvents(calculator);
	}

    _pin = Sprite::createWithSpriteFrameName("balloonpop/balloonpop_pin.png");
	setAllSpriteProperties(_pin, 0, visibleSize.height*0.5, visibleSize.height*0.5, true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_pin);
	_pin->setScale(0.8);
	if (gameCurrentLevel == 1)
	{
		_label->runAction(Sequence::create(DelayTime::create(6),
			CCCallFunc::create([=] {addTouchEvents(_pin); }), NULL));
	}
	else
	{ addTouchEvents(_pin);  }
	makingBalloons();
	this->scheduleUpdate();

}
Balloon::~Balloon()
{
}

void Balloon::update(float dt)
{
	if (_isCalculatorThere && _calculator->checkAnswer(_answer) && _calculator->isEnterPressed() && _balloonsBin.size() == _answer && _burstFlag)
	{
		_pointCounter++;
		_menuContext->addPoints(1);
		Director::getInstance()->getEventDispatcher()->removeAllEventListeners();
		this->runAction(Sequence::create(DelayTime::create(1),
			CCCallFunc::create([=]	{
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/success.ogg", false);
			_menuContext->setMaxPoints(_pointCounter);
			_menuContext->showScore(); }), NULL));
	}
	else if(_isCalculatorThere && !_calculator->checkAnswer(_answer) && _calculator->isEnterPressed() )
	{
		_burstFlag = false;
		_pointCounter++;
		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/sfx/error.ogg", false);
		makingBalloons();
	}
	else if (_isCalculatorThere && _calculator->checkAnswer(_answer) && _calculator->isEnterPressed() && _balloonsBin.size() != _answer)
	{
		_burstFlag = false;
		_pointCounter++;
		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/sfx/error.ogg", false);
		makingBalloons();
	}
}
void Balloon::makingBalloons()
{
	
	auto myGameWidth = 0;
	if (visibleSize.width > 2560) {
		myGameWidth = (visibleSize.width - 2560) / 2;
	}
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	if (gameCurrentLevel < 19)
	{
			_label->runAction(Sequence::create(DelayTime::create(1.8),
			CCCallFunc::create([=] {_label->setString("?"); }), NULL));
	}
	auto balloonBackground = this->getChildByName("bg");
	for (int i = 0; i < _removedBalloonsId.size(); i++)
	{
		cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline("balloonpop/balloon.csb");
		Sprite* balloon = (Sprite *)CSLoader::createNode("balloonpop/balloon.csb");
		setAllSpriteProperties(balloon, 0, balloonBackground->getChildByName(_nodeName[_removedBalloonsId[i]])->getPositionX() + myGameWidth, -visibleSize.height*0.2, true, 0.5, 0.5, 0, 1, 1);
		this->addChild(balloon, 0);
		balloon->runAction(timeline);
		timeline->play(_balloonColor, true);
		balloon->setName("balloon");
		balloon->setTag(_removedBalloonsId[i] + 1000);
		_balloonsBin.push_back(balloon);
		upFloat(balloon, RandomHelper::random_int(3, 6), balloonBackground->getChildByName(_nodeName[_removedBalloonsId[i]])->getPositionX() + myGameWidth, balloonBackground->getChildByName(_nodeName[_removedBalloonsId[i]])->getPositionY());
		if (i == (_removedBalloonsId.size() - 1))
		{
			_removedBalloonsId.clear();
		}
	}
	_pin->setZOrder(2);
	_pin->setPosition(Vec2(visibleSize.width*0.5, visibleSize.height*0.5));
	this->runAction(Sequence::create(DelayTime::create(6), CCCallFunc::create([=] {
		_burstFlag = true;
		int gameCurrentLevel = _menuContext->getCurrentLevel();
		if (gameCurrentLevel == 1 && _helpFlag)
		{
			_helpFlag = false;
			auto a = _pin->getPositionX() ;
			auto b = _pin->getPositionY() ;
			
			auto c = _balloonsBin[0]->getPositionX();// -_balloonsBin[6]->getChildByName("Sprite_1")->getContentSize().width / 2 * 0.7;
			auto d = _balloonsBin[0]->getPositionY() -_balloonsBin[0]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.35;

			_help = HelpLayer::create(Rect(a, b, _pin->getContentSize().width*1.02
				, _pin->getContentSize().height*1.02),
				Rect(c, d , _balloonsBin[0]->getChildByName("Sprite_1")->getContentSize().width, _balloonsBin[0]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.65));
			_help->clickAndDrag(Vec2(a,b),Vec2(c,d));
			this->addChild(_help, 5);
		}
			/*	for (int i = 0; i < _balloonsBin.size(); i++)
		{
		auto a = _balloonsBin[i]->getPositionX() - _balloonsBin[i]->getChildByName("Sprite_1")->getContentSize().width / 2 * 0.7;
		auto b = _balloonsBin[i]->getPositionY() - _balloonsBin[i]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.65;

		auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a, b),
		Vec2(a + _balloonsBin[i]->getChildByName("Sprite_1")->getContentSize().width*0.8, b + _balloonsBin[i]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.60),
		Color4F(0, 0, 255, 22));
		}*/
	}), NULL));
}
void Balloon::upFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	MoveTo *nodeAction = MoveTo::create(time, Vec2(positionX, positionY));
	EaseBackOut *easeAction = EaseBackOut::create(nodeAction);
	floatingObj->runAction(easeAction);

	//floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}
void Balloon::addTouchEvents(Sprite* obj)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();

		if (!(target->getName()).compare("done"))
		{
			auto a = target->getPositionX() - target->getContentSize().width / 2;
			auto b = target->getPositionY() - target->getContentSize().height / 2;

			Rect rect = CCRectMake(a, b, target->getContentSize().width, target->getContentSize().height);
			if (rect.containsPoint(Vec2(touch->getLocation().x, touch->getLocation().y)) && _touched)
			{
				target->setOpacity(100); _touched = false;
				return true;
			}
		}
			else if (!(target->getName()).compare("calculator"))
			{
				auto a = target->getPositionX() - target->getContentSize().width / 2;
				auto b = target->getPositionY() - target->getContentSize().height / 2;

				Rect rect = CCRectMake(a, b, target->getContentSize().width, target->getContentSize().height);
				if (rect.containsPoint(Vec2(touch->getLocation().x, touch->getLocation().y)) && _touched)
				{
					target->setOpacity(100); _touched = false;
					return true;
				}
			}
			else
			{
				
				auto a = target->getPositionX() - target->getContentSize().width / 2;
				auto b = target->getPositionY() - target->getContentSize().height / 2;
				target->setScale(1);

			Rect rect = CCRectMake(a, b, target->getContentSize().width, target->getContentSize().height);
			if (rect.containsPoint(Vec2(touch->getLocation().x, touch->getLocation().y)) && _touched)
			{
				_touched = false;
				 return true;
			}
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();

		int gameCurrentLevel = _menuContext->getCurrentLevel();
		if (gameCurrentLevel == 1)
		{
			this->removeChild(_help,true);
		}
		if (!(target->getName()).compare("done") || !(target->getName()).compare("calculator"))
		{
		}
		else
		{
			target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));

			auto a = target->getPositionX() - target->getContentSize().width / 2;
			auto b = target->getPositionY() - target->getContentSize().height / 2;

		/*	E->clear();
			E->drawRect(Vec2(a, b), Vec2(a + 10, b + 10), Color4F(0, 0, 255, 22));*/

			Rect pinRect = CCRectMake(a, b, 10, 10);

			for (int j = 0; j < _balloonsBin.size(); j++)
			{
				auto c = _balloonsBin[j]->getPositionX() - _balloonsBin[j]->getChildByName("Sprite_1")->getContentSize().width / 2 * 0.7;
				auto d = _balloonsBin[j]->getPositionY() - _balloonsBin[j]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.65;

				Rect balloonRect = CCRectMake(c, d, _balloonsBin[j]->getChildByName("Sprite_1")->getContentSize().width*0.8, _balloonsBin[j]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.60);

				if (pinRect.intersectsRect(balloonRect) && _burstFlag)
				{
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/shop_balloon_burst.ogg", false);

					auto tagNo = _balloonsBin[j]->getTag();
					_removedBalloonsId.push_back(tagNo - 1000);
					auto pos = _balloonsBin[j]->getPosition();
					this->removeChildByTag(tagNo);
					_balloonsBin.erase(_balloonsBin.begin() + j);

					cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline("balloonpop/burst.csb");
					Sprite* balloonBurst = (Sprite *)CSLoader::createNode("balloonpop/burst.csb");
					balloonBurst->setPosition(Vec2(pos));
					this->addChild(balloonBurst);

					balloonBurst->runAction(timeline);
					timeline->play(_balloonColor, false);
					timeline->setAnimationEndCallFunc(_balloonColor, CC_CALLBACK_0(Balloon::removeBalloon, this, balloonBurst));

					if (gameCurrentLevel < 19)
					{
						std::ostringstream balloonsRemaining;
						balloonsRemaining << _balloonsBin.size();
						_textString3 = balloonsRemaining.str();
						_label->setString(_textString3);
						auto sequence_E = ScaleTo::create(0.1, (1.1));
						auto sequence_F = ScaleTo::create(0.1, 1);
						_label->runAction(Sequence::create(sequence_E, sequence_F, NULL));
					}
				}
			}
		}
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		if (!(target->getName()).compare("done"))
		{
			_pointCounter++;
			target->setOpacity(255);
			if (_balloonsBin.size() != _answer && _balloonsBin.size() != 12)
			{
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/error.ogg", false);

				_burstFlag = false;
				_label->setColor(cocos2d::Color3B(237, 33, 53));
				auto sequence_A = ScaleTo::create(0.3, (1.15));
				auto sequence_B = ScaleTo::create(0.3, 1);
				auto sequence_C = ScaleTo::create(0.3, (1.15));
				auto sequence_D = ScaleTo::create(0.3, 1);
				auto sequence_E = ScaleTo::create(0.3, (1.15));
				auto sequence_F = ScaleTo::create(0.3, 1);
				_label->runAction(Sequence::create(sequence_A, sequence_B, sequence_C, sequence_D, sequence_E, sequence_F,
					CCCallFunc::create([=] {_label->setColor(cocos2d::Color3B(253, 255, 233)); }), NULL));
				makingBalloons();
			}
			else if (_balloonsBin.size() == _answer)
			{
				Director::getInstance()->getEventDispatcher()->removeAllEventListeners();
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/success.ogg", false);
				_menuContext->addPoints(1);
				if (_answer == _isBiggerNoAnswer)
				{
					std::ostringstream firstNo;
					firstNo << _isBiggerNoAnswer;
					std::string NoInString = firstNo.str();
					_label->setString(NoInString);
				}
				_label->setColor(cocos2d::Color3B(143, 239, 32));
				auto sequence_A = ScaleTo::create(0.3, (1.15));
				auto sequence_B = ScaleTo::create(0.3, 1);
				auto sequence_C = ScaleTo::create(0.3, (1.15));
				auto sequence_D = ScaleTo::create(0.3, 1);
				auto sequence_E = ScaleTo::create(0.3, (1.15));
				auto sequence_F = ScaleTo::create(0.3, 1);
				_label->runAction(Sequence::create(sequence_A, sequence_B, sequence_C, sequence_D, sequence_E, sequence_F,
					CCCallFunc::create([=]
				{
					_menuContext->setMaxPoints(_pointCounter);
					_menuContext->showScore(); }), NULL));
			}
		}
		else if(!(target->getName()).compare("calculator"))
		{
			target->setOpacity(255);
			if (!_isCalculatorThere)
			{
				_calculator = new Calculator();
				_calculator->createCalculator(Vec2(visibleSize.width*0.85, visibleSize.height*0.20), Vec2(0.5, 0.5), 0.5, 0.5);
				 this->addChild(_calculator, 10);
				_isCalculatorThere = true;
			}
			else
			{
				_isCalculatorThere = false;
				this->removeChild(_calculator, true);
			}
		}
		else
		{   	target->setScale(0.8);  	}
		_touched = true;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, obj);
}

void Balloon::removeBalloon(Sprite* obj)
{
	this->removeChild(obj, true);
}

void Balloon::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX, posY));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* Balloon::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
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
