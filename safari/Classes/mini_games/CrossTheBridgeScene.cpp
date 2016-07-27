#include "CrossTheBridgeScene.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"


USING_NS_CC;

Scene* CrossTheBridge::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = CrossTheBridge::create();

	// add layer as a child to scene
	scene->addChild(layer);

    layer->_menuContext = MenuContext::create(layer);
    scene->addChild(layer->_menuContext);
    
	// return the scene
	return scene;
}

// on 'init' you need to initialize your instance
bool CrossTheBridge::init()
{
	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("crossthebridge.plist");
	auto visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}
	auto closeItem = MenuItemImage::create(
		"CloseNormal.png",
		"CloseSelected.png",
		CC_CALLBACK_1(CrossTheBridge::menuCloseCallback, this));

	closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width / 2,
		origin.y + closeItem->getContentSize().height / 2));

	//create menu, it's an autorelease object
	auto menu = Menu::create(closeItem, NULL);
	menu->setPosition(Vec2::ZERO);
	this->addChild(menu, 1);
	this->scheduleUpdate();

	auto gameBG = (Sprite *)CSLoader::createNode("crossthebridge/MainScene.csb");
	this->addChild(gameBG, 1);

	Sprite* house_wall = (Sprite *)gameBG->getChildByName("house_Wall");
	house_wall->setGlobalZOrder(3);
	house_wall->setPosition(Vec2(house_wall->getPosition().x + origin.x, house_wall->getPosition().y - 5 + origin.y));

	Sprite* house_front = (Sprite *)gameBG->getChildByName("house_front_1");
	house_front->setGlobalZOrder(3);
	house_front->setPosition(Vec2(house_front->getPosition().x + origin.x, house_front->getPosition().y - 5 + origin.y));

	//Sprite* water_image = (Sprite *)gameBG->getChildByName("water_image_1");
	//water_image->setGlobalZOrder(4);

	water_splash = CSLoader::createTimeline("crossthebridge/watersplash.csb");
	splash = (Sprite *)CSLoader::createNode("crossthebridge/watersplash.csb");
	this->addChild(splash, 16);
	splash->setGlobalZOrder(16);
	splash->runAction(water_splash);

	pathClose_right = (Sprite *)gameBG->getChildByName("path_up_right");
	pathClose_left = (Sprite *)gameBG->getChildByName("path_up_left");
	pathOpen_right = (Sprite *)gameBG->getChildByName("path_down_right");
	pathOpen_left = (Sprite *)gameBG->getChildByName("path_down_left");

	pathOpen_right->setVisible(false);
	pathOpen_left->setVisible(false);

	Sprite* transparentBG = Sprite::create("crossthebridge/Pixel.png");
	transparentBG->setPosition(Vec2(0 + origin.x, 0 + origin.y));
	transparentBG->setAnchorPoint(Vec2(0, 0));
	transparentBG->setScaleX(2560);
	transparentBG->setScaleY(1800);
	this->addChild(transparentBG, 2);

	addEvents(transparentBG);

	sceneMaking();
	this->schedule(schedule_selector(CrossTheBridge::monsGeneration), 12);
	this->schedule(schedule_selector(CrossTheBridge::alphabetGeneration), positionGap_Alpha[RandomHelper::random_int(0, 21)]);
	//this->schedule(schedule_selector(CrossTheBridge::letterDisplayCombinationMethod), 40.0f);
	return true;
}
void CrossTheBridge::menuCloseCallback(Ref* pSender)
{
	Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}

void CrossTheBridge::sceneMaking()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	cubeAtRest = Sprite::create("crossthebridge/border.png");
	cubeAtRest->setPosition(Vec2(630 + origin.x, (visibleSize.height*0.47) + origin.y));
	cubeAtRest->setAnchorPoint(Vec2(0, 0));
	this->addChild(cubeAtRest, 1);
	cubeAtRest->setScale(0.9, 1);
	cubeAtRest->setVisible(false);

	barrierRight = Sprite::create("crossthebridge/barrier.png");
	barrierRight->setPosition(Vec2(visibleSize.width + 50 + origin.x, (visibleSize.height*0.01) + origin.y));
	barrierRight->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierRight, 1);

	barrierLeft = Sprite::create("crossthebridge/barrier.png");
	barrierLeft->setPosition(Vec2(40 + origin.x, (visibleSize.height*0.46) + origin.y));
	barrierLeft->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierLeft, 1);
	barrierLeft->setVisible(false);

	alphaSoundBarrier = Sprite::create("crossthebridge/barrier.png");
	alphaSoundBarrier->setPosition(Vec2(1150 + origin.x, (visibleSize.height*0.47) + origin.y));
	alphaSoundBarrier->setAnchorPoint(Vec2(0, 0));
	this->addChild(alphaSoundBarrier, 3);
	alphaSoundBarrier->setVisible(false);

	barrierFlat = Sprite::create("crossthebridge/barrier.png");
	barrierFlat->setPosition(Vec2(10 + origin.x, 370 + origin.y));
	barrierFlat->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierFlat, 1);
	barrierFlat->setRotation(90.0f);
	barrierFlat->setVisible(false);

	barrierLowerSide = Sprite::create("Crossthebridge/barrier.png");
	barrierLowerSide->setPosition(Vec2(80 + origin.x,400 + origin.y));
	barrierLowerSide->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierLowerSide, 3);
	barrierLowerSide->setRotation(47.0f);
	barrierLowerSide->setScaleY(0.18);
	barrierLowerSide->setVisible(false);

	letterDisplayCombinationMethod(2.0f);
	alphabetGeneration(2.0f);
}

