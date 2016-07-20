#include "SmashTheRockScene.h"
#include "SmashTheRockLevelScene.h"

#include "../puzzle/CharGenerator.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"


#include "editor-support/cocostudio/CocoStudio.h"

#define COCOS2D_DEBUG 1

USING_NS_CC;
const std::vector<std::string> Alphabets = { "A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" };
int key;
int val;
int val1;
int sizei;
int sizej;
std::string mapString;
Scene* SmashTheRock::createScene(std::string st )
{
	mapString = st.c_str();
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = SmashTheRock::create();

	// add layer as a child to scene
	scene->addChild(layer);

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
	//CCLOG("size %f", visibleSize);
	//CCLOG("origin %f", origin);
	/////////////////////////////
	alphabetMap.insert(std::pair<std::string, std::int32_t>("A", 0));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("B", 1));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("C", 2));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("D", 3));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("E", 4));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("F", 5));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("G", 6));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("H", 7));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("I", 8));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("J", 9));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("K", 10));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("L", 11));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("M", 12));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("N", 13));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("O", 14));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("P", 15));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("Q", 16));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("R", 17));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("S", 18));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("T", 19));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("U", 20));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("V", 21));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("W", 22));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("X", 23));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("Y", 24));
	alphabetMap.insert(std::pair<std::string, std::int32_t>("Z", 25));

	key = alphabetMap.at(mapString.c_str());


    background = CSLoader::createNode("smash_de_rock/MainScene.csb");
	//background->setPosition(Point((visibleSize.width / 2) + origin.x, (visibleSize.height / 2) + origin.y));
	this->addChild(background, 0);
	

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("smash_de_rock/smashderock_01.plist");
	auto spritecache2 = SpriteFrameCache::getInstance();
	spritecache2->addSpriteFramesWithFile("smash_de_rock/smashderock_02.plist");

	//auto spritecache = SpriteFrameCache::getInstance();
	//spritecache->addSpriteFramesWithFile("smashderock.plist");
	auto block = Sprite::createWithSpriteFrameName("smash_de_rock/letter_normal.png");
	//int blockWidth = block->getContentSize().width;
	//int blockHeight = block->getContentSize().height;

	std::vector<std::vector<char>> charkey = CharGenerator::getInstance()->generateMatrixForChoosingAChar(mapString.at(0),3,11,50);

	for (int i = 1; i < 4; i++)
	{
		int blockHeight = i*(block->getContentSize().height + 20) + 30;
		sizei = block->getContentSize().height + 20;
		CCLOG("sizei = %d", sizei);
		for (int j = 1; j < 12; j++)
		{
			auto block1 = Sprite::createWithSpriteFrameName("smash_de_rock/letter_normal.png");
			auto right = Sprite::createWithSpriteFrameName("smash_de_rock/letter_correct.png");
			auto wrong = Sprite::createWithSpriteFrameName("smash_de_rock/letter_wrong.png");
			int blockWidth = j*(block->getContentSize().width + 30) + 50;
			sizej = block->getContentSize().width + 30;
			CCLOG("sizej = %d", sizej);
			block1->setAnchorPoint(Vec2(0.5, 0.5));
			block1->setPositionX(blockWidth);
			block1->setPositionY(blockHeight);
			right->setAnchorPoint(Vec2(0.5, 0.5));
			right->setPositionX(blockWidth);
			right->setPositionY(blockHeight);
			right->setVisible(false);
			wrong->setAnchorPoint(Vec2(0.5, 0.5));
			wrong->setPositionX(blockWidth);
			wrong->setPositionY(blockHeight);
			wrong->setVisible(false);
			blockRef.pushBack(block1);
			rightRef.pushBack(right);
			wrongRef.pushBack(wrong);
			this->addChild(block1);
			this->addChild(right);
			this->addChild(wrong);
			std::string str = Alphabets.at(cocos2d::RandomHelper::random_int(key, (key + 20)) % 20).c_str();
			char str1 = charkey.at(i-1).at(j-1);
			std::string ttttt(&str1,1) ;
			label = Label::createWithTTF(ttttt, "fonts/BalooBhai-Regular.ttf", 256);
			//CCLOG("alpha = %s",str.c_str());
			label->setScale(0.6);
			label->setPositionX(blockWidth );
			CCLOG("label x = %d", blockWidth);
			label->setPositionY(blockHeight - 130);
			label->setColor(ccc3(255, 255, 255));
			label->enableShadow(Color4B::GRAY, Size(5, -5), -50);
			label->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
			label->setName(ttttt);
			labelRef.pushBack(label);
			this->addChild(label,1);
			
			auto listener = EventListenerTouchOneByOne::create();
			//listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(SmashTheRock::onTouchBegan, this);
			listener->onTouchCancelled = CC_CALLBACK_2(SmashTheRock::onTouchCancelled, this);
			_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, label);
		}
		
	}

	



	//createSkeletonCharacter();
	//mainGameCharacter = skeletonCharacter->getSkeletonNode();
	//mainGameCharacter->setContentSize(cocos2d::Size(200.0f, 600.0f));
	//addMainCharacterToScene(mainGameCharacter);

	masking();
	click++;
	this->scheduleUpdate();

	return true;
}
void SmashTheRock::update(float dt)
{
	if (maskedFill != nullptr) {
	//	CCLOG("mainGameCharacter = %f", maskedFill->getBoundingBox().origin.x);
		//if (mainGameCharacter->getBoundingBox().intersectsRect(maskedFill->getBoundingBox())) {
			//mainGameCharacter->pause();
				
			//mainGameCharacter->skel
			//cocostudio::timeline::ActionTimeline *timeLine = CSLoader::createTimeline("human_skeleton.csb");
			//timeLine->retain();
			//mainGameCharacter->runAction(timeLine);
			//timeLine->gotoFrameAndPause(0);
			//timeLine->play("run", true);

		//}
	}
	
}
void SmashTheRock::createSkeletonCharacter()
{
	CCLOG("hello");
	skeletonCharacter = new SkeletonCharacter();
	skeletonCharacter->createSkeletonNode("human_skeleton.csb");
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

	cocostudio::timeline::ActionTimeline *timeLine = CSLoader::createTimeline("human_skeleton.csb");
	timeLine->retain(); //released later on
	mainGameCharacter->runAction(timeLine);
	timeLine->setTimeSpeed(1.5);
	timeLine->play("run", true);
	auto action = MoveBy::create(1.5, Point(-1100, 0));
	mainGameCharacter->runAction(action);
	



}
void SmashTheRock :: hit()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto blast = Sprite::createWithSpriteFrameName("smash_de_rock/hit.png");
	blast->setPosition(Vec2(origin.x + (visibleSize.width / 2) + 100, origin.y + (visibleSize.height / 2) + 450));
	this->addChild(blast);
	blast->setVisible(false);
	auto action2 = Blink::create(0.25, 1);
	//blast->runAction(action2);
	auto tblast = TargetedAction::create(blast, action2);
	auto boxLeft = background->getChildByName("boxing_gloves_left");
	auto action = MoveBy::create(0.25, Point(-120, 250));
	auto rev = action->reverse();
	auto boxRight = background->getChildByName("boxing_gloves_right");
	auto action1 = MoveBy::create(0.25, Point(500, 250));
	auto tRight = TargetedAction::create(boxRight, action1);
	auto rev1 = tRight->reverse();
	auto tRev1 = TargetedAction::create(boxRight, rev1); 
	auto callbackStart = CallFunc::create(CC_CALLBACK_0(SmashTheRock::masking, this));


	auto seq = Sequence::create(action, tblast, rev,  tRight, tblast, tRev1,  callbackStart, NULL);
	boxLeft->runAction(seq);
	//masking();
	
	
	
}



