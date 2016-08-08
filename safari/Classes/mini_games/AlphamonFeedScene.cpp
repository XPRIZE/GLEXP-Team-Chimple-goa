// Main game scene
// AlphamonFeedScene.cpp

#include "AlphamonFeedScene.h"
#include "AlphamonFeedLevelScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "ui/UIVideoPlayer.h"
USING_NS_CC;



AlphamonFeed::AlphamonFeed() {
    
}

AlphamonFeed::~AlphamonFeed() {
	backgroundMusic->stopBackgroundMusic();
    _eventDispatcher->removeEventListener(listener);
}


AlphamonFeed* AlphamonFeed::create() {
    AlphamonFeed* alphamonFeedLayer = new (std::nothrow) AlphamonFeed();
    if(alphamonFeedLayer && alphamonFeedLayer->init()) {
        alphamonFeedLayer->autorelease();
        return alphamonFeedLayer;
    }
    CC_SAFE_DELETE(alphamonFeedLayer);
    return nullptr;

}

cocos2d::Scene * AlphamonFeed::createScene()
{
	//alphaLevelString = str.c_str();
	auto scene = Scene::create();
	auto layer = AlphamonFeed::create();
	scene->addChild(layer);

    layer->menu = MenuContext::create(layer, AlphamonFeed::gameName());
    scene->addChild(layer->menu);
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
	//sprite1 = CSLoader::createNode(CCString::createWithFormat("english/%s.csb", alphaLevelString.c_str())->getCString());
	mychar = CharGenerator::getInstance()->generateAChar();
	std::stringstream ss;
	ss << mychar;
	std::string mycharString = ss.str();
	//std::string mycharString = LangUtil::convertUTF16CharToString(mychar);
	sprite1 = Alphamon::createWithAlphabet(mychar);//alphaLevelString.at(0));
	sprite1->setScaleX(0.85);
	sprite1->setScaleY(0.85);
	sprite1->setPositionX(300);
	sprite1->setPositionY(50);
	sprite1->setName(mycharString);
	sprite1->setContentSize(cocos2d::Size(300.0f, 400.0f));
	this->addChild(sprite1,2);
	//breath animination
	sprite1->breatheAction();
	//sprite1->alphamonEyeAnimation("blink", true);
	//sprite1->enableTouch(true);
	
	auto children = sprite1->getAlphamonChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monster = *item;
		std::string str = monster->getName().c_str();
		if (str.find("skate") == 0) {
			legReff.pushBack(monster);
		}
	}
	listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(AlphamonFeed::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(AlphamonFeed::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(AlphamonFeed::onTouchEnded, this);
	listener->onTouchCancelled = CC_CALLBACK_2(AlphamonFeed::onTouchCancelled, this);
	_eventDispatcher->addEventListenerWithFixedPriority(listener, -1);
	isTouching = false;
	
	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(AlphamonFeed::startGame, this));

    return true;
}

void AlphamonFeed::startGame() {
	backgroundMusic = CocosDenshion::SimpleAudioEngine::getInstance();
	backgroundMusic->playBackgroundMusic("sounds/alphamonfeed.wav", true);
	backgroundMusic->setBackgroundMusicVolume(0.50f);
    menu->showStartupHelp(CC_CALLBACK_0(AlphamonFeed::callingFruits, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, menu)), CallFunc::create(CC_CALLBACK_0(AlphamonFeed::callingFruits, this)), NULL));
}
void AlphamonFeed::callingFruits()
{
	this->schedule(schedule_selector(AlphamonFeed::showFruits), 1);
	this->scheduleUpdate();
}

void AlphamonFeed::showFruits(float dt) {
	
	auto fallingAlphaArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(mychar, 6, 1, 50);
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto str = fallingAlphaArray.at(cocos2d::RandomHelper::random_int(0, 5)).at(0);
	std::stringstream ss;
	ss << str;
	std::string mystr = ss.str();
   // auto mystr = LangUtil::convertUTF16CharToString(str);
	auto path = LangUtil::getInstance()->getSpecialAnimationFileName(str,"alphabets fruits");
	sprite = CSLoader::createNode(path);
	sprite->setPositionX(cocos2d::RandomHelper::random_real(visibleSize.width*0.20, visibleSize.width*0.85));
	sprite->setPositionY(1800);
	sprite->setName(mystr);
	sprite->setContentSize(cocos2d::Size(150.0f, 150.0f));
	auto moveBy = MoveBy::create(2, Vec2(0, -visibleSize.height-100));
	sprite->runAction(moveBy);
	
	this->addChild(sprite,2);
	fruitReff.pushBack(sprite);
}

