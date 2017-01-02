//
//  MenuContext.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "MenuContext.h"
#include "LevelHelpScene.h"
#include "LevelHelpOverlay.h"
#include "LevelMenu.h"
#include "ui/CocosGUI.h"
#include "../StartMenuScene.h"
#include "../MapScene.h"
#include "../lang/SafariAnalyticsManager.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../alphamon/SelectAlphamonScene.h"
#include "SimpleAudioEngine.h"
#include "AudioEngine.h"
#include "ScrollableGameMapScene.hpp"
#include "../PhotoCaptureScene.hpp"
#include "storage/local-storage/LocalStorage.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"
#include "../alphamon/SelectAlphamonScene.h"
#include "../puzzle/DuelScene.h"
#include "../puzzle/WordBoard.h"
#include "../puzzle/PegWord.h"
#include "../mini_games/PatchTheWallScene.h"
#include "../mini_games/CrossTheBridgeScene.h"
#include "../mini_games/SmashTheRockScene.h"
#include "../mini_games/EndlessRunner.h"
#include "../mini_games/Cannon_Ball_Main.h"
#include "../mini_games/TraceScene.h"
#include "../mini_games/AlphamonFeedScene.h"
#include "../mini_games/BajaWordScene.h"
#include "../mini_games/Jasmin_Mainfile.h"
#include "../mini_games/jazz.h"
#include "../mini_games/Chain.h"
#include "../mini_games/Wembley.h"
#include "../mini_games/CatGameScene.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"
#include "../mini_games/Alphamole.h"
#include "../mini_games/Memory.h"
#include "../mini_games/MemoryHero.h"
#include "../mini_games/MemoryJungle.h"
#include "../mini_games/Circle.h"
#include "../mini_games/Stack.h"
#include "../mini_games/Talk.h"
#include "../mini_games/BalloonHero.h"
#include "../mini_games/Bingo.h"
#include "../mini_games/Drop.h"
#include "../mini_games/Owl.h"
#include "../mini_games/BalloonHero.h"
#include "../mini_games/Decomon.h"
#include "../mini_games/Order.h"
#include "../mini_games/Pillar.h"
#include "../mini_games/CarDraw.h"
#include "../mini_games/BlastLetter.h"
#include "../mini_games/Door.h"
#include "../mini_games/TreasureHunt.h"
#include "../mini_games/Units.h"
#include "../mini_games/JumpingNumbers.h"
#include "../mini_games/Card.h"
#include "../mini_games/Line.h"
#include "../mini_games/ChocolateFactory.h"
#include "../mini_games/Step.h"
#include "../mini_games/ATM.h"
#include "../mini_games/Shop.h"
#include "../mini_games/Item.h"
#include "../mini_games/spot.h"
#include "../mini_games/Table.h"
#include "../mini_games/Shape.h"
#include "../mini_games/Balloon.h"
#include "../mini_games/PopCount.h"
#include "../mini_games/DinoGame.h"
#include "../util/CommonLabel.h"
#include "../Setting.h"
#include "Award.h"

USING_NS_CC;
using namespace cocos2d::ui;
using namespace experimental;

static const int MAX_POINTS_TO_SHOW = 16;
static const int POINTS_TO_LEFT = 300.0f;
static const std::string CURRENT_LEVEL = ".currentLevel";
static const std::string LEVEL = ".level";
static const std::string UNLOCK_ALL = ".unlock";
static const std::string LANGUAGE = "language";

static const std::string UNLOCKED_STORY_ID_ORDER = ".unlockedStoryIdOrder";
static const int MIN_STAR_TO_UNLOCK_NEXT_STORY = 1;
static const int NUMBER_OF_TIMES_READ_STORY_TO_UNLOCK_NEXT_STORY = 2;
static const int NUMBER_OF_STORIES_TO_BE_UNLOCKED = 1;
bool MenuContext::_gameIsStatic = false;

MenuContext* MenuContext::create(Node* main, std::string gameName, bool launchCustomEventOnExit, std::string sceneName) {
    MenuContext* menuContext = new (std::nothrow) MenuContext();
    if(menuContext && menuContext->init(main)) {
        menuContext->autorelease();
        menuContext->_launchCustomEventOnExit = launchCustomEventOnExit;
        menuContext->gameName = gameName;
        menuContext->sceneName = sceneName;

        std::string currentLevelStr;
        localStorageGetItem(gameName + CURRENT_LEVEL, &currentLevelStr);
        if(!currentLevelStr.empty()) {
            menuContext->setCurrentLevel(std::atoi( currentLevelStr.c_str()));
        }
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
    MenuContext::_gameIsStatic = false;
    return true;
}

void MenuContext::onExitTransitionDidStart() {
    CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
}

void MenuContext::pauseNodeAndDescendants(Node *pNode)
{
    _gameIsPaused = true;
    MenuContext::_gameIsStatic = true;
    CocosDenshion::SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
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
        _greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 128.0));
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, -1);
    }
}

