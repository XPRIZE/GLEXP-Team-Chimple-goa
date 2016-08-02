//
//  MenuContext.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "MenuContext.h"
#include "ui/CocosGUI.h"
#include "../StartMenuScene.h"
#include "../MapScene.h"
#include "../lang/SafariAnalyticsManager.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../alphamon/SelectAlphamonScene.h"
#include "SimpleAudioEngine.h"
#include "AudioEngine.h"

USING_NS_CC;
using namespace cocos2d::ui;
using namespace experimental;

static const int MAX_POINTS_TO_SHOW = 16;
static const int POINTS_TO_LEFT = 300.0f;

MenuContext* MenuContext::create(Node* main, std::string gameName, bool launchCustomEventOnExit) {
    MenuContext* menuContext = new (std::nothrow) MenuContext();
    if(menuContext && menuContext->init(main)) {
        menuContext->autorelease();
        menuContext->_launchCustomEventOnExit = launchCustomEventOnExit;
        menuContext->gameName = gameName;
        return menuContext;
    }
    CC_SAFE_DELETE(menuContext);
    return nullptr;
    
}

bool MenuContext::init(Node* main) {
    if(!Node::init()) {
        return false;
    }
    _main = main;
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _menuButton = Button::create("menu/menu.png", "menu/menu.png", "menu/menu.png", Widget::TextureResType::LOCAL);
    _menuButton->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
    _menuButton->setPosition(Vec2(origin.x + visibleSize.width - 150, origin.y + visibleSize.height - 150));
    addChild(_menuButton, 1);
    
//    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 50);
//    _label->setPosition(Vec2(125, 125));
//    _menuButton->addChild(_label);
    
    _pointMeter = Slider::create();
    _pointMeter->loadBarTexture("menu/blank.png");
    _pointMeter->loadProgressBarTexture("menu/coinstack.png");
    _pointMeter->setScale9Enabled(true);
    _pointMeter->setTouchEnabled(false);
    _pointMeter->setPosition(Vec2(128, 256));
    _menuButton->addChild(_pointMeter);
    
    return true;
}

void MenuContext::pauseNodeAndDescendants(Node *pNode)
{
    pNode->pause();
    for(const auto &child : pNode->getChildren())
    {
        this->pauseNodeAndDescendants(child);
    }
}
// resume nodes
void MenuContext::resumeNodeAndDescendants(Node *pNode)
{
    pNode->resume();
    for(const auto &child : pNode->getChildren())
    {
        this->resumeNodeAndDescendants(child);
    }
}

void MenuContext::addGreyLayer() {
    if(!_greyLayer) {
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 200.0));
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, -1);
    }
}

void MenuContext::expandMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(clickedButton == _menuButton) {
            if(_menuSelected) {
                auto moveTo = MoveTo::create(0.5, _menuButton->getPosition());
                auto elastic = EaseBackIn::create(moveTo);
                auto callbackRemoveMenu = CallFunc::create(CC_CALLBACK_0(MenuContext::removeMenu, this));
                
                auto targetHelpCloseAction = TargetedAction::create(_helpMenu, elastic->clone());
                auto targetBookCloseAction = TargetedAction::create(_mapMenu, elastic->clone());
                auto targetMapCloseAction = TargetedAction::create(_bookMenu, elastic->clone());
//                auto targetExitCloseAction = TargetedAction::create(_exitMenu, elastic);
                auto targetGamesCloseAction = TargetedAction::create(_gamesMenu, elastic);
                
                auto spawnAction = Spawn::create(targetHelpCloseAction,targetMapCloseAction,targetBookCloseAction,targetGamesCloseAction,nullptr);
                
                runAction(Sequence::create(spawnAction, callbackRemoveMenu, NULL));
            } else {
                addGreyLayer();
                _helpMenu = this->createMenuItem("menu/help.png", "menu/help.png", "menu/help.png",POINTS_TO_LEFT);
                _helpMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showHelp, this));
                
                
                _mapMenu = this->createMenuItem("menu/map.png", "menu/map.png", "menu/map.png", 2 * POINTS_TO_LEFT);
                _mapMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showMap, this));
                
                _bookMenu = this->createMenuItem("menu/book.png", "menu/book.png", "menu/book.png", 3 * POINTS_TO_LEFT);
                _bookMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showBook, this));

                _gamesMenu = this->createMenuItem("menu/game.png", "menu/game.png", "menu/game.png", 4 * POINTS_TO_LEFT);
                _gamesMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showGamesMenu, this));


                auto moveTo = MoveTo::create(0.5, Vec2(150, _menuButton->getPosition().y));
                auto elastic = EaseBackOut::create(moveTo);
                pauseNodeAndDescendants(_main);
                _menuSelected = true;
            }
        } else if (clickedButton == _helpMenu) {
            
        } else if (clickedButton == _exitMenu) {
            if(_launchCustomEventOnExit) {
                std::string menuName(EXIT_MENU);
                EventCustom event("on_menu_exit");
                event.setUserData(static_cast<void*>(&menuName));
                _eventDispatcher->dispatchEvent(&event);
            } else {
                Director::getInstance()->replaceScene(StartMenu::createScene());
            }
            
        }
    }
}

