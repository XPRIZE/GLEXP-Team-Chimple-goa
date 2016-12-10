#include "PopCount.h"

USING_NS_CC;

Scene* PopCount::createScene()
{
	auto scene = Scene::create();
	auto layer = PopCount::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, PopCount::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

PopCount *PopCount::create() {
	PopCount *blast = new (std::nothrow) PopCount();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool PopCount::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void PopCount::onEnterTransitionDidFinish() {

	_sceneMap = {
		{
			{ "popcountIsland",
				{
					{ "bg", "popcount/popcount.csb" },
					{ "character", "popcount/starfish.csb" },
					{ "character2", "popcount/starfish.csb" },
					{ "character3", "popcount/starfish.csb" },
					{ "characterSpriteName", "Sprite_1" },
					{ "waterAnimation" , "popcount/water.csb" },
					{ "midboard" , "popcount/board.png" },
					{ "play" , "popcount/play.png" },
					{ "watchagain" , "popcount/watchagain.png"}
				}
			},
			{ "popcountCity",
				{
					{ "bg", "owlcity/owlcity.csb" }
				}
			},
			{ "popcountjungle",
				{
					{ "bg", "owljungle/owljungle.csb" }
				}
			}
		}
	};

	_popcountPropertyMap = {
		{
			{ "popcountCity",
				{
					{ "jumpHeight",600.0f },
					{ "jumpStart", 0.0f }
				}
			},
			{ "popcountIsland",
				{
					{ "jumpHeight", 600.0f },
					{ "jumpStart", 200.0f },
					{ "smallGridSize", 160.0f }
				}
			},
			{ "popcountjungle",
				{
					{ "jumpHeight",700.0f },
					{ "jumpStart", 0.0f }
				}
			}
		}
	};

	std::map<int, std::string> popcountSceneMapping = {
		{ 1,	"popcountCity" },
		{ 2,	"popcountIsland" },
		{ 3,    "popcountJungle" }
	};

	_popcountCurrentTheme = popcountSceneMapping.at(2);

	Node* bg = CSLoader::createNode(_sceneMap.at(_popcountCurrentTheme).at("bg"));
	addChild(bg);
	bg->setName("bg");

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	_popUpAnswer = RandomHelper::random_int(1,10);

	setIslandScene();

	setGridNumberPanel();

	this->scheduleUpdate();
}

void PopCount::update(float delta) {
	if (_popElementCount == 0) {
		_menuContext->showScore();
	}
}

void PopCount::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
}

void PopCount::popUpCharacter(Node* character, string animationName) {

	auto height = _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpHeight");
	auto timelineWater = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	auto water = CSLoader::createNode(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	water->runAction(timelineWater);
	water->setScale(0.4f);
	auto width = ((character->getChildByName("Sprite_1")->getContentSize().width * 0.5) / 2);
	water->setPosition(Vec2(character->getPositionX() + width, character->getPositionY() + (height*0.6)));
	addChild(water, 3);
	timelineWater->gotoFrameAndPlay(0, false);

	auto popUp = CallFunc::create([=]() {
		auto timelinecharacter = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("character"));
		character->runAction(timelinecharacter);
		timelinecharacter->play(animationName, true);
		character->runAction(MoveTo::create(0.5f, Vec2(character->getPositionX(), character->getPositionY() + height)));
	});
	auto popDown = CallFunc::create([=]() {
		character->runAction(MoveTo::create(0.5f, Vec2(character->getPositionX(), character->getPositionY() - height)));
	});
	auto removeWaterWave = CallFunc::create([=]() {
		removeChild(water);
	});
	this->runAction(Sequence::create(popUp, DelayTime::create(_popStayDelay), popDown, DelayTime::create(0.5f), removeWaterWave, NULL));

}

vector<int> PopCount::getRandomValueRange(int min, int max, int getValue) {
	int count = 0;
	vector<int> objectVector;
	while (count < getValue) {
		int temp = RandomHelper::random_int(0, 9);
		bool flag = true;

		for (size_t index = 0; index < objectVector.size(); index++) {
			if (objectVector[index] == temp) {
				flag = false;
				break;
			}
		}

		if (flag) {
			objectVector.push_back(temp);
			count++;
		}
	}

	return objectVector;
}

void PopCount::setGridNumberPanel() {

	auto reduceSize = Director::getInstance()->getVisibleSize().width * 0.1;

	auto gridPanel = Sprite::create();
	gridPanel->setTextureRect(Rect(0, 0, Director::getInstance()->getVisibleSize().width - reduceSize, Director::getInstance()->getVisibleSize().height* 0.15));
	gridPanel->setColor(Color3B(41,158,170));
	gridPanel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.1));
	gridPanel->setOpacity(60);
	gridPanel->setName("gridpanel");
	addChild(gridPanel, 2);

	auto themeResourcePath = _sceneMap.at(_popcountCurrentTheme);
	auto smallGridSize = _popcountPropertyMap.at(_popcountCurrentTheme).at("smallGridSize");
	int space = gridPanel->getContentSize().width - (smallGridSize * 10);
	int indiSpace = space / (10 + 1);
	int equIndi = (indiSpace * (10 - 1));
	int initSpace = gridPanel->getContentSize().width - smallGridSize * 10 - equIndi;
	initSpace = initSpace / 2;

	float positionX = initSpace + smallGridSize / 2;

	for (int i = 0; i < 10; i++) {
		auto smallGrid = Sprite::create();
		smallGrid->setTextureRect(Rect(0, 0, smallGridSize, smallGridSize));
		gridPanel->addChild(smallGrid);
		smallGrid->setColor(Color3B(14,124,142));
		smallGrid->setOpacity(110);
		smallGrid->setTag(i+1);
		smallGrid->setName("smallGrid");
		smallGrid->setPosition(Vec2(positionX, gridPanel->getContentSize().height / 2));
		positionX = positionX + smallGridSize + indiSpace;
		
		addEventsOnGrid(smallGrid);

		std::ostringstream gridName;	gridName << (i + 1);
		auto label = LabelTTF::create(gridName.str(), "Helvetica", smallGridSize*0.8);
		label->setColor(Color3B::WHITE);
		label->setPosition(Vec2(smallGrid->getContentSize().width / 2, smallGrid->getContentSize().height / 2));
		smallGrid->addChild(label);
	}
}

