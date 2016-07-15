#include "CrossTheBridgeScene.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "cocostudio\CocoStudio.h"

USING_NS_CC;

Scene* CrossTheBridge::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = CrossTheBridge::create();

    // add layer as a child to scene
    scene->addChild(layer);

    // return the scene
    return scene;
}

// on 'init' you need to initialize your instance
bool CrossTheBridge::init()
{
	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("crossthebridge.plist");
	auto visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
	auto closeItem = MenuItemImage::create(
                                           "CloseNormal.png",
                                           "CloseSelected.png",
                                            CC_CALLBACK_1(CrossTheBridge::menuCloseCallback, this));
    
    closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width/2 ,
                                origin.y + closeItem->getContentSize().height/2));

    //create menu, it's an autorelease object
    auto menu = Menu::create(closeItem, NULL);
    menu->setPosition(Vec2::ZERO);
    this->addChild(menu, 1);
	this->scheduleUpdate();
    /////////////////////////////
    // 3. add your codes below...
	
	auto gameBG = CSLoader::createNode("CrossTheBridge.csb");
	this->addChild(gameBG,1);

	pathClose_right= (Sprite *)gameBG->getChildByName("path_up_right");
	pathClose_left = (Sprite *)gameBG->getChildByName("path_up_left");
	pathOpen_right= (Sprite *)gameBG->getChildByName("path_down_right");
	pathOpen_left = (Sprite *)gameBG->getChildByName("path_down_left");

	pathOpen_right->setVisible(false);
	pathOpen_left->setVisible(false);

	Sprite* transparentBG = Sprite::create("Pixel.png");
	transparentBG->setPosition(Vec2(0 + origin.x,0 + origin.y));
	transparentBG->setAnchorPoint(Vec2(0, 0));
	transparentBG->setScaleX(2560);
	transparentBG->setScaleY(1800);
	this->addChild(transparentBG, 2);

	addEvents(transparentBG);

	sceneMaking();
	this->schedule(schedule_selector(CrossTheBridge::monsGeneration), RandomHelper::random_int(4, 8));
	this->schedule(schedule_selector(CrossTheBridge::alphabetGeneration), positionGap_Alpha[RandomHelper::random_int(0, 21)]);
    this->schedule(schedule_selector(CrossTheBridge::comboFiveDynamicShuffle),5.0f); 
    this->schedule(schedule_selector(CrossTheBridge::letterDisplayCombinationMethod), 10.0f);
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

    cubeAtRest = Sprite::create("4.png");
	cubeAtRest->setPosition(Vec2(750 + origin.x, (visibleSize.height*0.49 )+ origin.y));
	cubeAtRest->setAnchorPoint(Vec2(0, 0));
	this->addChild(cubeAtRest, 1);
	cubeAtRest->setVisible(false);

	barrierRight = Sprite::create("barrier.png");
	barrierRight->setPosition(Vec2(visibleSize.width+50+origin.x,( visibleSize.height*0.01) + origin.y));
	barrierRight->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierRight, 1);

	barrierRight_1 = Sprite::create("barrier.png");
	barrierRight_1->setPosition(Vec2(visibleSize.width+ 150 + origin.x, (visibleSize.height*0.01) + origin.y));
	barrierRight_1->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierRight_1, 3);

	barrierLeft = Sprite::create("barrier.png");
	barrierLeft->setPosition(Vec2(-180+origin.x, (visibleSize.height*0.01) + origin.y));
	barrierLeft->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierLeft, 1);

	barrierFlat = Sprite::create("barrier.png");
	barrierFlat->setPosition(Vec2(0 + origin.x, 250+origin.y));
	barrierFlat->setAnchorPoint(Vec2(0, 0));
	this->addChild(barrierFlat, 3);
	barrierFlat->setRotation(90.0f);
	barrierFlat->setVisible(true);

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

    removeMonsAtRightMost();
}
void CrossTheBridge::letterDisplayCombinationMethod(float dt)
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	auto letterToDisplay = letterAZ[RandomHelper::random_int(0, 25)];

	comboFive[0] = letterToDisplay;
	comboFive[1] = letterAZ[RandomHelper::random_int(0, 25)];
	comboFive[2] = letterAZ[RandomHelper::random_int(0, 25)];
	comboFive[3] = letterAZ[RandomHelper::random_int(0, 25)];
	comboFive[4] = letterToDisplay;

	if (letterIsThere )
	{
		this->removeChild(displayLetter, true);
	}
	    letterIsThere = true;
	    displayLetter = Label::createWithTTF(letterToDisplay, "fonts/Marker Felt.ttf", 150);
		displayLetter->setPosition(Vec2(letterDisplayPosition[3].first + origin.x, letterDisplayPosition[6].second + origin.y));
		this->addChild(displayLetter, 3);
	
}
void CrossTheBridge::comboFiveDynamicShuffle(float dt)
{
	comboFive[1] = letterAZ[RandomHelper::random_int(0, 25)];
	comboFive[2] = letterAZ[RandomHelper::random_int(0, 25)];
	comboFive[3] = letterAZ[RandomHelper::random_int(0, 25)];
	//comboFive[4] = letterAZ[RandomHelper::random_int(0, 25)];
}