cocos2d::ui::Button* MenuContext::createMenuItem(const std::string normalImage,
                                 const std::string selectedImage ,
                                 const std::string disableImage,
                                 float xPosOffSet) {
    cocos2d::ui::Button* _menu = Button::create(normalImage, selectedImage, disableImage, Widget::TextureResType::LOCAL);
    _menu->setPosition(_menuButton->getPosition());
    addChild(_menu);
    
    auto moveTo = MoveTo::create(0.5, Vec2(_menuButton->getPosition().x - xPosOffSet, _menuButton->getPosition().y));
    auto elastic = EaseBackOut::create(moveTo);
    _menu->runAction(elastic);
    
    return _menu;
}

void MenuContext::removeMenu() {
    if(_menuSelected) {
        removeChild(_exitMenu);
        _exitMenu = nullptr;
        
        removeChild(_helpMenu);
        _helpMenu = nullptr;
        
        removeChild(_bookMenu);
        _bookMenu = nullptr;
        
        removeChild(_mapMenu);
        _mapMenu = nullptr;
        
        removeChild(_gamesMenu);
        _gamesMenu = nullptr;
        
        if(_chimp) {
            removeChild(_chimp);
            _chimp = nullptr;
        }
    }

    if(_greyLayer) {
        removeChild(_greyLayer);
        _greyLayer = nullptr;
    }
    resumeNodeAndDescendants(_main);
    _menuSelected = false;
}

void MenuContext::pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose, cocos2d::Vec2 position) {
    if((choose && targetAlphabet == chosenAlphabet) || (!choose && targetAlphabet != chosenAlphabet)) {
        _points++;
        auto sequence = Sequence::create(
            CallFunc::create(CC_CALLBACK_0(MenuContext::happyFace, this)),
            CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, 1)),
            DelayTime::create(1),
            CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
            NULL);
        runAction(sequence);
    } else {
        _points--;
        auto sequence = Sequence::create(
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::sadFace, this)),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, -1)),
                                         DelayTime::create(1),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
                                         NULL);
        runAction(sequence);
    }
//    _label->setString("Points: " + to_string(_points));
    std::string targetAlphabetStr (1, targetAlphabet);
    std::string chosenAlphabetStr (1, chosenAlphabet);

    SafariAnalyticsManager::getInstance()->insertAnalyticsInfo(targetAlphabetStr.c_str(), chosenAlphabetStr.c_str(), gameName.c_str());
}

void MenuContext::finalizePoints() {
    
}

void MenuContext::increasePoints(int points) {
    _pointMeter->setPercent(_pointMeter->getPercent() + points * 100 / MAX_POINTS_TO_SHOW);
}

void MenuContext::happyFace() {
    _menuButton->loadTextureNormal("menu/happy.png");
}

void MenuContext::sadFace() {
    _menuButton->loadTextureNormal("menu/frown.png");
}

void MenuContext::normalFace() {
    _menuButton->loadTextureNormal("menu/menu.png");
}

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)  
void MenuContext::videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType) {
	switch (eventType) {
	case cocos2d::experimental::ui::VideoPlayer::EventType::PLAYING:
		break;
	case cocos2d::experimental::ui::VideoPlayer::EventType::PAUSED:
		break;
	case cocos2d::experimental::ui::VideoPlayer::EventType::STOPPED:
		break;
	case cocos2d::experimental::ui::VideoPlayer::EventType::COMPLETED:
		videoPlayOverCallback();
		break;
	default:
		break;
	}
}
#endif  

void MenuContext::videoPlayStart(std::string gameName)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	experimental::ui::VideoPlayer* vp = experimental::ui::VideoPlayer::create();
	vp->setContentSize(Size(Director::getInstance()->getVisibleSize().width, Director::getInstance()->getVisibleSize().height));
	vp->setFileName("help/" + gameName+".webm");
	vp->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
	vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
	vp->play();
	vp->setName("video");
	this->addChild(vp, 0);
	vp->addEventListener(CC_CALLBACK_2(MenuContext::videoEventCallback, this));
#else
    videoPlayOverCallback();
#endif

}

void MenuContext::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	this->removeChildByName("video");
#endif 
}

