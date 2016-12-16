#include "CrossTheBridgeScene.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

Scene* CrossTheBridge::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = CrossTheBridge::create();

	// add layer as a child to scene
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, CrossTheBridge::gameName());
	scene->addChild(layer->_menuContext);

	return scene;
}
// on 'init' you need to initialize your instance
bool CrossTheBridge::init()
{

	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("crossthebridge.plist");
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}
	return true;
}
void CrossTheBridge::onEnterTransitionDidFinish()
{

			 _crossTheBridgeLevelMapping = {

				{ 1,'A' },
				{ 2,'B' },
				{ 3,'C' },
				{ 4,'D' },
				{ 5,'E' },
				{ 6,'F' },
				{ 7,'G' },
				{ 8,'H' },
				{ 9,'I' },
				{ 10,'J' },
				{ 11,'K' },
				{ 12,'L' },
				{ 13,'M' },
				{ 14,'N' },
				{ 15,'O' },
				{ 16,'P' },
				{ 17,'Q' },
				{ 18,'R' },
				{ 19,'S' },
				{ 20,'T' },
				{ 21,'U' },
				{ 22,'V' },
				{ 23,'W' },
				{ 24,'X' },
				{ 25,'Y' },
				{ 26,'Z' }
			};
			 _gameCurrentLevel= _menuContext->getCurrentLevel();
			auto gameBG = CSLoader::createNode("crossthebridge/MainScene.csb");
			this->addChild(gameBG, 1);

			CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
			framecache1->addSpriteFramesWithFile("crossthebridge/crossthebridge.plist");

			//Vector <Node*> children = gameBG->getChildren();
			//for (auto item = children.rbegin(); item != children.rend(); ++item) {
			//	Node * monsterItem = *item;
			//	std::string str = monsterItem->getName().c_str();
			//	CCLOG("name : %s", str.c_str());
			//	}
			Sprite* letterBoard = (Sprite *)gameBG->getChildByName("alphabet_board_10");
			letterBoard->setPosition(Vec2(visibleSize.width / 2 + origin.x, 1703.02 + origin.y));
			//setAllSpriteProperties(letterBoard, 3, visibleSize.width / 2, 1703.02, true, 0.5, 0, 0.6, 0.6);

			Sprite* house_wall = (Sprite *)gameBG->getChildByName("house_Wall");
			Sprite* house_front = (Sprite *)gameBG->getChildByName("house_front_1");
		
			Sprite* wall = Sprite::createWithSpriteFrameName("crossthebridge/house_Wall.png");
			wall->setPosition(Vec2(house_wall->getPosition()));
			this->addChild(wall,2);

			Sprite* front = Sprite::createWithSpriteFrameName("crossthebridge/house_front.png");
			front->setPosition(Vec2(house_front->getPosition()));
			this->addChild(front,2);

			water_splash = CSLoader::createTimeline("crossthebridge/watersplash.csb");
			splash = (Sprite *)CSLoader::createNode("crossthebridge/watersplash.csb");
			this->addChild(splash, 8);
			splash->setGlobalZOrder(8);
			splash->setVisible(false);
			splash->runAction(water_splash);

			punch = CSLoader::createTimeline("crossthebridge/punch.csb");
			punchForBack = (Sprite *)CSLoader::createNode("crossthebridge/punch.csb");
			this->addChild(punchForBack, 1);
			//punchForBack->setGlobalZOrder(8);
			punchForBack->runAction(punch);
			punchForBack->setVisible(false);
			punch->setTimeSpeed(2);

			smoke = CSLoader::createTimeline("crossthebridge/blast.csb");
			zeher = (Sprite *)CSLoader::createNode("crossthebridge/blast.csb");
			this->addChild(zeher, 1);
			//zeher->setGlobalZOrder(16);
			zeher->setVisible(false);
			zeher->runAction(smoke);

			star = CSLoader::createTimeline("crossthebridge/stars.csb");
			sparkle = (Sprite *)CSLoader::createNode("crossthebridge/stars.csb");
			this->addChild(sparkle, 1);
			//sparkle->setGlobalZOrder(8);
			sparkle->setVisible(false);
			sparkle->runAction(star);

			pathClose_right = (Sprite *)gameBG->getChildByName("path_up_right");
			pathClose_left = (Sprite *)gameBG->getChildByName("path_up_left");
			pathOpen_right = (Sprite *)gameBG->getChildByName("path_down_right");
			pathOpen_left = (Sprite *)gameBG->getChildByName("path_down_left");

			pathOpen_right->setVisible(false);
			pathOpen_left->setVisible(false);

			 transparentBG = Sprite::create("crossthebridge/Pixel.png");
			setAllSpriteProperties(transparentBG, 3, 0, 0, false, 0, 0, 2560, 1800);

			_menuContext->setMaxPoints(40);
			if (_menuContext->getCurrentLevel() != 1)
			{
				addEvents(transparentBG);
			}
			sceneMaking();
			startGame();
			if (_menuContext->getCurrentLevel() == 1)
			{
				creatHelp(letterBoard, cubeAtRest);
				_helpFlag = true;
			}
			/*setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(CrossTheBridge::startGame, this));*/

}
CrossTheBridge::~CrossTheBridge() {
	gameMelody->stopAllEffects();
	this->removeAllChildrenWithCleanup(true);
}

