#include "PatchTheWallScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "string.h"

USING_NS_CC;
//const std::vector<std::string> Alphabets = {"A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};

float PatchTheWall::x;
float PatchTheWall::y;
cocos2d::Node* PatchTheWall::no;


Scene* PatchTheWall::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = PatchTheWall::create();

	// add layer as a child to scene
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer);
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
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto temp = CSLoader::createNode("patchthewall.csb");
	auto alpha1 = temp->getChildren();
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
	 
	matrix = CharGenerator::getInstance()->generateCharMatrix(3, 7);

	// position the sprite on the center of the screen
	this->schedule(schedule_selector(PatchTheWall::Blast), 5.0f);
	for (int i = 0; i < 7; i++) {
		int hegbox = (i * 175) + 300;
		for (int j = 0; j < 3; j++)
		{
			int randgen = cocos2d::RandomHelper::random_int(0, 25);
			//const char* level = Alphabets.at(randgen).c_str();
			int weibox = visibleSize.width -200 - (j * 276);
			auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
			auto label  = Alphabet::createWithSize(matrix[j][i], 200);
			//auto label = Label::createWithTTF(matrix[j][i], "letters.ttf", 200);
			label->setPositionX(weibox);
			label->setPositionY(hegbox);
			label->setColor(ccc3(132, 131, 131));
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
		float gridwidth = (ii * 280) + 95;
		for (int jj = 1; jj < 5; jj++) {
			float gridheight = (jj * 240) + 418;
			gameX.push_back(gridwidth);
			gameY.push_back(gridheight);
			breakFlag.push_back(false);

		}
	} 
	// add the sprite as a child to this layer
	return true;
}


bool PatchTheWall::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	CCLOG("touchdshfdtj= %d", gameX.size());
	auto parentNode = event->getCurrentTarget();
	//CCLOG("hsxhschjjhjsh = %f", parentNode->getContentSize().width);
	Point touchPosition = parentNode->convertToNodeSpace(touch->getLocation());
	if (parentNode->getBoundingBox().containsPoint(touch->getLocation()) && flag1) {
		flag1 = false;
		PatchTheWall::no = parentNode;
		PatchTheWall::x = parentNode->getPositionX();
		PatchTheWall::y = parentNode->getPositionY();
		CCLOG("touch");
		return true;
	}

	return false;
}
void PatchTheWall::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{
	PatchTheWall::no->setPosition(touch->getLocation());
	CCLOG("box size = %f", PatchTheWall::no->getContentSize().width);
	for (int i = 0; i < blastAlphaReff.size(); i++)
	{
		auto my_point = blastAlphaReff.at(i)->getPosition();
		_menuContext->pickAlphabet(blastAlphaReff.at(i)->getName().at(0), PatchTheWall::no->getName().at(0), true);
		if ((PatchTheWall::no->getBoundingBox()).containsPoint(my_point) && ((PatchTheWall::no->getName()).compare(blastAlphaReff.at(i)->getName()) == 0))
		{
			CCLOG("overlap");
			CCLOG("lsfaff %f = ", (crackReff.at(i)->getPositionX()-95)/280);
			int splash = (crackReff.at(i)->getPositionX() - 95) / 280;
			breakFlag.at(splash) = false;
			// fades in the sprite in 1 seconds 
			auto fadeIn = FadeOut::create(1.0f);
			blastAlphaReff.at(i)->runAction(fadeIn);
			this->removeChild(crackReff.at(i));
			crackReff.erase(i);
			blastAlphaReff.erase(i);
			PatchTheWall::no->setOpacity(0);
			score = score + 5;
			slideBar->setPercent(score);
			flag = true;
		}

	}
}
void PatchTheWall::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	if (flag) {
		flag1 = true;
		flag = false;
		PatchTheWall::no->setPositionX(PatchTheWall::x);
		PatchTheWall::no->setPositionY(PatchTheWall::y);
		PatchTheWall::no->setOpacity(255);
	}
	else
	{
		flag1 = true;
		PatchTheWall::no->runAction(MoveTo::create(3, Vec2(PatchTheWall::x, PatchTheWall::y)));

	}

	//isTouching = false;
}
void PatchTheWall::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
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
	int i = cocos2d::RandomHelper::random_int(0, 6);
	int j = cocos2d::RandomHelper::random_int(0, 2);
	auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
	auto label = Alphabet::createWithSize(matrix[j][i], 200);
	label->setPositionX(randx);
	label->setPositionY(randy);
	label->setColor(ccc3(218, 239, 237));
	label->setName(mystr);
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
		this->scheduleOnce(schedule_selector(PatchTheWall::fort), 1.0f);
	}
	else {
		this->Blast(0.0);
	}
}
void PatchTheWall::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}