void AlphamonFeed:: update(float dt) {
    if(!menu->isGamePaused()) {
        if (fruitReff.size() != 0) {
            for (int i = 0; i < fruitReff.size(); i++) {
                monster = CCRectMake(sprite1->getPositionX()-(sprite1->getContentSize().width/2), sprite1->getPositionY(), sprite1->getContentSize().width/2, sprite1->getContentSize().height/2); //+(sprite1->getContentSize().height/4)
                Rect fruit = CCRectMake(fruitReff.at(i)->getPositionX()-100, fruitReff.at(i)->getPositionY()-60, fruitReff.at(i)->getContentSize().width, fruitReff.at(i)->getContentSize().height);
                
                if ((monster).intersectsRect(fruit)) {
                    audio = CocosDenshion::SimpleAudioEngine::getInstance();
                    auto soundPath = (fruitReff.at(i)->getName());
                    std::string::size_type sz;   // alias of size_t
                    int i_dec = atoi(soundPath.c_str());//std::stoi(soundPath, &sz);
                    wchar_t testing = (wchar_t)i_dec;
                    auto path = LangUtil::getInstance()->getAlphabetSoundFileName(testing);
                    audio->playEffect(path.c_str(), false);
                    int mySpriteName = atoi(sprite1->getName().c_str());//std::stoi(sprite1->getName(), &sz);
                    wchar_t monster = (wchar_t)mySpriteName;
                    //	menu->pickAlphabet((sprite1->getName()).at(0), (fruitReff.at(i)->getName()).at(0), true);
                    menu->pickAlphabet(monster, testing, true);
                    if ((sprite1->getName()).compare(fruitReff.at(i)->getName()) == 0) {
                        sprite1->alphamonMouthAnimation("eat", false);
                        smile->setVisible(false);
                        laughing->setVisible(true);
                        score = score + 10;
                        slideBar->setPercent(score);
                        angry->setVisible(false);
                        this->removeChild(fruitReff.at(i));
                        fruitReff.erase(i);
                    } else {
                        sprite1->alphamonMouthAnimation("spit", false);
                        sprite1->alphamonEyeAnimation("angry1",false);
                        auto animation = sprite1->shakeAction();
                        sprite1->runAction(animation);
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
            unscheduleUpdate();
            gameOver();
            menu->showScore();
        }        
    }
}

bool AlphamonFeed::onTouchBegan(cocos2d::Touch *touch,cocos2d::Event * event)
{
	touchPosition = touch->getLocation().x;
	cocos2d::Node * target = sprite1;
	auto  location = target->convertToNodeSpace(touch->getLocation());
	CCRect targetRectangle =  CCRectMake(target->getPositionX()-200, target->getPositionY(), target->getContentSize().width, target->getContentSize().height);
	if(targetRectangle.containsPoint(touch->getLocation())){
		CCLOG("touch began");
		CCLOG("touch began X = %f", target->getPositionX());
		touchPosition = touch->getLocation().x;
		isTouching = true;
		auto touchAction = ScaleTo::create(0.1, 1.0);
		sprite1->runAction(touchAction);
		sprite1->alphamonLegAnimation("walk", true);
		return true;
	}else if  (touch->getLocation().y < Director::getInstance()->getVisibleSize().height - 350){
		sprite1->alphamonLegAnimation("walk", true);
		return true;
	}
	return false;
	
}
void AlphamonFeed::onTouchMoved(cocos2d::Touch *touch,cocos2d::Event * event)
{

	cocos2d::Node * target = sprite1;
	//bool flage = false;
	if ( (touch->getLocation().x > 150 && touch->getLocation().x < (Director::getInstance()->getVisibleSize().width-200))) {
		
			int compare = touch->getLocation().x - touchPosition;
			if (compare > 0 ) {
				if (flage) {
					flage = false;
					flage_reverse = true;
					CCLOG("scale");
					for (int i = 0; i < legReff.size(); i++) {
						float leg_scale = legReff.at(i)->getScaleX();
						//CCLOG("leg_scale = %d",leg_scale);
						legReff.at(i)->setScaleX(leg_scale * (-1.0));
					}
				}	
			}
			else {
				if (flage_reverse) {
					flage = true;
					for (int i = 0; i < legReff.size(); i++) {
						float leg_scale = legReff.at(i)->getScaleX();
						legReff.at(i)->setScaleX(leg_scale * (-1.0));
					}
					flage_reverse = false;
				}
			}
		target->setPositionX(touch->getLocation().x);
	}else{
		//target->setPositionX()
		onTouchEnded(touch, event);
	}
}
void AlphamonFeed::onTouchEnded(cocos2d::Touch *touch,cocos2d::Event * event)
{
	if (isTouching) {
		isTouching = false;
		auto touchAction = ScaleTo::create(0.1, 0.85);
		sprite1->runAction(touchAction);
	}
	sprite1->stopWalkAction();
}
void AlphamonFeed::onTouchCancelled(cocos2d::Touch *touch,cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}

void AlphamonFeed::gameOver() {
	auto scaleBy = ScaleBy::create(1.0, 1.5);
	auto moveTo = MoveTo::create(1.0, Vec2(Director::getInstance()->getVisibleSize().width/2, Director::getInstance()->getVisibleSize().height/ 2));
	auto spawn = TargetedAction::create(sprite1, Spawn::createWithTwoActions(scaleBy, moveTo));
	auto callbackStart = CallFunc::create(CC_CALLBACK_0(AlphamonFeed::returnToPrevScene, this));
	auto sequence = Sequence::createWithTwoActions(spawn, callbackStart);
	sprite1->runAction(sequence);
}

void AlphamonFeed::returnToPrevScene() {
	//    stopAllActions();
	Director::getInstance()->replaceScene(StartMenu::createScene());
}

