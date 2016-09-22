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


/*
TextGenerator::getInstance()->getSynonyms(9)

Same for:
TextGenerator::getInstance()->getAntonyms(9)
TextGenerator::getInstance()->getHomonyms(9)
*/


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

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("memory.plist");
	
	//CocosDenshion::SimpleAudioEngine::getInstance()->preloadBackgroundMusic ("TraceMusic.wav");
	//CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("TraceMusic.wav", true);

	//loading lion animation
	//CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("Character///Alpha_kombat_plist.plist");
	//timeline = CSLoader::createTimeline("Character/Alpha_kombat_lion.csb");



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
	_background = CSLoader::createNode("memory/memory.csb");
	_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_background->setAnchorPoint(Vec2(0.5, 0.5));
	addChild(_background, 0);
	_nests.resize(24);
	for (int i = 1; i <= 24; i++) {
		

		std::ostringstream sstreami;
		sstreami << "nest" << i;
		std::string queryi = sstreami.str();

		_nests.push_back(_background->getChildByName("background")->getChildByName(queryi));
		_nestIndex = i;
		setupTouch();

	}
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


	//std::string path = "Alpha Kombat/";//std::string(path)
	//_background = CSLoader::createNode(std::string(path) + alphabet +  std::string(".csb"));
	
	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	
	/*
	bool foundNode = false;
	int i = 1;
	do {
		foundNode = false;
		//auto children = _background->getChildren();
		auto nodeRow = std::vector<Node *>();
		for (auto const& child : children) {
			auto str = child->getName();

			std::ostringstream sstreami;
			sstreami << "dot_" << i;
			std::string queryi = sstreami.str();

			if (str.find(queryi) != std::string::npos) {

				CCLOG("child: %s", str.c_str());
				foundNode = true;
				//child->setVisible(true); 

				nodeRow.push_back(child);
			}
		}
		if (foundNode) {

			std::ostringstream sstreamb;
			sstreamb << "ball_" << i;
			std::string queryb = sstreamb.str();

			//_nodes.push_back(nodeRow);
			_background->getChildByName(queryb)->setVisible(false);
			_background->getChildByName(queryb)->setScale(1, 1);
		}
		i++;
	} while (foundNode);

	//_touches = _nodes.size();
	setupTouch();
	if (_level == 0) {
		setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Memory::startGame, this));
	}
	*/
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

		auto nest = _background->getChildByName("background")->getChildByName(queryc);

		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(Memory::onTouchBegan, this);
		listener->onTouchEnded = CC_CALLBACK_2(Memory::onTouchEnded, this);
		listener->onTouchMoved = CC_CALLBACK_2(Memory::onTouchMoved, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, nest);
	
}


