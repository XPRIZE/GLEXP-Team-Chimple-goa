#include "PatchTheWallScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"
#include "../StartMenuScene.h"
#include "string.h"

USING_NS_CC;
//const std::vector<std::string> Alphabets = {"A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};

float PatchTheWall::x;
float PatchTheWall::y;
PatchTheWall::PatchTheWall() {

}
PatchTheWall::~PatchTheWall() {
	backgroundMusic->stopBackgroundMusic();
}
Scene* PatchTheWall::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = PatchTheWall::create();

	// add layer as a child to scene
	scene->addChild(layer);
    CCLOG("class name %s", typeid(layer).name());
    layer->_menuContext = MenuContext::create(layer, PatchTheWall::gameName());
	scene->addChild(layer->_menuContext);
	// return the scene
	return scene;
}
// on "init" you need to initialize your instance
bool PatchTheWall::init()
{
	if (!Layer::init())
	{
		return false;
	}
	flag = -1;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto temp = CSLoader::createNode("patchthewall.csb");
	auto alpha1 = temp->getChildren();
	//temp->setPositionX(-500)
	this->addChild(temp);

	slideBar = (cocos2d::ui::Slider *)(temp->getChildByName("Slider_3"));
	slideBar->setPercent(1);
	slideBar->setEnabled(false);

	SpriteFrameCache *spriteCache = SpriteFrameCache::getInstance();
	spriteCache->addSpriteFramesWithFile("fort_plist.plist");

	auto alphagrids = Sprite::createWithSpriteFrameName("alphagrid.png");
	alphagrids->setPositionX(visibleSize.width - alphagrids->getContentSize().width/2);
	alphagrids->setPositionY(visibleSize.height/2);
	this->addChild(alphagrids, 6);

	backgroundMusic = CocosDenshion::SimpleAudioEngine::getInstance();
	backgroundMusic->playBackgroundMusic("sounds/patchthewall.mp3", true);
	 
	matrix = CharGenerator::getInstance()->generateCharMatrix(3, 5);

	// position the sprite on the center of the screen
	
	for (int i = 0; i < 5; i++) {
		int hegbox = (i * 210)+420 ;
		for (int j = 0; j < 3; j++)
		{
			int randgen = cocos2d::RandomHelper::random_int(0, 25);
			//const char* level = Alphabets.at(randgen).c_str();
			int weibox = visibleSize.width -200- (j * 340);
			auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
			auto label  = Alphabet::createWithSize(matrix[j][i], 300);
			
			//auto label = Label::createWithTTF(matrix[j][i], "letters.ttf", 200);
			label->setPositionX(weibox);
			label->setPositionY(hegbox);
			label->setColor(ccc3(73, 39, 20));
			label->setAnchorPoint(Vec2(0.5, 0.5));
			label->setName(mystr);
			this->addChild(label, 7);
			auto listener = EventListenerTouchOneByOne::create();
			listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(PatchTheWall::onTouchBegan, this);
			listener->onTouchMoved = CC_CALLBACK_2(PatchTheWall::onTouchMoved, this);
			listener->onTouchEnded = CC_CALLBACK_2(PatchTheWall::onTouchEnded, this);
			listener->onTouchCancelled = CC_CALLBACK_2(PatchTheWall::onTouchCancelled, this);
			cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, label);
		}	
	}

	for (int ii = 1; ii < 6; ii++) {
		float gridwidth = (ii * 250) + 95;
		for (int jj = 1; jj < 5; jj++) {
			float gridheight = (jj * 220) + 418;
			gameX.push_back(gridwidth);
			gameY.push_back(gridheight);
			breakFlag.push_back(false);

		}
	} 
	//this->scheduleUpdate();
	// add the sprite as a child to this layer
	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(PatchTheWall::startGame, this));

	return true;
}