void SmashTheRock::masking()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//label1 = Label::createWithBMFont("baloo_bhai.fnt", Alphabets.at(key).c_str());
	label1 = Label::createWithTTF(Alphabets.at(key).c_str(), "fonts/BalooBhai-Regular.ttf", 256);
	label1->setScale(3.7);

	
	const std::vector<std::string> rocks = { "smash_de_rock/cracktexture_00.png","smash_de_rock/cracktexture_01.png","smash_de_rock/cracktexture_02.png","smash_de_rock/cracktexture_03.png","smash_de_rock/cracktexture_04.png","smash_de_rock/cracktexture_05.png" };
    target = Sprite::createWithSpriteFrameName(rocks.at(click).c_str());
	
	CCLOG("rock = %s", rocks.at(click).c_str());
	CCLOG("click %d", click);
	maskedFill = ClippingNode::create(label1);

	maskedFill->setAlphaThreshold(0.9);

	maskedFill->addChild(target,-1);
	
	maskedFill->setContentSize(cocos2d::Size(300, 300));
	maskedFill->setPosition(Vec2(origin.x + (visibleSize.width / 2) + 100 , origin.y + (visibleSize.height / 2) + 450));
	//maskedFill->setAnchorPoint(Vec2(0.5,0.5));
	//Texture2D::TexParams tp = { GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT };
	//maskedFill->draw();

