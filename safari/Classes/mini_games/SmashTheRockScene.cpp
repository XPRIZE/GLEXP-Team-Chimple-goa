#include "SmashTheRockScene.h"
#include "SmashTheRockLevelScene.h"
#include "../effects/FShake.h"
#include "../puzzle/CharGenerator.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"

#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

#include "../puzzle/Alphabet.h"
#include "../StartMenuScene.h"
#define COCOS2D_DEBUG 1

USING_NS_CC;
int key;
int val;
int val1;
int sizei;
int sizej;
SmashTheRock::SmashTheRock()
{

}
SmashTheRock::~SmashTheRock()
{
	audio->stopBackgroundMusic();

}
Scene* SmashTheRock::createScene()
{
	
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = SmashTheRock::create();

	// add layer as a child to scene
	scene->addChild(layer);
    
    layer->menu = MenuContext::create(layer, SmashTheRock::gameName());
    scene->addChild(layer->menu);
    

	// return the scene
	return scene;
}

// on "init" you need to initialize your instance
bool SmashTheRock::init()
{
	//////////////////////////////
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
    background = CSLoader::createNode("smash_de_rock/bg.csb");
	//background->setPosition(Point((visibleSize.width / 2) + origin.x, (visibleSize.height / 2) + origin.y));
	this->addChild(background, 0);
	
	centre = CSLoader::createNode("smash_de_rock/center.csb");
	centre->setPositionX(visibleSize.width / 2);
	centre->setAnchorPoint(Vec2(0.5,0));
    this->addChild(centre,1);

	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(SmashTheRock::startGame, this));
	/*auto letterRock = (Sprite *)centre->getChildByName("letterboard");
	letterRock->setGlobalZOrder(5);
	auto boundary = (Sprite *)centre->getChildByName("boundary");
	boundary->setGlobalZOrder(4);
	auto punchHandLeft = (Sprite *)centre->getChildByName("boxing_gloves_left");
	punchHandLeft->setGlobalZOrder(3);
	auto punchHandRight = (Sprite *)centre->getChildByName("boxing_gloves_right");
	punchHandRight->setGlobalZOrder(3);*/
	
	//auto stone_bace = (Sprite *)centre->getChildByName("stone_bace");
	//stone_bace->setGlobalZOrder(0);


			

	return true;
}

void SmashTheRock::update(float dt)
{
	
	
}

void SmashTheRock::startGame() {
    menu->showStartupHelp(CC_CALLBACK_0(SmashTheRock::begin, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, menu)), CallFunc::create(CC_CALLBACK_0(SmashTheRock::begin, this)), NULL));
}