void PatchTheWall::startGame() {
    _menuContext->showStartupHelp(CC_CALLBACK_0(PatchTheWall::callingBlast, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(PatchTheWall::callingBlast, this)), NULL));
}
void PatchTheWall::callingBlast()
{
	this->schedule(schedule_selector(PatchTheWall::Blast), 5.0f);
	this->scheduleUpdate();
}
bool PatchTheWall::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	//CCLOG("touchdshfdtj= %d", gameX.size());
	auto parentNode = event->getCurrentTarget();
	//CCLOG("hsxhschjjhjsh = %f", parentNode->getContentSize().width);
	Point touchPosition = parentNode->convertToNodeSpace(touch->getLocation());
	if (parentNode->getBoundingBox().containsPoint(touch->getLocation()) && flag1) {
		flag1 = false;
		no = (Alphabet*)parentNode;
		PatchTheWall::x = parentNode->getPositionX();
		PatchTheWall::y = parentNode->getPositionY();
		//CCLOG("touch");

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		auto path = LangUtil::getInstance()->getAlphabetSoundFileName(no->getChar());
		audio->playEffect(path.c_str(), false);

		flag = 0;
		auto touchaction = ScaleTo::create(0.1, .7);
		no->runAction(touchaction);
		return true;
	}

	return false;
}
void PatchTheWall::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{
	no->setPosition(touch->getLocation());
	if(flag==0)
		flag = -1;
	//CCLOG("box size = %f", no->getContentSize().width);
	for (int i = 0; i < blastAlphaReff.size(); i++)
	{
		auto my_point = blastAlphaReff.at(i)->getPosition();
	
		if ((no->getBoundingBox()).containsPoint(my_point) && ((no->getChar()) == (blastAlphaReff.at(i)->getChar())))
		{
			_menuContext->pickAlphabet(no->getChar(), blastAlphaReff.at(i)->getChar(), true);
			int splash = ((crackReff.at(i)->getPositionX() - 95) / 250)-1;
			int splash1 = ((crackReff.at(i)->getPositionY() - 418) / 220)-1;
			int val1 = ((splash1) * 5) + splash;
			breakFlag.at(val1) = false;
			// fades in the sprite in 1 seconds 
			auto fadeIn = FadeOut::create(1.0f);
			blastAlphaReff.at(i)->runAction(fadeIn);
			this->removeChild(crackReff.at(i));
			crackReff.erase(i);
			blastAlphaReff.erase(i);
			no->setOpacity(0);
			score = score + 5;
			slideBar->setPercent(score);
			
			flag = 1;
		}
	}
}
void PatchTheWall::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	if (flag==1) {
		//flag1 = true;
		flag = -1;
//		no->runAction(MoveTo::create(3, Vec2(PatchTheWall::x, PatchTheWall::y)));
		no->setPositionX(PatchTheWall::x);
		no->setPositionY(PatchTheWall::y);
		no->setOpacity(255);
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 1.0f);
	}
	else if(flag==0)
	{
	//	flag1 = true;
		flag = -1;
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 1.0f);
	}
	else if(flag==-1)
	{
		flag = -1;
		//flag1 = true;
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 2.0f);
		no->runAction(MoveTo::create(2, Vec2(PatchTheWall::x, PatchTheWall::y)));
		no->setOpacity(255);
		_menuContext->pickAlphabet('A', 'B', true);
	}
	auto touchaction = ScaleTo::create(1, .375);
	no->runAction(touchaction);

	//isTouching = false;
}
void PatchTheWall::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}
void PatchTheWall::update(float dt) {
	if (slideBar->getPercent() == 100) {
        _menuContext->showScore();
	}
	
}

void PatchTheWall::fort(float dt) {
	
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
void PatchTheWall::Blast(float dt) {
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

		this->scheduleOnce(schedule_selector(PatchTheWall::fort), 1.0f);
	}
	else {
		this->Blast(0.0);
	}
}
void PatchTheWall::gridTouch(float dt)
{
	flag1 = true;
}
void PatchTheWall::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}