void CrossTheBridge::menuCloseCallback(Ref* pSender)
{
	Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}

void CrossTheBridge::creatHelp(Sprite* letterDisplayBoard , Sprite* cubeAtRest)
{
	_help = HelpLayer::create(Rect((cubeAtRest->getPositionX()+ visibleSize.width * 0.05), (cubeAtRest->getPositionY()+ visibleSize.width * 0.07), cubeAtRest->getContentSize().width*1.7, cubeAtRest->getContentSize().height*2.2), Rect(letterDisplayBoard->getPositionX(), (letterDisplayBoard->getPositionY()- visibleSize.width * 0.01), letterDisplayBoard->getContentSize().width,letterDisplayBoard->getContentSize().height*0.8));
	_help->click(Vec2((cubeAtRest->getPositionX() + visibleSize.width * 0.05), (cubeAtRest->getPositionY() + visibleSize.width * 0.05)));
	 this->addChild(_help, 6);
	 
}

void CrossTheBridge::startGame() {
	_menuContext->showStartupHelp(CC_CALLBACK_0(CrossTheBridge::allUpdateMethod, this));
	//runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(CrossTheBridge::allUpdateMethod, this)), NULL));
}

void CrossTheBridge::allUpdateMethod() {
	gameMelody = CocosDenshion::SimpleAudioEngine::getInstance();
	gameMelody->playEffect("endlessrunner/sound/african_drum.wav", true);
	if (_menuContext->getCurrentLevel() != 1)
	{
		this->schedule(schedule_selector(CrossTheBridge::alphabetAndMonsterGeneration), 6);
	}
	this->scheduleUpdate();
}

void CrossTheBridge::sceneMaking()
{
	cubeAtRest = Sprite::create("crossthebridge/border.png");
	setAllSpriteProperties(cubeAtRest, 1, (640 / visibleSize.width)*visibleSize.width, visibleSize.height*0.47, false, 0, 0, 0.9, 1);

	barrierRight = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(barrierRight, 1, visibleSize.width + ((50 / visibleSize.width)*visibleSize.width), (visibleSize.height*0.01), false, 0, 0, 1, 1);

	barrierLeft = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(barrierLeft, 1, (visibleSize.width*0.090), (visibleSize.height*0.46), false, 0, 0, 1, 1);

	barrierExtreamLeft = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(barrierExtreamLeft, 10, (0), (visibleSize.height*0.46), false, 0, 0, 1, 1);

	alphaSoundBarrier = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(alphaSoundBarrier, 3, ((1150 / visibleSize.width)*visibleSize.width), (visibleSize.height*0.47), false, 0, 0, 1, 1);

	barrierFlat = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(barrierFlat, 1, ((10 / visibleSize.width)*visibleSize.width), ((400 / visibleSize.height)*visibleSize.height), false, 0, 90.0f, 1, 1);

	barrierLowerSide = Sprite::create("crossthebridge/barrier.png");
	setAllSpriteProperties(barrierLowerSide, 3, ((80 / visibleSize.width)*visibleSize.width), ((400 / visibleSize.height)*visibleSize.height), false, 0, 47.0f, 1, 0.18f);

	letterDisplayCombinationMethod();
	alphabetAndMonsterGeneration(2.0f);
}