void PopCount::addEventsOnGrid(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode;
		if (target->getName() == "smallGrid") {
			locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
		}
		else if (target->getName() == "midButton") {
			locationInNode = touch->getLocation();
		}

		if (target->getBoundingBox().containsPoint(locationInNode) && _popMidButtonClickPermision) {
			target->setColor(Color3B::GRAY);
			return true;
		}
		return false;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode;
		if (target->getName() == "smallGrid") {
			locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
			target->setColor(Color3B(14, 124, 142));
		}
		else if (target->getName() == "midButton") {
			locationInNode = touch->getLocation();
			target->setColor(Color3B(255,255,255));
		}
		
		if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "smallGrid") && _popStartListner) {
			if (target->getTag() == _popUpAnswer) {
				CCLOG(" THIS IS CORRECT ");
				
//				this->getChildByName("midButton")->runAction(Sequence::create(ScaleTo::create(0.4,1.5), ScaleTo::create(0.2,1), NULL));
				_popStartListner = false;
				_popElementCount = _popElementCount - 1;
				this->runAction(Sequence::create(DelayTime::create(0.6), NULL));
//				(this->getChildByName("midButton")->getChildByTag(0))->setName("PLAY");
//				auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName(_sceneMap.at(_popcountCurrentTheme).at("play"));
//				((Sprite*)this->getChildByName("midButton")->getChildByTag(0))->setSpriteFrame(texture);
			}
			else {
				float distance = Director::getInstance()->getVisibleSize().width * 0.8;
				FShake* shake = FShake::actionWithDuration(0.5f,10.0f);
				this->getChildByName("gridpanel")->runAction(shake);
				CCLOG(" ------------------- CLICKED WRONG ---------------");
			}
		}
		else if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "midButton")) {
			if ((target->getChildByTag(0))->getName() == "WATCH AGAIN") {
				auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName(_sceneMap.at(_popcountCurrentTheme).at("watchagain"));
				((Sprite*)target->getChildByTag(0))->setSpriteFrame(texture);
				popUpCall(_popUpAnswer);
			}
			else if ((target->getChildByTag(0))->getName() == "PLAY") {
				_popStartListner = true;
				(target->getChildByTag(0))->setName("WATCH AGAIN");
				auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName(_sceneMap.at(_popcountCurrentTheme).at("watchagain"));
				((Sprite*)target->getChildByTag(0))->setSpriteFrame(texture);
				_popUpAnswer = RandomHelper::random_int(1, 10);
				popUpCall(_popUpAnswer);
			}else{
				CCLOG("Wrong in condition , check in listner");
			}
			target->setVisible(false);
			_popMidButtonClickPermision = false;
		}

		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

