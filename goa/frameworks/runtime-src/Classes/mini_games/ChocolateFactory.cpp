#include "ChocolateFactory.h"
#include "../menu/HelpLayer.h"
#include <algorithm> 


USING_NS_CC;

Scene* ChocolateFactory::createScene()
{
	auto scene = Scene::create();
	auto layer = ChocolateFactory::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, ChocolateFactory::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void ChocolateFactory::onEnterTransitionDidFinish()
{
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	_dropCurrentTheme ="drophero";

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}
	else if (!_dropCurrentTheme.compare("drophero"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("chocolatefactory/chocolatefactory.plist");
	}
	else
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/dropcity.plist");
	}
	// BackGround
	auto chocolatefactoryBackground = CSLoader::createNode("chocolatefactory/chocolatefactory.csb");
	this->addChild(chocolatefactoryBackground, 0);
	chocolatefactoryBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		chocolatefactoryBackground->setPositionX(myGameWidth);
	}
	std::vector<int> randomIndex;
	while (randomIndex.size() != 4) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, 9);
		for (int i = 0; i < randomIndex.size(); i++) {
			if (numberPicker == randomIndex[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			randomIndex.push_back(numberPicker);
	}
	std::vector<int> sortedRandomNumber = randomIndex;
	std::sort(sortedRandomNumber.begin(), sortedRandomNumber.end());
	
	Vector <Node*> children = chocolatefactoryBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
	Node * monsterItem = *item;
	std::string str = monsterItem->getName().c_str();
	if (str.find("abox") == 0)
	{
		_nodeName.push_back(str);
	}
	CCLOG("name : %s", str.c_str());
	}
	
	cocostudio::timeline::ActionTimeline* conveyorTimeline = CSLoader::createTimeline("chocolatefactory/conveyor.csb");
	_conveyor = (Sprite*)chocolatefactoryBackground->getChildByName("conveyor");
	_conveyor->runAction(conveyorTimeline);
	conveyorTimeline->gotoFrameAndPlay(0, true);

	Sprite* image = (Sprite*)chocolatefactoryBackground->getChildByName("tank");
	image->setVisible(false);
	 cocostudio::timeline::ActionTimeline* fillUpMachineTimeline = CSLoader::createTimeline("chocolatefactory/tank.csb");
	 _fillUpMachine = (Sprite *)CSLoader::createNode("chocolatefactory/tank.csb");
	 _fillUpMachine->setPosition(Vec2(image->getPositionX(), image->getPositionY()));
	 _fillUpMachine->runAction(fillUpMachineTimeline);
	 this->addChild(_fillUpMachine, 2);
	_fillUpMachine->setGlobalZOrder(10);

	Sprite* dummyBox = Sprite::createWithSpriteFrameName("chocolatefactory/boxfront.png");

	for (int i=0; i<4; i++)
	{
		Sprite* sprite =(Sprite*) CSLoader::createNode("chocolatefactory/box.csb");
		sprite->setPosition(Vec2(-visibleSize.width*.2-i*dummyBox->getContentSize().width*.88, visibleSize.height*.294));
		sprite->setTag(i);
		sprite->setContentSize(sprite->getChildByName("boxfront_2")->getContentSize());
		this->addChild(sprite, 0);
		rightFloat(sprite, 4, sprite->getPositionX()+ visibleSize.width*.747, visibleSize.height*.294);
		_trayBin.push_back(sprite);

		
		for (int j=0; j<sprite->getChildren().size(); j++)
		{ 
			 std::string str = sprite->getChildren().at(j)->getName();
			 if(str.find("milkcarton")==0)
			 sprite->getChildren().at(j)->setVisible(false);
		}

		//auto transparentBG = Sprite::create("chocolatefactory/touch.png");
		//transparentBG->setPosition(Vec2(dummyBox->getContentSize().width / 2 + i*dummyBox->getContentSize().width*.82, 130));
		//_pole->addChild(transparentBG, 0);
		////transparentBG->setAnchorPoint(Vec2(0, 0));
		//transparentBG->setTag(i);
		//transparentBG->setScaleX(0.6);
		//transparentBG->setScaleY(1);
		//_trayBinDummy.push_back(transparentBG);
	}
	/*vector <node*> children1 = _traybin[0]->getchildren();
	int size1 = children1.size();
	for (auto item = children1.rbegin(); item != children1.rend(); ++item) {
		node * monsteritem = *item;
		std::string str = monsteritem->getname().c_str();
		cclog("name : %s", str.c_str());
	}*/
	auto addposition = CCCallFunc::create([=] {
		for (int i = 0; i <_trayBin.size(); i++)
		{
			_trayPositions.push_back(std::make_pair(_trayBin[i]->getPositionX(), _trayBin[i]->getPositionY()));
			_conveyor->stopAllActions();
		}
	});
	auto fillProduct = CCCallFunc::create([=] {
		if (_fillUpFlag == 0)
			_fillUpFlag++;
		else if(_fillUpFlag == 1)
			_fillUpFlag++;
		else if (_fillUpFlag == 2)
			_fillUpFlag++;
		else
		{
			_fillUpFlag++;
			for (int i = 0; i < _trayBin.size(); i++)
			{
				addTouchEvents(_trayBin[i]);
			/*auto aab = DrawNode::create();
			this->addChild(aab, 20);
			auto a = _trayBin[3]->getPositionX() - _trayBin[3]->getContentSize().width / 2 * 0.82;
			auto b = _trayBin[3]->getPositionY() - _trayBin[3]->getContentSize().height / 2 * 0.78;
			aab->drawRect(Vec2(a,b),
				Vec2(a+ _trayBin[3]->getContentSize().width*0.77,b+ _trayBin[3]->getContentSize().height*0.95),
				Color4F(0, 0, 255, 22));*/
			}
		}
		fillUpMachineTimeline->play("forward", false);
		fillUpMachineTimeline->setAnimationEndCallFunc("forward", CC_CALLBACK_0(ChocolateFactory::machineDynamicMotion, this,randomIndex, sortedRandomNumber,(_fillUpFlag-1),fillUpMachineTimeline ));
			
			//for (int i = 0; i < 2; i++)
			//{
			//	auto sequenceDot = Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {
			//		fillUpMachineTimeline->gotoFrameAndPlay(0, false);
			//		fillUpMachineTimeline->setAnimationEndCallFunc("forward", CC_CALLBACK_0(ChocolateFactory::machineDynamicMotion, this, i+1));
			//		//_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[i]->getPositionX(), _fillUpMachine->getPositionY())));
			//	}), NULL);
			//	this->runAction(sequenceDot);
			//	delay = delay + 1.5;
			//}
		//}
	});
	auto sequence_A  = CCCallFunc::create([=] {
		if (_fillUpFlag == 0)
			_fillUpMachine->runAction(MoveTo::create(2, Vec2(_trayBin[0]->getPositionX() + visibleSize.width*.006, _fillUpMachine->getPositionY())));
		else if (_fillUpFlag == 1)
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[1]->getPositionX() + visibleSize.width*.006, _fillUpMachine->getPositionY())));
		else if (_fillUpFlag == 2)
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[2]->getPositionX() + visibleSize.width*.006, _fillUpMachine->getPositionY())));
		else
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[3]->getPositionX() + visibleSize.width*.006, _fillUpMachine->getPositionY())));
	}); 
	this->runAction(Sequence::create(DelayTime::create(4), sequence_A, DelayTime::create(2), fillProduct,
		DelayTime::create(3.5), sequence_A, DelayTime::create(1),fillProduct,DelayTime::create(3.5), sequence_A ,DelayTime::create(1),
		fillProduct,DelayTime::create(3.5),sequence_A , DelayTime::create(1), fillProduct,NULL));

	for (int i = 0; i <_trayBin.size(); i++) {
	std::string str = _trayBin[i]->getName().c_str();
	CCLOG("name : %s", str.c_str());
	}
	this->runAction(Sequence::create(DelayTime::create(7), addposition, NULL));
	this->scheduleUpdate();
}