void CrossTheBridge::update(float delta) {
	if (alphaBackFlag)
		alphaDeletion();

	if (monsterBackFlag)
		monsDeletion();

	checkIntersectWithAlpha();
	checkIntersectWithMons();

	removeObjectFromScene_Alpha();
	removeObjectFromScene_Mons();

	alphaIntersectBridgeCurve();
	monsIntersectBridgeCurve();

	rightAlphaMonDelete();

	alphaLoud();

	if (_helpFlag)
	{
		if (alphaContainer[0]->getPositionX() < (cubeAtRest->getPositionX()+visibleSize.width*.04))
		{
			_helpFlag = false;
		   	alphaContainer[0]->pause();
			addEvents(transparentBG);
		}
	}
}
void CrossTheBridge::letterDisplayCombinationMethod()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	if ((_menuContext->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) && LangUtil::getInstance()->getLang() == "swa") {
		int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
		letterToDisplay = LangUtil::getInstance()->getAllCharacters()[randomNumber];//_crossTheBridgeLevelMapping.at(_gameCurrentLevel);
	}
	else {
		letterToDisplay = LangUtil::getInstance()->getAllCharacters()[_menuContext->getCurrentLevel() - 1];
	}
	
	comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay, 20, 1, 70);

	letterOnBoard = Alphabet::createWithSize(letterToDisplay, 220);
	letterOnBoard->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height*0.929 + origin.y));
	letterOnBoard->setScale(0.35);
	this->addChild(letterOnBoard, 3);

	for (auto i = 0; i < 8; i++)
	{
		Alphabet *displayLetter = Alphabet::createWithSize(letterToDisplay, 220);
		displayLetter->setPosition(Vec2(letterDisplayPosition[i].first + origin.x, letterDisplayPosition[i].second + origin.y));
		this->addChild(displayLetter, 3);
		displayLetter->setVisible(false);
		displayLetter->setScale(0.34);
		letterContainer.push_back(displayLetter);
	}
}