void MenuContext::expandMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(_chimp) {
        return;
    }
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(clickedButton == _menuButton) {
            if(_menuSelected) {
                auto moveTo = MoveTo::create(0.5, _menuButton->getPosition());
                auto elastic = EaseBackIn::create(moveTo);
                auto callbackRemoveMenu = CallFunc::create(CC_CALLBACK_0(MenuContext::removeMenu, this));
                Vector<FiniteTimeAction *> closeActions;
                if(_helpMenu) {
                    closeActions.pushBack(TargetedAction::create(_helpMenu, elastic->clone()));
                }
                if(_bookMenu) {
                    closeActions.pushBack(TargetedAction::create(_bookMenu, elastic->clone()));
                }
                if(_settingMenu) {
                    closeActions.pushBack(TargetedAction::create(_settingMenu, elastic->clone()));
                }
                if(_gamesMenu) {
                    closeActions.pushBack(TargetedAction::create(_gamesMenu, elastic->clone()));
                }
                if(_mapMenu) {
                    closeActions.pushBack(TargetedAction::create(_mapMenu, elastic->clone()));
                }

//                if(_photoMenu) {
//                    auto targetPhotoCloseAction = TargetedAction::create(_photoMenu, elastic->clone());
//                    auto spawnAction = Spawn::create(targetHelpCloseAction,targetMapCloseAction,targetBookCloseAction,targetGamesCloseAction,targetPhotoCloseAction, targetSettingCloseAction, nullptr);
//                        runAction(Sequence::create(spawnAction, callbackRemoveMenu, NULL));
//                } else {
//                    auto spawnAction = Spawn::create(targetHelpCloseAction,targetMapCloseAction,targetBookCloseAction,targetGamesCloseAction,targetSettingCloseAction, nullptr);
//                        runAction(Sequence::create(spawnAction, callbackRemoveMenu, NULL));
//                }
                
                auto spawnAction = Spawn::create(closeActions);
                runAction(Sequence::create(spawnAction, callbackRemoveMenu, NULL));
            } else {
                addGreyLayer();
                if(gameName == "menu") {
                    _gamesMenu = this->createMenuItem("menu/game.png", "menu/game.png", "menu/game.png", 1 * POINTS_TO_LEFT);
                    _gamesMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showGamesMenu, this));
                    _mapMenu = this->createMenuItem("menu/reward.png", "menu/reward.png", "menu/reward.png", 2 * POINTS_TO_LEFT);
                    _mapMenu->addTouchEventListener(CC_CALLBACK_0(MenuContext::showRewards, this));
                    _settingMenu = this->createMenuItem("menu/settings.png", "menu/settings.png", "menu/settings.png", 3 * POINTS_TO_LEFT);
                    _settingMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::addCalculator, this));
                    _helpMenu = this->createMenuItem("menu/help.png", "menu/help.png", "menu/help.png", 4 * POINTS_TO_LEFT);
                    _helpMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showHelp, this));
                } else if(gameName == "levelMenu" || gameName == "story-play" || gameName == "map") {
                    _gamesMenu = this->createMenuItem("menu/game.png", "menu/game.png", "menu/game.png", 1 * POINTS_TO_LEFT);
                    _gamesMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showGamesMenu, this));
                    _mapMenu = this->createMenuItem("menu/reward.png", "menu/reward.png", "menu/reward.png", 2 * POINTS_TO_LEFT);
                    _mapMenu->addTouchEventListener(CC_CALLBACK_0(MenuContext::showRewards, this));
                    _helpMenu = this->createMenuItem("menu/help.png", "menu/help.png", "menu/help.png", 3 * POINTS_TO_LEFT);
                    _helpMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showHelp, this));
                } else {
                    _gamesMenu = this->createMenuItem("menu/game.png", "menu/game.png", "menu/game.png", 1 * POINTS_TO_LEFT);
                    _gamesMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showGamesMenu, this));
                    _mapMenu = this->createMenuItem("menu/reward.png", "menu/reward.png", "menu/reward.png", 2 * POINTS_TO_LEFT);
                    _mapMenu->addTouchEventListener(CC_CALLBACK_0(MenuContext::showRewards, this));
                    _bookMenu = this->createMenuItem("menu/back.png", "menu/back.png", "menu/back.png", 3 * POINTS_TO_LEFT);
                    _bookMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showBook, this));
                    _helpMenu = this->createMenuItem("menu/help.png", "menu/help.png", "menu/help.png", 4 * POINTS_TO_LEFT);
                    _helpMenu->addTouchEventListener(CC_CALLBACK_2(MenuContext::showHelp, this));
                }
//                _photoMenu = this->createAvatarMenuItem("", "", "", 6 * POINTS_TO_LEFT);
                

