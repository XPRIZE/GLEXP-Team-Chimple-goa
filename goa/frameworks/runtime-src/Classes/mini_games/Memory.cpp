//
//  Memory.cpp
//
//  Created by Jyoti Prakash on 19/09/16.
//
//

#include "Memory.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"


std::string smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
std::string capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

USING_NS_CC;



//TextGenerator::getInstance()->getSynonyms(9)


//TextGenerator::getInstance()->getAntonyms(9)
//TextGenerator::getInstance()->getHomonyms(9)



Memory::Memory() :
	_touchActive(false),
	objects(4, std::vector<struct object>(4)), 
	xycoordinates(4, std::vector<struct xy>(4))
{

}

Memory::~Memory() {

}


Scene *Memory::createScene() {

	auto scene = Scene::create();
	auto layer = Memory::create();


	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Memory::classname(), true);
	scene->addChild(layer->_menuContext);
	return scene;

}

Memory *Memory::create() {
	Memory *memory = new (std::nothrow) Memory();
	if (memory && memory->init()) {
		memory->autorelease();
		return memory;
	}
	CC_SAFE_DELETE(memory);
	return nullptr;

}

bool Memory::init() {

	//_language = LangUtil::getInstance()->getLang();

	if (!Layer::init()) {
		return false;
	}

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("memoryfarm/memoryfarm.plist");
	

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	//Adding layout 
	float startx, starty;
	startx = visibleSize.width / 4 + origin.x;
	starty = visibleSize.height / 4 + origin.y;
	float tempy = starty;
	/*
	for (int i = 0; i < 4; i++) {
		float tempx = startx;
		tempy =  (i+0.5) *starty;
		for (int j = 0; j < 4; j++) {
			xycoordinates[i][j].x = tempx * (j+0.5);
			xycoordinates[i][j].y = tempy;

			
			cocos2d::Sprite* _mySprite = cocos2d::Sprite::create("memory/broken_window.png");
			_mySprite->setPosition(Vec2(xycoordinates[i][j].x, xycoordinates[i][j].y));
			_mySprite->setScale(0.5);
			this->addChild(_mySprite, 0);

		}
	}
	 */
	
	/*
	testSprite.x = visibleSize.width / 2 + origin.x;
	testSprite.y = visibleSize.height / 2 + origin.y;

	testSprite.character = cocos2d::Sprite::create("memory/char1.png");
	testSprite.characterZIndex = 0;
	testSprite.character->setPosition(Vec2(testSprite.x, testSprite.y));
	testSprite.character->setScale(0.5);
	this->addChild(testSprite.character, 0);
	setupTouch(testSprite.character);
	//this->testSprite.character->getEventDispatcher()->setEnabled(false);
	_eventDispatcher->resumeEventListenersForTarget(testSprite.character, false);


	testSprite.openWindow = cocos2d::Sprite::create("memory/open_window.png");
	testSprite.openWindowZIndex = 0;
	testSprite.openWindow->setPosition(Vec2(testSprite.x, testSprite.y));
	testSprite.openWindow->setScale(0.5);
	testSprite.openWindow->setName("open_window");
	this->addChild(testSprite.openWindow, 0);
	setupTouch(testSprite.openWindow);
	//this->testSprite.openWindow->getEventDispatcher()->setEnabled(false);
	_eventDispatcher->resumeEventListenersForTarget(testSprite.openWindow, false);



	testSprite.closedWindow = cocos2d::Sprite::create("memory/closed_window.png");
	testSprite.closedWindowZIndex = 1;
	testSprite.closedWindow->setPosition(Vec2(testSprite.x, testSprite.y));
	testSprite.closedWindow->setScale(0.5);
	testSprite.closedWindow->setName("closed_window");
	this->addChild(testSprite.closedWindow, 1);
	setupTouch(testSprite.closedWindow);
	//this->testSprite.closedWindow->getEventDispatcher()->setEnabled(true);
	_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, true);


	testSprite.brokenWindow = cocos2d::Sprite::create("memory/broken_window.png");
	testSprite.brokenWindowZIndex = 0;
	testSprite.brokenWindow->setPosition(Vec2(testSprite.x, testSprite.y));
	testSprite.brokenWindow->setScale(0.5);
	testSprite.brokenWindow->setName("broken_window");
	this->addChild(testSprite.brokenWindow, 0);
	setupTouch(testSprite.brokenWindow);
	//this->testSprite.brokenWindow->getEventDispatcher()->setEnabled(false);
	_eventDispatcher->resumeEventListenersForTarget(testSprite.brokenWindow, false);


	testSprite.alphabetSprite = cocos2d::Sprite::create("memory/a.png");
	testSprite.alphabetSpriteZIndex = 0;
	testSprite.alphabetSprite->setPosition(Vec2(testSprite.x, testSprite.y));
	testSprite.alphabetSprite->setScale(0.5);
	testSprite.alphabetSprite->setName("a");
	this->addChild(testSprite.alphabetSprite, 0);
	setupTouch(testSprite.alphabetSprite);
	//this->testSprite.alphabetSprite->getEventDispatcher()->setEnabled(false);
	_eventDispatcher->resumeEventListenersForTarget(testSprite.alphabetSprite, false);

	testSprite.alphabet = 'a';

	testSprite.objectFlag = 1;
	*/
	
	

	//std::string path = "english/Alpha Kombat/";//std::string(path)
	//_background = CSLoader::createNode("memoryfarm/background.csb");
	//_chicken = CSLoader::createNode("memoryfarm/chicken.csb");
	//_mainground = CSLoader::createNode("memoryfarm/mainground.csb");
	_memoryfarm = (Sprite *)CSLoader::createNode("memoryfarm/memoryfarm.csb");
	//_nest = CSLoader::createNode("memoryfarm/nest.csb");


	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_background->setAnchorPoint(Vec2(0.5, 0.5));
	//addChild(_background, 0);
	
	
	//_chicken->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_chicken->setAnchorPoint(Vec2(0.5, 0.5));
	//addChild(_chicken, 0);

	//_mainground->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_mainground->setAnchorPoint(Vec2(0.5, 0.5));
	//addChild(_mainground, 0);

	_memoryfarm->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_memoryfarm->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_memoryfarm, 1);

	//_nest->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_nest->setAnchorPoint(Vec2(0.5, 0.5));
	//addChild(_nest, 0);
	
	//nest = (Sprite *)_nest;
	// nest->setPosition(Vec2(700 + origin.x, 200 + origin.y));
	// nest->setScale(1);
	 //nest->setName("nest");
	 //this->addChild(nest, 0);
	 setupTouch();
	 //node->runAction(timeline);


	_nests.resize(24);/*
	for (int i = 1; i <= 24; i++) {
		

		std::ostringstream sstreami;
		sstreami << "nest" << i;
		std::string queryi = sstreami.str();

		_nests.push_back(_background->getChildByName("background")->getChildByName(queryi));
		_nestIndex = i;
		setupTouch();

	}
	*/
	//_nests[2]->getChildByName().setscale(2,2);
	/*auto bg = Sprite::create("bg.png");
	bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	addChild(bg, 0);
	*/

	//Sprite* node = (Sprite *)CSLoader::createNode("Character/Alpha_kombat_lion.csb");
	//node->setPosition(Vec2(700, 200));
	//node->setScale(1);
	//this->addChild(node, 0);
	//node->runAction(timeline);


	return true;
}