void CrossTheBridge::alphabetAndMonsterGeneration(float dt)
{  
	
	if (enemyCreateCounter % 4 == 0)
	{
		cocostudio::timeline::ActionTimeline *enemy_walk = CSLoader::createTimeline("crossthebridge/enemy_01.csb");
		Sprite* monster = (Sprite *)CSLoader::createNode("crossthebridge/enemy_01.csb");
		setAllSpriteProperties(monster, 1, (barrierRight->getPosition().x), ((visibleSize.height*0.472)), true, 0, 0, 0.30f, 0.30f);
		monster->setContentSize(cocos2d::Size(200.0f, 200.0f));
		monster->runAction(enemy_walk);
		enemy_walk->setTimeSpeed(1.5);
		enemy_walk->gotoFrameAndPlay(0, true);
		monsContainer.push_back(monster);
		leftMove_Mons(monster, 10, 0, ((visibleSize.height*0.468) + origin.y));
		enemyCreateCounter = enemyCreateCounter + RandomHelper::random_int(1, 3);
    }
else {
	wchar_t name;
	if (_gameCurrentLevel == 1 && _flagForHelpLayer)
	{
		_flagForHelpLayer = false;
		name = 'B';
	}
	else
	{
		 name = comboFive.at(alphabetCounter).at(0);
	}
		
		alphabetCounter++;
		auto mystr = LangUtil::convertUTF16CharToString(name);

		if (alphabetCounter == 20)
			{
				comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay, 20, 1, 65);
				alphabetCounter = 0;
			}
		Alphamon* alphaMon = Alphamon::createWithAlphabet(name);
		alphaMon->setPosition(Vec2((barrierRight->getPosition().x + origin.x), (visibleSize.height*0.47) + origin.y));
		this->addChild(alphaMon, 1);

		alphaMon->setScale(0.70);
		alphaMon->setContentSize(cocos2d::Size(20, 300));
		alphaMon->setName(mystr);
		alphaContainer.push_back(alphaMon);

		alphaMon->blinkAction();
		alphaMon->eatAction();
		alphaMon->walkAction();

		enemyCreateCounter = enemyCreateCounter + RandomHelper::random_int(1, 3);
		leftMove_Alpha(alphaMon, 10, 0.0f, ((visibleSize.height*0.47) + origin.y));
	}
}
void CrossTheBridge::alphaDeletion()
{

	for (int i = 0; i< alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(barrierLeft->getBoundingBox()))
		{
			if (alphaContainer[i]->getAlphabet() == letterToDisplay)
			{
				if (letterDisplayCounter < 8 && pointGenerater)
				{
					_menuContext->pickAlphabet(letterToDisplay, alphaContainer[i]->getAlphabet(), true);
					sparkle->setVisible(true);
					sparkle->setPosition(Vec2(letterContainer[letterDisplayCounter]->getPosition().x + origin.x, letterContainer[letterDisplayCounter]->getPosition().y + origin.y));
					star->gotoFrameAndPlay(0, false);
					letterContainer[letterDisplayCounter]->setColor(cocos2d::Color3B(255, 215, 0));
					letterContainer[letterDisplayCounter]->setVisible(true);
					letterDisplayCounter++;
					pointGenerater = false;
					_menuContext->addPoints(5);
				}
			}
			else
			{
				_menuContext->addPoints(-3);
				punchForBack->setVisible(true);
				punchForBack->setPosition(Vec2(302.02 + origin.x, 960.51 + origin.y));
				punch->gotoFrameAndPlay(0, false);

				zeher->setVisible(true);
				zeher->setPosition(Vec2(250.37 + origin.x, 1005.53 + origin.y));
				smoke->gotoFrameAndPlay(0, false);

				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("crossthebridge/misc/punch.wav", false);

				_menuContext->pickAlphabet(letterToDisplay, alphaContainer[i]->getAlphabet(), true);
				alphaBackFlag = false;
				auto moveBack = CallFunc::create([=]() {
					alphaContainer[i]->setContentSize(cocos2d::Size(-4.0f, -4.0f));
					MoveBy *nodeAction = MoveBy::create(3.2, Vec2(visibleSize.width*1.16, 0));
					EaseBackOut *easeAction = EaseBackOut::create(nodeAction);
					alphaContainer[i]->runAction(easeAction);
				});
				auto deleteAlphaMonster = CallFunc::create([=]() { this->removeChild(alphaContainer[i], true); alphaContainer.erase(alphaContainer.begin() + i); });
				auto alphaBackFlagChange = CallFunc::create([=]() {alphaBackFlag = true; });
				auto monsterSequence = Sequence::create(moveBack, DelayTime::create(2.5f), deleteAlphaMonster, alphaBackFlagChange, NULL);
				this->runAction(monsterSequence);
			}
			if (letterDisplayCounter == 8)
			{
				auto clearLetter = CallFunc::create([=]() {
					for (std::size_t i = 0; i <letterContainer.size(); i++)
					{
						this->removeChild(letterContainer[i], true);
					}
					this->removeChild(letterOnBoard, true);
					letterContainer.clear();
					letterDisplayCounter = 0;
					_menuContext->showScore();
				});
				auto delayInCallingMethod = Sequence::create(DelayTime::create(1.5f), clearLetter, CallFunc::create([=]() { letterDisplayCombinationMethod(); }), NULL);
				this->runAction(delayInCallingMethod);
			}
		}
	}

}
void CrossTheBridge::monsDeletion()
{
	for (int i = 0; i< monsContainer.size(); i++)
	{
		if (monsContainer[i]->getBoundingBox().intersectsRect(barrierLeft->getBoundingBox()))
		{
			punchForBack->setVisible(true);
			punchForBack->setPosition(Vec2(302.02 + origin.x, 960.51 + origin.y));
			punch->gotoFrameAndPlay(0, false);

			zeher->setVisible(true);
			zeher->setPosition(Vec2(250.37 + origin.x, 1005.53 + origin.y));
			smoke->gotoFrameAndPlay(0, false);

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("crossthebridge/misc/punch.wav", false);

			_menuContext->pickAlphabet(letterToDisplay, '1', true);
			monsterBackFlag = false;
			auto moveBack = CallFunc::create([=]() {
				monsContainer[i]->setContentSize(cocos2d::Size(0.0f, 0.0f));
				MoveBy *nodeAction = MoveBy::create(2.6, Vec2(visibleSize.width*1.16, 0));
				EaseBackOut *easeAction = EaseBackOut::create(nodeAction);
				monsContainer[i]->runAction(easeAction);
			});
			auto deleteMonster = CallFunc::create([=]() { this->removeChild(monsContainer[i], true); monsContainer.erase(monsContainer.begin() + i); });
			auto monsterBackFlagChange = CallFunc::create([=]() {monsterBackFlag = true; });
			auto monsterSequence = Sequence::create(moveBack, DelayTime::create(2.5f), deleteMonster, monsterBackFlagChange, NULL);
			this->runAction(monsterSequence);
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
			if (alphaSoundFlag)
			{
				auto Sequences = Sequence::create(ScaleTo::create(0.17, 0.80), DelayTime::create(0.07), ScaleTo::create(0.17, 0.70), NULL);
				alphaContainer[i]->runAction(Sequences);
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				auto path = LangUtil::getInstance()->getAlphabetSoundFileName(alphaContainer[i]->getAlphabet());
				audio->playEffect(path.c_str(), false);
				alphaSoundFlag = false;
			}
			
		}
	}
}
void CrossTheBridge::checkIntersectWithAlpha()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(cubeAtRest->getBoundingBox()))
		{
			alphaSoundFlag = true;
			if (openFlag)
			{
				auto sequence_A = MoveTo::create(2, Vec2(alphaContainer[i]->getPosition().x, 400));
				auto main_sequence = Sequence::create(sequence_A, NULL);
				alphaContainer[i]->runAction(main_sequence);
			}
			
		}
	}
}

