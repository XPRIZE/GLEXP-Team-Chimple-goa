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
					{ "characterSpriteName", "Sprite_1" },
					{ "waterAnimation" , "popcount/water.csb" }
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
				{ "jumpStart", 100.0f },
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
	water->setScale(0.5f);
	water->setPosition(Vec2(character->getPositionX(), character->getPositionY() + height / 2));
	addChild(water, 3);
	timelineWater->gotoFrameAndPlay(0, false);

	auto popUp = CallFunc::create([=]() {
		auto timelinecharacter = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("character"));
		character->runAction(timelinecharacter);
		timelinecharacter->play(animationName, true);
		character->runAction(MoveTo::create(1.2f, Vec2(character->getPositionX(), character->getPositionY() + height)));
	});
	auto popDown = CallFunc::create([=]() {
		character->runAction(MoveTo::create(0.7f, Vec2(character->getPositionX(), character->getPositionY() - height)));
	});
	auto removeWaterWave = CallFunc::create([=]() {
		removeChild(water);
	});
	this->runAction(Sequence::create(popUp, DelayTime::create(1.4f), popDown, DelayTime::create(0.7f), removeWaterWave, NULL));

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
	gridPanel->setColor(Color3B::BLUE);
	gridPanel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.1));
	gridPanel->setOpacity(50);
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
		smallGrid->setColor(Color3B::BLUE);
		smallGrid->setOpacity(150);
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

		if (target->getBoundingBox().containsPoint(locationInNode)) {
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
		}
		else if (target->getName() == "midButton") {
			locationInNode = touch->getLocation();
		}

		target->setColor(Color3B::BLUE);
		if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "smallGrid")) {
			if (target->getTag() == _popUpAnswer) {
				CCLOG(" THIS IS CORRECT ");
				((LabelTTF*)this->getChildByName("midButton")->getChildByName("text"))->setString("PLAY");
			}
		}
		else if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "midButton")) {
			if (((LabelTTF*)target->getChildByName("text"))->getString() == "WATCH AGAIN") {
				CCLOG("CLICKED ON WATCH AGAIN BUTTON");
				popUpCall(_popUpAnswer);
			}
			else if (((LabelTTF*)target->getChildByName("text"))->getString() == "PLAY") {
				CCLOG("CLICKED ON PLAY BUTTON");
				((LabelTTF*)target->getChildByName("text"))->setString("WATCH AGAIN");
				_popUpAnswer = RandomHelper::random_int(1, 10);
				popUpCall(_popUpAnswer);
			}else{
				CCLOG("Wrong in condition , check in listner");
			}
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

	auto midButton = Sprite::create();
	midButton->setTextureRect(Rect(0, 0, Director::getInstance()->getVisibleSize().width*0.2, Director::getInstance()->getVisibleSize().height*0.1));
	midButton->setColor(Color3B::BLUE);
	midButton->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height/2));
	midButton->setOpacity(80);
	addChild(midButton, 3);
	midButton->setName("midButton");
	addEventsOnGrid(midButton);

	auto label = LabelTTF::create("PLAY", "Helvetica", midButton->getContentSize().height*0.8);
	label->setColor(Color3B::WHITE);
	label->setPosition(Vec2(midButton->getContentSize().width / 2, midButton->getContentSize().height / 2));
	label->setName("text");
	midButton->addChild(label);

//	popUpCall(_popUpAnswer);
	
}

void PopCount::popUpCall(int popNumberOfCharacter) {

	this->runAction(Sequence::create(DelayTime::create(2), CallFunc::create([=]() {

		auto getElementObject = getRandomValueRange(0, 9, popNumberOfCharacter);

		for (size_t i = 0; i < getElementObject.size(); i++) {
			popUpCharacter(this->getChildByName("bg")->getChildByName("background")->getChildByTag(getElementObject[i] + 1000), "blink");
		}

	}), NULL));
}

PopCount::~PopCount(void)
{
	this->removeAllChildrenWithCleanup(true);
}