//                std::string latestPhotoPath = SafariAnalyticsManager::getInstance()->getLatestUserPhoto();
//                
//                if(!latestPhotoPath.empty()) {
//                    CCLOG("got path for menu %s", latestPhotoPath.c_str());
//                }
                
                auto moveTo = MoveTo::create(0.5, Vec2(150, _menuButton->getPosition().y));
                auto elastic = EaseBackOut::create(moveTo);
                pauseNodeAndDescendants(_main);
                _menuSelected = true;
            }
        } else if (clickedButton == _helpMenu) {
            
        } else if (clickedButton == _exitMenu) {
            _character->removeFromParent();
            if(_launchCustomEventOnExit) {
                std::string menuName(EXIT_MENU);
                EventCustom event("on_menu_exit");
                event.setUserData(static_cast<void*>(&menuName));
                _eventDispatcher->dispatchEvent(&event);
            } else {
//                Director::getInstance()->replaceScene(StartMenu::createScene());
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

cocos2d::ClippingNode* MenuContext::createMaskedMenuItem(const std::string normalImage,
                                                 const std::string selectedImage ,
                                                 const std::string disableImage,
                                                 float xPosOffSet) {
    
    ClippingNode* clipper = ClippingNode::create();
    clipper->setPosition(_menuButton->getPosition());
    Sprite * stencil = Sprite::create("menu/back.png");
    clipper->setStencil(stencil);
    clipper->setAlphaThreshold(0.9);
    
    std::string cachedCharacterInformation;
    localStorageGetItem("cachedCharacterConfig", &cachedCharacterInformation);

    
    auto avatar = CSLoader::createNode("faceavatar/avatar.csb");
    _character = dynamic_cast<cocostudio::timeline::SkeletonNode *>(avatar);
    //character->setScale(0.5);

    if(!cachedCharacterInformation.empty())
    {
        std::string contents = FileUtils::getInstance()->getStringFromFile("config/characterConfig.json");

        rapidjson::Document d;
        
        if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
            // document is ok
            
            std::vector<std::string> configs = this->split(cachedCharacterInformation, '_');
            int index = 0;
            for (std::vector<std::string>::iterator it = configs.begin() ; it != configs.end(); ++it)
            {
                std::string config = *(it);
                int configId = atoi(config.c_str());
                CCLOG("configId %d", configId);
                const rapidjson::Value& ds = d["data"];
                const std::string name = ds[index]["name"].GetString();
                const std::string bone = ds[index]["bone"].GetString();
                
                printf("%s \n",name.c_str());
                printf("%s \n",bone.c_str());
                
                cocostudio::timeline::BoneNode* boneNode = _character->getBoneNode(bone);
                if(boneNode != NULL)
                {
                    const rapidjson::Value& dsItems =  ds[index]["items"];
                    const rapidjson::Value& dsObj = dsItems[configId];
                    std::string image = dsObj["Image"].GetString();
                    image.erase(0, 1);
                    printf("%s \n",image.c_str());
                    
                    float anchorX = 0;
                    float anchorY = 0;
                    if(dsObj.HasMember("AnchorPoint")) {
                        anchorX = (float) dsObj["AnchorPoint"]["ScaleX"].GetDouble();
                        anchorY = (float) dsObj["AnchorPoint"]["ScaleY"].GetDouble();
                    }

                    float posX = 0;
                    float posY = 0;

                    if(dsObj.HasMember("Position")) {
                        posX = (float) dsObj["Position"]["X"].GetDouble();
                        posY = (float) dsObj["Position"]["Y"].GetDouble();
                    }

                    float rotationX = 0;
                    float rotationY = 0;

                    if(dsObj.HasMember("Rotation")) {
                        rotationX = (float) dsObj["Rotation"]["X"].GetDouble();
                        rotationY = (float) dsObj["Rotation"]["Y"].GetDouble();
                    }
                    
                    auto sprite = Sprite::createWithSpriteFrameName(image);
                    CCLOG("image %s", image.c_str());
                    CCLOG("anchorX %f", anchorX);
                    CCLOG("anchorY %f", anchorY);
                    CCLOG("posX %f", posX);
                    CCLOG("posY %f", posY);
                    CCLOG("rotationX %f", rotationX);
                    CCLOG("rotationY %f", rotationY);
                    sprite->setAnchorPoint(Vec2(anchorX, anchorY));
                    sprite->setPosition(Vec2(posX, posY));
                    sprite->setRotationSkewX(rotationX);
                    sprite->setRotationSkewY(rotationY);
                    
                    boneNode->addSkin(sprite, true);
                    boneNode->displaySkin(sprite, true);
                }
                
                index++;
            }
            
        }
    }
    
    
    //cocos2d::ui::Button* _menu = Button::create(normalImage, selectedImage, disableImage, Widget::TextureResType::LOCAL);
    clipper->addChild(_character,1);
    
    //_menu->addTouchEventListener(CC_CALLBACK_2(MenuContext::changePhoto, this));

    
    addChild(clipper);
    auto moveTo = MoveTo::create(0.5, Vec2(_menuButton->getPosition().x - xPosOffSet, _menuButton->getPosition().y));
    auto elastic = EaseBackOut::create(moveTo);
    clipper->runAction(elastic);
    
    return clipper;
}


cocos2d::Node* MenuContext::createAvatarMenuItem(const std::string normalImage,
                                                         const std::string selectedImage ,
                                                         const std::string disableImage,
                                                         float xPosOffSet) {
    
    std::string cachedCharacterInformation;
    localStorageGetItem("cachedCharacterConfig", &cachedCharacterInformation);
    
    
    auto avatar = CSLoader::createNode("faceavatar/avatar.csb");
    _character = dynamic_cast<cocostudio::timeline::SkeletonNode *>(avatar);
    _character->setScale(0.3);
    _character->setPosition(_menuButton->getPosition());
    
    if(!cachedCharacterInformation.empty())
    {
        std::string contents = FileUtils::getInstance()->getStringFromFile("config/characterConfig.json");
        
        rapidjson::Document d;
        
        if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
            // document is ok
            
            std::vector<std::string> configs = this->split(cachedCharacterInformation, '_');
            CCLOG("configs size %d", configs.size());
            auto faceIndex = configs[configs.size() - 1];
            auto hairIndex = configs[configs.size() - 2];
            int index = 0;
            for (std::vector<std::string>::iterator it = configs.begin() ; it != configs.end() - 3; ++it)
            {
                std::string config = *(it);
                int configId = atoi(config.c_str());
                CCLOG("configId %d", configId);
                const rapidjson::Value& ds = d["data"];
                const std::string bone = ds[index]["bone"].GetString();
                
                printf("%s \n",bone.c_str());
                
                cocostudio::timeline::BoneNode* boneNode = _character->getBoneNode(bone);
                if(boneNode != NULL)
                {
                    const rapidjson::Value& dsItems =  ds[index]["items"];
                    const rapidjson::Value& dsObj = dsItems[configId];
                    std::string image = dsObj["Image"].GetString();
                    image.erase(0, 1);
                    printf("%s \n",image.c_str());
                    
                    float anchorX = 0;
                    float anchorY = 0;
                    if(dsObj.HasMember("AnchorPoint")) {
                        anchorX = (float) dsObj["AnchorPoint"]["ScaleX"].GetDouble();
                        anchorY = (float) dsObj["AnchorPoint"]["ScaleY"].GetDouble();
                    }
                    
                    float posX = 0;
                    float posY = 0;
                    
                    if(dsObj.HasMember("Position")) {
                        posX = (float) dsObj["Position"]["X"].GetDouble();
                        posY = (float) dsObj["Position"]["Y"].GetDouble();
                    }
                    
                    float rotationX = 0;
                    float rotationY = 0;
                    
                    if(dsObj.HasMember("Rotation")) {
                        rotationX = (float) dsObj["Rotation"]["X"].GetDouble();
                        rotationY = (float) dsObj["Rotation"]["Y"].GetDouble();
                    }
                    
                    auto sprite = Sprite::createWithSpriteFrameName(image);
                    sprite->setAnchorPoint(Vec2(anchorX, anchorY));
                    sprite->setPosition(Vec2(posX, posY));
                    sprite->setRotationSkewX(rotationX);
                    sprite->setRotationSkewY(rotationY);
                    CCLOG("image %s", image.c_str());
                    CCLOG("anchorX %f", anchorX);
                    CCLOG("anchorY %f", anchorY);
                    CCLOG("posX %f", posX);
                    CCLOG("posY %f", posY);
                    CCLOG("rotationX %f", rotationX);
                    CCLOG("rotationY %f", rotationY);
                    
                    boneNode->addSkin(sprite, true);
                    boneNode->displaySkin(sprite, true);
                }
                
                index++;
            }
            
            
        }
    }
    
    addChild(_character);
    auto _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(MenuContext::onTouchBeganOnCharacter, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _character);

    auto moveTo = MoveTo::create(0.5, Vec2(_menuButton->getPosition().x - xPosOffSet, _menuButton->getPosition().y));
    auto elastic = EaseBackOut::create(moveTo);
    _character->runAction(elastic);
    return _character;
}


bool MenuContext::onTouchBeganOnCharacter(Touch *touch, Event *event)
{
    auto n = this->convertTouchToNodeSpace(touch);
    Rect boundingBoxRect = Rect::ZERO;
    boundingBoxRect = _character->getBoundingBox();
    
    if(boundingBoxRect.containsPoint(n)) {
        ScriptingCore::getInstance()->runScript("src/start/characterConfigure.js");
        return true;
    }
    return false;
}


std::vector<std::string> MenuContext::split(std::string s, char delim)
{
    std::vector<std::string> elems;
    std::stringstream ss;
    ss.str(s);
    std::string item;
    while (getline(ss, item, delim)) {
        elems.push_back(item);
    }
    return elems;
}

void MenuContext::removeMenuOnly() {
    if(_menuSelected) {
        if(_exitMenu) {
            removeChild(_exitMenu);
            _exitMenu = nullptr;
        }
        if(_helpMenu) {
            removeChild(_helpMenu);
            _helpMenu = nullptr;
        }
        if(_bookMenu) {
            removeChild(_bookMenu);
            _bookMenu = nullptr;
        }
        if(_gamesMenu) {
            removeChild(_gamesMenu);
            _gamesMenu = nullptr;
        }
        if(_settingMenu) {
            removeChild(_settingMenu);
            _settingMenu = nullptr;            
        }
        if(_mapMenu) {
            removeChild(_mapMenu);
            _mapMenu = nullptr;
        }
        
        //        if(_photoMenu) {
        //            removeChild(_photoMenu);
        //            _photoMenu = nullptr;
        //        }
        
        
        if(_chimp) {
            removeChild(_chimp);
            _chimp = nullptr;
        }
    }
}

void MenuContext::removeMenu() {
    removeMenuOnly();
    if(_greyLayer) {
        removeChild(_greyLayer);
        _greyLayer = nullptr;
    }
    resumeNodeAndDescendants(_main);
    _gameIsPaused = false;
    MenuContext::_gameIsStatic = false;
    AudioEngine::stopAll();
    CocosDenshion::SimpleAudioEngine::getInstance()->resumeBackgroundMusic();
    if(_startupCallback) {
        _startupCallback();
        _startupCallback = nullptr;
    }
    _menuSelected = false;
}

