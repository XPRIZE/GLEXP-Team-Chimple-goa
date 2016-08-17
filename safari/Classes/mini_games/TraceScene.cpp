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
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"


int touches;


//char alpha[] = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
std::string animations[] = { "kick","punch","arm_sweep","jump_and_kick" };

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

Scene *Trace::createScene(int alphabet) {
    auto alpha = LangUtil::getInstance()->getAllCharacters();
    auto scene = Scene::create();
    auto layer = Trace::create(alpha[alphabet]);
    scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Trace::classname(), true);
    scene->addChild(layer->_menuContext);    
    return scene;
}

Trace *Trace::create(wchar_t alphabet) {
    Trace *trace = new (std::nothrow) Trace();
    if(trace && trace->init(alphabet)) {
        trace->autorelease();
        return trace;
    }
    CC_SAFE_DELETE(trace);
    return nullptr;

}

bool Trace::init(wchar_t alphabet) {
	

    if (!Layer::init()){
        return false;
    }

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("-Alphacombat.plist");
	this->getEventDispatcher()->addCustomEventListener("on_menu_exit", CC_CALLBACK_0(Trace::resetLevel, this));
	CocosDenshion::SimpleAudioEngine::getInstance()->preloadBackgroundMusic ("TraceMusic.wav");
	CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("TraceMusic.wav", true);

	//loading lion animation
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("Character/Alpha_kombat_plist.plist");
	timeline = CSLoader::createTimeline("Character/Alpha_kombat_lion.csb");

	

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::string path = "english/Alpha Kombat/";//std::string(path)
	auto _bg = CSLoader::createNode("Alphacombat.csb");
	//_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	addChild(_bg);

	/*auto bg = Sprite::create("bg.png");
	bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	addChild(bg, 0);
	*/
	
	Sprite* node = (Sprite *)CSLoader::createNode("Character/Alpha_kombat_lion.csb");
	node->setPosition(Vec2(700,200));
	node->setScale(1);
	this->addChild(node, 0);
	node->runAction(timeline);
	

	//std::string path = "Alpha Kombat/";//std::string(path)
    //_background = CSLoader::createNode(std::string(path) + alphabet +  std::string(".csb"));
	_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(alphabet, "Alpha Kombat"));
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
			sstreami << "dot_" << i ;
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

	touches = _nodes.size();
    setupTouch();
	if (level == 0) {
		setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Trace::startGame, this));
	}
    return true;
}

void Trace::startGame() {
    _menuContext->showStartupHelp(CC_CALLBACK_0(Trace::dummy, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp,_menuContext)), NULL));
}

void Trace::dummy() {
    
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
		setDotsVisibility(true);
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
		touches--;
		//setDotsVisibility(true);
        return true; // to indicate that we have consumed it.
    }
    
    return false; // we did not consume this event, pass thru.
}

void Trace::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchEnded");
	
	setDotsVisibility(false);
    if (++_currentNodeIndex >= _nodes[_currentStroke].size()) {
        _currentStroke++;
        setupTouch();
        if(_currentStroke >= _nodes.size()) {
           
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
            auto alpha = LangUtil::getInstance()->getAllCharacters();
			auto path = LangUtil::getInstance()->getAlphabetSoundFileName(alpha[level]);
			audio->playEffect(path.c_str(), false);

			
			
			if (touches == 0) { level++; }
			
			
			this->runAction(redirect);
			

			
        }
    } else {
        event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
		setDotsVisibility(true);
    }
}

void Trace::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchMoved");
    if(_touchActive) {
        auto n = convertTouchToNodeSpace(touch);
        event->getCurrentTarget()->setPosition(n);
        auto distance = n.distance(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
        if (distance > 130) {
            if(++_currentNodeIndex < _nodes[_currentStroke].size()) {
                auto nextNode = _nodes[_currentStroke][_currentNodeIndex];
                auto nextDistance = n.distance(nextNode->getPosition());
				
				int lastReached;
				if(_currentNodeIndex  == _nodes[_currentStroke].size())
					lastReached = 5;
				else
					lastReached = 130;

                if(nextDistance < lastReached) {
                    CCLOG("reached next");
					
					//set it visible
					std::ostringstream sstreami;
					sstreami << "dot_" << _currentStroke+1 << "_" << _currentNodeIndex;
					std::string queryi = sstreami.str();

					_background->getChildByName(queryi)->setVisible(false);
					
                } else {
                    CCLOG("failed");
                    event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
					
					//setDotsVisibility(false);
                    _touchActive = false;
                    _currentNodeIndex = 0;
                }
            } else {
                CCLOG("fell off the edge");
                event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
				
				setDotsVisibility(false);
                _touchActive = false;
                _currentNodeIndex = 0;
            }
        }
    }
}

void Trace::transit(int level) {
	//auto director = Director::getInstance();
	auto scene = Trace::createScene(level);
	//Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));
	Director::getInstance()->replaceScene(scene);
}


void Trace::resetLevel() {
	level = 0;
    Director::getInstance()->replaceScene(GameMapScene::createScene());
}
void Trace::setDotsVisibility(bool flag) {

	for (int i = 0; i < _nodes[_currentStroke].size(); i++) {
		std::ostringstream sstreami;
		sstreami << "dot_" << _currentStroke + 1 << "_" << i + 1;
		std::string queryi = sstreami.str();

		_background->getChildByName(queryi)->setVisible(flag);
	}
}

