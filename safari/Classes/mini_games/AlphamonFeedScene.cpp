// Main game scene
// AlphamonFeedScene.cpp

#include "AlphamonFeedScene.h"
#include "AlphamonFeedLevelScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

USING_NS_CC;

const std::vector<std::string> Alphabets = {"A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};

int score;
std::string alphaLevelString;
cocos2d::Scene * AlphamonFeed::createScene(std::string str)
{
	alphaLevelString = str.c_str();
	auto scene = Scene::create();
	auto layer = AlphamonFeed::create();
	scene->addChild(layer);

	return scene;
}


bool AlphamonFeed::init()
{
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
	float myGameWidth = 0;
	score = 10;
	CCLOG("game size = %f", visibleSize.width);
	CCLOG("game size = %f", origin.x);
	// background loaded using csb file
	background = CSLoader::createNode("alpha_feed.csb");
	if (visibleSize.width > 2560) {
		myGameWidth = (visibleSize.width - 2560)/2;
		background->setPositionX(myGameWidth);

	}
	this->addChild(background, 0);
	slideBar = (cocos2d::ui::Slider *)(background->getChildByName("Slider_1"));
	(background->getChildByName("progress_emotion_3"))->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	//smile
	smile = background->getChildByName("smile_7");
	smile->setVisible(true);
	smile->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	//sad
	sad = background->getChildByName("sad_6");
	sad->setVisible(false);
	sad->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	// angry 
	angry = background->getChildByName("angry_5");
	angry->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	// laughing
	laughing = background->getChildByName("laughing_4");
	laughing->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	// slideBar for score 
	
	slideBar->setPositionX(visibleSize.width - slideBar->getContentSize().height- myGameWidth);
	slideBar->setPercent(1);
	slideBar->setEnabled(false);
	CCLOG("slider bar %d", slideBar->getPercent());// image->getPercent();
	//loading Monster alphabet
	sprite1 = CSLoader::createNode(CCString::createWithFormat("english/%s.csb", alphaLevelString.c_str())->getCString());

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
			eyeTimeline->gotoFrameAndPlay(0, true);
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
	sprite1->setName(alphaLevelString.c_str());
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
	std::vector<std::string> testAlphabet;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	for (int i = 0; i < 3; i++) {
		testAlphabet.push_back(Alphabets.at(cocos2d::RandomHelper::random_int(0, 25) % 26).c_str());
		testAlphabet.push_back(alphaLevelString.c_str());
	}
	auto str = testAlphabet.at(cocos2d::RandomHelper::random_int(0, 5)).c_str();
	sprite = CSLoader::createNode(CCString::createWithFormat("alphabets fruits/%s.csb", str)->getCString());
	sprite->setPositionX(cocos2d::RandomHelper::random_real(visibleSize.width*0.005, visibleSize.width*0.85));
	sprite->setPositionY(1800);
	sprite->setName(str);
	sprite->setContentSize(cocos2d::Size(200.0f, 200.0f));
	auto moveBy = MoveBy::create(2, Vec2(0, -visibleSize.height-100));
	sprite->runAction(moveBy);
	
	this->addChild(sprite,2);
	fruitReff.pushBack(sprite);
}

void AlphamonFeed:: update(float dt) { 
	if (fruitReff.size() != 0) {
		for (int i = 0; i < fruitReff.size(); i++) {
			monster = CCRectMake(sprite1->getPositionX()-(sprite1->getContentSize().width/4), sprite1->getPositionY(), sprite1->getContentSize().width/2, sprite1->getContentSize().height/2); //+(sprite1->getContentSize().height/4)
			Rect fruit = CCRectMake(fruitReff.at(i)->getPositionX()-100, fruitReff.at(i)->getPositionY()-60, fruitReff.at(i)->getContentSize().width, fruitReff.at(i)->getContentSize().height);

			if ((monster).intersectsRect(fruit)) {
				if ((sprite1->getName()).compare(fruitReff.at(i)->getName()) == 0) {	
					for (auto item = mouthAnimation.rbegin(); item != mouthAnimation.rend(); ++item) {
						cocostudio::timeline::ActionTimeline * mouth = *item;
						mouth->play("eat",false);
					}
					smile->setVisible(false);
					laughing->setVisible(true);
					score = score + 10;
					slideBar->setPercent(score);
					angry->setVisible(false);
					this->removeChild(fruitReff.at(i));
					fruitReff.erase(i);
				} else {
					for (auto item = mouthAnimation.rbegin(); item != mouthAnimation.rend(); ++item) {
						cocostudio::timeline::ActionTimeline * mouth = *item;
						mouth->play("spit", false);
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
bool AlphamonFeed::onTouchBegan(cocos2d::Touch *touch,cocos2d::Event * event)
{
	touchPosition = touch->getLocation().x;
	cocos2d::Node * target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	CCRect targetRectangle =  CCRectMake(target->getPositionX()-100, target->getPositionY(), target->getContentSize().width, target->getContentSize().height);
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
	if ((touch->getLocation().y < (target->getPositionY() + target->getContentSize().height)) && (touch->getLocation().x > 150 && touch->getLocation().x < (Director::getInstance()->getVisibleSize().width-200))) {
		
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