void MenuContext::pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose, cocos2d::Vec2 position) {
    int points = -1;
    if((choose && targetAlphabet == chosenAlphabet) || (!choose && targetAlphabet != chosenAlphabet)) {
        points = 1;
    }
    addPoints(points);
    //    _label->setString("Points: " + to_string(_points));
    std::string targetAlphabetStr (1, targetAlphabet);
    std::string chosenAlphabetStr (1, chosenAlphabet);

    SafariAnalyticsManager::getInstance()->insertAnalyticsInfo(targetAlphabetStr.c_str(), chosenAlphabetStr.c_str(), gameName.c_str());
}

void MenuContext::addPoints(int points) {
    _points += points;
//    _points = MAX(MIN(_points, _maxPoints), 0);
    if(points > 0) {
        auto sequence = Sequence::create(
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::happyFace, this)),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, points)),
                                         DelayTime::create(1),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
                                         NULL);
        runAction(sequence);
    } else {
        auto sequence = Sequence::create(
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::sadFace, this)),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::increasePoints, this, points)),
                                         DelayTime::create(1),
                                         CallFunc::create(CC_CALLBACK_0(MenuContext::normalFace, this)),
                                         NULL);
        runAction(sequence);
    }
}

int MenuContext::getPoints() {
    return _points;
}

void MenuContext::finalizePoints() {
    
}

void MenuContext::increasePoints(int points) {
    _pointMeter->setPercent(_pointMeter->getPercent() + points * 100 / _maxPoints);
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
    std::string videoName = "generic";
    if(!gameName.empty()) {
        videoName = gameName;
    }
	auto tv = Sprite::create("TV.png");
	tv->setScaleX(0.73);
	tv->setScaleY(0.70);
	tv->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
	tv->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
	tv->setName("tv");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	//auto sprite = CCSprite::create("TV.png");
	//sprite->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
	experimental::ui::VideoPlayer* vp = experimental::ui::VideoPlayer::create();
	this->addChild(tv, 2);
	vp->setContentSize(cocos2d::Size((tv->getContentSize().width *0.73)-200, (tv->getContentSize().height*0.7) - 180 ));
	vp->setFileName("help/" + videoName +".webm");
	vp->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
	vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
	vp->play();
	vp->setName("video");
	this->addChild(vp, 2);
	vp->addEventListener(CC_CALLBACK_2(MenuContext::videoEventCallback, this));
#else
    videoPlayOverCallback();
#endif

}

void MenuContext::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	this->removeChildByName("video");
	this->removeChildByName("tv");
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
//        chimpHelp();
        removeMenuOnly();
        auto levelHelp = LevelHelpOverlay::create(gameName);
        addChild(levelHelp, 2);
    }
}

void MenuContext::showStartupHelp(std::function<void()> callback) {
//    if(!SafariAnalyticsManager::getInstance()->wasGamePlayedBefore(gameName.c_str())) {
//        _startupCallback = callback;
//        addGreyLayer();
//        pauseNodeAndDescendants(_main);
//        chimpHelp();
//    } else {
        callback();
//    }
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
        
        std::size_t isStories = gameName.find("storyId");
        if (isStories!=std::string::npos || gameName == "Show Stories"){
            ScriptingCore::getInstance()->runScript("src/start/storyPlay.js");
        } else if(gameName == "Safari RPG") {
            Director::getInstance()->replaceScene(MapScene::createScene());
        } else {
            Director::getInstance()->replaceScene(LevelMenu::createScene(gameName));
        }
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

void MenuContext::launchGame(std::string gameName) {
    launchGameFromJS(gameName);
}


void MenuContext::launchGameFromJS(std::string gameName) {
    Director::getInstance()->replaceScene(LevelHelpScene::createScene(gameName));
}

void MenuContext::launchGameFinally(std::string gameName) {
    CCLOG("gameName %s", gameName.c_str());
        if(gameName == ALPHAMON_COMBAT) {
            Director::getInstance()->replaceScene(DuelScene::createScene());
        } else if(gameName == DUEL_SCENE) {
//            std::u16string firstParamUTF16;
//            StringUtils::UTF8ToUTF16(firstParam, firstParamUTF16);
//    
//            std::u16string secondParamUTF16;
//            StringUtils::UTF8ToUTF16(secondParam, secondParamUTF16);
//    
//            Director::getInstance()->replaceScene(DuelScene::createScene(firstParamUTF16.at(0), secondParamUTF16.at(0)));
        } else if(gameName == CROSS_THE_BRIDGE) {
            Director::getInstance()->replaceScene(CrossTheBridge::createScene());
        } else if(gameName == PATCH_THE_WALL) {
            Director::getInstance()->replaceScene(PatchTheWall::createScene());
        } else if(gameName == SMASH_THE_ROCK) {
            Director::getInstance()->replaceScene(SmashTheRock::createScene());
        } else if(gameName == CANNON_BALL) {
            Director::getInstance()->replaceScene(MainGame::createScene());
        } else if(gameName == ENDLESS_RUNNER) {
            Director::getInstance()->replaceScene(EndlessRunner::createScene());
        } else if(gameName == KUNG_FU_ALPHA) {
            Director::getInstance()->replaceScene(Trace::createScene());
        } else if(gameName == ALPHAMON_FEED) {
            Director::getInstance()->replaceScene(AlphamonFeed::createScene());
        } else if(gameName == BAJA) {
            Director::getInstance()->replaceScene(BajaWordScene::createScene());
        } else if(gameName == JASMINE) {
            Director::getInstance()->replaceScene(Jasmin_Mainfile::createScene());
        } else if(gameName == WEMBLEY) {
    		Director::getInstance()->replaceScene(Wembley::createScene());
        } else if(gameName == JAZZ) {
            Director::getInstance()->replaceScene(jazz::createScene());
        } else if(gameName == CHAIN) {
            Director::getInstance()->replaceScene(Chain::createScene());
        }else if (gameName == CAT) {
    		Director::getInstance()->replaceScene(CatGame::createScene());
        } else if (gameName == TRAIN) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        } else if (gameName == POP) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        } else if (gameName == STORY_TELLING) {
            ScriptingCore::getInstance()->runScript("start/storytelling.js");
        } else if (gameName == ALPHAMOLE) {
    		Director::getInstance()->replaceScene(Alphamole::createScene());
        } else if (gameName == WORD_BOARD) {
            Director::getInstance()->replaceScene(WordBoard::createScene());
        } else if (gameName == PEG) {
            Director::getInstance()->replaceScene(PegWord::createScene());
    	} else if (gameName == JUMP_ON_WORDS) {
    		ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
    	} else if (gameName == POP) {
    		ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
    	}else if (gameName == CIRCLE) {
    		Director::getInstance()->replaceScene(Circle::createScene());
    	}else if (gameName == BUBBLE) {
    		ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
    //        ScriptingCore::getInstance()->runScript("src/start/dots.js");
    	}else if (gameName == PINATA) {
    		ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        }else if (gameName == DOTS) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        }else if (gameName == CONNECT_THE_DOTS) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        }else if (gameName == MAZE) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
        }else if (gameName == BOUNCE) {
            ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
    	}
    	else if (gameName == STACK) {
    		Director::getInstance()->replaceScene(Stack::createScene());
    	}
    	else if (gameName == TALK) {
    		Director::getInstance()->replaceScene(Talk::createScene());
    	}
    	else if (gameName == BINGO) {
    		Director::getInstance()->replaceScene(Bingo::createScene());
    	}
    	else if (gameName == DROP) {
    		Director::getInstance()->replaceScene(Drop::createScene());
    	}
    	else if (gameName == OWL) {
    		Director::getInstance()->replaceScene(Owl::createScene());
		}
		else if (gameName == BLASTLETTER) {
			Director::getInstance()->replaceScene(BlastLetter::createScene());
		}
    	else if (gameName == DASH) {
    		Director::getInstance()->replaceScene(Dash::createScene());
    	}
    	else if (gameName == DECOMON) {
    		Director::getInstance()->replaceScene(Decomon::createScene());
    	}
    	else if (gameName == ORDER) {
    		Director::getInstance()->replaceScene(Order::createScene());
    	}
    	else if (gameName == PILLAR) {
    		Director::getInstance()->replaceScene(Pillar::createScene());
    	}
		else if (gameName == LINE) {
			Director::getInstance()->replaceScene(Line::createScene());
		}
		else if (gameName == ITEM) {
			Director::getInstance()->replaceScene(Item::createScene());
		}

		else if (gameName == CARDRAW) {
			Director::getInstance()->replaceScene(CarDraw::createScene());
		}
		else if (gameName == DOOR) {
			Director::getInstance()->replaceScene(Door::createScene());
		}
    	else if (gameName == MEMORY) {
    		
			int numberPicker = RandomHelper::random_int(0, 2);
    		switch (numberPicker) {
    		case 0: Director::getInstance()->replaceScene(MemoryJungle::createScene());  break;
    		case 1: Director::getInstance()->replaceScene(MemoryHero::createScene());  break;
    		case 2: Director::getInstance()->replaceScene(Memory::createScene());  break;
    		}		
			
    	}
		else if (gameName == BALLONHERO) {
			Director::getInstance()->replaceScene(BalloonHero::createScene());
		}
		else if (gameName == SORT_IT) {
			ScriptingCore::getInstance()->runScript("src/start/startFromCpp.js");
		}
		else if (gameName == TREASUREHUNT) {
			Director::getInstance()->replaceScene(TreasureHunt::createScene());
		}
		else if (gameName == UNITS) {
			Director::getInstance()->replaceScene(Units::createScene());
		}
		else if (gameName == JUMPING_NUMBERS) {
			Director::getInstance()->replaceScene(JumpingNumber::createScene());
		}
		else if (gameName == CARD) {
			Director::getInstance()->replaceScene(Card::createScene());
		}
		else if (gameName == CHOCOLATEFACTORY) {
			Director::getInstance()->replaceScene(ChocolateFactory::createScene());
		}
		else if (gameName == STEP) {
			Director::getInstance()->replaceScene(Step::createScene());
		}
		else if (gameName == A_T_M) {
			Director::getInstance()->replaceScene(ATM::createScene());
		}
		else if (gameName == SHOP) {
			Director::getInstance()->replaceScene(Shop::createScene());
		}
		else if (gameName == SPOT) {
			Director::getInstance()->replaceScene(spot::createScene());
		}
		else if (gameName == TABLE) {
			Director::getInstance()->replaceScene(Table::createScene());
		}
		else if (gameName == SHAPE) {
			Director::getInstance()->replaceScene(Shape::createScene());
		}
		else if (gameName == BALLOON) {
			Director::getInstance()->replaceScene(Balloon::createScene());
		}
		else if (gameName == POPCOUNT) {
			Director::getInstance()->replaceScene(PopCount::createScene());
		}
		else if (gameName == DINO) {
			Director::getInstance()->replaceScene(DinoGame::createScene());
		}
        else if (gameName == MAP) {
            Director::getInstance()->replaceScene(MapScene::createScene());
        }
		else{
            CCLOG("Failed starting scene: %s", gameName.c_str());
        }
    
    
    
    
    
    
}