void Memory::startGame() {
	//_menuContext->showStartupHelp(CC_CALLBACK_0(Memory::dummy, this));
	//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp,_menuContext)), NULL));
}



void Memory::setupTouch() {
	
	   // CCLOG("NEST %d setuptouch done", nestIndex);
		std::ostringstream sstreamc;
		sstreamc << "nest" << _nestIndex;
		std::string queryc = sstreamc.str();

		auto nestj = _memoryfarm->getChildByName("background")->getChildByName("nest1");
		//nestj->setPosition(Vec2(1000,1000));
		nestj->setAnchorPoint(Vec2(0.5, 0.5));
		CCLOG("nest xpos : %f", nestj->getPosition().x);
		CCLOG("nest ypos : %f", nestj->getPosition().y);
		CCLOG("nest anchor : %f  :   %f ", nestj->getAnchorPoint().x, nestj->getAnchorPoint().y);
		//nestj->getChildByName("chicken")->setVisible(false);
		//nestj->setPosition(Vec2(500, 500));
		//auto nest = _nest->getChildByName("nestfront");
		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(Memory::onTouchBegan, this);
		listener->onTouchEnded = CC_CALLBACK_2(Memory::onTouchEnded, this);
		listener->onTouchMoved = CC_CALLBACK_2(Memory::onTouchMoved, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, nestj);
	
}


bool Memory::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);

	
	if (target->getBoundingBox().containsPoint(touch->getLocation()))
	{

		CCLOG("NEST CLICKED");
		_touchActive = true;
		if (target->getName() == "closed_window") {

			CCLOG("closed window clicked!!");
			
			testSprite.closedWindow->setGlobalZOrder(0);
			//this->testSprite.closedWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, false);
			
			testSprite.brokenWindow->setGlobalZOrder(0);
			//this->testSprite.brokenWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.brokenWindow, false);

			testSprite.openWindow->setGlobalZOrder(0);
			//this->testSprite.openWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.openWindow, false);

			testSprite.character->setGlobalZOrder(0);
			//this->testSprite.character->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.character, false);

			testSprite.alphabetSprite->setGlobalZOrder(1);
			//this->testSprite.alphabetSprite->getEventDispatcher()->setEnabled(true);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, true);
			
			
		}
		else {
			/*
			CCLOG("other objects clicked!!");
			//testSprite.closedWindow->setGlobalZOrder(1);
			//this->testSprite.closedWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, true);

			testSprite.brokenWindow->setGlobalZOrder(0);
			//this->testSprite.brokenWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.brokenWindow, false);

			testSprite.openWindow->setGlobalZOrder(0);
			//this->testSprite.openWindow->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.openWindow, false);

			testSprite.character->setGlobalZOrder(0);
			//this->testSprite.character->getEventDispatcher()->setEnabled(false);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.character, false);

			testSprite.alphabetSprite->setGlobalZOrder(0);
			//this->testSprite.alphabetSprite->getEventDispatcher()->setEnabled(true);
			_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, false);*/
		}

		//testSprite.brokenWindowZIndex = 0;
		//this->reorderChild(testSprite.brokenWindow, 0);

		//testSprite.alphabetSpriteZIndex = 0;
		//this->reorderChild(testSprite.alphabetSprite, 0);







		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void Memory::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");
	
	


}

void Memory::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");
	
}
