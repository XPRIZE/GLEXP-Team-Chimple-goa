//
//  Wembley.cpp
//  
//
//  Created by Jyoti Prakash on 04/08/16.
//
//

#include "Wembley.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

//Sprite* character;

Wembley::Wembley()
{

}

Wembley::~Wembley() {

}

Scene *Wembley::createScene() {
	auto scene = Scene::create();
	auto layer = Wembley::create();
	scene->addChild(layer);
	//layer->_menuContext = MenuContext::create(layer, Wembley::classname(), true);
	//scene->addChild(layer->_menuContext);
	return scene;
}



bool Wembley::init() {


	if (!Layer::init()) {
		return false;
	}

	//CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("-Alphacombat.plist");
	//this->getEventDispatcher()->addCustomEventListener("on_menu_exit", CC_CALLBACK_0(Trace::resetLevel, this));
	//CocosDenshion::SimpleAudioEngine::getInstance()->preloadBackgroundMusic("TraceMusic.wav");
	//CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("TraceMusic.wav", true);

	//loading lion animation
	//CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("Character/Alpha_kombat_plist.plist");
	//timeline = CSLoader::createTimeline("Character/Alpha_kombat_lion.csb");



      Size visibleSize = Director::getInstance()->getVisibleSize();
	  Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//std::string path = "english/Alpha Kombat/";//std::string(path)
	auto _bg = CSLoader::createNode("wembley/wembleybg.csb");
	//_bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	addChild(_bg);

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
	//_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(alphabet, "Alpha Kombat"));
	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	/*addChild(_background);

	bool foundNode = false;
	int i = 1;
	do {
		foundNode = false;
		auto children = _background->getChildren();
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

			_nodes.push_back(nodeRow);
			_background->getChildByName(queryb)->setVisible(false);
		}
		i++;
	} while (foundNode);

	touches = _nodes.size();
	setupTouch();
	if (level == 0) {
		setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Trace::startGame, this));
	}
	*/
	return true;
}

void Wembley::setupTouch() {
	/*if (_currentStroke > 0) {

		std::ostringstream sstreamb;
		sstreamb << "ball_" << _currentStroke;
		std::string queryb = sstreamb.str();

		auto currentBall = _background->getChildByName(queryb);
		_eventDispatcher->removeEventListenersForTarget(currentBall);
		currentBall->setVisible(false);
	}
	if (_currentStroke < _nodes.size()) {

		std::ostringstream sstreamc;
		sstreamc << "ball_" << (_currentStroke + 1);
		std::string queryc = sstreamc.str();

		auto nextBall = _background->getChildByName(queryc);

		nextBall->setVisible(true);
		setDotsVisibility(true);
		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(Trace::onTouchBegan, this);
		listener->onTouchEnded = CC_CALLBACK_2(Trace::onTouchEnded, this);
		listener->onTouchMoved = CC_CALLBACK_2(Trace::onTouchMoved, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, nextBall);
	}
	*/
}


bool Wembley::onTouchBegan(Touch* touch, Event* event) {
	/*
	auto n = getParent()->convertTouchToNodeSpace(touch);
	auto rect = this->getBoundingBox();
	if (rect.containsPoint(n))
	{
		//        CCLOG("onTouchBegan");
		_currentNodeIndex = 0;
		_touchActive = true;
		touches--;
		//setDotsVisibility(true);
		return true; // to indicate that we have consumed it.
	}
	*/
	return false; // we did not consume this event, pass thru.
}

void Wembley::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");
	/*
	setDotsVisibility(false);
	if (++_currentNodeIndex >= _nodes[_currentStroke].size()) {
		_currentStroke++;
		setupTouch();
		if (_currentStroke >= _nodes.size()) {

			CCLOG("Finished All");

			if (level == 47) {
				level = -1;
			}


			//removeChild(_background);

			Size visibleSize = Director::getInstance()->getVisibleSize();
			Vec2 origin = Director::getInstance()->getVisibleOrigin();

			//this->removeChild(character, true);
			//CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("bubble.mp3");


			std::string randomAnimation = animations[RandomHelper::random_int(0, 3)];

			_menuContext->pickAlphabet('A', 'A', true);


			timeline->play(randomAnimation, false);




			float delay = 0.08;

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
				Trace::transit(level);
			});
			auto redirect = Sequence::create(DelayTime::create(delay), redirectToNextLevel, NULL);

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			auto path = LangUtil::getInstance()->getAlphabetSoundFileName(alpha[level]);
			audio->playEffect(path.c_str(), false);



			if (touches == 0) { level++; }


			this->runAction(redirect);



		}
	}
	else {
		event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
		setDotsVisibility(true);
	}
	*/
}

void Wembley::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");
	
	/*
	if (_touchActive) {
		auto n = convertTouchToNodeSpace(touch);
		event->getCurrentTarget()->setPosition(n);
		auto distance = n.distance(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
		if (distance > 130) {
			if (++_currentNodeIndex < _nodes[_currentStroke].size()) {
				auto nextNode = _nodes[_currentStroke][_currentNodeIndex];
				auto nextDistance = n.distance(nextNode->getPosition());
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
					event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());

					//setDotsVisibility(false);
					_touchActive = false;
					_currentNodeIndex = 0;
				}
			}
			else {
				CCLOG("fell off the edge");
				event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());

				setDotsVisibility(false);
				_touchActive = false;
				_currentNodeIndex = 0;
			}
		}
	}
	*/
}