void MenuContext::transitToScrollableGameMap() {
    Director::getInstance()->replaceScene(TransitionFade::create(0.5, ScrollableGameMapScene::createScene(), Color3B::BLACK));
}

void MenuContext::showGamesMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(_launchCustomEventOnExit) {
            std::string menuName(GAME_MAP_MENU);
            EventCustom event("on_menu_exit");
            event.setUserData(static_cast<void*>(&menuName));
            _eventDispatcher->dispatchEvent(&event);
            
        } else {
           Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
        }
    }
}

void MenuContext::addCalculator(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
	if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
		Director::getInstance()->replaceScene(Setting::createScene());
	}
}


void MenuContext::changePhoto(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            Director::getInstance()->replaceScene(TransitionFade::create(2.0, PhotoCaptureScene::createScene(), Color3B::BLACK));
        #else
            Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
        #endif

    }
}

void MenuContext::createUnlockStoryDocument(std::string storyToUnlock) {
    std::string unlockStoryStr;
    localStorageGetItem(storyToUnlock + LEVEL, &unlockStoryStr);
    
    rapidjson::Document dUnlock;
    rapidjson::Document::AllocatorType& allocator = dUnlock.GetAllocator();
    if (false == dUnlock.Parse<0>(unlockStoryStr.c_str()).HasParseError()) {
        // document is ok
        rapidjson::Document documentUnlock;
        documentUnlock.SetObject();
        
        documentUnlock.AddMember("locked", false, allocator);
        documentUnlock.AddMember("unlockUsed", false, allocator);
        documentUnlock.AddMember("timesRead", 0, allocator);
        documentUnlock.AddMember("star", 0, allocator);
        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
        documentUnlock.Accept(writer);
        const char* output = buffer.GetString();
        localStorageSetItem(storyToUnlock + LEVEL, output);
    }
    
}

void MenuContext::showRewards()
{
	Director::getInstance()->replaceScene(TransitionFade::create(1.0, Award::createScene()));
}

void MenuContext::unlockNextStory() {
    CCLOG("unlock next story");
    std::string unlockedStoryIdOrderStr;
    localStorageGetItem(UNLOCKED_STORY_ID_ORDER, &unlockedStoryIdOrderStr);
    
    CCLOG("storyIdOrderStr %s", unlockedStoryIdOrderStr.c_str());
    rapidjson::Document d;
    
    if (false == d.Parse<0>(unlockedStoryIdOrderStr.c_str()).HasParseError()) {
        assert(d.IsArray());
        int unlockStories = NUMBER_OF_STORIES_TO_BE_UNLOCKED;
        
        if(NUMBER_OF_STORIES_TO_BE_UNLOCKED > d.Size()) {
            unlockStories = d.Size();
        }
        
        if(unlockStories > 0) {
            for(int j = 0; j < unlockStories; j++) {
                std::string storyToUnlock = d[j].GetString();
                createUnlockStoryDocument(storyToUnlock);
            }
        }
        
        //update "locked" stories list
        rapidjson::Document dArr;
        rapidjson::Document::AllocatorType& allocator = dArr.GetAllocator();
        dArr.SetArray();
        for (rapidjson::SizeType i = unlockStories; i < d.Size(); i++) {
            std::string storyId = d[i].GetString();
            dArr.PushBack(rapidjson::Value(storyId.c_str(),allocator), allocator);
            CCLOG("locked story %s", storyId.c_str());
        }
        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
        dArr.Accept(writer);
        const char* output = buffer.GetString();
        localStorageSetItem(UNLOCKED_STORY_ID_ORDER, output);
    }
}