void SmashTheRock::begin()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("smash_de_rock/smashderock_01.plist");
	auto spritecache2 = SpriteFrameCache::getInstance();
	spritecache2->addSpriteFramesWithFile("smash_de_rock/smashderock_02.plist");


	auto block = Sprite::createWithSpriteFrameName("smash_de_rock/letter_normal.png");

	mychar = CharGenerator::getInstance()->generateAChar();
	std::vector<std::vector<wchar_t>> charkey = CharGenerator::getInstance()->generateMatrixForChoosingAChar(mychar, 2, 7, 50);

	int dis = (220.0 / 2560)*visibleSize.width;
	for (int i = 1; i < 3; i++)
	{
		int blockHeight = i*(block->getContentSize().height + 110) + 10;
		sizei = (block->getContentSize().height + 110);
		CCLOG("sizei = %d", sizei);
		for (int j = 1; j < 8; j++)
		{
			auto block1 = Sprite::createWithSpriteFrameName("smash_de_rock/letter_normal.png");
			auto right = Sprite::createWithSpriteFrameName("smash_de_rock/letter_correct.png");
			auto wrong = Sprite::createWithSpriteFrameName("smash_de_rock/letter_wrong.png");
			int blockWidth = j*(block->getContentSize().width + 140) + dis;
			sizej = (block->getContentSize().width + 140);
			CCLOG("sizej = %d", sizej);
			block1->setAnchorPoint(Vec2(0.5, 0.5));
			block1->setPositionX(blockWidth);
			block1->setPositionY(blockHeight);
			block1->setScaleX(1.6);
			block1->setScaleY(1.4);
			right->setAnchorPoint(Vec2(0.5, 0.5));
			right->setPositionX(blockWidth);
			right->setPositionY(blockHeight);
			right->setScaleX(1.6);
			right->setScaleY(1.4);
			right->setVisible(false);
			wrong->setAnchorPoint(Vec2(0.5, 0.5));
			wrong->setPositionX(blockWidth);
			wrong->setPositionY(blockHeight);
			wrong->setScaleX(1.6);
			wrong->setScaleY(1.4);
			wrong->setVisible(false);
			blockRef.pushBack(block1);
			rightRef.pushBack(right);
			wrongRef.pushBack(wrong);
			this->addChild(block1, 2);
			//	block1->setGlobalZOrder(6);
			this->addChild(right, 2);
			//	right->setGlobalZOrder(6);
			this->addChild(wrong, 2);
			//	wrong->setGlobalZOrder(6);
			//	std::string str = Alphabets.at(cocos2d::RandomHelper::random_int(key, (key + 20)) % 20).c_str();
			wchar_t str1 = charkey.at(i - 1).at(j - 1);
			//std::string ttttt(&str1,1) ;
			//label = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), ttttt);
			//label = Label::createWithTTF(ttttt, "fonts/BalooBhai-Regular.ttf", 256);
			//CCLOG("alpha = %s",str.c_str());
			Alphabet *label = Alphabet::createWithSize(str1, 200);
			//	label->setScale(0.15);
			label->setPositionX(blockWidth);
			auto letter = label->getString();
			label->setPositionY(blockHeight - 230);
			
			label->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
			auto mystr = LangUtil::convertUTF16CharToString(mychar);
			label->setName(mystr);
			label->setScaleX(0.35);
			label->setScaleY(0.45);
			labelRef.pushBack(label);
			CCLOG("alpha = %d", labelRef.size());
			this->addChild(label, 2);
			//		label->setGlobalZOrder(6);
			auto listener = EventListenerTouchOneByOne::create();
			//listener->setSwallowTouches(true);
			label->touchBeganCallback = CC_CALLBACK_2(SmashTheRock::onTouchBegan, this);
			label->touchEndedCallback = CC_CALLBACK_2(SmashTheRock::onTouchEnded, this);
			//	listener->onTouchBegan = CC_CALLBACK_2(SmashTheRock::onTouchBegan, this);
			//listener->onTouchCancelled = CC_CALLBACK_2(SmashTheRock::onTouchCancelled, this);
			//_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, label);
		}

	}



	audio = CocosDenshion::SimpleAudioEngine::getInstance();
	//audio->playBackgroundMusic("smash_de_rock/Smash Rock  BG sound.wav", true);
	//audio->setEffectsVolume(1.0f);
	masking();
}
void SmashTheRock::createSkeletonCharacter()
{
	CCLOG("hello");
	skeletonCharacter = new SkeletonCharacter();
//	skeletonCharacter->createSkeletonNode(NULL, "", "", "human_skeleton.csb");
}

void SmashTheRock::addMainCharacterToScene(cocostudio::timeline::SkeletonNode* skeletonNode) {
	auto visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	skeletonNode->setPosition(Vec2(origin.x + (visibleSize.width / 2) + 650, origin.y + (visibleSize.height / 2) + 70));
	auto pos = (origin.x + (visibleSize.width / 2) + 650);
	CCLOG("pos %f", pos);
	this->addChild(skeletonNode,1);

}
void SmashTheRock::jump()
{
	auto visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
	//audio->playEffect("smash_de_rock/PUNCH.mp3", false);

	
}

void SmashTheRock :: hit()
{
	
	auto boxLeft = centre->getChildByName("boxing_gloves_left");
	auto action = MoveBy::create(0.25, Point(-250, 250));
	auto rev = action->reverse();
	auto boxRight = centre->getChildByName("boxing_gloves_right");
	auto action1 = MoveBy::create(0.25, Point(300, 250));
	auto tRight = TargetedAction::create(boxRight, action1);
	auto rev1 = tRight->reverse();
	auto tRev1 = TargetedAction::create(boxRight, rev1); 
	auto callbackStart = CallFunc::create(CC_CALLBACK_0(SmashTheRock::masking, this));
	auto callbackStart1 = CallFunc::create(CC_CALLBACK_0(SmashTheRock::blast, this));
	auto callbackStart2 = CallFunc::create(CC_CALLBACK_0(SmashTheRock::jump, this));
	auto seq = Sequence::create(callbackStart1,action, callbackStart2,  rev,  tRight, callbackStart1, callbackStart2, tRev1,  callbackStart, NULL);
	boxLeft->runAction(seq);
	//masking();
	
	
}