void CrossTheBridge::update(float delta) {
	alphaDeletion();
	monsDeletion();

	checkIntersectWithAlpha();
	checkIntersectWithMons();

	removeObjectFromScene_Alpha();
	removeObjectFromScene_Mons();

	alphaIntersectBridgeCurve();

	alphaLoud();

}
void CrossTheBridge::letterDisplayCombinationMethod(float dt)
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay,20,1,50);

	for (auto i = 0; i < 7; i++)
	{
		std::ostringstream sstreamb;
		sstreamb << letterToDisplay;
		std::string letterDisplay = sstreamb.str();
		Alphabet *displayLetter = Alphabet::createWithSize(letterToDisplay,220);
		displayLetter->setPosition(Vec2(letterDisplayPosition[i].first + origin.x, letterDisplayPosition[i].second + origin.y));
		this->addChild(displayLetter, 3);
		letterContainer.push_back(displayLetter);
	}
}

void CrossTheBridge::alphabetGeneration(float dt)
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	auto name = comboFive.at(alphabetCounter).at(0);
	alphabetCounter++;
	auto mystr = LangUtil::convertUTF16CharToString(name);
	if (alphabetCounter == 20) {
		comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay, 20, 1, 50);
		alphabetCounter = 0;
	}
	Alphamon* alphaMon = Alphamon::createWithAlphabet(name);
	alphaMon->setPosition(Vec2((barrierRight->getPosition().x + origin.x), (visibleSize.height*0.47) + origin.y));
	this->addChild(alphaMon, 3);
	
	alphaMon->setScale(0.55);
	alphaMon->setContentSize(cocos2d::Size(20, 300));
	alphaMon->setName(mystr);
	alphaContainer.push_back(alphaMon);

	alphaMon->blinkAction();
	alphaMon->eatAction();
	alphaMon->walkAction();

   leftMove_Alpha(alphaMon, 8, -180.0f, ((visibleSize.height*0.47) + origin.y));
}

void CrossTheBridge::monsGeneration(float dt) {

	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	cocostudio::timeline::ActionTimeline *enemy_walk = CSLoader::createTimeline("crossthebridge/enemy_01.csb");
	Sprite* monster = (Sprite *)CSLoader::createNode("crossthebridge/enemy_01.csb");
	monster->setPosition(Vec2(barrierRight->getPosition().x + origin.x, (visibleSize.height*0.472) + origin.y));
	monster->setContentSize(cocos2d::Size(200.0f,200.0f));
	monster->setScale(0.30);
	this->addChild(monster, 3);
	monster->runAction(enemy_walk);
	enemy_walk->setTimeSpeed(1.5);
	enemy_walk->gotoFrameAndPlay(0, true);
	monsContainer.push_back(monster);
	leftMove_Mons(monster, 10, -180, ((visibleSize.height*0.468) + origin.y));
}

void CrossTheBridge::alphaDeletion()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i< alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(barrierLeft->getBoundingBox()))
		{
			std::ostringstream sstreamb;
			sstreamb << letterToDisplay;
			std::string comboValue = sstreamb.str();

			if (!alphaContainer[i]->getName().compare(comboValue))
			{
				if (letterDisplayCounter < 7)
				{
					letterContainer[letterDisplayCounter]->setColor(cocos2d::Color3B(255, 215, 0));
					letterDisplayCounter++;
				}
				_menuContext->pickAlphabet(letterToDisplay,alphaContainer[i]->getName()[0],true);
				
			}
			else
			{
				_menuContext->pickAlphabet(letterToDisplay, alphaContainer[i]->getName()[0], true);
			}
			if (letterDisplayCounter == 7)
			{
				for (std::size_t i = 0; i <letterContainer.size(); i++)
				{
					this->removeChild(letterContainer[i], true);
				}
				letterContainer.clear();
				letterDisplayCounter = 0;
				letterDisplayCombinationMethod(2.0);
			}
			this->removeChild(alphaContainer[i], true);
			alphaContainer.erase(alphaContainer.begin() + i);
		}
	}

}
void CrossTheBridge::monsDeletion()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	for (int i = 0; i< monsContainer.size(); i++)
	{
		if (monsContainer[i]->getBoundingBox().intersectsRect(barrierLeft->getBoundingBox()))
		{
			_menuContext->pickAlphabet(letterToDisplay,'Mon', true);
			this->removeChild(monsContainer[i], true);
			monsContainer.erase(monsContainer.begin() + i);
		}
	}

}