ChocolateFactory::~ChocolateFactory()
{
}

void ChocolateFactory::update(float dt)
{
	
}
void ChocolateFactory::machineDynamicMotion(std::vector<int> randomNumbers, std::vector<int> sortedRandomNumbers, int index, cocostudio::timeline::ActionTimeline* timeline)
{
	int correctOrderIndex;
	auto a = (randomNumbers[index]);
	
		for (int k = 0;k < sortedRandomNumbers.size(); k++)
		{
			if (a == sortedRandomNumbers[k])
			{
				correctOrderIndex = k;
				break;
			}
	    }
	if (a != 0)
	{
		for (int j = 1; j <= a; j++)
		{
			std::ostringstream strName;
			strName << "milkcarton" << j;
			std::string name = strName.str();
			_trayBin[index]->getChildByName(name)->setVisible(true);
			_trayBin[index]->setName(_nodeName[correctOrderIndex]);
		}
	}
	else
	{
		_trayBin[index]->setName(_nodeName[correctOrderIndex]);
	}
	timeline->play("back", false);
}
void ChocolateFactory::addTouchEvents(Sprite* obj)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		cocos2d::Vec2 _trayPos = target->getPosition();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		
		auto a = target->getPositionX() - target->getContentSize().width / 2 * 0.82;
		auto b = target->getPositionY() - target->getContentSize().height / 2 * 0.78;

		Rect rect = CCRectMake(a,b, target->getContentSize().width*0.77, target->getContentSize().height*.95);
		if (rect.containsPoint(Vec2(touch->getLocation().x,touch->getLocation().y)) && _touched)
		{
			_touched = false;
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
			//auto a = target->getPositionX() - target->getContentSize().width / 2 * 0.82;
			//auto b = target->getPositionY() - target->getContentSize().height / 2 * 0.78;
			//auto myBG = this->getChildByName("bg");
			//Rect rect = CCRectMake(a, b, target->getContentSize().width*0.77, target->getContentSize().height*.95);
			//for (int i = 0; i < _nodeName.size(); i++)
			//{
			//	Rect boxRect = CCRectMake(myBG->getChildByName(_nodeName.at(i))->getPositionX() - 100, myBG->getChildByName(_nodeName.at(i))->getPositionY() - 100, 200, 200);
			//	if (rect.intersectsRect(boxRect)) {
			//		for (int j = 0; j < _trayBin.size(); j++)
			//		{
			//			if (_trayBin[j]->getPosition == myBG->getChildByName(_nodeName.at(i))->getPositionX())
			//			{
			//				//_trayBin[j]->setPosition(_trayPos);
			//			}
			//		}
			//	}
			//}
		return true;
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto a = target->getPositionX() - target->getContentSize().width / 2 * 0.82;
		auto b = target->getPositionY() - target->getContentSize().height / 2 * 0.78;
		auto myBG = this->getChildByName("bg");
		Rect rect = CCRectMake(a, b, target->getContentSize().width*0.77, target->getContentSize().height*.95);
		bool isIntersect = false;
		for (int i = 0; i < _nodeName.size(); i++)
		{
			Rect boxRect = CCRectMake(myBG->getChildByName(_nodeName.at(i))->getPositionX() - 100, myBG->getChildByName(_nodeName.at(i))->getPositionY() - 100, 200, 200);
			if (rect.intersectsRect(boxRect)) {
				bool flag = false;
				for (int j = 0; j < _trayBin.size(); j++)
				{
					if (myBG->getChildByName(_nodeName.at(i))->getPosition() == _trayBin[j]->getPosition())
					{  flag = true;  }
				}
				if (!flag) {
					//target->runAction(MoveTo::create(0.0, Vec2(myBG->getChildByName(_nodeName.at(i))->getPosition())));
					target->setPosition(myBG->getChildByName(_nodeName.at(i))->getPosition());
					isIntersect = true;
				}
			}
		}
		if (!isIntersect)
		{
			auto pos = _trayPositions[target->getTag()];
			target->runAction(MoveTo::create(1,Vec2( pos.first,pos.second)));
		}
		_setcounter = 0;
		for (int k=0; k < _trayBin.size(); k++)
		{
			bool flag = false;
			for (int j = 0; j < _nodeName.size(); j++)
			{
				std::string name1 = _trayBin[k]->getName();
				std::string name2 = _nodeName[j];
				if (_trayBin[k]->getPosition() == myBG->getChildByName(_nodeName.at(j))->getPosition())
				{
					_setcounter++;
				}
			}
		}
		if (_setcounter == 4)
		{
			CCLOG("G A M E O V E R counter : %d", _setcounter);
			isTrayInRightSequence();
		}
		_touched = true;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, obj);
}