void MenuContext::showScore() {
    //compute score
    Director::getInstance()->getEventDispatcher()->removeAllEventListeners();
	_menuButton->setEnabled(false);
	if (_closeButton != nullptr) {
		_closeButton->setEnabled(false);
		this->removeChild(_showAnswerLayer);
	}
	else 
	{
		addGreyLayer();
		pauseNodeAndDescendants(_main);
	}
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    CCLOG("Points: %d MaxPoints: %d", _points, _maxPoints);
    int stars = MIN(round(MAX(_points, 0) * 3.0/_maxPoints), 3);

    std::string progressStr;
    localStorageGetItem(gameName + LEVEL, &progressStr);

    std::size_t found = gameName.find("storyId");
    if (found!=std::string::npos)
    {
        rapidjson::Document d;
        rapidjson::Document::AllocatorType& allocator = d.GetAllocator();
        if (false == d.Parse<0>(progressStr.c_str()).HasParseError()) {
            // document is ok
            rapidjson::Document document;
            document.SetObject();
            
            int timesRead = d["timesRead"].GetInt();
            bool unlockUsed = d["unlockUsed"].GetBool();
            
            CCLOG("unlockUsed %d", unlockUsed);
            CCLOG("stars %d", stars);
            
            if(!unlockUsed && (timesRead == NUMBER_OF_TIMES_READ_STORY_TO_UNLOCK_NEXT_STORY || stars >= MIN_STAR_TO_UNLOCK_NEXT_STORY)) {
                //unlock next story
                unlockUsed = true;
                unlockNextStory();
            }
            
//            unlockUsed = true;
//            unlockNextStory();
            
            timesRead++;
            document.AddMember("locked", d["locked"].GetBool(), allocator);
            document.AddMember("unlockUsed", unlockUsed, allocator);
            document.AddMember("timesRead", timesRead, allocator);
            document.AddMember("star", stars, allocator);
            rapidjson::StringBuffer buffer;
            rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
            document.Accept(writer);
            const char* output = buffer.GetString();
            localStorageSetItem(gameName + LEVEL, output);
        }
    } else {
        rapidjson::Document d;
        rapidjson::Document::AllocatorType& allocator = d.GetAllocator();
        if(progressStr.empty()) {
            d.SetArray();
            int x = d.Size();
            d.PushBack(0, allocator);
            int y = d.Size();
        } else {
            d.Parse(progressStr.c_str());
        }
        while(d.Size() <= _currentLevel) {
            d.PushBack(0, allocator);
        }
        int currentStar = d[_currentLevel].GetInt();
        d[_currentLevel] = MAX(currentStar, stars);
        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
        d.Accept(writer);
        const char* output = buffer.GetString();
        localStorageSetItem(gameName + LEVEL, output);
    }
    

    if(FileUtils::getInstance()->isFileExist("scoreboard/" + gameName + "_success.plist")) {
        _ps = CCParticleSystemQuad::create("scoreboard/" + gameName + "_success.plist");
    } else {
        _ps = CCParticleSystemQuad::create("scoreboard/particle_success.plist");
    }
    if(FileUtils::getInstance()->isFileExist("scoreboard/" + gameName + "_particle.png")) {
        _ps->setTexture(CCTextureCache::sharedTextureCache()->addImage("scoreboard/" + gameName + "_particle.png"));
    }
    _ps->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    this->addChild(_ps, 10);
    
    runAction(Sequence::create(DelayTime::create(5.0), CallFunc::create([=] {
        this->removeChild(_ps);
        _ps = nullptr;
        _greyLayer->addChild(LayerColor::create(Color4B(128.0, 128.0, 128.0, 200.0), visibleSize.width, visibleSize.height));

       auto scoreNode = ScoreBoardContext::create(stars, this->gameName, this->sceneName, _currentLevel);
       scoreNode->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
        addChild(scoreNode);
    }), NULL));

}

bool MenuContext::isGamePaused() {
    return _gameIsPaused;
}

bool MenuContext::isGameStatic() {
    return MenuContext::_gameIsStatic;
}

void MenuContext::sendMessageToPeer(std::string message) {
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo methodInfo;
        if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "sendMessage", "(Ljava/lang/String;)V")) {
        }
        jstring jMessage = methodInfo.env->NewStringUTF(message.c_str());
        methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID, jMessage);
        methodInfo.env->DeleteLocalRef(jMessage);
        methodInfo.env->DeleteLocalRef(methodInfo.classID);
    #endif
}

void MenuContext::exitMultiPlayerGame() {
    //call to Android to close Server/Client Sockets
    Director::getInstance()->getEventDispatcher()->removeCustomEventListeners("enemy_information_received_event");
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo methodInfo;
        if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "disconnectSockets", "()V")) {
            return;
        }
        methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID);
        methodInfo.env->DeleteLocalRef(methodInfo.classID);
    #endif
    Director::getInstance()->replaceScene(ScrollableGameMapScene::createScene());
}

int MenuContext::getCurrentLevel() {
    return _currentLevel;
}

void MenuContext::setCurrentLevel(int level) {
    _currentLevel = level;
}

int MenuContext::getMaxPoints() {
    return _maxPoints;
}

void MenuContext::setMaxPoints(int maxPoints) {
    _maxPoints = maxPoints;
}



Rect MenuContext::getBoundingBox(cocos2d::Sprite* node) const
{
    return node->getBoundingBox();
}


std::vector<std::vector<cocos2d::Point>> MenuContext::getTrianglePointsForSprite(cocos2d::Sprite* node, std::string fileName, float threshHold)
{
    AutoPolygon* ap = new AutoPolygon(fileName);
    node->initWithPolygon(ap->generatePolygon(fileName));
    
    
    const PolygonInfo& info = node->getPolygonInfo();
    
    auto count = info.triangles.indexCount/3;
    auto indices = info.triangles.indices;
    auto verts = info.triangles.verts;
    
    std::vector<std::vector<cocos2d::Point>> points;
    for(ssize_t i = 0; i < count; i++)
    {
        std::vector<cocos2d::Vec2> triangles;
        //draw 3 lines
        Vec3 p1 =verts[indices[i*3]].vertices;
        Vec3 p2 = verts[indices[i*3+1]].vertices;
        Vec3 p3 = verts[indices[i*3+2]].vertices;
        
        triangles.push_back(Vec2(p1.x, p1.y));
        triangles.push_back(Vec2(p2.x, p2.y));
        triangles.push_back(Vec2(p3.x, p3.y));
        
        points.push_back(triangles);
    }
    
    return points;
}