void CrossTheBridge::alphaLoud()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);
		if (alphaBox.intersectsRect(alphaSoundBarrier->getBoundingBox()))
		{
			auto Sequences = Sequence::create(ScaleTo::create(0.17,0.62),DelayTime::create(0.07),ScaleTo::create(0.17,0.55),NULL);
			alphaContainer[i]->runAction(Sequences);
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			auto path = LangUtil::getInstance()->getAlphabetSoundFileName(alphaContainer[i]->getName()[0]);
			audio->playEffect(path.c_str(),false);
		}
	}
}
void CrossTheBridge::checkIntersectWithAlpha()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{	
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);
		
		if (alphaBox.intersectsRect(cubeAtRest->getBoundingBox()) && openFlag)
		{
			auto sequence_A = MoveTo::create(2, Vec2(alphaContainer[i]->getPosition().x, 400));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			alphaContainer[i]->runAction(main_sequence);
		}
	}

}
void CrossTheBridge::checkIntersectWithMons()
{
	for (int i = 0; i<monsContainer.size(); i++)
	{
		Rect monster = monsContainer[i]->getBoundingBox();
		if (monster.intersectsRect(cubeAtRest->getBoundingBox()) && openFlag)
		{
			auto sequence_A = MoveTo::create(2, Vec2(monsContainer[i]->getPosition().x, 400));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			monsContainer[i]->runAction(main_sequence);
		}
	}
}
void CrossTheBridge::removeObjectFromScene_Alpha()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(barrierFlat->getBoundingBox()))
		{
			splash->setPosition(Vec2(alphaContainer[i]->getPosition().x + origin.x, alphaContainer[i]->getPosition().y + origin.y));
			water_splash->gotoFrameAndPlay(0, false);

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("crossthebridge/misc/splash.wav", false);

			this->removeChild(alphaContainer[i], true);
			alphaContainer.erase(alphaContainer.begin() + i);
		}
	}
}
void CrossTheBridge::removeObjectFromScene_Mons()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i < monsContainer.size(); i++)
	{
		if (monsContainer[i]->getBoundingBox().intersectsRect(barrierFlat->getBoundingBox()))
		{
			splash->setPosition(Vec2(monsContainer[i]->getPosition().x + origin.x, monsContainer[i]->getPosition().y + origin.y));
			water_splash->gotoFrameAndPlay(0, false);

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("crossthebridge/misc/splash.wav", false);

			this->removeChild(monsContainer[i], true);
			monsContainer.erase(monsContainer.begin() + i);
		}
	}
}
void CrossTheBridge::alphaIntersectBridgeCurve()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);
		if (alphaBox.intersectsRect(barrierLowerSide->getBoundingBox()) )
		{
			auto sequence_A = MoveTo::create(2, Vec2(alphaContainer[i]->getPosition().x, 300));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			alphaContainer[i]->runAction(main_sequence);
		}
	}
}

void CrossTheBridge::monsIntersectBridgeCurve()
{
	for (int i = 0; i<monsContainer.size(); i++)
	{
		Rect monster = monsContainer[i]->getBoundingBox();
		if (monster.intersectsRect(barrierLowerSide->getBoundingBox()) )
		{
			auto sequence_A = MoveTo::create(2, Vec2(monsContainer[i]->getPosition().x, 300));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			monsContainer[i]->runAction(main_sequence);
		}
	}
}

void CrossTheBridge::leftMove_Alpha(Alphamon* spriteAlphabet, int time, float positionX, float positionY)
{
	spriteAlphabet->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}
void CrossTheBridge::leftMove_Mons(Sprite* spriteAlphabet, int time, float positionX, float positionY)
{
	spriteAlphabet->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}

void CrossTheBridge::addEvents(Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

		auto sequance_A = CallFunc::create([=]() {
			if (rect.containsPoint(locationInNode))
			{
				openFlag = true;
				pathOpen_right->setVisible(true);
				pathOpen_left->setVisible(true);
				pathClose_right->setVisible(false);
				pathClose_left->setVisible(false);
				oneSecondClick = true;
			}});
		auto sequance_B = CallFunc::create([=]()
		{
			oneSecondClick = false;
		});
		if (!oneSecondClick)
		{
			auto main_sequence = Sequence::create(sequance_A, DelayTime::create(0.22f), sequance_B, NULL);
			target->runAction(main_sequence);
		}
		return true;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		openFlag = false;
		pathOpen_right->setVisible(false);
		pathOpen_left->setVisible(false);
		pathClose_right->setVisible(true);
		pathClose_left->setVisible(true);
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

