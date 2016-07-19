// Main game scene

#include "AlphamonFeedScene.h"
#include "AlphamonFeedLevelScene.h"
#include "cocostudio/CocoStudio.h"
#include "ui\CocosGUI.h"

USING_NS_CC;

const std::vector<std::string> Alphabets = {"A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};

int key;
int score;
std::string mapString;
cocos2d::Scene * AlphamonFeed::createScene(std::string str)
{
	mapString = str.c_str();
	auto scene = Scene::create();
	auto layer = AlphamonFeed::create();
	scene->addChild(layer);

	return scene;
}


bool AlphamonFeed::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
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
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
	score = 10;
	// background loaded using csb file
	background = CSLoader::createNode("bg.csb");
	this->addChild(background, 0);
	//smile
	smile = (background->getChildren()).at(7);
	smile->setVisible(true);
	//sad
	sad = (background->getChildren()).at(6);
	// angry 
	angry = (background->getChildren()).at(4);
	// laughing
	laughing = (background->getChildren()).at(5);

	// slideBar for score 
	slideBar = (cocos2d::ui::Slider *)(background->getChildren()).at(2);
	slideBar->setPercent(1);
	slideBar->setEnabled(false);
	CCLOG("slider bar %d", slideBar->getPercent());// image->getPercent();
	//loading Monster alphabet
	const char* level = Alphabets.at(key).c_str(); //"english/A.csb"
	sprite1 = CSLoader::createNode(CCString::createWithFormat("english/%s.csb", level)->getCString());

	Vector <Node*> children = sprite1->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monster = *item;
		std::string str = monster->getName().c_str();
		if (str.find("mouth") == 0) {
			CCLOG("child name = %s", str.c_str());
			auto mouthTimeline = CSLoader::createTimeline(CCString::createWithFormat("mouth_ani/%s.csb", str.c_str())->getCString());
			monster->runAction(mouthTimeline);
			mouthAnimation.pushBack(mouthTimeline);
		}
		if (str.find("eye") == 0) {
			auto eyeTimeline = CSLoader::createTimeline(CCString::createWithFormat("eye_ani/%s.csb", str.c_str())->getCString());
			monster->runAction(eyeTimeline);
			mouthTimeline->gotoFrameAndPlay(0, true);
			// add eye animation part
		}
		if (str.find("skate") == 0) {
			CCLOG("child name = %s", str.c_str());
			auto legTimeline = CSLoader::createTimeline(CCString::createWithFormat("leg_ani/%s.csb", str.c_str())->getCString());
			monster->runAction(legTimeline);
			legAnimation.pushBack(legTimeline);
			legReff.pushBack(monster);
		}
	}
	sprite1->setScaleX(0.35);
	sprite1->setScaleY(0.35);
	sprite1->setPositionX(200);
	sprite1->setPositionY(50);
	sprite1->setName(level);
	sprite1->setContentSize(cocos2d::Size(300.0f, 400.0f));
	this->addChild(sprite1,2);
	//breath animination
	auto scaleBy = ScaleBy::create(0.6, 1.07, 0.95);
	auto rev = scaleBy->reverse();
	auto seq = Sequence::create(scaleBy, rev, NULL);
	auto forever = RepeatForever::create(seq);
	sprite1->runAction(forever);
	
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(AlphamonFeed::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(AlphamonFeed::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(AlphamonFeed::onTouchEnded, this);
	listener->onTouchCancelled = CC_CALLBACK_2(AlphamonFeed::onTouchCancelled, this);
	_eventDispatcher ->addEventListenerWithSceneGraphPriority(listener, sprite1);
	isTouching = false;
	this->schedule(schedule_selector(AlphamonFeed::showFruits), 1);
	this->scheduleUpdate();
	
    return true;
}

void AlphamonFeed::showFruits(float dt) {
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto str = Alphabets.at(cocos2d::RandomHelper::random_int(key, (key+2)) % 26).c_str();
	sprite = CSLoader::createNode(CCString::createWithFormat("alphabets fruits/%s.csb", str)->getCString());
	sprite->setPositionX(cocos2d::RandomHelper::random_real(visibleSize.width*0.005, visibleSize.width*0.85));
	sprite->setPositionY(1600);
	sprite->setName(str);
	auto moveBy = MoveBy::create(2, Vec2(0, -visibleSize.height-100));
	sprite->runAction(moveBy);
	/*auto myBox1 = DrawNode::create();
	Vec2 vertices[] =
	{
		Vec2(sprite->getPositionX(), sprite->getPositionY() + sprite->getContentSize().height),
		Vec2(sprite->getPositionX() + sprite->getContentSize().width, sprite->getPositionY()+sprite->getContentSize().height),
		Vec2(sprite->getPositionX() + sprite->getContentSize().width, sprite->getPositionY()),
		Vec2(sprite->getPositionX(), sprite->getPositionY())
	};
	myBox1->drawPolygon(vertices, 4, Color4F(200.0f, 0.5f, 5.3f, 1), 3, Color4F(0.7f, 0.7f, 0.7f, 1));
	auto moveBy1 = MoveBy::create(2, Vec2(0, -visibleSize.height));
	myBox1->runAction(moveBy1);
	this->addChild(myBox1, 1);*/
	this->addChild(sprite,2);
	//fruitReff-
	fruitReff.pushBack(sprite);
}

void AlphamonFeed:: update(float dt) { 
	if (fruitReff.size() != 0) {
		for (int i = 0; i < fruitReff.size(); i++) {
			monster = CCRectMake(sprite1->getPositionX()+(sprite1->getContentSize().width/4)-100, sprite1->getPositionY()-50, sprite1->getContentSize().width/2, sprite1->getContentSize().height/2); //+(sprite1->getContentSize().height/4)
			Rect fruit = CCRectMake(fruitReff.at(i)->getPositionX(), fruitReff.at(i)->getPositionY(), fruitReff.at(i)->getContentSize().width, fruitReff.at(i)->getContentSize().height);

			if ((monster).intersectsRect(fruit)) {
				if ((sprite1->getName()).compare(fruitReff.at(i)->getName()) == 0) {	
					for (auto item = mouthAnimation.rbegin(); item != mouthAnimation.rend(); ++item) {
						cocostudio::timeline::ActionTimeline * mouth = *item;
						mouth->gotoFrameAndPlay(0, false);	
					}
					smile->setVisible(false);
					laughing->setVisible(true);
					score = score + 10;
					slideBar->setPercent(score);
					
					this->removeChild(fruitReff.at(i));
					fruitReff.erase(i);
				} else {
					for (auto item = mouthAnimation.rbegin(); item != mouthAnimation.rend(); ++item) {
						cocostudio::timeline::ActionTimeline * mouth = *item;
						mouth->gotoFrameAndPlay(0, false);
					}
					smile->setVisible(false);
					laughing->setVisible(false);
					angry->setVisible(true);
					score = score - 10;
					if (score < 0) {
						score = 0;
					}
					slideBar->setPercent(score);
					this->removeChild(fruitReff.at(i));
					fruitReff.erase(i);
				}
			}

			if (fruitReff.at(i)->getPositionY() < -10) {
				this->removeChild(fruitReff.at(i));
				fruitReff.erase(i);
			}
			//alpha_animation->pause();
		}
	}
	if ((slideBar->getPercent()) == 100) {
		Director::getInstance()->replaceScene(TransitionPageTurn::create(1.0, AlphamonFeedLevelScene::createScene(), true));
		
	}
}
void AlphamonFeed::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
bool AlphamonFeed::onTouchBegan(cocos2d::Touch *touch,cocos2d::Event * event)
{
	touchPosition = touch->getLocation().x;
	cocos2d::Node * target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	CCRect targetRectangle =  CCRectMake(target->getPositionX()-100, target->getPositionY()-25, target->getContentSize().width, target->getContentSize().height);
	if(targetRectangle.containsPoint(touch->getLocation())){
		touchPosition = touch->getLocation().x;
		for (int i = 0; i < legAnimation.size(); i++) {
			CCLOG("animation start");
			//legAnimation.at(i)->gotoFrameAndPlay(0, true);
			legAnimation.at(i)->play("walk", true);
		}
		return true;
	}
	return false;
	
}
void AlphamonFeed::onTouchMoved(cocos2d::Touch *touch,cocos2d::Event * event)
{

	cocos2d::Node * target = event->getCurrentTarget();
	//bool flage = false;
	if ((touch->getLocation().y < (target->getPositionY() + target->getContentSize().height)) && (touch->getLocation().x > 150 && touch->getLocation().x < 2360)) {
		
			int compare = touch->getLocation().x - touchPosition;
			CCLOG("size of the leg array %d", legReff.size());
			if (compare > 0 ) {
				if (flage) {
					flage = false;
					flage_reverse = true;
					CCLOG("scale");
					for (int i = 0; i < legReff.size(); i++) {
						int leg_scale = legReff.at(i)->getScaleX();
						legReff.at(i)->setScaleX(leg_scale * (-1.0));
					}
					//legAnimation.at(i)->gotoFrameAndPlay(0, false);
				}	
			}
			else {
				if (flage_reverse) {
					flage = true;
					for (int i = 0; i < legReff.size(); i++) {
						int leg_scale = legReff.at(i)->getScaleX();
						legReff.at(i)->setScaleX(leg_scale * (-1.0));
					}
					flage_reverse = false;
				}
				
				//legAnimation.at(i)->gotoFrameAndPlay(0, false);
			}
		//	legAnimation.at(i)->gotoFrameAndPlay(0, true);
		

		//int compare = touch->getLocation().x - target->getPositionX();
		//	
		//if (compare > 0) {
		//	target->setScaleX(-0.5);
		//}
		//else {
		//	target->setScaleX(0.5);
		//}
	
	
		target->setPositionX(touch->getLocation().x);
		//myBox->setPositionX(touch->getLocation().x-200);
	}else{
		//target->setPositionX()
		onTouchEnded(touch, event);
	}
}
void AlphamonFeed::onTouchEnded(cocos2d::Touch *touch,cocos2d::Event * event)
{
	for (int i = 0; i < legAnimation.size(); i++) {
		CCLOG("animation start");
		//legAnimation.at(i)->gotoFrameAndPlay(0, true);
		legAnimation.at(i)->pause();
	}
	isTouching = false;
}
void AlphamonFeed::onTouchCancelled(cocos2d::Touch *touch,cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}


