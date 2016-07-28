#include "AlphamonFeedLevelScene.h"
#include "AlphamonFeedScene.h"


USING_NS_CC;

cocos2d::Scene * AlphamonFeedLevelScene::createScene()
{
	
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = AlphamonFeedLevelScene::create();
	//layer->setColor(ccc3(192, 192, 192));
	// add layer as a child to scene
	scene->addChild(layer);

	// return the scene */
	return scene;
}

// on "init" you need to initialize your instance
bool AlphamonFeedLevelScene::init()
{
	//////////////////////////////
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//this->setColor(ccc3(192, 192, 192));
	

	//auto emitter = ParticleFireworks::create();

	//// set the duration
	//emitter->setDuration(ParticleSystem::DURATION_INFINITY);

	//// radius mode
	//emitter->setEmitterMode(ParticleSystem::Mode::RADIUS);

	//// radius mode: 100 pixels from center
	//emitter->setStartRadius(1000);
	//emitter->setStartRadiusVar(0);
	//emitter->setEndRadius(ParticleSystem::START_RADIUS_EQUAL_TO_END_RADIUS);
	//emitter->setEndRadiusVar(0);    // not used when start == end

	//this->addChild(emitter, 10);






	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(AlphamonFeedLevelScene::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(AlphamonFeedLevelScene::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(AlphamonFeedLevelScene::onTouchEnded, this);
	listener->onTouchCancelled = CC_CALLBACK_2(AlphamonFeedLevelScene::onTouchCancelled, this);
	
	int gameWidth;
	int gameHeight;
	auto bg = Sprite::create("testing/BG.png");
	bg->setPositionX(visibleSize.width/2);
	bg->setPositionY(visibleSize.height/2);
	bg->setName("Background");
	this->addChild(bg);

	//gameWidth = (sprite->getContentSize().width / 2);

	auto sprite = Sprite::create("testing/0A.png");
	sprite->setPositionX((sprite->getContentSize().width/2));
	sprite->setPositionY((visibleSize.height/1.5) - (sprite->getContentSize().height / 2));
	sprite->setName("A");
	this->addChild(sprite,0);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);

	gameWidth = (sprite->getContentSize().width);
	gameHeight = (visibleSize.height/1.5) - (sprite->getContentSize().height / 2);

	sprite = Sprite::create("testing/0B.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width /2));
	sprite->setPositionY(gameHeight);
	sprite->setName("B");
	this->addChild(sprite, 0);
//	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, sprite);


	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0C.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("C");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0D.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("D");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0E.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("E");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0F.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("F");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0G.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("G");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0H.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("H");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0I.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("I");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0J.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("J");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0K.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("K");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0L.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("L");
	this->addChild(sprite, 0);

	gameHeight = gameHeight - sprite->getContentSize().height;

	gameWidth = (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0M.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("M");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0N.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("N");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0O.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("O");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0P.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("P");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0Q.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("Q");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0R.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("R");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0S.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("S");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0T.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("T");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0U.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("U");
	this->addChild(sprite, 0);
	
	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0V.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("V");
	this->addChild(sprite, 0);

	gameHeight = gameHeight - sprite->getContentSize().height;

	gameWidth = 4*(sprite->getContentSize().width);
	sprite = Sprite::create("testing/0W.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("W");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0X.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("X");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0Y.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("Y");
	this->addChild(sprite, 0);

	gameWidth = gameWidth + (sprite->getContentSize().width);
	sprite = Sprite::create("testing/0Z.png");
	sprite->setPositionX(gameWidth + (sprite->getContentSize().width / 2));
	sprite->setPositionY(gameHeight);
	sprite->setName("Z");
	this->addChild(sprite, 0);

	
	CCLOG("##########################in level scene#####################");
	return true;
}


void AlphamonFeedLevelScene::menuCloseCallback(Ref* pSender)
{
	Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}
bool AlphamonFeedLevelScene::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	cocos2d::Node * target = event->getCurrentTarget();
	Vector<Node *> children = target->getChildren();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	//auto  location1 = target->convertToWorldSpace(touch->getLocation());
	for (auto iter = children.rbegin(); iter != children.rend(); ++iter) {
		Node *childNode = *iter;
		if ((childNode->getBoundingBox().containsPoint(location) && (childNode->getContentSize().width < 500))) {
			CCLOG("touched alpha = %s", childNode->getName().c_str());
		//	director->runWithScene(scene);
		//	auto scene = AlphamonFeedLevelScene::createScene();

			// run
		//	director->runWithScene(scene);
			Director::getInstance()->replaceScene(TransitionPageTurn::create(1.0, AlphamonFeed::createScene(), false));
			return false;
		}
	}
	return false;

}
void AlphamonFeedLevelScene::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{

	cocos2d::Node * target = event->getCurrentTarget();

	if (touch->getLocation().y < (target->getPositionY() + target->getContentSize().height)) {
		target->setPositionX(touch->getLocation().x - 350);
	}
}
void AlphamonFeedLevelScene::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	//isTouching = false;
}
void AlphamonFeedLevelScene::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}