bool Memory::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	CCLOG("TOUCH LOCATION %f,  %f", touch->getLocation().x, touch->getLocation().y);
	//auto n = getParent()->convertTouchToNodeSpace(touch);
	//auto rect = this->getBoundingBox();
	//if(rect.containsPoint(n))
	
	if (target->getBoundingBox().containsPoint(touch->getLocation()))
	{

		CCLOG("NEST %s CLICKED", target->getName());
		//        CCLOG("onTouchBegan");
		//if (_currentNodeIndex == 0)
		//	_currentNodeIndex = 0;
		_touchActive = true;
		//touches--;
		//setDotsVisibility(true);

		//testSprite.characterZIndex = 0;
		//this->reorderChild(testSprite.character, 0);
		
		


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

			CCLOG("other objects clicked!!");
			testSprite.closedWindow->setGlobalZOrder(1);
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
			_eventDispatcher->resumeEventListenersForTarget(testSprite.closedWindow, false);
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

	//setDotsVisibility(false);
	//if (_currentNodeIndex >= _nodes[_currentStroke].size()) {
		/*_currentStroke++;
		_currentNodeIndex = 0;
		setupTouch();
		if(_currentStroke >= _nodes.size()) {

		CCLOG("Finished All");

		if (_level == 47) {
		_level = -1;
		}

		finishedAll();


		}*/
	//}
	//else {
		//event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
		//if(_currentNodeIndex <= _nodes[_currentStroke].size())
		//event->getCurrentTarget()->setPosition(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
		//setDotsVisibility(true);
	//}

	
	
	
	


}
/*
void Memory::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");
	int finished = 0;
	if (_touchActive) {


		auto n = convertTouchToNodeSpace(touch);
		event->getCurrentTarget()->setPosition(n);
		//auto distance = n.distance(_nodes[_currentStroke][_currentNodeIndex]->getPosition());


		
		if (_currentNodeIndex >= _nodes[_currentStroke].size() - 1) {

		//	setDotsVisibility(false);


			if (_currentStroke + 1 > _nodes.size() - 1 && _currentNodeIndex >= _nodes[_currentStroke].size() - 1) {


				finished = 1;

				CCLOG("Finished All");

				//if (strcmp(_language, "eng")) { _languageRange = 24; }
				//if (_language == "kan") { _languageRange = 47; }


				//_currentStroke = 0;
			//	_currentNodeIndex = 0;
				//finishedAll();


			}
			if (finished == 0) {
				_currentStroke++;
				_currentNodeIndex = 0;
				setupTouch();
			}
		}


		if (distance > 130 && _currentStroke <= _nodes.size() - 1) {

			if (_currentNodeIndex < _nodes[_currentStroke].size() - 1) {

				++_currentNodeIndex;
				auto nextNode = _nodes[_currentStroke][_currentNodeIndex];
				auto nextDistance = n.distance(nextNode->getPosition());

				int lastReached;
				if (_currentNodeIndex == _nodes[_currentStroke].size())
					lastReached = 5;
				else
					lastReached = 130;

				if (nextDistance < 130) {
					CCLOG("reached next");

					//set it visible
					std::ostringstream sstreami;
					sstreami << "dot_" << _currentStroke + 1 << "_" << _currentNodeIndex;
					std::string queryi = sstreami.str();

					_background->getChildByName(queryi)->setVisible(false);


				}
				else {
					CCLOG("failed");
					--_currentNodeIndex;
					//event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
					event->getCurrentTarget()->setPosition(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
					//setDotsVisibility(false);
					_touchActive = false;
					if (_currentNodeIndex == _nodes[_currentStroke].size())
						_currentNodeIndex = 0;
				}
			}
			else {
				CCLOG("fell off the edge");
				//event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
				event->getCurrentTarget()->setPosition(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
				//setDotsVisibility(false);
				_touchActive = false;
				if (_currentNodeIndex == _nodes[_currentStroke].size())
					_currentNodeIndex = 0;
			}
		}
	}
}
*/
/*
void Memory::transit(int level) {
	//auto director = Director::getInstance();
	auto scene = Memory::createScene(level);
	//Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));
	Director::getInstance()->replaceScene(scene);
}
*/
/*
void Memory::resetLevel() {
	_level = 0;
	Director::getInstance()->replaceScene(ScrollableGameMapScene::createScene());
}
*/
/*
void Memory::setDotsVisibility(bool flag) {

	for (int i = 0; i < _nodes[_currentStroke].size(); i++) {
		std::ostringstream sstreami;
		sstreami << "dot_" << _currentStroke + 1 << "_" << i + 1;
		std::string queryi = sstreami.str();

		_background->getChildByName(queryi)->setVisible(flag);
	}
}

*/
/*
void Memory::finishedAll() {


	//removeChild(_background);

	for (int x = 0; x <_nodes.size(); x++) {

		std::ostringstream sstreamb;
		sstreamb << "ball_" << x + 1;
		std::string queryb = sstreamb.str();

		auto currentBall = _background->getChildByName(queryb);
		if (currentBall) {
			_eventDispatcher->removeEventListenersForTarget(currentBall);
			currentBall->setVisible(false);
		}
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//this->removeChild(character, true);
	//CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("bubble.mp3");


	std::string randomAnimation = animations[RandomHelper::random_int(0, 3)];

	_menuContext->pickAlphabet('A', 'A', true);


	timeline->play(randomAnimation, false);

	float delay = 0.08;
	auto characterAudio = CallFunc::create([=] {

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		auto alpha = LangUtil::getInstance()->getAllCharacters();
		auto path = LangUtil::getInstance()->getAlphabetSoundFileName(alpha[_level]);
		audio->playEffect(path.c_str(), false);

	});
	auto playAudio = Sequence::create(DelayTime::create(delay), characterAudio, DelayTime::create(2.0), NULL);
	this->runAction(playAudio);




	for (int j = 0; j < _nodes.size(); j++) {
		for (int i = 0; i < _nodes[j].size(); i++) {

			std::ostringstream sstreami;
			sstreami << "dot_" << j + 1 << "_" << i + 1;
			std::string queryi = sstreami.str();

			auto visiblity = CallFunc::create([=] {
				_background->getChildByName(queryi)->setVisible(true);
			});

			auto sequenceDot = Sequence::create(DelayTime::create(delay), visiblity, NULL);
			_background->getChildByName(queryi)->runAction(sequenceDot);
			delay = delay + 0.08;
		}
	}



	auto redirectToNextLevel = CallFunc::create([=] {

		std::chrono::seconds duration(1);
		std::this_thread::sleep_for(duration);

		if (_level == wcslen(LangUtil::getInstance()->getAllCharacters()) - 1) {
			_level = -1;
		}
		_level++;
		Memory::transit(_level);
	});
	auto redirect = Sequence::create(DelayTime::create(delay), redirectToNextLevel, NULL);





	//if (_touches == 0) { _level++; }


	this->runAction(redirect);


}

*/
