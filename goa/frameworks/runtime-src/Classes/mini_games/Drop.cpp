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
	return true;
}

void Drop::onEnterTransitionDidFinish() 
{
	std::map<std::string, std::map<std::string, std::string>> dropSceneMap = {

		{ "dropjungle",
						{
							{ "bg", "dropjungle/dropjungle.csb" },
							{ "holderAnimation", "dropjungle/leafball.csb" },
							{ "removalPole", "dropjungle/leafbal.png" },
							{ "basketAnimation","dropjungle/basket.csb" },
							{ "pseudoHolderImage","dropjungle/leafbal.png" },
							{ "basketImageName", "basketouter_1" },
							{ "rightAnimName", "full" },
							{ "ball", "dropjungle/ball.png" },
							{ "wrongAnimName", "correct" },
							{ "blastAnimName", "click" },
							{ "demoBasket","" },
							{ "helpBoard", "boardhelp_16" }
						}
		},
		{ "drophero",
						{
							{ "bg", "drophero/drophero.csb" },
							{ "holderAnimation", "drophero/trailer.csb" },
							{ "removalPole", "drophero/boxback.png" },
							{ "basketAnimation","drophero/dropbox.csb" },
							{ "pseudoHolderImage","drophero/trailer1.png" },
							{ "basketImageName", "boxback" },
							{ "rightAnimName", "right" },
							{ "wrongAnimName", "wrong" },
							{ "ball", "drophero/ball.png" },
							{ "blastAnimName", "" },
							{ "demoBasket","drophero/box1.png" },
							{ "helpBoard", "board" }
						}
		},
		{ "dropcity",
						{
							{ "bg", "dropcity/dropcity.csb" },
							{ "holderAnimation", "dropcity/blast.csb" },
							{ "removalPole", "dropcity/balloon.png" },
							{ "basketAnimation","dropcity/basket.csb" },
							{ "pseudoHolderImage","dropcity/balloon.png" },
							{ "basketImageName", "Sprite_3" },
							{ "rightAnimName", "correct" },
							{ "wrongAnimName", "wrong" },
							{ "ball", "dropcity/ball.png" },
							{ "blastAnimName", "blast" },
							{ "demoBasket","dropcity/closebox.png" },
							{ "helpBoard", "board" }
						}
		}

	};

	std::map<std::string, std::map<std::string, float>> dropSceneNumValue = {

		{ "dropjungle",
						{
							{ "boxLabelYFactor",0.1138 },
							{ "basketRectYFactor", 0 },
							{ "flaotingLetterYFactor", 1 },
							{ "floatBoxHeightFactor",0.75 },
							{ "helpBoardHeight",0.93 },
							{ "basketAnchorY",0.0 }
						}
		},
		{ "drophero",
						{
							{ "boxLabelYFactor",0.07 },
							{ "basketRectYFactor", 1 },
							{ "flaotingLetterYFactor", 0.85 },
							{ "floatBoxHeightFactor",0.62 },
							{ "helpBoardHeight",0.884 },
							{ "basketAnchorY",0.5 }
						}
		},
		{ "dropcity",
						{
							{ "boxLabelYFactor",0.14 },
							{ "basketRectYFactor", 0 },
							{ "flaotingLetterYFactor", 1.36 },
							{ "floatBoxHeightFactor",0.65 },
							{ "helpBoardHeight",0.938 },
							{ "basketAnchorY",0.0 }
						}
		}
	};
	std::map<int, std::string> dropSceneMapping = {

		{ 0,	"drophero" },
		{ 1,	"dropjungle" },
		{ 2,    "dropcity" }
	};
	std::string wordOnLabel;
	std::string wordOnLayout;
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5,3,5,3);
	_dropCurrentTheme = dropSceneMapping.at(levelKeyNumber.first);

	if (levelKeyNumber.second == 0)
	{
		auto tg = TextGenerator::getInstance();
		auto _data = TextGenerator::getInstance()->getAntonyms(1);
		wordOnLabel = getConvertInUpperCase(_data.begin()->first);
		wordOnLayout = getConvertInUpperCase(_data.begin()->second);
	}
	else if (levelKeyNumber.second == 1)
	{
		auto word = TextGenerator::getInstance()->generateAWord(_menuContext->getCurrentLevel());
		wordOnLabel = getConvertInUpperCase(word);
		wordOnLayout = wordOnLabel;

	}
	else
	{
		auto tg = TextGenerator::getInstance();
		auto _data = TextGenerator::getInstance()->getSynonyms(1);
		wordOnLabel = getConvertInUpperCase(_data.begin()->first);
		wordOnLayout = getConvertInUpperCase(_data.begin()->second);
	}

	/*std::string theme[] = { "dropjungle", "drophero","dropcity" };
	_dropCurrentTheme = theme[RandomHelper::random_int(0, 2)];
	_dropCurrentTheme = "dropjungle";*/
	_scenePath = dropSceneMap.at(_dropCurrentTheme);

	_sceneBasedNumericalVal = dropSceneNumValue.at(_dropCurrentTheme);

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}
	else if (!_dropCurrentTheme.compare("drophero"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/drophero.plist");
	}
	else
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/dropcity.plist");
	}

	//BackGround
	auto dropBackground = CSLoader::createNode(_scenePath.at("bg"));
	this->addChild(dropBackground, 0);
	//auto boardHelp = (Sprite *)dropBackground->getChildren().at(2)->getChildByName("boardhelp_16");


	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		dropBackground->setPositionX(myGameWidth);
	}
	/*Vector <Node*> children = dropBackground->getChildren().at(2)->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}
*/
	_removalPole = Sprite::createWithSpriteFrameName(_scenePath.at("removalPole"));
	setAllSpriteProperties(_removalPole, 0, -(visibleSize.width*0.13), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"), true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_removalPole);

	//auto aab = DrawNode::create();
	//this->addChild(aab, 20);
	////aa->drawRect(Vec2(i*gap + gap / 2 - basketImg->getContentSize().width / 2, visibleSize.height*0.08) , Vec2(i*gap + gap / 2 + basketImg->getContentSize().width / 2, visibleSize.height*0.08 + basketImg->getContentSize().height), Color4F(0, 0, 255, 22)); //jungle drop
	//aab->drawRect(Vec2((visibleSize.width*0.13) - _removalPole->getContentSize().width / 2, (visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"))- _removalPole->getContentSize().height*0.1), Vec2((visibleSize.width*0.13) + _removalPole->getContentSize().width / 2, visibleSize.height *_sceneBasedNumericalVal.at("floatBoxHeightFactor") + _removalPole->getContentSize().height/2), Color4F(0, 0, 255, 22));

	_label = setAllLabelProperties(wordOnLabel, 2, (visibleSize.width / 2), (visibleSize.height*_sceneBasedNumericalVal.at("helpBoardHeight")), true, 0.5, 0.5, 0, 1, 1, 150);
	this->addChild(_label, 2);

	//Random index getter for blanks
	std::vector<int> randomIndex;
	int sizeOfWord = wordOnLayout.length();
	int sizeOfRandomIndexVector;

	if (sizeOfWord % 2 == 0)
	{
		sizeOfRandomIndexVector = sizeOfWord / 2;
		_middleBasketIndex = sizeOfWord / 2-1;
	}
	else
	{
		int justANumber = RandomHelper::random_int(0, 1);
		if (justANumber)
			sizeOfRandomIndexVector = sizeOfWord / 2;
		else
			sizeOfRandomIndexVector = sizeOfWord / 2 + 1;

		_middleBasketIndex = sizeOfWord / 2;
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
	auto gap = Director::getInstance()->getVisibleSize().width / wordOnLayout.length();
	for (int i = 0; i < wordOnLayout.length(); i++)
	{
		bool flag = false;
		for (int j = 0; j < randomIndex.size(); j++)
		{
			if (i == randomIndex[j])
			{
				flag = true;
				break;
			}
		}
		layingOutBasket(flag, gap, LangUtil::convertUTF16CharToString(wordOnLayout.at(i)), i);
	}
	/*if (_dropHelpSelector == 0)
	{

		auto a = _basketBin[0]->getPositionY();
		HelpLayer *_dropHelp = HelpLayer::create(Rect(boardHelp->getPosition().x*1.044, boardHelp->getPosition().y, boardHelp->getContentSize().width*1.04, boardHelp->getContentSize().height),
			Rect(boardHelp->getPosition().x*1.044, visibleSize.height*0.45, boardHelp->getContentSize().width*1.04, visibleSize.height*0.9));
		this->addChild(_dropHelp, 5);
		_dropHelp->setName("Help");
		_dropHelp->click(Vec2(visibleSize.width*0.5, 0.75));
		_dropHelpSelector = 1;
	}*/
	/*auto callShowScore = CCCallFunc::create([=] {
		for (int i = 0; i < this->getChildren().size(); i++)
		{
			auto str = this->getChildren().at(i)->getName();
			if (!str.compare("Help"))
			{
				this->removeChild(this->getChildren().at(i));
				break;
			}
		}
	});*/
	
	if (_menuContext->getCurrentLevel() == 1)
	{
		Sprite* floatBox = Sprite::createWithSpriteFrameName(_scenePath.at("pseudoHolderImage"));
		setAllSpriteProperties(floatBox, 0, visibleSize.width*1.1, visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"), true, 0.5, 0.5, 0, 1, 1);//0.75, true
		leftFloat(floatBox, 12, -(visibleSize.width*0.2), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"));//0.75
		this->addChild(floatBox, 1);
		addEvents(floatBox);
		floatBox->setTag(letterHolderId);

		_letterHolderSpriteBin.push_back(floatBox);

		//Label
		int maxIndex = _wordOptionBin.size() - 1;
		//_levelOneString = _wordOptionBin[RandomHelper::random_int(0, maxIndex)];
		auto label = setAllLabelProperties(_levelOneString, 0, (floatBox->getBoundingBox().size.width / 2), ((floatBox->getBoundingBox().size.height / 2)*_sceneBasedNumericalVal.at("flaotingLetterYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
		floatBox->addChild(label, 0);
		letterHolderId++;
		_helpFlag = true;
		_gapBetweenTwoBasket = gap;
		creatHelp(gap);
	}
	
	//this->runAction(Sequence::create(DelayTime::create(2), callShowScore, NULL));
	if (_menuContext->getCurrentLevel() != 1)
	{
		this->schedule(schedule_selector(Drop::letterAndHolderMaker), 3);
	}
	this->scheduleUpdate();

}

std::pair<int, int> Drop::levelAllInfo(int currentLevel, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory)
{
	float currentLevelInFloat = static_cast<float>(currentLevel);
	int sceneBaseValue = static_cast<int>(std::ceil(currentLevelInFloat/ sceneRepetitionNo));
	int sceneNo = sceneBaseValue % totalScene;

	int catagoryBaseValue = static_cast<int>(std::ceil(currentLevelInFloat / catagoryRepetitionNo));
	int catagoryNo = catagoryBaseValue % totalcatagory;
	
	return std::make_pair(sceneNo, catagoryNo);
}
void Drop::layingOutBasket(bool flag, float gap, std::string letter, int i)
{
	if (flag)
	{
		std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData = setAnimationAndProperties(_scenePath.at("basketAnimation"), (i*gap + gap / 2), (visibleSize.height*0.08), 1);
		cocostudio::timeline::ActionTimeline* basketTimeline = animationData.second;
		Sprite* basket = animationData.first;
		if (!_dropCurrentTheme.compare("dropjungle")) {
			auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName("dropjungle/basketouter.png");
			//((Sprite*)basket->getChildren().at(0))->setSpriteFrame(texture);
			//basket->runAction(basketTimeline);
			basketTimeline->play("idle",false);
		}
		
	    _basketImg = (Sprite *)basket->getChildByName(_scenePath.at("basketImageName"));
		auto label = setAllLabelProperties(letter, 0, (i*gap + gap / 2), (visibleSize.height*_sceneBasedNumericalVal.at("boxLabelYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
		this->addChild(label, 1);

		label->setVisible(false);
		auto rectBin = CCRectMake(i*gap + gap / 2 - _basketImg->getContentSize().width / 2, (visibleSize.height*0.08 - (_basketImg->getContentSize().height / 2 * _sceneBasedNumericalVal.at("basketRectYFactor"))), _basketImg->getContentSize().width, _basketImg->getContentSize().height);

		_basketRect.push_back(rectBin);
		_basketAnimBin.push_back(basketTimeline);
		_basketBin.push_back(label);
		_wordOptionBin.push_back(letter);

		_middleBasketIndex = i;
		_levelOneString = letter;

		//auto aa = DrawNode::create();
		//this->addChild(aa, 20);
		////aa->drawRect(Vec2(i*gap + gap / 2 - basketImg->getContentSize().width / 2, visibleSize.height*0.08) , Vec2(i*gap + gap / 2 + basketImg->getContentSize().width / 2, visibleSize.height*0.08 + basketImg->getContentSize().height), Color4F(0, 0, 255, 22)); //jungle drop
		//aa->drawRect(Vec2(i*gap + gap / 2 - basketImg->getContentSize().width / 2, visibleSize.height*0.08), Vec2(i*gap + gap / 2 + basketImg->getContentSize().width / 2, visibleSize.height*0.08 + basketImg->getContentSize().height), Color4F(0, 0, 255, 22));

	}
	else
	{
		if (!_dropCurrentTheme.compare("dropjungle"))
		{
			std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData = setAnimationAndProperties(_scenePath.at("basketAnimation"), (i*gap + gap / 2), (visibleSize.height*0.08), 1);
			cocostudio::timeline::ActionTimeline* basketTimeline = animationData.second;
			auto basket = animationData.first;
			basketTimeline->play("full", false);
		}
		else
		{
		    auto basket = Sprite::createWithSpriteFrameName(_scenePath.at("demoBasket"));
			setAllSpriteProperties(basket, 0, (i*gap + gap / 2), (visibleSize.height*0.08), true, 0.5, _sceneBasedNumericalVal.at("basketAnchorY"), 0, 1, 1);
			this->addChild(basket, 0);
		}
		auto label = setAllLabelProperties(letter, 0, (i*gap + gap / 2), (visibleSize.height*_sceneBasedNumericalVal.at("boxLabelYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
		this->addChild(label, 1);
	}
}

void Drop::update(float delta) {
	removeLetterHolder();
	basketLetterCollisionChecker();
	removeHeroTrailer();
	removeFallingLetter();
	if (_helpFlag )
	{
		/*for (int i = 0; i < _basketBin.size(); i++)
		{
			if (!_basketBin[i]->getString().compare(_levelOneString) && _flagForIndex)
			{
				_index = i;
				_flagForIndex = false;
				break;
			}
		}*/
		if (_letterHolderSpriteBin[0]->getPositionX() < (_middleBasketIndex*_gapBetweenTwoBasket + _gapBetweenTwoBasket / 2))
		{
			_helpFlag = false;
				_letterHolderSpriteBin[0]->pause();
			auto letterBoardSprite = Sprite::create();
			letterBoardSprite->setTextureRect(Rect(0, 0, _letterHolderSpriteBin[0]->getContentSize().width, _letterHolderSpriteBin[0]->getContentSize().height));
			letterBoardSprite->setColor(Color3B(219, 224, 252));
			letterBoardSprite->setPosition(Vec2(_letterHolderSpriteBin[0]->getPositionX(), _letterHolderSpriteBin[0]->getPositionY()));
			letterBoardSprite->setName("touchSprite");
			letterBoardSprite->setOpacity(0);
			addEvents(letterBoardSprite);
			addChild(letterBoardSprite,3);
		}
	}
}

Drop::~Drop(void)
{
	this->removeAllChildrenWithCleanup(true);
}
void Drop::creatHelp(float gap)
{
	_help = HelpLayer::create(Rect((_middleBasketIndex*gap + gap / 2), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"), _letterHolderSpriteBin[0]->getContentSize().width, _letterHolderSpriteBin[0]->getContentSize().height), Rect((visibleSize.width / 2), (visibleSize.height*_sceneBasedNumericalVal.at("helpBoardHeight")), visibleSize.width*0.35, visibleSize.height*0.1));
	_help->click(Vec2((_middleBasketIndex*gap + gap / 2), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor")));
	 this->addChild(_help, 6);
}
void Drop::letterAndHolderMaker(float dt)
{
	if (!_dropCurrentTheme.compare("dropjungle") || !_dropCurrentTheme.compare("dropcity"))
	{
		auto a = 1;
	}
	else
	{
		std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData = setAnimationAndProperties(_scenePath.at("holderAnimation"), visibleSize.width*1.1, visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"), 0);
		Sprite* trailer = animationData.first;
		trailer->setTag(letterHolderId);
		leftFloat(trailer, 12, -(visibleSize.width*0.2), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"));//0.75
		_dropHeroTrailerImageBin.push_back(trailer);
	}
		Sprite* floatBox = Sprite::createWithSpriteFrameName(_scenePath.at("pseudoHolderImage"));
		setAllSpriteProperties(floatBox, 0, visibleSize.width*1.1, visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"), true, 0.5, 0.5, 0, 1, 1);//0.75, true
		leftFloat(floatBox, 12, -(visibleSize.width*0.2), visibleSize.height*_sceneBasedNumericalVal.at("floatBoxHeightFactor"));//0.75
		this->addChild(floatBox, 1);
		
		floatBox->setTag(letterHolderId);

	_letterHolderSpriteBin.push_back(floatBox);

	//Label
	int maxIndex = _wordOptionBin.size() - 1;
	std::string str = _wordOptionBin[RandomHelper::random_int(0, maxIndex)];
	auto label = setAllLabelProperties(str, 0, (floatBox->getBoundingBox().size.width / 2), ((floatBox->getBoundingBox().size.height / 2)*_sceneBasedNumericalVal.at("flaotingLetterYFactor")), true, 0.5, 0.5, 0, 1, 1, 100);
	floatBox->addChild(label, 0);
	addEvents(floatBox);
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
		Rect rect;
		if (!_dropCurrentTheme.compare("dropcity"))
		{
			rect = Rect(0, s.height * 0.5, s.width, s.height*0.5);
		}
		else
		{
			rect = Rect(0, 0, s.width, s.height);
		}
		
		if (rect.containsPoint(locationInNode))
		{
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();

			cocostudio::timeline::ActionTimeline* holderTimeline;
			Sprite* holderImage;
			if (!_dropCurrentTheme.compare("dropjungle") || !_dropCurrentTheme.compare("dropcity"))
			{
				if(!_dropCurrentTheme.compare("dropjungle"))
					audio->playEffect("sounds/sfx/drop_jungle_touch.mp3", false);
				else
					audio->playEffect("sounds/sfx/shop_balloon_burst.ogg", false);

				std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> animationData = setAnimationAndProperties(_scenePath.at("holderAnimation"), (target->getPosition().x), (target->getPosition().y), 0);
				holderTimeline = animationData.second;
				holderImage = animationData.first;
				holderTimeline->play(_scenePath.at("blastAnimName"), false);
				holderTimeline->setAnimationEndCallFunc(_scenePath.at("blastAnimName"), CC_CALLBACK_0(Drop::removeHolderAnimation, this, holderImage));
			}
			else
			{
				for (int i = 0; i < _dropHeroTrailerImageBin.size(); i++)
				{
					if (_dropHeroTrailerImageBin[i]->getTag() == target->getTag())
					{
						audio->playEffect("sounds/sfx/drop_hero_touch.mp3", false);

						cocostudio::timeline::ActionTimeline* holderTimeline = CSLoader::createTimeline(_scenePath.at("holderAnimation"));
						_dropHeroTrailerImageBin[i]->runAction(holderTimeline);
						//auto sp = std::make_tuple(_dropHeroTrailerImageBin[i], _dropHeroTrailerImageBin[i], i);
						holderTimeline->gotoFrameAndPlay(0, false);
						break;
					}
				}
			}
			auto sprite = Sprite::createWithSpriteFrameName(_scenePath.at("ball"));
			sprite->setPosition(Vec2((target->getPosition().x), (target->getPosition().y)));
			this->addChild(sprite, 0);

			 sprite->runAction(MoveTo::create(1, Vec2(sprite->getPosition().x, -visibleSize.height*0.002)));
			_FallingLetter.push_back(sprite);
			 target->setVisible(false);
			
			if (_initObj && _letterHolderSpriteBin.size() > 0 && _menuContext->getCurrentLevel() == 1) {
				_letterHolderSpriteBin[0]->setVisible(false);
				_letterHolderSpriteBin[0]->getEventDispatcher()->removeEventListener(listener);
				_letterHolderSpriteBin[0]->resume();
				this->removeChild(this->getChildByName("touchSprite"));
				auto label = setAllLabelProperties(_letterHolderSpriteBin[0]->getChildren().at(0)->getName(), 0, (sprite->getBoundingBox().size.width / 2), (sprite->getBoundingBox().size.height / 2), true, 0.5, 0.5, 0, 1, 1, 100);
				sprite->addChild(label, 0);
				this->removeChild(_help);
				this->schedule(schedule_selector(Drop::letterAndHolderMaker), 3);
				_initObj = false;
			}
			else {
				auto label = setAllLabelProperties(target->getChildren().at(0)->getName(), 0, (sprite->getBoundingBox().size.width / 2), (sprite->getBoundingBox().size.height / 2), true, 0.5, 0.5, 0, 1, 1, 100);
				sprite->addChild(label, 0);
				for (int i = 0; i < _letterHolderSpriteBin.size(); i++)
				{
					if (_letterHolderSpriteBin[i]->getTag() == target->getTag())
					{
						_letterHolderSpriteBin[i]->getEventDispatcher()->removeEventListener(listener);
					}
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
}
void Drop::removeFallingLetter()
{
	for (int i = 0; i < _FallingLetter.size(); i++)
	{
		if (_FallingLetter[i]->getPosition().y<-(visibleSize.height*0.001))
		{
			this->removeChild(_FallingLetter[i], true);
			_FallingLetter.erase(_FallingLetter.begin() + i);
		}
	}
}

void Drop::basketLetterCollisionChecker()
{
	for (int i = 0; i < _basketRect.size(); i++)
	{
		for (int j = 0; j < _FallingLetter.size(); j++)
		{
			auto alphaBox = CCRectMake(_FallingLetter[j]->getPositionX() - _FallingLetter[j]->getContentSize().width / 2, _FallingLetter[j]->getPositionY() - _FallingLetter[j]->getContentSize().height / 2, _FallingLetter[j]->getContentSize().width, _FallingLetter[j]->getContentSize().height);
			if (_basketRect[i].intersectsRect(alphaBox))
			{
				_pointCounter++;
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				auto str = _basketBin[i]->getString();
				auto str1 = _FallingLetter[j]->getChildren().at(0)->getName();
				if (!str.compare(str1))
				{
					 audio->playEffect("sounds/sfx/success.ogg", false);

					_basketAnimBin[i]->play(_scenePath.at("rightAnimName"), false);
					_basketBin[i]->setVisible(true);
					_basketRect.erase(_basketRect.begin() + i);
					_basketAnimBin.erase(_basketAnimBin.begin() + i);
					_basketBin.erase(_basketBin.begin() + i);
					CCLOG("YES");
					_menuContext->addPoints(1);
				}
				else
				{
					audio->playEffect("sounds/sfx/error.ogg", false);

					_basketAnimBin[i]->play(_scenePath.at("wrongAnimName"), false);
					//_basketAnimBin[i]->gotoFrameAndPlay(0, false);
					CCLOG("NO");
				}
				this->removeChild(_FallingLetter[j], true);
				_FallingLetter.erase(_FallingLetter.begin() + j);
			}
		}
	}
	if (_basketRect.size() == 0)
	{
		this->unschedule(schedule_selector(Drop::letterAndHolderMaker));
		this->unscheduleUpdate();
		auto callShowScore = CCCallFunc::create([=] {
			_menuContext->setMaxPoints(_pointCounter * 1);
			_menuContext->showScore();
		});
		this->runAction(Sequence::create(DelayTime::create(2), callShowScore, NULL));
	}

}
void Drop::removeHolderAnimation(Sprite* anim)
{
	this->removeChild(anim, true);
}
//void Drop::removeHolderAnimationForHero(std::tuple<Sprite*, Sprite*, int> tupal_data)
//{
//	std::get<1>(tupal_data)->removeAllChildren();
//	//_dropHeroGarbageTrailer.push_back(_dropHeroTrailerImageBin[std::get<2>(tupal_data)]);
//	_dropHeroTrailerImageBin.erase(_dropHeroTrailerImageBin.begin() + std::get<2>(tupal_data));
//	_dropHeroTrailerAnimBin.erase(_dropHeroTrailerAnimBin.begin() + std::get<2>(tupal_data));
//}
void Drop::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* Drop::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
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
std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> Drop::setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder)
{
	cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline(csbString);
	Sprite* sprite = (Sprite *)CSLoader::createNode(csbString);
	sprite->setPosition(Vec2(posX, posY));
	sprite->runAction(timeline);
	this->addChild(sprite, zOrder);
	return std::make_pair(sprite, timeline);
}

std::string Drop::getConvertInUpperCase(std::string data)
{
	std::ostringstream blockName;
	int i = 0;
	while (data[i])
	{
		blockName << (char)toupper(data[i]);
		i++;
	}
	return blockName.str();
}
