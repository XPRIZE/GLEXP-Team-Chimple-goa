#include "decomon.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"
#include "../StartMenuScene.h"
#include "string.h"

USING_NS_CC;
Scene* decomon::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = decomon::create();

	// add layer as a child to scene
	scene->addChild(layer);
   // layer->_menuContext = MenuContext::create(layer, decomon::gameName());
	//auto scene->addChild(layer->_menuContext);
	// return the scene
	return scene;
}
// on "init" you need to initialize your instance
bool decomon::init()
{
	if (!Layer::init())
	{
		return false;
	}
	//flag = -1;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	/*auto temp = CSLoader::createNode("patchthewall.csb");
	auto alpha1 = temp->getChildren();
	//temp->setPositionX(-500)
	this->addChild(temp);

	slideBar = (cocos2d::ui::Slider *)(temp->getChildByName("Slider_3"));
	slideBar->setPercent(1);
	slideBar->setEnabled(false);*/

	//SpriteFrameCache *spriteCache = SpriteFrameCache::getInstance();
	//spriteCache->addSpriteFramesWithFile("fort_plist.plist");

	/*auto alphagrids = Sprite::createWithSpriteFrameName("alphagrid.png");
	alphagrids->setPositionX(visibleSize.width - alphagrids->getContentSize().width/2);
	alphagrids->setPositionY(visibleSize.height/2);
	this->addChild(alphagrids, 6);

	backgroundMusic = CocosDenshion::SimpleAudioEngine::getInstance();
	backgroundMusic->playBackgroundMusic("sounds/patchthewall.mp3", true);*/
	 
	auto matrix = CharGenerator::getInstance()->generateAChar();

	// position the sprite on the center of the screen
	
	//for (int i = 0; i < 5; i++) {
	//	int hegbox = (i * 210)+420 ;
	//	for (int j = 0; j < 3; j++)
	//	{
	//		int randgen = cocos2d::RandomHelper::random_int(0, 25);
			//const char* level = Alphabets.at(randgen).c_str();
		//	int weibox = visibleSize.width -200- (j * 340);
//			auto mystr = LangUtil::convertUTF16CharToString(matrix[1][1]);
		auto label  = Alphabet::createWithSize(matrix, 3000);
			
			//auto label = Label::createWithTTF(matrix[j][i], "letters.ttf", 200);
			label->setPositionX(origin.x + visibleSize.width/2);
			label->setPositionY(origin.y + visibleSize.height/2);
//		label->setColor(ccc3(0, 0, 0));
//		label->setAnchorPoint(Vec2(0.5, 0.5));
//			label->setName(mystr);
			this->addChild(label, 7);
/*			auto listener = EventListenerTouchOneByOne::create();
			listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(decomon::onTouchBegan, this);
			listener->onTouchMoved = CC_CALLBACK_2(decomon::onTouchMoved, this);
			listener->onTouchEnded = CC_CALLBACK_2(decomon::onTouchEnded, this);
			listener->onTouchCancelled = CC_CALLBACK_2(decomon::onTouchCancelled, this);
*/		//	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, label);
	//	}	
	
	//} 
	//this->scheduleUpdate();
	// add the sprite as a child to this layer
//	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(decomon::startGame, this));

	return true;
}

void decomon::startGame() {
 //   _menuContext->showStartupHelp(CC_CALLBACK_0(decomon::callingBlast, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(PatchTheWall::callingBlast, this)), NULL));
}
bool decomon::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	/*CCLOG("touchdshfdtj= %d", gameX.size());
	auto parentNode = event->getCurrentTarget();
	//CCLOG("hsxhschjjhjsh = %f", parentNode->getContentSize().width);
	Point touchPosition = parentNode->convertToNodeSpace(touch->getLocation());
	if (parentNode->getBoundingBox().containsPoint(touch->getLocation()) && flag1) {
		flag1 = false;
		no = (Alphabet*)parentNode;
		decomon::x = parentNode->getPositionX();
		decomon::y = parentNode->getPositionY();
		//CCLOG("touch");

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		auto path = LangUtil::getInstance()->getAlphabetSoundFileName(no->getChar());
		audio->playEffect(path.c_str(), false);

		flag = 0;
		auto touchaction = ScaleTo::create(0.1, .7);
		no->runAction(touchaction);
		return true;
	}*/

	return false;
}
void decomon::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{
	
}
void decomon::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	

	//isTouching = false;
}
void decomon::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}
void decomon::update(float dt) {
	//if (slideBar->getPercent() == 100) {
     //   _menuContext->showScore();
	///}
	
}

/*void decomon::fort(float dt) {
	
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	int randgen = cocos2d::RandomHelper::random_int(0, 25);
	//const char* level = Alphabets.at(randgen).c_str();
    this->removeChild(blastImage);
	auto block = Sprite::createWithSpriteFrameName("crack.png");
	block->setPositionX(randx);
	block->setPositionY(randy);
	this->addChild(block,3);
	//block->setName(level);
	crackReff.pushBack(block);
	
	//auto label = Label::createWithTTF(level, "letters.ttf", 200);
	int i = cocos2d::RandomHelper::random_int(0, 4);
	int j = cocos2d::RandomHelper::random_int(0, 2);
	//auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
	auto label = Alphabet::createWithSize(matrix[j][i], 300);
	label->setPositionX(randx);
	label->setPositionY(randy);
	label->setColor(ccc3(218, 239, 237));
	//label->setName(mystr);
	this->addChild(label, 4);
	blastAlphaReff.pushBack(label);
}
void decomon::Blast(float dt) {
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	int mykey = cocos2d::RandomHelper::random_int(0, 19);

	if (breakFlag.at(mykey) == false) {
		randx = gameX.at(mykey);
		randy = gameY.at(mykey);
		breakFlag.at(mykey) = true;
		auto alpha_animation = CSLoader::createTimeline("blast.csb");
		blastImage = CSLoader::createNode("blast.csb");
		blastImage->runAction(alpha_animation);
		blastImage->setPositionX(randx - 250);
		blastImage->setPositionY(randy - 250);
		this->addChild(blastImage);

		alpha_animation->gotoFrameAndPlay(0, false);
		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		audioBg->playEffect("cannonball/gamesound/meteorblast.wav", false, 1, 1, .2);

		this->scheduleOnce(schedule_selector(decomon::fort), 1.0f);
	}
	else {
		this->Blast(0.0);
	}
}*/
void decomon::gridTouch(float dt)
{
	//flag1 = true;
}
void decomon::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}