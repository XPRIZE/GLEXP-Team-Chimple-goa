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



//char alpha[] = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
std::string animations[] = { "kick","punch","arm_sweep","jump_and_kick" };


USING_NS_CC;

//Sprite* character;
int _level = 0;

Trace::Trace() :
_nodes(std::vector<std::vector<Node *>>()),
_touchActive(false),
_currentNodeIndex(0),
_currentStroke(0),
_iterations(0)
{
    
}

Trace::~Trace() {

}

cocostudio::timeline::ActionTimeline *timeline;

Scene *Trace::createScene() {
    
    auto scene = Scene::create();
    auto layer = Trace::create();

    scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Trace::classname(), false);
    scene->addChild(layer->_menuContext);    
    return scene;
}

Trace *Trace::create() {
    Trace *trace = new (std::nothrow) Trace();
    if(trace && trace->init()) {
        trace->autorelease();
        return trace;
    }
    CC_SAFE_DELETE(trace);
    return nullptr;

}

bool Trace::init() {

	if (!Layer::init())
	{
		return false;
	}

	return true;

}


void Trace::onEnterTransitionDidFinish() {
	
	//_language = LangUtil::getInstance()->getLang();
	
	
	_alpha = LangUtil::getInstance()->getAllCharacters();
    
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("-Alphacombat.plist");
	this->getEventDispatcher()->addCustomEventListener("on_menu_exit", CC_CALLBACK_0(Trace::resetLevel, this));
	//CocosDenshion::SimpleAudioEngine::getInstance()->preloadBackgroundMusic ("TraceMusic.wav");
	//CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("TraceMusic.wav", true);

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
	if (LangUtil::getInstance()->getLang() == "swa") {
		if (_menuContext->getCurrentLevel() == 25) {
			_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(_alpha[0], "Alpha Kombat"));
		}
		else if (_menuContext->getCurrentLevel() == 26) {
				_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(_alpha[1], "Alpha Kombat"));
		}
		else {
			_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(_alpha[_menuContext->getCurrentLevel() - 1], "Alpha Kombat"));
		}
	}
	else {

		_background = CSLoader::createNode(LangUtil::getInstance()->getSpecialAnimationFileName(_alpha[_menuContext->getCurrentLevel() - 1], "Alpha Kombat"));
	}
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
			_background->getChildByName(queryb)->setScale(1, 1);
        }
        i++;
    } while (foundNode);

	_touches = _nodes.size();
    setupTouch();

	_menuContext->setMaxPoints(_touches);

	////////help

	if (_menuContext->getCurrentLevel() == 1 && _iterations==0) {

		auto box1 = _background->getChildByName("ball_1");
		auto box2 = _background->getChildByName("dot_1_4");


		auto box1pos = box1->getPosition();// +Vec2(visibleSize.width * 0.03, visibleSize.height * 0.05);
		auto box2pos = box2->getPosition();// +Vec2(visibleSize.width * 0.03, visibleSize.height * 0.05);

		_help = HelpLayer::create(Rect(box1pos.x, box1pos.y, box1->getContentSize().width, box1->getContentSize().height), Rect(box2pos.x, box2pos.y, box1->getContentSize().width, box1->getContentSize().height));


		_help->clickAndDrag(Vec2(box1pos), Vec2(box2pos));


		this->addChild(_help);
	}


	///////////


	if (_level == 0) {
		setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Trace::startGame, this));
	}
    
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

	/*
	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (target->getBoundingBox().containsPoint(touch->getLocation()))
	*/

	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);

    //auto n = getParent()->convertTouchToNodeSpace(touch);
    //auto rect = this->getBoundingBox();
    //if(rect.containsPoint(n))
	if (target->getBoundingBox().containsPoint(touch->getLocation()))
	{
//        CCLOG("onTouchBegan");
		if(_currentNodeIndex == 0)
        _currentNodeIndex = 0;
        _touchActive = true;
		//touches--;
		//setDotsVisibility(true);
        return true; // to indicate that we have consumed it.
    }
    
    return false; // we did not consume this event, pass thru.
}

void Trace::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchEnded");
	_menuContext->addPoints(-1);
	//setDotsVisibility(false);
    if (_currentNodeIndex >= _nodes[_currentStroke].size()) {
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
    } else {
        //event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
		//if(_currentNodeIndex <= _nodes[_currentStroke].size())
		//event->getCurrentTarget()->setPosition(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
		//setDotsVisibility(true);
    }
}