void CrossTheBridge::alphabetGeneration(float dt)
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	
	
				int rand_2 = RandomHelper::random_int(0, 4);
				randomInAlpha = comboFive[rand_2];

				Sprite* amon = (Sprite *)CSLoader::createNode("english/"+randomInAlpha+".csb");
				this->addChild(amon, 3);
				amon->setScale(0.28);
				amon->setContentSize(cocos2d::Size(200, 200));
				amon->setPosition(Vec2(barrierRight->getPosition().x + origin.x, (visibleSize.height*0.49) + origin.y));
				//Alphabet = amon;
				amon->setName("Alphabet");
				std::string str = amon->getName().c_str();
				
				alphaContainer.push_back(amon);
				Vector <Node*> children = amon->getChildren();
				for (auto item = children.rbegin(); item != children.rend(); ++item)
				{
					Node *monster = *item;
					std::string str = monster->getName().c_str();
					if (str.find("mouth") == 0)
					{
						auto mouthTimeline = CSLoader::createTimeline(CCString::createWithFormat("mouth_ani/%s.csb", str.c_str())->getCString());
						monster->runAction(mouthTimeline);
						mouthTimeline->gotoFrameAndPlay(0, true);

					}
					if (str.find("eye") == 0)
					{
						auto  eyeTimeline = CSLoader::createTimeline(CCString::createWithFormat("eye_ani/%s.csb", str.c_str())->getCString());
						monster->runAction(eyeTimeline);
						eyeTimeline->gotoFrameAndPlay(0, true);
					}
					if (str.find("skate") == 0)
					{
						auto  eyeTimeline = CSLoader::createTimeline(CCString::createWithFormat("leg_ani/%s.csb", str.c_str())->getCString());
						monster->runAction(eyeTimeline);
						eyeTimeline->gotoFrameAndPlay(0, true);
					}
				}
				leftMove_Alpha(amon, RandomHelper::random_int(7, 14), -180.0f, ((visibleSize.height*0.49) + origin.y));
	}
	
void CrossTheBridge::monsGeneration(float dt) {
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();

	cocostudio::timeline::ActionTimeline *enemy_walk = CSLoader::createTimeline("enemy_animation.csb");
	Sprite* monster = (Sprite *)CSLoader::createNode("enemy_animation.csb");
	monster->setPosition(Vec2(barrierRight->getPosition().x+ origin.x, (visibleSize.height*0.605) + origin.y));
	monster->setScale(0.30);
	this->addChild(monster, 3);
	monster->runAction(enemy_walk);
	enemy_walk->setTimeSpeed(1.5);
	monster->setName("Monster");
	//enemy_walk->gotoFrameAndPlay(0, true);
	enemy_walk->play("Walking", true);
	//Monster = monster;
	monsContainer.push_back(monster);

	leftMove_Mons(monster, RandomHelper::random_int(5, 10),-180, ((visibleSize.height*0.605) + origin.y));
	
}