void SmashTheRock::blast()
{   
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto blast = centre->getChildByName("hit");
	blast->setGlobalZOrder(2);
	auto action2 = Blink::create(0.25, 1);
	blast->runAction(action2);
	auto white = centre->getChildByName("white");
	white->setGlobalZOrder(2);
	auto action3 = Blink::create(0.25, 1);
	white->runAction(action3);

	if (click == 5)
	{
		Vector <Node*> children = centre->getChildren();
		for (auto item = children.rbegin(); item != children.rend(); ++item) {
			Node * monsterItem = *item;
			std::string str = monsterItem->getName().c_str();
			if ((str.compare("broken_01") == 0) || (str.compare("broken_02") == 0)) {
				monsterItem->setVisible(true);
			}
		}
		
	}

}
void SmashTheRock::masking()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	Alphabet *label1 = Alphabet::createWithSize(mychar, 200);
//	label1 = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), Alphabets.at(key).c_str());
//	label1 = Label::createWithTTF(Alphabets.at(key).c_str(), "fonts/BalooBhai-Regular.ttf", 256);
	label1->setScale(1.5);

	
	const std::vector<std::string> rocks = { "smash_de_rock/cracktexture_00.png","smash_de_rock/cracktexture_01.png","smash_de_rock/cracktexture_02.png","smash_de_rock/cracktexture_03.png","smash_de_rock/cracktexture_04.png","smash_de_rock/cracktexture_05.png","smash_de_rock/cracktexture_05.png" };
    target = Sprite::createWithSpriteFrameName(rocks.at(click).c_str());
	
	CCLOG("rock = %s", rocks.at(click).c_str());
	CCLOG("click %d", click);
	maskedFill = ClippingNode::create(label1);

	maskedFill->setAlphaThreshold(0.9);

	maskedFill->addChild(target,2);
	//maskedFill->setGlobalZOrder(3);
	maskedFill->setContentSize(cocos2d::Size(300, 300));
	maskedFill->setPosition(Vec2(origin.x + (visibleSize.width / 2)  , origin.y + (visibleSize.height / 2) + 480));
	target->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(maskedFill,2);
	flag = true;
	//maskedFill->setGlobalZOrder(3);
	if (click == 5)
	{
		auto audio1 = CocosDenshion::SimpleAudioEngine::getInstance();
		audio1->playEffect("smash_de_rock/Concrete break.wav", false);
		audio1->setEffectsVolume(10.0f);
		//maskedFill->removeChild(target);
		for (int i = 0; i < 6; i++)
		{
			this->removeChild(maskedFill);
		}
		//this->removeChild(label1);
		for (int i = 0; i < labelRef.size(); i++)
		{
			this->removeChild(labelRef.at(i));
		}
		
	
		this->scheduleOnce(schedule_selector(SmashTheRock::change), 2.0f);
		
	}

}
void SmashTheRock::change(float dt)
{
	stopAllActions();
	menu->showScore();
}

bool SmashTheRock::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{

	//isTouching = true;
	//	touchPosition = touch->getLocation().x;
	Alphabet * target =(Alphabet *) event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int dis = (220.00 / 2560)*(visibleSize.width);
	auto mystr = LangUtil::convertUTF16CharToString(mychar);
	auto myletter = target->getChar();
	//	CCRect targetRectangle = CCRectMake(0,0, target->getContentSize().width, target->getContentSize().height);
	if ( target->getBoundingBox().containsPoint( touch->getLocation()) && flag )
	{
		menu->pickAlphabet(myletter, mychar, true);
		flag = false;
		if (myletter == mychar)
		{
			int indexj = (target->getPositionX());
			int indexi = (target->getPositionY());
			CCLOG("target x = %d", indexi);
			int tempi = ((indexi + 310) / sizei)-1 ;
			int tempj = ((indexj - (dis)) / sizej)-1;
			CCLOG("tempi x = %d", tempi);
			CCLOG("tempj x = %d", tempj);
			val = ((tempi) * 7) + tempj;
			CCLOG("val x = %d", val);
            auto showright = rightRef.at(val);
			showright->setVisible(true);
			this->removeChild(blockRef.at(val));

			_eventDispatcher->removeEventListenersForTarget(target, false);
			hit();
			click++;
			
		}
		else
		{
			int indexj1 = (target->getPositionX());
			int indexi1 = (target->getPositionY());
			CCLOG("target x = %d", indexi1);
			int tempi1 = ((indexi1 + 310) / sizei)-1;
			int tempj1 = ((indexj1 - (dis)) / sizej)-1;
			CCLOG("tempi1 x = %d", tempi1);
			CCLOG("tempj1 x = %d", tempj1);
			val1 = ((tempi1) * 7) + tempj1;
			CCLOG("val1 x = %d", val1);
			auto showwrong = wrongRef.at(val1);
			showwrong->setVisible(true);
			
			this->removeChild(labelRef.at(val1));
			this->removeChild(blockRef.at(val1));
			clickWrong++;
			CCLOG("clickwrong = %d", clickWrong);
			flag = true;
			FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
			maskedFill->runAction(shake);
			
			
			
			return false;
		}
		
		return false;
	}
	
}
void SmashTheRock::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{

	//	cocos2d::Node * target = event->getCurrentTarget();
	//	target->setPositionX(touch->getLocation().x);

	//touchPosition = touch->getLocation().x;

}
void SmashTheRock::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	CCLOG("wwwwwwwwww");
	//isTouching = false;

}
void SmashTheRock::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}
//void HelloWorld::menuCloseCallback(Ref* pSender)
//{
//  Director::getInstance()->end();

//#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
//  exit(0);
//#endif
//}
