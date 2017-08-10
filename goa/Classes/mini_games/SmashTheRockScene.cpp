#include "SmashTheRockScene.h"
#include "SmashTheRockLevelScene.h"
#include "../effects/FShake.h"
#include "../puzzle/CharGenerator.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"

#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../menu/HelpLayer.h"

#include "../menu/StartMenuScene.h"
#define COCOS2D_DEBUG 1

USING_NS_CC;
int key;
int val;
int val1;
int sizei;
int sizej;
SmashTheRock::SmashTheRock():
	_lesson(0, 0.5)
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

	// This is just for github testing .... in kiranbv branch

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
	menu->setMaxPoints(5);
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
	//mychar = LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1];
	//mychar = CharGenerator::getInstance()->generateAChar();
/*	if ((menu->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) && LangUtil::getInstance()->getLang() == "swa") {
		int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
		mychar = LangUtil::getInstance()->getAllCharacters()[randomNumber];//_crossTheBridgeLevelMapping.at(_gameCurrentLevel);
	}
	else {
		mychar = LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1];
	}
*/
	auto vmc = _lesson.getMultiChoices(1,0);

	mychar = vmc[0].question;

    _charkey = CharGenerator::getInstance()->generateMatrixForChoosingAChar(LangUtil::getInstance()->convertStringToUTF16Char(mychar), 2, 7, 50);
	bool firstMychar = true;
	int dis = (220.0 / 2560)*visibleSize.width;
	auto keyboard = Node::create();
	float xx = 0.0f;
	float yy = 0.0f;

	for (int i = 0; i < 2; i++)
	{
		int blockHeight = i*(block->getContentSize().height + 110) + 10;
		sizei = (block->getContentSize().height + 110);
		CCLOG("sizei = %d", sizei);
		yy = i* (block->getContentSize().height * 1.6);
		for (int j = 0; j < 7; j++)
		{
			xx = j * (block->getContentSize().width * 1.8);
			auto block1 = Sprite::createWithSpriteFrameName("smash_de_rock/letter_normal.png");
			auto right = Sprite::createWithSpriteFrameName("smash_de_rock/letter_correct.png");
			auto wrong = Sprite::createWithSpriteFrameName("smash_de_rock/letter_wrong.png");
			int blockWidth = j*(block->getContentSize().width + 140) + dis;
			sizej = (block->getContentSize().width + 140);
			CCLOG("sizej = %d", sizej);
			block1->setAnchorPoint(Vec2(0, 0));
			block1->setPositionX(xx);
			block1->setPositionY(yy);
			block1->setScaleX(1.6);
			block1->setScaleY(1.4);
			right->setAnchorPoint(Vec2(0, 0));
			right->setPositionX(xx);
			right->setPositionY(yy);
			right->setScaleX(1.6);
			right->setScaleY(1.4);
			right->setVisible(false);
			wrong->setAnchorPoint(Vec2(0, 0));
			wrong->setPositionX(xx);
			wrong->setPositionY(yy);
			wrong->setScaleX(1.6);
			wrong->setScaleY(1.4);
			wrong->setVisible(false);
			blockRef.pushBack(block1);
			rightRef.pushBack(right);
			wrongRef.pushBack(wrong);
			keyboard->addChild(block1, 2);
			//	block1->setGlobalZOrder(6);
			keyboard->addChild(right, 2);
			//	right->setGlobalZOrder(6);
			keyboard->addChild(wrong, 2);
			//	wrong->setGlobalZOrder(6);
			//	std::string str = Alphabets.at(cocos2d::RandomHelper::random_int(key, (key + 20)) % 20).c_str();
			wchar_t str1 = _charkey.at(i ).at(j );
			//std::string ttttt(&str1,1) ;
			//label = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), ttttt);
			//label = Label::createWithTTF(ttttt, "fonts/BalooBhai-Regular.ttf", 256);
			//CCLOG("alpha = %s",str.c_str());
            auto mystr = LangUtil::convertUTF16CharToString(str1);
			Alphabet *label = Alphabet::createWithSize(mystr, 350);
			//	label->setScale(0.15);
			label->setPositionX(xx + block->getContentSize().width/2);
			auto letter = label->getString();
			label->setPositionY(yy - block->getContentSize().height/2);
			if (str1 == LangUtil::getInstance()->convertStringToUTF16Char(mychar) && firstMychar)
			{
				helpX = xx +(block->getContentSize().width * 0.9);
				helpY = yy +(block->getContentSize().height * 0.8);
				firstMychar = false;
			}
		    label->setAnchorPoint(Vec2(0.2,-0.1)); //Vec2::ANCHOR_MIDDLE_BOTTOM
			label->setName(mystr);
			//label->setScaleX(0.35);
			//label->setScaleY(0.45);
			labelRef.pushBack(label);
//			CCLOG("alpha = %d", labelRef.size());
			keyboard->addChild(label, 2);
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

	keyboard->setContentSize(Size(block->getContentSize().width * 1.8 * 7, block->getContentSize().height * 1.6 * 2));
	this->addChild(keyboard,2);
	keyboard->setAnchorPoint(Vec2(0.5, 0.5));
	keyboard->setPositionX(visibleSize.width / 2);
	keyboard->setPositionY(visibleSize.height*0.25);
	keyboard->setName("keyboard");

	audio = CocosDenshion::SimpleAudioEngine::getInstance();
	//audio->playBackgroundMusic("smash_de_rock/Smash Rock  BG sound.wav", true);
	//audio->setEffectsVolume(1.0f);
	masking();
	if (menu->getCurrentLevel() == 1 && click == 0) {
		gameHelp();
	}
}
void SmashTheRock::gameHelp()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_helpFlage = true;
	//game help only for first level

	auto mystr =mychar;
	auto label = this->getChildByName("keyboard")->getChildByName(mystr);
	auto keyboard = this->getChildByName("keyboard");
	helpX = (visibleSize.width / 2) - (keyboard->getContentSize().width / 2 - helpX);
	helpY = (visibleSize.height *0.25) - (keyboard->getContentSize().height / 2 - helpY);
	auto optionSize = label->getContentSize();
	auto optionPosition = label->getPosition();
	auto help = HelpLayer::create(Rect(helpX, helpY, 200, 200), Rect(visibleSize.width/2,visibleSize.height/2 + 480,600,800));
	help->click(Vec2(helpX, helpY));
	help->setName("helpLayer");
	this->addChild(help,2);
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
	//audio->playEffect("smash_de_rock/PUNCH.ogg", false);

	
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
    
	_label1 = Alphabet::createWithSize(mychar, 1300);
//	label1 = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), Alphabets.at(key).c_str());
//	label1 = Label::createWithTTF(Alphabets.at(key).c_str(), "fonts/BalooBhai-Regular.ttf", 256);
	//_label1->setScale(1.5);

	
	const std::vector<std::string> rocks = { "smash_de_rock/cracktexture_00.png","smash_de_rock/cracktexture_01.png","smash_de_rock/cracktexture_02.png","smash_de_rock/cracktexture_03.png","smash_de_rock/cracktexture_04.png","smash_de_rock/cracktexture_05.png","smash_de_rock/cracktexture_05.png" };
    target = Sprite::createWithSpriteFrameName(rocks.at(click).c_str());
	
	CCLOG("rock = %s", rocks.at(click).c_str());
	CCLOG("click %d", click);
	maskedFill = ClippingNode::create(_label1);

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
		flag = false;
		auto audio1 = CocosDenshion::SimpleAudioEngine::getInstance();
		audio1->playEffect("sounds/sfx/concrete_break.ogg", false);
		//audio1->setEffectsVolume(10.0f);
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
		CCLOG("fffffffffffffffffffffffff");
	
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
	auto keyboard = this->getChildByName("keyboard");

	//isTouching = true;
	//	touchPosition = touch->getLocation().x;
	Alphabet * target =(Alphabet *) event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int dis = (220.00 / 2560)*(visibleSize.width);
	//auto mystr = LangUtil::convertUTF16CharToString(mychar);
	auto myletter = target->getChar();
	auto size1 = target->getContentSize();
	Rect rect = Rect(0, 0, size1.width,size1.height);
	//	CCRect targetRectangle = CCRectMake(0,0, target->getContentSize().width, target->getContentSize().height);
	if (rect.containsPoint(location) && flag )
	{
		auto scale = ScaleBy::create(0.1, 0.75);
		target->runAction(Sequence::create(scale, scale->reverse(), NULL));
		menu->pickWord(myletter,mychar, true);
		flag = false;
		int myIndex = 0;
		for (int i = 0; i < labelRef.size(); i++) {
			if (target == labelRef.at(i)) {
				CCLOG("hhhhhhhiiiiiiiiii");
				myIndex = i;
			}
		}
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
            auto showright = rightRef.at(myIndex);
			showright->setVisible(true);
			keyboard->removeChild(blockRef.at(myIndex));

			_eventDispatcher->removeEventListenersForTarget(target, false);
			hit();
			click++;
			menu->addPoints(1);

			menu->pickWord(mychar, myletter, true);

			if (_helpFlage) {
				this->removeChildByName("helpLayer");
				_helpFlage = false;
			}
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
			auto showwrong = wrongRef.at(myIndex);
			showwrong->setVisible(true);
			
			keyboard->removeChild(labelRef.at(myIndex));
			keyboard->removeChild(blockRef.at(myIndex));
			clickWrong++;
			CCLOG("clickwrong = %d", clickWrong);
			flag = true;
			FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
			maskedFill->runAction(shake);
			menu->addPoints(-1);
			menu->pickWord(mychar, myletter, true);
			
			
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