void MenuContext::pronounceWord(std::string word) {
    std::replace(word.begin(), word.end(), '_', ' ');
    word = LangUtil::getInstance()->translateString(word);
    
    std::string fileName = LangUtil::getInstance()->getPronounciationFileNameForWord(word);
    if(FileUtils::getInstance()->isFileExist(fileName)) {
        CCLOG("fileName to pronounce %s", fileName.c_str());
        auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
        audio->playEffect(fileName.c_str());
    }
    else if(LangUtil::getInstance()->isTextToSpeechSupported()) {
        CCLOG("file doesn't exists with word %s", fileName.c_str());
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            //JSB call to Android TTS Support
            cocos2d::JniMethodInfo methodInfo;
            if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "pronounceWord", "(Ljava/lang/String;)V")) {
                return;
            }
        
            std::replace(word.begin(), word.end(), '_', ' ');
            jstring wordArg = methodInfo.env->NewStringUTF(word.c_str());
            methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID,wordArg);
            methodInfo.env->DeleteLocalRef(methodInfo.classID);
            methodInfo.env->DeleteLocalRef(wordArg);

        #endif
    } else {
        CCLOG("File %s not found OR Language is not supported for Pronounciation", fileName.c_str());
    }
}

std::vector<cocos2d::Vec2> MenuContext::getPolygonPointsForSprite(cocos2d::Sprite* node, std::string fileName, float threshHold) {
    
    AutoPolygon* ap = new AutoPolygon(fileName);
    node->initWithPolygon(ap->generatePolygon(fileName));
    
    
    const PolygonInfo& info = node->getPolygonInfo();
    
    auto count = info.triangles.indexCount/3;
    auto indices = info.triangles.indices;
    auto verts = info.triangles.verts;
    std::vector<cocos2d::Vec2> points;
    for(ssize_t i = 0; i < count; i++)
    {
        //draw 3 lines
        Vec3 from =verts[indices[i*3]].vertices;
        Vec3 to = verts[indices[i*3+1]].vertices;
        points.push_back(Vec2(from.x, from.y));
        points.push_back(Vec2(to.x, to.y));
        
        from =verts[indices[i*3+1]].vertices;
        points.push_back(Vec2(from.x, from.y));


        to = verts[indices[i*3+2]].vertices;
        points.push_back(Vec2(to.x, to.y));
        
        from =verts[indices[i*3+2]].vertices;
        points.push_back(Vec2(from.x, from.y));
        to = verts[indices[i*3]].vertices;
        points.push_back(Vec2(to.x, to.y));
    
    }
    

    std::set<cocos2d::Vec2> sPoints ( points.begin(), points.end() );
    std::vector<cocos2d::Vec2> output ( sPoints.begin(), sPoints.end() );

//    cocos2d::Vec2* a1 = &points[0];
//
//    DrawNode* drawPoly1 = DrawNode::create();
//    drawPoly1->drawPoly(a1, count * 6, true, Color4F::BLACK);
//    this->getParent()->addChild(drawPoly1, 10);

    return output;
}




MenuContext::MenuContext() :
	_points(0),
	_label(nullptr),
	_menuSelected(false),
	_greyLayer(nullptr),
	_chimp(nullptr),
	_chimpAudioId(0),
	_gameIsPaused(false),
	_startupCallback(nullptr),
	_photoMenu(nullptr),
    _gamesMenu(nullptr),
    _bookMenu(nullptr),
    _settingMenu(nullptr),
    _helpMenu(nullptr),
	_currentLevel(1),
	_closeButton(nullptr),

_maxPoints(MAX_POINTS_TO_SHOW)
{
    
}

MenuContext::~MenuContext() {
    
}

/*
  wordPairList
  by defalut answer = "it is a word"
  bool true for initialSyallableWords and sentence
*/
void MenuContext::wordPairList(std::string question, std::string answer,bool isIntialSyllable)
{
	if (answer.compare("it is a word") == 0) {
		_listOfWords.push_back(question);
	}
	else
	{
		if (isIntialSyllable) {
			if (_listOfInitialSyllableWords.end() == _listOfInitialSyllableWords.find(question))
			{
				std::vector<std::string> wordVector;
				wordVector.push_back(answer);
				_listOfInitialSyllableWords.insert(std::pair<std::string, std::vector<std::string>>(question, wordVector));
			}
			else {
				_listOfInitialSyllableWords.at(question).push_back(answer);
			}
		}
		else 
		{
			_wordsList.insert(std::pair < std::string, std::string>(question, answer));
		}
	}
}

/*
 type wordPair for synonyms,antonyms,homonyms,plurals
 type word for words,list of nouns etc...
 type sentence for select nouns in the given sentence;
 header = "Make same sounding word as : " (example)
*/