void CrossTheBridge::alphaDeletion()
{
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i< alphaContainer.size(); i++)
	{
		if (alphaContainer[i]->boundingBox().intersectsRect(barrierLeft->boundingBox()))
		{
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
		if (monsContainer[i]->boundingBox().intersectsRect(barrierLeft->boundingBox()))
		{
			this->removeChild(monsContainer[i], true);
			monsContainer.erase(monsContainer.begin() + i);
					/*MoveTo *nodeAction = MoveTo::create(4.0, Vec2(2400, (visibleSize.height*0.610) + origin.y));
					EaseBackOut *sequence_A = EaseBackOut::create(nodeAction);*/
			
			//monsContainer[i]->runAction(MoveTo::create(1.0, Vec2(600, (visibleSize.height*0.610) + origin.y)));
				/*	auto sequance_B = CallFunc::create([=]() { 
							this->removeChild(monsContainer[i], true);
							monsContainer.erase(monsContainer.begin() + i);
					});
					auto main_sequence = Sequence::create(sequence_A,NULL);
					monsContainer[i]->runAction(main_sequence);
*/
		}
	}

}
void CrossTheBridge::checkIntersectWithAlpha()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		if (alphaContainer[i]->boundingBox().intersectsRect(cubeAtRest->boundingBox()) && openFlag)
		{
			int index = i;
			auto sequence_A = MoveTo::create(2, Vec2(alphaContainer[i]->getPosition().x, 400));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			alphaContainer[i]->runAction(main_sequence);
		}
	}

}
void CrossTheBridge::checkIntersectWithMons()
{
	for (int i = 0; i < monsContainer.size(); i++)
	{
		if (monsContainer[i]->boundingBox().intersectsRect(cubeAtRest->boundingBox()) && openFlag)
		{
			auto sequence_A = MoveTo::create(2, Vec2(monsContainer[i]->getPosition().x, 400));
			auto main_sequence = Sequence::create(sequence_A, NULL);
			monsContainer[i]->runAction(main_sequence);
		}
	}
}
void CrossTheBridge::removeObjectFromScene_Alpha()
{
	for (int i = 0; i < alphaContainer.size(); i++)
	{
		if (alphaContainer[i]->boundingBox().intersectsRect(barrierFlat->boundingBox()))
		{
			this->removeChild(alphaContainer[i], true);
			alphaContainer.erase(alphaContainer.begin() + i);
			//CCLOG("No of mnster in World : %d", monsContainer.size());
			
		}
	}
}
void CrossTheBridge::removeMonsAtRightMost()
{
	for (int i = 0; i < monsContainer.size(); i++)
	{
		if (monsContainer[i]->boundingBox().intersectsRect(barrierRight_1->boundingBox()))
		{
			this->removeChild(monsContainer[i], true);
			monsContainer.erase(monsContainer.begin() + i);
			//CCLOG("No of mnster in World : %d", monsContainer.size());
		}
	}
}
void CrossTheBridge::removeObjectFromScene_Mons()
{
	for (int i = 0; i < monsContainer.size(); i++)
	{
		if (monsContainer[i]->boundingBox().intersectsRect(barrierFlat->boundingBox()))
		{
			this->removeChild(monsContainer[i], true);
			monsContainer.erase(monsContainer.begin() + i);
			//CCLOG("No of mnster in World : %d", monsContainer.size());
		}
	}
}

void CrossTheBridge::leftMove_Alpha(Sprite* spriteAlphabet, int time, float positionX, float positionY)
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
		
		auto sequance_A = CallFunc::create([=](){
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
			auto main_sequence = Sequence::create(sequance_A,DelayTime::create(0.22f),sequance_B,NULL);
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
		/*pathOpen->setVisible(false);
		pathClose->setVisible(true);*/
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

