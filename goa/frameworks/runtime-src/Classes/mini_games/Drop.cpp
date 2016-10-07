#include "Drop.h"

USING_NS_CC;

Scene* Drop::createScene()
{
	auto scene = Scene::create();
	auto layer = Drop::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, "drop");
	scene->addChild(layer->_menuContext);
	return scene;
}

bool Drop::init()
{
	if (!Layer::init()) { return false; }

	std::map<std::string, std::map<std::string, std::string>> dropSceneMap = {
	
			{ "dropjungle",
							{
								{ "bg", "dropjungle/dropjungle.csb" }
							} 
		    }
	};

	std::string theme[] = { "dropjungle", "dropcity"};
	//_dropCurrentTheme = theme[RandomHelper::random_int(0, 2)];

	_dropCurrentTheme = "dropjungle";
	_scenePath = dropSceneMap.at(_dropCurrentTheme);

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}

	//BackGround
	auto dropBackground = CSLoader::createNode(_scenePath.at("bg"));
	this->addChild(dropBackground, 0);

	_removalPole = Sprite::createWithSpriteFrameName("dropjungle/leafbal.png");
	setAllSpriteProperties(_removalPole, 0, visibleSize.width*0.1, visibleSize.height*0.75, true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_removalPole);

	std::string word = "APPLEONE"; 
	
	auto gap = Director::getInstance()->getVisibleSize().width / word.length();

	for (int i = 0; i < word.length(); i++)
	{

		cocostudio::timeline::ActionTimeline* basketTimeline = CSLoader::createTimeline("dropjungle/basket.csb");
		Sprite* basket = (Sprite *)CSLoader::createNode("dropjungle/basket.csb");
		auto width = basket->getBoundingBox().size.width / 2;
		auto height = basket->getBoundingBox().size.height / 2;
		basket->setPosition(Vec2(i*gap+gap/2, visibleSize.height*0.08));
		basket->setScale(1);

		Sprite* basket_1 = Sprite::createWithSpriteFrameName("dropjungle/basketouter.png");
		basket_1->setPosition(Vec2(i*gap + gap / 2, visibleSize.height*0.08));
		basket_1->setAnchorPoint(Vec2(0.5, 0.5));
		this->addChild(basket_1);
		
		this->addChild(basket);
		basket->runAction(basketTimeline);

		auto label = LabelTTF::create(LangUtil::convertUTF16CharToString(word.at(i)), "Helvetica", 80);
		label->setPosition(width, height);
		label->setAnchorPoint(Vec2(0, 0));
		label->setName(LangUtil::convertUTF16CharToString(word.at(i)));
		basket_1->addChild(label, 3);

		_basketAnimBin.push_back(basketTimeline);
		_basketBin.push_back(basket_1);
	
	}

	Vector <Node*> children = dropBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}

	this->schedule(schedule_selector(Drop::letterAndHolderMaker), 6);

	this->scheduleUpdate();
	return true;
}

void Drop::update(float delta) {
									removeLetterHolder();
									basketLetterCollisionChecker();
}

Drop::~Drop(void)
{
	this->removeAllChildrenWithCleanup(true);
}

void Drop::letterAndHolderMaker(float dt)
{
	Sprite* leafBall = Sprite::createWithSpriteFrameName("dropjungle/leafbal.png");
	setAllSpriteProperties(leafBall, 0, visibleSize.width*0.8, visibleSize.height*0.75, true, 0.5, 0.5, 0, 1, 1);
	leftFloat(leafBall, 10, visibleSize.width*0.1, visibleSize.height*0.75);
	this->addChild(leafBall);
	addEvents(leafBall);
	leafBall->setTag(letterHolderId);
	_letterHolderSpriteBin.push_back(leafBall);


	//Label
	auto label = LabelTTF::create("A", "Helvetica", 120);
	label->setPosition(leafBall->getBoundingBox().size.width/2, leafBall->getBoundingBox().size.height / 2);
	label->setAnchorPoint(Vec2(0.5, 0.5));
	label->setName("A");
	leafBall->addChild(label, 0);
	letterHolderId++;
}
void Drop::leftFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}

void Drop::addEvents(Sprite* clickedObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		if (rect.containsPoint(locationInNode) )
		{
			cocostudio::timeline::ActionTimeline* holderTimeline = CSLoader::createTimeline("dropjungle/leafball.csb");
			Sprite* holderImage = (Sprite *)CSLoader::createNode("dropjungle/leafball.csb");
			holderImage->setPosition(Vec2(target->getPosition().x, target->getPosition().y));
			this->addChild(holderImage);
			holderImage->runAction(holderTimeline);
			holderTimeline->play("click", false);
			holderTimeline->setAnimationEndCallFunc("click", CC_CALLBACK_0(Drop::removeHolderAnimation, this, holderImage));

			auto label = LabelTTF::create("L", "Helvetica", 120);
			label->setPosition(target->getPosition().x, target->getPosition().y);
			label->setAnchorPoint(Vec2(0.5, 0.5));
			this->addChild(label, 0);
			label->runAction(MoveTo::create(1, Vec2(label->getPosition().x, visibleSize.height*0.001)));
			_FallingLetter.push_back(label);

			target->setVisible(false);

			for (int i = 0; i < _letterHolderSpriteBin.size(); i++)
			{
				if (_letterHolderSpriteBin[i]->getTag() == target->getTag())
				{
					_letterHolderSpriteBin[i]->getEventDispatcher()->removeEventListener(listener);
				}
			}
			CCLOG("size of holder container : %d", _letterHolderSpriteBin.size());
		
		}
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, clickedObject);
}

void Drop::removeLetterHolder()
{
	for (int i = 0; i < _letterHolderSpriteBin.size(); i++)
	{
		auto letterHolder = CCRectMake(_letterHolderSpriteBin[i]->getPositionX(), _letterHolderSpriteBin[i]->getPositionY(), _letterHolderSpriteBin[i]->getContentSize().width, _letterHolderSpriteBin[i]->getContentSize().height);

		if (letterHolder.intersectsRect(_removalPole->getBoundingBox()))
		{
			this->removeChild(_letterHolderSpriteBin[i], true);
			_letterHolderSpriteBin.erase(_letterHolderSpriteBin.begin() + i);
		}
	}
}

void Drop::basketLetterCollisionChecker()
{
	int a = 0;
	for (int i = 0; i < _basketBin.size(); i++)
	{
		for (int j = 0; j < _FallingLetter.size(); j++)
		{
			auto alphaBox = CCRectMake(_basketBin[i]->getPositionX(), _basketBin[i]->getPositionY(), _basketBin[i]->getContentSize().width, _basketBin[i]->getContentSize().height);
			if(alphaBox.intersectsRect(_FallingLetter[j]->getBoundingBox()))
			{ 
				auto str = _basketBin[i]->getChildren().at(0)->getName();
				if (!str.compare(_FallingLetter[j]->getString()))
				{
					CCLOG("YES");
				}
				else
				{
					CCLOG("NO");
				}
				this->removeChild(_FallingLetter[j], true);
				_FallingLetter.erase(_FallingLetter.begin() + j);
			}
		}
	}
}

void Drop::removeHolderAnimation(Sprite* anim)
{
	this->removeChild(anim, true);
}

void Drop::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}
