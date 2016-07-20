//
//  TraceScene.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 10/07/16.
//
//

#include "TraceScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"



char alpha[] = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
int level = 0;
USING_NS_CC;

//Sprite* character;

Trace::Trace() :
_nodes(std::vector<std::vector<Node *>>()),
_touchActive(false),
_currentNodeIndex(0),
_currentStroke(0)
{
    
}

Trace::~Trace() {
    
}

cocostudio::timeline::ActionTimeline *timeline;

Scene *Trace::createScene(char alphabet) {
    auto scene = Scene::create();
    auto layer = Trace::create(alphabet);
    scene->addChild(layer);
    return scene;
}

Trace *Trace::create(char alphabet) {
    Trace *trace = new (std::nothrow) Trace();
    if(trace && trace->init(alphabet)) {
        trace->autorelease();
        return trace;
    }
    CC_SAFE_DELETE(trace);
    return nullptr;

}

bool Trace::init(char alphabet) {
	

    if (!Layer::init()){
        return false;
    }
	std::string path = "Alpha Kombat/";//std::string(path)
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("Alphacombat.plist");
	

	CocosDenshion::SimpleAudioEngine::getInstance()->preloadEffect("bubble.mp3");
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("restanimation.plist");
	timeline = CSLoader::createTimeline("mainanimation.csb");


	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	
	auto _bg = CSLoader::createNode("Alphacombat.csb");
	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	addChild(_bg);

	/*auto bg = Sprite::create("bg.png");
	bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	addChild(bg, 0);
	*/
	
	Sprite* node = (Sprite *)CSLoader::createNode("mainanimation.csb");
	node->setPosition(Vec2(700, 200));
	node->setScale(2);
	this->addChild(node, 0);
	node->runAction(timeline);
	

	/*character = Sprite::createWithSpriteFrameName("main1.png");
	character->setPosition(Vec2(1000, 1000));
	character->setScale(0.65);
	this->addChild(character, 4);*/

	//std::string path = "Alpha Kombat/";//std::string(path)
    _background = CSLoader::createNode(std::string(path) + alphabet +  std::string(".csb"));
	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
    addChild(_background);

    bool foundNode = false;
    int i = 1;
    do {
        foundNode = false;
        auto children = _background->getChildren();
        auto nodeRow = std::vector<Node *>();
        for (auto const& child: children) {
            auto str = child->getName();
			
			std::ostringstream sstreami;
			sstreami << "Node_" << i ;
			std::string queryi = sstreami.str();

            if (str.find(queryi) != std::string::npos) {
                
				CCLOG("child: %s", str.c_str());
                foundNode = true;
				//child->setVisible(true);
                nodeRow.push_back(child);
            }
        }
        if(foundNode) {

			std::ostringstream sstreamb;
			sstreamb << "ball_" << i;
			std::string queryb = sstreamb.str();

            _nodes.push_back(nodeRow);
            _background->getChildByName(queryb)->setVisible(false);
        }
        i++;
    } while (foundNode);

    setupTouch();
    return true;
}

void Trace::setupTouch() {
    if(_currentStroke > 0) {

		std::ostringstream sstreamb;
		sstreamb << "ball_" << _currentStroke;
		std::string queryb = sstreamb.str();

        auto currentBall = _background->getChildByName(queryb);
        _eventDispatcher->removeEventListenersForTarget(currentBall);
        currentBall->setVisible(false);
    }
    if(_currentStroke < _nodes.size()) {

		std::ostringstream sstreamc;
		sstreamc << "ball_" <<( _currentStroke + 1);
		std::string queryc = sstreamc.str();

        auto nextBall = _background->getChildByName(queryc);

        nextBall->setVisible(true);
        auto listener = EventListenerTouchOneByOne::create();
        listener->onTouchBegan = CC_CALLBACK_2(Trace::onTouchBegan, this);
        listener->onTouchEnded = CC_CALLBACK_2(Trace::onTouchEnded, this);
        listener->onTouchMoved = CC_CALLBACK_2(Trace::onTouchMoved, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, nextBall);
    }
}

void Trace::onAlphabetSelected(EventCustom *event) {
}

bool Trace::onTouchBegan(Touch* touch, Event* event){
    auto n = getParent()->convertTouchToNodeSpace(touch);
    auto rect = this->getBoundingBox();
    if(rect.containsPoint(n))
    {
//        CCLOG("onTouchBegan");
        _currentNodeIndex = 0;
        _touchActive = true;
        return true; // to indicate that we have consumed it.
    }
    
    return false; // we did not consume this event, pass thru.
}

void Trace::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchEnded");
    if (++_currentNodeIndex >= _nodes[_currentStroke].size()) {
        _currentStroke++;
        setupTouch();
        if(_currentStroke >= _nodes.size()) {
           
			CCLOG("Finished All");
			if (level == 25) {
				level = -1;
			}
			
			level++;
			
			removeChild(_background);

			Size visibleSize = Director::getInstance()->getVisibleSize();
			Vec2 origin = Director::getInstance()->getVisibleOrigin();

			//this->removeChild(character, true);
			CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("bubble.mp3");
			timeline->play("run", false);

			timeline->setAnimationEndCallFunc("run", CC_CALLBACK_0(Trace::transit,this, level));
			
			//std::chrono::seconds duration(5);
			//std::this_thread::sleep_for(duration);
			/*
			transit(int level) {
				//auto director = Director::getInstance();
				auto scene = Trace::createScene(alpha[level]);
				//Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));
				Director::getInstance()->replaceScene(scene);
			}*/
			
			
			
        }
    } else {
        event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
    }
}

void Trace::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchMoved");
    if(_touchActive) {
        auto n = convertTouchToNodeSpace(touch);
        event->getCurrentTarget()->setPosition(n);
        auto distance = n.distance(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
        if (distance > 120) {
            if(++_currentNodeIndex < _nodes[_currentStroke].size()) {
                auto nextNode = _nodes[_currentStroke][_currentNodeIndex];
                auto nextDistance = n.distance(nextNode->getPosition());
                if(nextDistance < 120) {
                    CCLOG("reached next");
                } else {
                    CCLOG("failed");
                    event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
                    _touchActive = false;
                    _currentNodeIndex = 0;
                }
            } else {
                CCLOG("fell off the edge");
                event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
                _touchActive = false;
                _currentNodeIndex = 0;
            }
        }
    }
}

void Trace::transit(int level) {
	//auto director = Director::getInstance();
	auto scene = Trace::createScene(alpha[level]);
	//Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));
	Director::getInstance()->replaceScene(scene);
}