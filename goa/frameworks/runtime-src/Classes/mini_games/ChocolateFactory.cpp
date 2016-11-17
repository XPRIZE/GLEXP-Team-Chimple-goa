#include "ChocolateFactory.h"
#include "../menu/HelpLayer.h"

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

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		chocolatefactoryBackground->setPositionX(myGameWidth);
	}

	Vector <Node*> children = chocolatefactoryBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
	Node * monsterItem = *item;
	std::string str = monsterItem->getName().c_str();
	CCLOG("name : %s", str.c_str());
	}
	
	cocostudio::timeline::ActionTimeline* conveyorTimeline = CSLoader::createTimeline("chocolatefactory/conveyor.csb");
	auto conveyor = chocolatefactoryBackground->getChildByName("conveyor");
	conveyor->runAction(conveyorTimeline);
	conveyorTimeline->gotoFrameAndPlay(0, true);

	cocostudio::timeline::ActionTimeline* fillUpMachineTimeline = CSLoader::createTimeline("chocolatefactory/tank.csb");
	_fillUpMachine =(Sprite*) chocolatefactoryBackground->getChildByName("tank");
	_fillUpMachine->setGlobalZOrder(10);
	_fillUpMachine->runAction(fillUpMachineTimeline);

	/* _pole = Sprite::createWithSpriteFrameName("chocolatefactory/boxfront.png");
	setAllSpriteProperties(_pole, 0,-(visibleSize.width*0.4), 534.75, true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_pole, 0);
	rightFloat(_pole,2, visibleSize.width*.09, 534.75);
	*/
	Sprite* dummyBox = Sprite::createWithSpriteFrameName("chocolatefactory/boxfront.png");

	for (int i=0; i<4; i++)
	{
		Sprite* sprite = (Sprite *)CSLoader::createNode("chocolatefactory/box.csb");
		sprite->setPosition(Vec2(-visibleSize.width*.2-i*dummyBox->getContentSize().width*.90, visibleSize.height*.222));
		sprite->setTag(i);
		sprite->setContentSize(sprite->getChildByName("boxfront_2")->getContentSize());
		sprite->setAnchorPoint(Vec2(-0.5,-0.5));
		this->addChild(sprite, 0);
		rightFloat(sprite, 2, sprite->getPositionX()+ visibleSize.width*.66, visibleSize.height*.222);
		_trayBin.push_back(sprite);

		//auto transparentBG = Sprite::create("chocolatefactory/touch.png");
		//transparentBG->setPosition(Vec2(dummyBox->getContentSize().width / 2 + i*dummyBox->getContentSize().width*.82, 130));
		//_pole->addChild(transparentBG, 0);
		////transparentBG->setAnchorPoint(Vec2(0, 0));
		//transparentBG->setTag(i);
		//transparentBG->setScaleX(0.6);
		//transparentBG->setScaleY(1);
		//_trayBinDummy.push_back(transparentBG);
	}
	/*Vector <Node*> children1 = _trayBin[0]->getChildren();
	int size1 = children1.size();
	for (auto item = children1.rbegin(); item != children1.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}*/
	auto addposition = CCCallFunc::create([=] {
		for (int i = 0; i <_trayBin.size(); i++)
		{
			_trayPositions.push_back(std::make_pair(_trayBin[i]->getPositionX(), _trayBin[i]->getPositionY()));
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

			auto aab = DrawNode::create();
			this->addChild(aab, 20);
			aab->drawRect(Vec2(_trayBin[3]->getPositionX(), _trayBin[3]->getPositionY()),
				Vec2(_trayBin[3]->getPositionX()+100, _trayBin[3]->getPositionY() +100),
				Color4F(0, 0, 255, 22));
			}
		}
		fillUpMachineTimeline->gotoFrameAndPlay(0, false);
			
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
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[0]->getPositionX() + visibleSize.width*.115, _fillUpMachine->getPositionY())));
		else if (_fillUpFlag == 1)
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[1]->getPositionX() + visibleSize.width*.115, _fillUpMachine->getPositionY())));
		else if (_fillUpFlag == 2)
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[2]->getPositionX() + visibleSize.width*.115, _fillUpMachine->getPositionY())));
		else
			_fillUpMachine->runAction(MoveTo::create(1, Vec2(_trayBin[3]->getPositionX() + visibleSize.width*.115, _fillUpMachine->getPositionY())));
	}); 
	this->runAction(Sequence::create(DelayTime::create(3), sequence_A, DelayTime::create(1), fillProduct,
		DelayTime::create(3.5), sequence_A, DelayTime::create(1),fillProduct,DelayTime::create(3.5), sequence_A ,DelayTime::create(1),
		fillProduct,DelayTime::create(3.5),sequence_A , DelayTime::create(1), fillProduct,NULL));

	this->runAction(Sequence::create(DelayTime::create(7), addposition, NULL));
	this->scheduleUpdate();
}

ChocolateFactory::~ChocolateFactory()
{
}

void ChocolateFactory::update(float dt)
{
	//boxGeneration();
}

void ChocolateFactory::machineDynamicMotion(int index)
{ 
}

void ChocolateFactory::addTouchEvents(Sprite* obj)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect;
		rect = Rect(0, 0, s.width, s.height);
		if (rect.containsPoint(locationInNode))
		{
			CCLOG("touched");
		}
		return true;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect;
		rect = Rect(0, 0, s.width, s.height);
		if (rect.containsPoint(locationInNode))
		{
			_touched = false;
			target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
			CCLOG("moved");
		}
		return true;
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect;
		rect = Rect(0, 0, s.width, s.height);
		if (rect.containsPoint(locationInNode))
		{
			CCLOG("ended");
		}
		return true;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, obj);
}

void ChocolateFactory::rightFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
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


