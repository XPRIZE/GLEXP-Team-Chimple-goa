#include "CrossTheBridgeScene.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "../util/MatrixUtil.h"

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
			 _gameCurrentLevel= _menuContext->getCurrentLevel();
			auto gameBG = CSLoader::createNode("crossthebridge/MainScene.csb");
			gameBG->setName("gameBG");
			this->addChild(gameBG, 1);

			CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
			framecache1->addSpriteFramesWithFile("crossthebridge/crossthebridge.plist");

			//Vector <Node*> children = gameBG->getChildren();
			//for (auto item = children.rbegin(); item != children.rend(); ++item) {
			//	Node * monsterItem = *item;
			//	std::string str = monsterItem->getName().c_str();
			//	CCLOG("name : %s", str.c_str());
			//	}
			

			Sprite* house_wall = (Sprite *)gameBG->getChildByName("house_Wall");
			Sprite* house_front = (Sprite *)gameBG->getChildByName("house_front_1");
		
			Sprite* wall = Sprite::createWithSpriteFrameName("crossthebridge/house_Wall.png");
			wall->setPosition(Vec2(house_wall->getPositionX(), house_wall->getPositionY()-6));
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

			if (_menuContext->getCurrentLevel() != 1)
			{
				addEvents(transparentBG);
			}
			
			_eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(CrossTheBridge::letterDisplayCombinationMethod, this));
			if (_menuContext->getCurrentLevel() == 1)
			{
				_lesson.setConcept(Lesson::CONCEPT::LETTER);
			}
			else if (_menuContext->getCurrentLevel() == 2)
			{
				_lesson.setConcept(Lesson::CONCEPT::LETTER_CASE_EQUATE);
			}
			_lesson.getMultiChoices(1, 6, UPPER_CASE_LETTER_FORMAT, UPPER_CASE_LETTER_FORMAT);
			
			/*setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(CrossTheBridge::startGame, this));*/

}
CrossTheBridge::~CrossTheBridge() {

	_eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
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

	//letterDisplayCombinationMethod();
	
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
	if (!_helpFlag && (_help != NULL))
	{
		alphaContainer[0]->pause();
	}
}
void CrossTheBridge::letterDisplayCombinationMethod(cocos2d::EventCustom *eventCustom)
{
	sceneMaking();
	startGame();
	Sprite* letterBoard = (Sprite *)getChildByName("gameBG")->getChildByName("alphabet_board_10");
	letterBoard->setPosition(Vec2(visibleSize.width / 2 + origin.x, 1703.02 + origin.y));
	//setAllSpriteProperties(letterBoard, 3, visibleSize.width / 2, 1703.02, true, 0.5, 0, 0.6, 0.6);
	if (_menuContext->getCurrentLevel() == 1)
	{
		creatHelp(letterBoard, cubeAtRest);
		_helpFlag = true;
	}

	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	// _revampToNewLessonGame

 	    // Getting the answer, quetion, help and choices required from API

	
	
	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallMultiChoices");
	vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);

		_letterOnDisplayBoard = vmc[0].question;
		_answer = vmc[0].answers[vmc[0].correctAnswer];
		
		std::vector<std::vector<std::string>> choices = MatrixUtil::generateMatrixForChoosing(_answer, vmc[0].answers, 1, 7, 40);
		_choices = choices[0];
		std::random_shuffle(_choices.begin(), _choices.end());


	/*	vector<int> randomIndex;
		while (randomIndex.size() != (_choices.size() * 2)) {
			bool duplicateCheck = true;
			int size = (_choices.size() ) - 1;
			int numberPicker = RandomHelper::random_int(0, size);
			for (int i = 0; i < randomIndex.size(); i++) {
				if (numberPicker == randomIndex[i])
					duplicateCheck = false;
			}
			if (duplicateCheck)
			{
				if(randomIndex.size() %2 ==0)
					randomIndex.push_back(vmc[0].correctAnswer);
				else
					randomIndex.push_back(numberPicker);
			}
		}*/
	//if ((_menuContext->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) && LangUtil::getInstance()->getLang() == "swa") {
	//	int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
	//	letterToDisplay = LangUtil::getInstance()->getAllCharacters()[randomNumber];//_crossTheBridgeLevelMapping.at(_gameCurrentLevel);
	//}
	//else {
	//	letterToDisplay = LangUtil::getInstance()->getAllCharacters()[_menuContext->getCurrentLevel() - 1];
	//}
	/*comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay, 20, 1, 70);
    auto newStr= LangUtil::convertUTF16CharToString(letterToDisplay);*/

	
	letterOnBoard = Alphabet::createWithSize(_letterOnDisplayBoard, 220);
	letterOnBoard->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height*0.929 + origin.y));
	letterOnBoard->setScale(0.4);
	this->addChild(letterOnBoard, 3);
	auto gap = Director::getInstance()->getVisibleSize().width /8;
	for (auto i = 0; i < 8; i++)
	{
		auto displayLetter = LabelTTF::create(_letterOnDisplayBoard, "Helvetica",400);
		//Alphabet *displayLetter = Alphabet::createWithSize(letterToDisplay, 220);
		displayLetter->setPosition(Vec2((i*gap + gap / 2) + origin.x, 110.17 + origin.y));
		this->addChild(displayLetter, 3);
		displayLetter->setVisible(false);
		displayLetter->setScale(0.0001);
		letterContainer.push_back(displayLetter);
	}
	alphabetAndMonsterGeneration(2.0f);
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
	std::string alphabetName;

	if (_gameCurrentLevel == 1 && _flagForHelpLayer)
	{
		_flagForHelpLayer = false;
		alphabetName = _choices[1];
	}
	else
	{
		// name = comboFive.at(alphabetCounter).at(0);
		alphabetName = _choices[alphabetCounter];
	}
		  alphabetCounter++;
		//auto alphabetName = LangUtil::convertUTF16CharToString(name);
		  if(alphabetCounter == _choices.size())
			{
				//comboFive = CharGenerator::getInstance()->generateMatrixForChoosingAChar(letterToDisplay, 20, 1, 65);
			    std::random_shuffle(_choices.begin(), _choices.end());
				alphabetCounter = 0;
			}


		Alphamon* alphaMon = Alphamon::createWithAlphabet(alphabetName);
		alphaMon->setPosition(Vec2((barrierRight->getPosition().x + origin.x), (visibleSize.height*0.47) + origin.y));
		this->addChild(alphaMon, 1);

		alphaMon->setScale(0.70);
		alphaMon->setContentSize(cocos2d::Size(20, 300));
		alphaMon->setName(alphabetName);
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
			if (_gamePointFlag) {
				_pointCounter++; _gamePointFlag = false;
			}
			//if (alphaContainer[i]->getAlphabet() == LangUtil::convertUTF16CharToString(letterToDisplay))//_answer
			if (alphaContainer[i]->getAlphabet() == _answer)
			{

				if (letterDisplayCounter < 8 && pointGenerater)
				{
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/success.ogg", false);

					//_menuContext->pickAlphabet(letterToDisplay, alphaContainer[i]->getAlphabet(), true);
					sparkle->setVisible(true);
					sparkle->setPosition(Vec2(letterContainer[letterDisplayCounter]->getPosition().x + origin.x, letterContainer[letterDisplayCounter]->getPosition().y + origin.y));
					star->gotoFrameAndPlay(0, false);
					letterContainer[letterDisplayCounter]->setColor(cocos2d::Color3B(255, 215, 0));
					letterContainer[letterDisplayCounter]->setVisible(true);
					auto sequence_A = ScaleTo::create(2, 0.4);
					EaseElasticOut *easeAction = EaseElasticOut::create(sequence_A);
					letterContainer[letterDisplayCounter]->runAction( easeAction);
					_menuContext->addPoints(1);
					letterDisplayCounter++;
					//this->runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() { _gamePointFlag = true; }), NULL));
					pointGenerater = false;
					CCLOG("current point is  : %d", _menuContext->getPoints());
				}
			}
			else
			{
				punchForBack->setVisible(true);
				punchForBack->setPosition(Vec2(302.02 + origin.x, 960.51 + origin.y));
				punch->gotoFrameAndPlay(0, false);

				zeher->setVisible(true);
				zeher->setPosition(Vec2(250.37 + origin.x, 1005.53 + origin.y));
				smoke->gotoFrameAndPlay(0, false);

				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("crossthebridge/misc/punch.wav", false);

				//_menuContext->pickAlphabet(letterToDisplay, alphaContainer[i]->getAlphabet(), true);
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
					_menuContext->setMaxPoints(_pointCounter);
					_menuContext->showScore();
				});
				auto delayInCallingMethod = Sequence::create(DelayTime::create(1.5f), clearLetter, CallFunc::create([=]() { //letterDisplayCombinationMethod(cocos2d::EventCustom *eventCustom);
				}), NULL);
				this->runAction(delayInCallingMethod);
			}
			this->runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() { _gamePointFlag = true; }), NULL));
		}
	}

}
void CrossTheBridge::monsDeletion()
{
	for (int i = 0; i< monsContainer.size(); i++)
	{
		if (monsContainer[i]->getBoundingBox().intersectsRect(barrierLeft->getBoundingBox()))
		{
			if (_gamePointFlag2) {
				_pointCounter++; _gamePointFlag2 = false;
			}
			punchForBack->setVisible(true);
			punchForBack->setPosition(Vec2(302.02 + origin.x, 960.51 + origin.y));
			punch->gotoFrameAndPlay(0, false);

			zeher->setVisible(true);
			zeher->setPosition(Vec2(250.37 + origin.x, 1005.53 + origin.y));
			smoke->gotoFrameAndPlay(0, false);

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("crossthebridge/misc/punch.wav", false);

			//_menuContext->pickAlphabet(letterToDisplay, '1', true);
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

			this->runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() { _gamePointFlag2 = true; }), NULL));
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
				auto path = LangUtil::getInstance()->getAlphabetSoundFileNameForString(alphaContainer[i]->getAlphabet());
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
	listener->setSwallowTouches(false);

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
					_help = NULL;
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

CrossTheBridge::CrossTheBridge(){

}