void CrossTheBridge::rightAlphaMonDelete()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(barrierExtreamLeft->getBoundingBox()))
		{
			this->removeChild(alphaContainer[i], true);
			alphaContainer.erase(alphaContainer.begin() + i);
			pointGenerater = true;
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
			auto sequence_A = MoveTo::create(2.15, Vec2(monsContainer[i]->getPosition().x, 400));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			monsContainer[i]->runAction(main_sequence);
		}
	}
}
void CrossTheBridge::removeObjectFromScene_Alpha()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		auto alphaBox = CCRectMake(alphaContainer[i]->getPositionX(), alphaContainer[i]->getPositionY(), alphaContainer[i]->getContentSize().width, alphaContainer[i]->getContentSize().height);

		if (alphaBox.intersectsRect(barrierFlat->getBoundingBox()))
		{
			splash->setVisible(true);
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
	for (int i = 0; i < monsContainer.size(); i++)
	{
		if (monsContainer[i]->getBoundingBox().intersectsRect(barrierFlat->getBoundingBox()))
		{
			splash->setVisible(true);
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
		if (alphaBox.intersectsRect(barrierLowerSide->getBoundingBox()))
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
		if (monster.intersectsRect(barrierLowerSide->getBoundingBox()))
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
				if (_menuContext->getCurrentLevel() == 1 && _initObj)
				{
					this->removeChild(_help);
					this->schedule(schedule_selector(CrossTheBridge::alphabetAndMonsterGeneration), 6);
					_initObj = false;
					alphaContainer[0]->resume();
				}
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

void CrossTheBridge::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPoint, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPoint, anchorPoint));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
	this->addChild(sprite, zOrder);
}