void ChocolateFactory::rightFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}
void ChocolateFactory::isTrayInRightSequence()
{
	int orderCounter = 0;
	auto myBG = this->getChildByName("bg");
	for (int k = 0; k < _trayBin.size(); k++)
	{
		for (int j = 0; j < _nodeName.size(); j++)
		{
			std::string name1 = _trayBin[k]->getName();
			std::string name2 = myBG->getChildByName(_nodeName.at(j))->getName();
			if (_trayBin[k]->getPosition() == myBG->getChildByName(_nodeName.at(j))->getPosition()
				&& !name1.compare(name2))
			{orderCounter++;}
		}
	}
	if (orderCounter == 4) {
		CCLOG("G A M E  IS O V E R");
		auto callShowScore = CCCallFunc::create([=] {
			_menuContext->showScore();
		});
		this->runAction(Sequence::create(DelayTime::create(2), callShowScore, NULL));
	 }
	}
		
void ChocolateFactory::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* ChocolateFactory::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
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
std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> ChocolateFactory::setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder)
{
	cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline(csbString);
	Sprite* sprite = (Sprite *)CSLoader::createNode(csbString);
	sprite->setPosition(Vec2(posX, posY));
	sprite->runAction(timeline);
	this->addChild(sprite, zOrder);
	return std::make_pair(sprite, timeline);
}


