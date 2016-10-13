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
								{ "bg", "dropjungle/dropjungle.csb" },
								{ "holderAnimation", "dropjungle/leafball.csb"},
								{ "removalPole", "dropjungle/leafbal.png" },
								{ "basketAnimation","dropjungle/basket.csb" },
								{ "pseudoHolderImage","dropjungle/leafbal.png" },
								{ "basketImageName", "basketouter_1"}
							} 
		    },
			{ "drophero",
							{
								{ "bg", "drophero/drophero.csb" },
								{ "holderAnimation", "drophero/trailer.csb" },
								{ "removalPole", "drophero/boxback.png" },
								{ "basketAnimation","drophero/dropbox.csb" },
								{ "pseudoHolderImage","drophero/trailer1.png" },
								{ "basketImageName", "boxback"}
							}
			}

	};

	std::map<std::string, std::map<std::string,float>> dropSceneNumValue = {

		{ "dropjungle",
						{
							{ "boxLabelYFactor",0.08},
							{ "basketRectYFactor", 0},
							{ "flaotingLetterYFactor", 1}
						}
		},
		{ "drophero",
						{
							{ "boxLabelYFactor",0.07},
							{ "basketRectYFactor", 1 },
							{ "flaotingLetterYFactor", 0.85}
						}
		}

	};

	std::string theme[] = { "dropjungle", "drophero"};
	//_dropCurrentTheme = theme[RandomHelper::random_int(0, 2)];

	_dropCurrentTheme = "drophero";
	_scenePath = dropSceneMap.at(_dropCurrentTheme);

	_sceneBasedNumericalVal = dropSceneNumValue.at(_dropCurrentTheme);

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}
	else
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/drophero.plist");
	}

	//BackGround
	auto dropBackground = CSLoader::createNode(_scenePath.at("bg"));
	this->addChild(dropBackground, 0);

	Vector <Node*> children = dropBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}

	_removalPole = Sprite::createWithSpriteFrameName(_scenePath.at("removalPole"));
	setAllSpriteProperties(_removalPole, 0, (visibleSize.width*0.15), visibleSize.height*0.62, true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_removalPole);

	std::string word = "APPLEONE"; 
	
	//Random index getter for blanks
	std::vector<int> randomIndex;
	int sizeOfWord = word.length();
	int sizeOfRandomIndexVector;

	if (sizeOfWord % 2 == 0)
		sizeOfRandomIndexVector = sizeOfWord / 2;
	else
	{
		int justANumber =RandomHelper::random_int(0, 1);
		if (justANumber)
			sizeOfRandomIndexVector = sizeOfWord / 2;
		else
			sizeOfRandomIndexVector = sizeOfWord / 2 + 1;
	}


	while (randomIndex.size() != sizeOfRandomIndexVector) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, sizeOfWord - 1);
		for (int i = 0; i < randomIndex.size(); i++) {
			if (numberPicker == randomIndex[i]) 
				duplicateCheck = false;
		}
		if (duplicateCheck) 
	    	randomIndex.push_back(numberPicker);
	}
	auto B = randomIndex;
	auto gap = Director::getInstance()->getVisibleSize().width / word.length();
	for (int i = 0; i < word.length(); i++)
	{
		std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData = setAnimationAndProperties(_scenePath.at("basketAnimation"), (i*gap + gap / 2), (visibleSize.height*0.08));
		cocostudio::timeline::ActionTimeline* basketTimeline = animationData.second;
		Sprite* basket = animationData.first;

		auto basketImg = (Sprite *)basket->getChildByName(_scenePath.at("basketImageName"));
		auto label = setAllLabelProperties(LangUtil::convertUTF16CharToString(word.at(i)), 0, (i*gap + gap / 2), (visibleSize.height*_sceneBasedNumericalVal.at("boxLabelYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
		this->addChild(label, 0);
		for (int j = 0; j < randomIndex.size(); j++)
		{
			if (i == randomIndex[j])
			{
				  label->setVisible(false);

				  auto rectBin = CCRectMake(i*gap + gap / 2 - basketImg->getContentSize().width / 2,(visibleSize.height*0.08 - (basketImg->getContentSize().height / 2 * _sceneBasedNumericalVal.at("basketRectYFactor"))), basketImg->getContentSize().width, basketImg->getContentSize().height);
				 _basketRect.push_back(rectBin);

				 _basketAnimBin.push_back(basketTimeline);
				 _basketBin.push_back(label);
				 _wordOptionBin.push_back(LangUtil::convertUTF16CharToString(word.at(i)));

				 auto aa = DrawNode::create();
				 this->addChild(aa, 20);
				 //aa->drawRect(Vec2(i*gap + gap / 2 - basketImg->getContentSize().width / 2, visibleSize.height*0.08) , Vec2(i*gap + gap / 2 + basketImg->getContentSize().width / 2, visibleSize.height*0.08 + basketImg->getContentSize().height), Color4F(0, 0, 255, 22)); //jungle drop
				 aa->drawRect(Vec2(i*gap + gap / 2 - basketImg->getContentSize().width / 2, visibleSize.height*0.08-basketImg->getContentSize().height / 2), Vec2(i*gap + gap / 2 + basketImg->getContentSize().width / 2, visibleSize.height*0.08 + basketImg->getContentSize().height/2), Color4F(0, 0, 255, 22));

				 break;
			}
		}
	}

	this->schedule(schedule_selector(Drop::letterAndHolderMaker), 3);
	this->scheduleUpdate();
	return true;
}

void Drop::update(float delta) {
									removeLetterHolder();
									basketLetterCollisionChecker();
									removeHeroTrailer();
}

Drop::~Drop(void)
{
	this->removeAllChildrenWithCleanup(true);
}
void Drop::letterAndHolderMaker(float dt)
{
	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		auto a = 1;
	}
	else
	{
		std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData = setAnimationAndProperties(_scenePath.at("holderAnimation"), visibleSize.width*1.1, visibleSize.height*0.62);
		cocostudio::timeline::ActionTimeline* holderTimeline = animationData.second;
		Sprite* trailer = animationData.first;
		trailer->setTag(letterHolderId);
		leftFloat(trailer, 12, -(visibleSize.width*0.2), visibleSize.height*0.62);//0.75
		_dropHeroTrailerImageBin.push_back(trailer);
		_dropHeroTrailerAnimBin.push_back(holderTimeline);
	}

	Sprite* leafBall= Sprite::createWithSpriteFrameName(_scenePath.at("pseudoHolderImage"));
	setAllSpriteProperties(leafBall, 0, visibleSize.width*1.1, visibleSize.height*0.62, true, 0.5, 0.5, 0, 1, 1);//0.75, true
	leftFloat(leafBall, 12, -(visibleSize.width*0.2), visibleSize.height*0.62);//0.75
	this->addChild(leafBall,1);
	addEvents(leafBall);
	leafBall->setTag(letterHolderId);
	
	_letterHolderSpriteBin.push_back(leafBall);

	//Label
	int maxIndex = _wordOptionBin.size() - 1;
	std::string str = _wordOptionBin[RandomHelper::random_int(0, maxIndex)];
	auto label = setAllLabelProperties(str, 0, (leafBall->getBoundingBox().size.width / 2), ((leafBall->getBoundingBox().size.height / 2)*_sceneBasedNumericalVal.at("flaotingLetterYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
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
			cocostudio::timeline::ActionTimeline* holderTimeline;
			Sprite* holderImage;
			if (!_dropCurrentTheme.compare("dropjungle"))
			{
				std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> animationData = setAnimationAndProperties(_scenePath.at("holderAnimation"), (target->getPosition().x), (target->getPosition().y));
			    holderTimeline = animationData.second;
			    holderImage = animationData.first;
				holderTimeline->play("click", false);
				holderTimeline->setAnimationEndCallFunc("click", CC_CALLBACK_0(Drop::removeHolderAnimation, this, holderImage));
			}
			else
			{
				for (int i = 0; i < _dropHeroTrailerImageBin.size(); i++)
				{
					if (_dropHeroTrailerImageBin[i]->getTag() == target->getTag())
					{
					//	_dropHeroTrailerImageBin[i]->removeChild(_dropHeroTrailerImageBin[i]->getChildByName("myLabel"),true);
						_dropHeroTrailerAnimBin[i]->gotoFrameAndPlay(0, false);
						 auto sp = std::make_tuple(_dropHeroTrailerImageBin[i], (Sprite*)target,i);
						_dropHeroTrailerAnimBin[i]->setAnimationEndCallFunc("balldrop", CC_CALLBACK_0(Drop::removeHolderAnimationForHero, this, sp));
						break;
					}
				}
			}
			auto label = setAllLabelProperties(target->getChildren().at(0)->getName(), 0, (target->getPosition().x),(target->getPosition().y), true, 0.5, 0.5, 0, 1, 1, 100);
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

void Drop::removeHeroTrailer()
{
	for (int i = 0; i < _dropHeroTrailerImageBin.size(); i++)
	{
		auto letterHolder = CCRectMake(_dropHeroTrailerImageBin[i]->getPositionX(), _dropHeroTrailerImageBin[i]->getPositionY(), _dropHeroTrailerImageBin[i]->getContentSize().width, _dropHeroTrailerImageBin[i]->getContentSize().height);

		if (letterHolder.intersectsRect(_removalPole->getBoundingBox()))
		{
			 this->removeChild(_dropHeroTrailerImageBin[i], true);
			_dropHeroTrailerImageBin.erase(_dropHeroTrailerImageBin.begin() + i);
		}
	}
	/*for (int i = 0; i < _dropHeroGarbageTrailer.size(); i++)
	{
		auto letterHolder = CCRectMake(_dropHeroGarbageTrailer[i]->getPositionX(), _dropHeroGarbageTrailer[i]->getPositionY(), _dropHeroGarbageTrailer[i]->getContentSize().width, _dropHeroGarbageTrailer[i]->getContentSize().height);
		if (letterHolder.intersectsRect(_removalPole->getBoundingBox()))
		{
			this->removeChild(_dropHeroGarbageTrailer[i], true);
			_dropHeroGarbageTrailer.erase(_dropHeroGarbageTrailer.begin() + i);
		}
	}*/
}

void Drop::basketLetterCollisionChecker()
{
	for (int i = 0; i < _basketRect.size(); i++)
	{
		for (int j = 0; j < _FallingLetter.size(); j++)
		{
			auto alphaBox = CCRectMake(_FallingLetter[j]->getPositionX() - _FallingLetter[j]->getContentSize().width/2, _FallingLetter[j]->getPositionY() - _FallingLetter[j]->getContentSize().height/4, _FallingLetter[j]->getContentSize().width, _FallingLetter[j]->getContentSize().height);
			if(_basketRect[i].intersectsRect(alphaBox))
			{ 
				auto str = _basketBin[i]->getString();
				if (!str.compare(_FallingLetter[j]->getString()))
				{
					/*_basketAnimBin[i]->play("full", false);*///jungle
					_basketBin[i]->setVisible(true);
					_basketRect.erase(_basketRect.begin() + i);
					_basketAnimBin.erase(_basketAnimBin.begin() + i);
					_basketBin.erase(_basketBin.begin() + i);
					CCLOG("YES");
				}
				else
				{
					//_basketAnimBin[i]->play("correct", false);//jungle
					_basketAnimBin[i]->play("wrong", false);
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

void Drop::removeHolderAnimationForHero(std::tuple<Sprite*, Sprite*, int> tupal_data)
{
	std::get<1>(tupal_data)->removeAllChildren();
	//_dropHeroGarbageTrailer.push_back(_dropHeroTrailerImageBin[std::get<2>(tupal_data)]);
	_dropHeroTrailerImageBin.erase(_dropHeroTrailerImageBin.begin() + std::get<2>(tupal_data));
	_dropHeroTrailerAnimBin.erase(_dropHeroTrailerAnimBin.begin() + std::get<2>(tupal_data));
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

LabelTTF* Drop::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY,int labelSizeInPixel)
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
std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> Drop::setAnimationAndProperties(std::string csbString,float posX, float posY)
{ 
	cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline(csbString);
	Sprite* sprite = (Sprite *)CSLoader::createNode(csbString);
	sprite->setPosition(Vec2(posX, posY));
	sprite->runAction(timeline);
	this->addChild(sprite,0);
	return std::make_pair(sprite, timeline);
}