void PopCount::setIslandScene() {

	auto timelineWater1 = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	this->getChildByName("bg")->getChildByName("mainground")->getChildByName("water_1")->runAction(timelineWater1);
	timelineWater1->gotoFrameAndPlay(0, true);

	auto timelineWater2 = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	this->getChildByName("bg")->getChildByName("mainground")->getChildByName("water_2")->runAction(timelineWater2);
	timelineWater2->gotoFrameAndPlay(0, true);

	auto themeResourcePath = _sceneMap.at(_popcountCurrentTheme);
	auto starFish = CSLoader::createNode(themeResourcePath.at("character"));
	starFish->setScale(0.5);
	int space = Director::getInstance()->getVisibleSize().width - ((starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) * 10);
	int indiSpace = space / (10 + 2);
	auto positionX = ((starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) / 2);

	for (int i = 0; i < 10; i++) {
		auto starFish = CSLoader::createNode(themeResourcePath.at("character"));
		starFish->setTag(i + 1000);
		this->getChildByName("bg")->getChildByName("background")->addChild(starFish);
		starFish->setScale(0.5);
		_coordinate.push_back(std::make_pair(positionX, _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpHeight")));
		starFish->setPosition(Vec2(positionX, _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpStart")));
		positionX = positionX + (starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) + indiSpace;
	}

	auto midButton = Sprite::createWithSpriteFrameName(themeResourcePath.at("midboard"));
	midButton->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height/2));
	addChild(midButton, 3);
	midButton->setName("midButton");
	addEventsOnGrid(midButton);
	this->getChildByName("midButton")->runAction(Sequence::create(DelayTime::create(0.5f),ScaleTo::create(0.4, 1.5), ScaleTo::create(0.2, 1), NULL));

	auto buttonSymbl = Sprite::createWithSpriteFrameName(themeResourcePath.at("play"));
	buttonSymbl->setPosition(Vec2(midButton->getContentSize().width / 2, midButton->getContentSize().height / 2));
	buttonSymbl->setName("PLAY");
	buttonSymbl->setTag(0);
	midButton->addChild(buttonSymbl);

//	popUpCall(_popUpAnswer);
	
}

void PopCount::popUpCall(int popNumberOfCharacter) {

	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=]() {

		auto getElementObject = getRandomValueRange(0, 9, popNumberOfCharacter);

		for (size_t i = 0; i < getElementObject.size(); i++) {
			popUpCharacter(this->getChildByName("bg")->getChildByName("background")->getChildByTag(getElementObject[i] + 1000), "blink");
		}

	}), DelayTime::create(1 + _popStayDelay), CallFunc::create([=]() {
	
		this->getChildByName("midButton")->setVisible(true);
		_popMidButtonClickPermision = true;
	
	}),NULL));
}

PopCount::~PopCount(void)
{
	this->removeAllChildrenWithCleanup(true);
}