Node* MenuContext::jumpOut(std::string nodeCsbName, float duration, Vec2 position, std::string animationName) {
    auto node = CSLoader::createNode(nodeCsbName);
    auto pos = _menuButton->getPosition();
    node->setPosition(pos);
    node->setScale(0.2);
    addChild(node);
    
    auto jumpTo = MoveTo::create(duration, position);
    auto scaleTo = ScaleTo::create(duration, 1);
    if(!animationName.empty()) {
        cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline(nodeCsbName);
        node->runAction(anim);
        auto callback = CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, animationName, false);
        auto spawn = Spawn::create(jumpTo, scaleTo, CallFunc::create(callback), NULL);
        node->runAction(spawn);
    } else {
        auto spawn = Spawn::create(jumpTo, scaleTo, NULL);
        node->runAction(spawn);
    }
    return node;
}

void MenuContext::showHelp(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        chimpHelp();
    }
}

void MenuContext::showStartupHelp() {
    if(!SafariAnalyticsManager::getInstance()->wasGamePlayedBefore(gameName.c_str())) {
        addGreyLayer();
        pauseNodeAndDescendants(_main);
        chimpHelp();
    }
}

void MenuContext::chimpHelp() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    if(!_chimp) {
        _chimp = jumpOut("chimpanzee.csb", 2, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 4), "jump");
        //    auto callback = CC_CALLBACK_0(MenuContext::tellHelp, this);
        //    auto wait = CC_CALLBACK_0(MenuContext::waitForAudioLoad, this, LangUtil::getInstance()->getDir() + "/sounds/help/" + gameName + ".m4a", callback);
        auto listener = EventListenerTouchOneByOne::create();
        listener->setSwallowTouches(true);
        listener->onTouchBegan = CC_CALLBACK_2(MenuContext::onChimpTouchBegan, this);
        listener->onTouchEnded = CC_CALLBACK_2(MenuContext::onChimpTouchEnded, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _chimp);
        
        runAction(Sequence::create(DelayTime::create(2), CallFunc::create(CC_CALLBACK_0(MenuContext::tellHelp, this)), NULL));
    }
}

void MenuContext::tellHelp() {
    if(_chimp) {
        cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("chimpanzee.csb");
        _chimp->runAction(anim);
        anim->play("talk", true);
        //    auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
        //    audio->playEffect((LangUtil::getInstance()->getDir() + "/sounds/help/" + gameName + "m4a").c_str());
        
        int audioId = AudioEngine::play2d((LangUtil::getInstance()->getDir() + "/sounds/help/" + gameName + ".m4a").c_str());
        if(audioId >= 0) {
            AudioEngine::setFinishCallback(audioId, CC_CALLBACK_0(MenuContext::stopTellHelp, this));
        } else {
            stopTellHelp();
        }
    }
}

void MenuContext::stopTellHelp() {
    if(_chimp) {
        _chimp->stopAllActions();
    }
    videoPlayStart(gameName);
}

bool MenuContext::onChimpTouchBegan(Touch* touch, Event* event){
    return true;
}

void MenuContext::onChimpTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(_chimp) {
        removeChild(_chimp);
        _chimp = nullptr;
    }
    removeMenu();
}


void MenuContext::waitForAudioLoad(std::string audioFileName, std::function<void(bool isSuccess)>callback) {
    AudioEngine::preload(audioFileName.c_str(), callback);
}

void MenuContext::showBook(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Director::getInstance()->replaceScene(TransitionFade::create(2.0, SelectAlphamon::createScene(), Color3B::BLACK));
    }
}


void MenuContext::showMap(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(_launchCustomEventOnExit) {
            std::string menuName(MAP_MENU);
            EventCustom event("on_menu_exit");
            event.setUserData(static_cast<void*>(&menuName));
            _eventDispatcher->dispatchEvent(&event);
        } else {
            Director::getInstance()->replaceScene(TransitionFade::create(2.0, MapScene::createScene(), Color3B::BLACK));
        }

    }
}

void MenuContext::showGamesMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(_launchCustomEventOnExit) {
            std::string menuName(GAME_MAP_MENU);
            EventCustom event("on_menu_exit");
            event.setUserData(static_cast<void*>(&menuName));
            _eventDispatcher->dispatchEvent(&event);
            
        } else {
           Director::getInstance()->replaceScene(TransitionFade::create(2.0, GameMapScene::createScene(), Color3B::BLACK));
        }
    }
}



void MenuContext::showScore() {
    //compute score
    addGreyLayer();
    pauseNodeAndDescendants(_main);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    auto scoreNode = ScoreBoardContext::create(_points, this->gameName);
    scoreNode->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    addChild(scoreNode);
}


MenuContext::MenuContext() :
_points(0),
_label(nullptr),
_menuSelected(false),
_greyLayer(nullptr),
_chimp(nullptr)
{
    
}

MenuContext::~MenuContext() {
    
}