void MenuContext::showAnswer(std::string type, std::string header)
{
	addGreyLayer();
	pauseNodeAndDescendants(_main);
	_menuButton->setEnabled(false);
	_showAnswerLayer = Layer::create();
	this->addChild(_showAnswerLayer);
	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("dash/dash.plist");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto bg = Sprite::create("gamemap_bg/game_map_bg1.png");
	bg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_showAnswerLayer->addChild(bg);
	
	

	float x = 0;
	float y = bg->getContentSize().height * 0.8;
	int blockSize = 0;
	float labelWidth, labelHeight;
	auto headerBlock = Sprite::createWithSpriteFrameName("dash/button.png");
	headerBlock->setPositionX(visibleSize.width / 2);
	headerBlock->setPositionY(visibleSize.height - headerBlock->getContentSize().height / 1.5);
	headerBlock->setAnchorPoint(Vec2(0.5, 0.5));
	_showAnswerLayer->addChild(headerBlock);
	auto label1 = CommonLabel::createWithTTF(header.c_str(), "fonts/Roboto-Regular.ttf", 100);
	label1->setColor(Color3B(0, 0, 0));
	label1->setPosition(Vec2(headerBlock->getContentSize().width / 2, headerBlock->getContentSize().height / 2));
	label1->setAnchorPoint(Vec2(0.5, 0.5));
	headerBlock->addChild(label1);

	_closeButton = Button::create("menu/close.png", "menu/close.png", "menu/close.png", Widget::TextureResType::LOCAL);
	_closeButton->addTouchEventListener(CC_CALLBACK_0(MenuContext::showScore, this));
	_closeButton->setAnchorPoint(Vec2(0, 1));
	_closeButton->setPosition(Vec2(0, visibleSize.height));
	_showAnswerLayer->addChild(_closeButton);

	if (type.compare("wordPairs") == 0) {
		//dash/small_button_01.png
		int numberOfWordShow = 0;
		for (auto wordPair = _wordsList.begin(); wordPair != _wordsList.end(); wordPair++) {
			int i = blockSize % 2;
			auto duplicatNode = Node::create();
			auto obj1 = Sprite::createWithSpriteFrameName("dash/big_button.png");
			float xp = visibleSize.width - (obj1->getContentSize().width * 2);
			/*obj1->setPositionX((xp / 3) *(i + 1) + obj1->getContentSize().width / 2 * (i + 1) + obj1->getContentSize().width / 2 * (i));
			obj1->setPositionY(y);*/
			obj1->setAnchorPoint(Vec2(0.5, 0.5));
			duplicatNode->setPositionX((xp / 3) *(i + 1) + obj1->getContentSize().width / 2 * (i + 1) + obj1->getContentSize().width / 2 * (i));
			duplicatNode->setPositionY(y);
			duplicatNode->setContentSize(obj1->getContentSize());
			duplicatNode->setAnchorPoint(Vec2(0.5, 0.5));
			auto labelBase1 = Sprite::createWithSpriteFrameName("dash/small_button_01.png");
			labelBase1->setPosition(Vec2(0,0));
			labelBase1->setAnchorPoint(Vec2(0, 0));
			duplicatNode->addChild(labelBase1);
			auto label1 = CommonLabel::createWithTTF(wordPair->first.c_str(), "fonts/Roboto-Regular.ttf", 100);
			label1->setColor(Color3B(0, 0, 0));
			label1->setPosition(Vec2(labelBase1->getContentSize().width / 2, labelBase1->getContentSize().height / 2));
			label1->setAnchorPoint(Vec2(0.5, 0.5));
			float xx = label1->getContentSize().width;


			auto labelBase2 = Sprite::createWithSpriteFrameName("dash/arrow.png");
			labelBase2->setPosition(Vec2(duplicatNode->getContentSize().width/2, duplicatNode->getContentSize().height / 2));
			labelBase2->setAnchorPoint(Vec2(0.5, 0.5));
			duplicatNode->addChild(labelBase2,1);


			auto labelBase3 = Sprite::createWithSpriteFrameName("dash/small_button_02.png");
			labelBase3->setPosition(Vec2(duplicatNode->getContentSize().width, 0));
			labelBase3->setAnchorPoint(Vec2(1, 0));
			duplicatNode->addChild(labelBase3);

			auto label3 = CommonLabel::createWithTTF(wordPair->second.c_str(), "fonts/Roboto-Regular.ttf", 100);
			label3->setColor(Color3B(0, 0, 0));
			label3->setPosition(Vec2(labelBase3->getContentSize().width / 2, labelBase3->getContentSize().height / 2));
			label3->setAnchorPoint(Vec2(0.5, 0.5));

			labelBase1->addChild(label1);
			//duplicatNode->addChild(label2);
			labelBase3->addChild(label3);
			if (blockSize % 2 == 1) {
				y -= obj1->getContentSize().height * 1.2;
			}
			labelWidth = label1->getContentSize().width;
			labelHeight = label1->getContentSize().height;
			blockSize++;
			_showAnswerLayer->addChild(duplicatNode);
			numberOfWordShow++;
			if (numberOfWordShow == 10) {
				break;
			}
		}
	}
	else if (type.compare("Words") == 0)
	{
		int numberOfWordShow = 0;
		for (int index = 0; index < _listOfWords.size(); index++) {
			int i = blockSize % 2;
			auto obj1 = Sprite::createWithSpriteFrameName("dash/big_button.png");
			float xp = visibleSize.width - (obj1->getContentSize().width * 2);
			obj1->setPositionX((xp / 3) *(i + 1) + obj1->getContentSize().width / 2 * (i + 1) + obj1->getContentSize().width / 2 * (i));
			obj1->setPositionY(y);
			obj1->setAnchorPoint(Vec2(0.5, 0.5));
			_showAnswerLayer->addChild(obj1);
			auto label1 = CommonLabel::createWithTTF(_listOfWords.at(index).c_str(), "fonts/Roboto-Regular.ttf", 100);
			label1->setColor(Color3B(0, 0, 0));
			label1->setPosition(Vec2(obj1->getContentSize().width / 2, obj1->getContentSize().height / 2));
			label1->setAnchorPoint(Vec2(0.5, 0.5));
			float xx = label1->getContentSize().width;
			obj1->addChild(label1);
			if (blockSize % 2 == 1) {
				y -= obj1->getContentSize().height * 1.2;
			}
			labelWidth = label1->getContentSize().width;
			labelHeight = label1->getContentSize().height;
			blockSize++;
			numberOfWordShow++;
			if (numberOfWordShow == 10) {
				break;
			}
		}

	}

	else if (type.compare("Sentence") == 0) {

		int numberOfWordShow = 0;

		for (auto wordPair = _listOfInitialSyllableWords.begin(); wordPair != _listOfInitialSyllableWords.end(); wordPair++) {
			auto sentenceBlock = Sprite::createWithSpriteFrameName("dash/button.png");
			sentenceBlock->setPositionX(visibleSize.width / 2);
			sentenceBlock->setPositionY(y);
			sentenceBlock->setAnchorPoint(Vec2(0.5, 0.5));
			sentenceBlock->setScaleY(0.75);
			_showAnswerLayer->addChild(sentenceBlock);

			auto sentencelabel1 = CommonLabel::createWithTTF(wordPair->first.c_str(), "fonts/Roboto-Regular.ttf", 100);
			sentencelabel1->setColor(Color3B(0, 0, 0));
			sentencelabel1->setPosition(Vec2(sentenceBlock->getContentSize().width / 2, sentenceBlock->getContentSize().height / 2));
			sentencelabel1->setAnchorPoint(Vec2(0.5, 0.5));
			sentenceBlock->addChild(sentencelabel1);
			auto listOfAnswers = wordPair->second;

			y -= sentenceBlock->getContentSize().height;
			int temp = 0;
			float answerBlockWidth = 0.0f;
			if (listOfAnswers.size() > 4) {
				answerBlockWidth = visibleSize.width / 5;
				temp = 4;
			}
			else
			{
				answerBlockWidth = visibleSize.width / (listOfAnswers.size() + 1);
				temp = listOfAnswers.size();

			}
			
			for (int i = 0; i < listOfAnswers.size(); i++) {
				auto labelBase1 = Sprite::createWithSpriteFrameName("dash/small_button_01.png");
				labelBase1->setPosition(Vec2(answerBlockWidth + (answerBlockWidth * (i%temp)), y));
				if (i == 3 && listOfAnswers.size() > 3) {
					y -= labelBase1->getContentSize().height * 1.2;
				}
				labelBase1->setScaleY(0.75);
				labelBase1->setAnchorPoint(Vec2(0.5, 0.5));
				_showAnswerLayer->addChild(labelBase1);
				auto label3 = CommonLabel::createWithTTF(listOfAnswers.at(i).c_str(), "fonts/Roboto-Regular.ttf", 100);
				label3->setColor(Color3B(255, 255, 255));
				label3->setPosition(Vec2(labelBase1->getContentSize().width / 2, labelBase1->getContentSize().height / 2));
				label3->setAnchorPoint(Vec2(0.5, 0.5));
				labelBase1->addChild(label3);
			}
			y -= sentenceBlock->getContentSize().height;
			numberOfWordShow++;
			if (numberOfWordShow == 3) {
				break;
			}
		}
	}
	//duplicatNode->setContentSize(Size(labelWidth* _wordsList.size(), labelHeight*_wordsList.size()));
	//duplicatNode->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	//duplicatNode->setAnchorPoint(Vec2(0.5, 0.5));
	//this->addChild(duplicatNode);

}