/*	auto myBox = DrawNode::create();
	Vec2 vertices[] =
	{
		Vec2(maskedFill->getPositionX() , maskedFill->getPositionY()  + maskedFill->getContentSize().height),
		Vec2(maskedFill->getContentSize().width + maskedFill->getPositionX(), maskedFill->getPositionY()  + maskedFill->getContentSize().height),
		Vec2(maskedFill->getContentSize().width + maskedFill->getPositionX() , maskedFill->getPositionY() ),
		Vec2(maskedFill->getPositionX() , maskedFill->getPositionY() )
	};
	myBox->drawPolygon(vertices, 4, Color4F(3.0f, 0.3f, 0.3f, 1), 3, Color4F(0.2f, 0.2f, 0.2f, 1));

	this->addChild(myBox, 2);*/


	//target->getTexture()->setTexParameters(tp);

//	target->setTextureRect(Rect(400, 400, 2000, 2000));
	target->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(maskedFill);
}
bool SmashTheRock::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	//isTouching = true;
	//	touchPosition = touch->getLocation().x;
	cocos2d::Node * target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());



	//	CCRect targetRectangle = CCRectMake(0,0, target->getContentSize().width, target->getContentSize().height);
	if ( target->getBoundingBox().containsPoint( touch->getLocation()))
	{
		if (target->getName().compare(mapString.c_str()) == 0)
		{
			int indexj = (target->getPositionX());
			int indexi = (target->getPositionY());
			CCLOG("target x = %d", indexi);
			int tempi = ((indexi - 100) / sizei) ;
			int tempj = (indexj - 50) / sizej;
			CCLOG("tempi x = %d", tempi);
			CCLOG("tempj x = %d", tempj);
			val = ((tempi) * 11) + tempj-1;
			auto showright = rightRef.at(val);
			showright->setVisible(true);
			_eventDispatcher->removeEventListenersForTarget(target, false);
			hit();
			click++;
			if (click == 6)
			{
				Director::getInstance()->replaceScene(SmashTheRockLevelScene::createScene());

			}
		}
		else
		{
			int indexj1 = (target->getPositionX());
			int indexi1 = (target->getPositionY());
			CCLOG("target x = %d", indexi1);
			int tempi1 = (indexi1 - 100) / sizei;
			int tempj1 = (indexj1 - 50) / sizej;
			CCLOG("tempi1 x = %d", tempi1);
			CCLOG("tempj1 x = %d", tempj1);
			val1 = ((tempi1) * 11) + tempj1-1;
			auto showwrong = wrongRef.at(val1);
			showwrong->setVisible(true);
			this->removeChild(labelRef.at(val1));
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