void Trace::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
//    CCLOG("onTouchMoved");
	int finished = 0;
    if(_touchActive) {


        auto n = convertTouchToNodeSpace(touch);
        event->getCurrentTarget()->setPosition(n);
        auto distance = n.distance(_nodes[_currentStroke][_currentNodeIndex]->getPosition());

		

		if (_currentNodeIndex >= _nodes[_currentStroke].size()-1) {

			setDotsVisibility(false);
			
			
			if (_currentStroke+1 > _nodes.size()-1 && _currentNodeIndex >= _nodes[_currentStroke].size()-1) {

				
				finished = 1;
				
				CCLOG("Finished All");
				
				//if (strcmp(_language, "eng")) { _languageRange = 24; }
				//if (_language == "kan") { _languageRange = 47; }
				
				
				_currentStroke = 0;
				_currentNodeIndex = 0;
				finishedAll();


			}
			if (finished == 0) {
				_currentStroke++;
				_currentNodeIndex = 0;
				setupTouch();
			}
		}

		
        if (distance > 130 && _currentStroke <= _nodes.size() - 1) {

            if(_currentNodeIndex < _nodes[_currentStroke].size()-1) {

				++_currentNodeIndex;
                auto nextNode = _nodes[_currentStroke][_currentNodeIndex];
                auto nextDistance = n.distance(nextNode->getPosition());
				
				int lastReached;
				if(_currentNodeIndex  == _nodes[_currentStroke].size())
					lastReached = 5;
				else
					lastReached = 130;

                if(nextDistance < 130) {
                    CCLOG("reached next");
					
					auto flag = 0;
					if (_menuContext->getCurrentLevel() == 1 && flag ==0 && _currentNodeIndex == 1 && _iterations == 0) {
						this->removeChild(_help);
						flag = 1;
					}

					//set it visible
					std::ostringstream sstreami;
					sstreami << "dot_" << _currentStroke+1 << "_" << _currentNodeIndex;
					std::string queryi = sstreami.str();

					_background->getChildByName(queryi)->setVisible(false);
					
					
                } else {
                    CCLOG("failed");
					--_currentNodeIndex;
                    //event->getCurrentTarget()->setPosition(_nodes[_currentStroke][0]->getPosition());
					event->getCurrentTarget()->setPosition(_nodes[_currentStroke][_currentNodeIndex]->getPosition());
					//setDotsVisibility(false);
                    _touchActive = false;
					if(_currentNodeIndex == _nodes[_currentStroke].size())
                    _currentNodeIndex = 0;
                }
            } else {
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

void Trace::transit(int level) {
	//auto director = Director::getInstance();
	auto scene = Trace::createScene();
	//Director::getInstance()->replaceScene(TransitionFlipX::create(2, scene));
	Director::getInstance()->replaceScene(scene);
}


//void Trace::resetLevel() {
	//_level = 0;
    //Director::getInstance()->replaceScene(ScrollableGameMapScene::createScene());
//}
void Trace::setDotsVisibility(bool flag) {

	for (int i = 0; i < _nodes[_currentStroke].size(); i++) {
		std::ostringstream sstreami;
		sstreami << "dot_" << _currentStroke + 1 << "_" << i + 1;
		std::string queryi = sstreami.str();

		_background->getChildByName(queryi)->setVisible(flag);
	}
}


void Trace::finishedAll() {


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

	_menuContext->addPoints(1);


	timeline->play(randomAnimation, false);

	float delay = 0.08;
	auto characterAudio = CallFunc::create([=] {

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		//auto alpha = LangUtil::getInstance()->getAllCharacters();
		auto path = LangUtil::getInstance()->getAlphabetSoundFileName(_alpha[_menuContext->getCurrentLevel()-1]);
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
/*
		if (_level == wcslen(LangUtil::getInstance()->getAllCharacters())-1) {
			_level = -1;
		}
		_level++;
		Trace::transit(_level);*/
		if (_iterations == 2) {
			_menuContext->showScore();
		}
		else {
		

			resetLevel();
			_iterations++;
			onEnterTransitionDidFinish();

		}
	}			);
	auto redirect = Sequence::create(DelayTime::create(delay), redirectToNextLevel, NULL);

	



	//if (_touches == 0) { _level++; }


	this->runAction(redirect);


}

void Trace::resetLevel() {

	_nodes.clear();
	_touchActive = false;
	_currentNodeIndex = 0;
	_currentStroke = 0;

}