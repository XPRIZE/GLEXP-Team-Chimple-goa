//
//  ScrollableGameMapScene.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 11/08/16.
//
//

#include <map>

#include "ScrollableGameMapScene.hpp"
#include "MapScene.h"
#include "../menu/LevelMenu.h"
#include "../effects/FShake.h"
#include "../puzzle/DuelScene.h"
#include "../puzzle/WordScene.h"
#include "../puzzle/PegWord.h"
#include "../puzzle/DuelScene.h"
#include "../puzzle/WordBoard.h"
#include "../mini_games/PatchTheWallScene.h"
#include "../mini_games/CrossTheBridgeScene.h"
#include "../mini_games/SmashTheRockScene.h"
#include "../mini_games/EndlessRunner.h"
#include "../mini_games/Cannon_Ball_Main.h"
#include "../mini_games/Jasmin_Mainfile.h"
#include "../mini_games/jazz.h"
#include "../mini_games/TraceScene.h"
#include "../mini_games/AlphamonFeedScene.h"
#include "../mini_games/jazz.h"
#include "StartMenuScene.h"
#include "../mini_games/Baja.h"
#include "../mini_games/Chain.h"
#include "../mini_games/Wembley.h"
#include "../mini_games/BajaWordScene.h"
#include "../mini_games/CatGameScene.h"
#include "../mini_games/Spirograph.h"
#include "../mini_games/Train.h"
#include "../mini_games/Pop.h"
#include "../mini_games/AlphamoleLevel.h"
#include "../mini_games/Bingo.h"
#include "../mini_games/Memory.h"
#include "../mini_games/Dash.h"
#include "../mini_games/Stack.h"
#include "../mini_games/Circle.h"
#include "../mini_games/Decomon.h"
#include "../mini_games/MemoryHero.h"
#include "../mini_games/MemoryJungle.h"
#include "../mini_games/Talk.h"
#include "../mini_games/BalloonHero.h"
#include "../mini_games/SortIt.h"
#include "../mini_games/Drop.h"
#include "../mini_games/Owl.h"
#include "../mini_games/Order.h"
#include "../mini_games/Pillar.h"
#include "../mini_games/Line.h"
#include "../mini_games/Item.h"
#include "../mini_games/ChocolateFactory.h"
#include "../story/ScrollableCatalogue.hpp"

#include "storage/local-storage/LocalStorage.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"
#include "../menu/LevelHelpScene.h"
#include "../menu/MainMenuHome.hpp"


USING_NS_CC;

std::map<std::string, cocos2d::Color3B> ScrollableGameMapScene::BUTTON_TEXT_COLOR_MAP = {
    {"alphabet", Color3B(0xFF, 0xC0, 0xC0)},
    {"shapes", Color3B(0xFF, 0xF2, 0x00)},
    {"writing", Color3B(0x27, 0x43, 0x48)},
    {"words", Color3B(0x58, 0x39, 0x41)},
    {"maths", Color3B(0x47, 0x11, 0x11)},
    {"grammar", Color3B(0xC4, 0xC4, 0x92)}
};

ScrollableGameMapScene::ScrollableGameMapScene(): _greyLayer(NULL),_gameNameToNavigate(""), _subGameMenuToNavigate("")
{
}

ScrollableGameMapScene::~ScrollableGameMapScene() {
    
}


ScrollableGameMapScene* ScrollableGameMapScene::create(std::string subGameMenuName) {
    ScrollableGameMapScene* sGameMapScene = new (std::nothrow) ScrollableGameMapScene();
    if (sGameMapScene && sGameMapScene->init(subGameMenuName))
    {
        sGameMapScene->autorelease();
        return sGameMapScene;
    }
    CC_SAFE_DELETE(sGameMapScene);
    return nullptr;
}

Scene* ScrollableGameMapScene::createSceneWithSubGames(std::string gameMenuName) {
    auto scene = Scene::create();
    auto layer = ScrollableGameMapScene::create(gameMenuName);
    scene->addChild(layer);
    layer->menuContext = MenuContext::create(layer, "menu");
    layer->_subGameMenuToNavigate = gameMenuName;
    scene->addChild(layer->menuContext);
    return scene;

}

Scene* ScrollableGameMapScene::createScene() {
    auto scene = Scene::create();    
    auto layer = ScrollableGameMapScene::create("");
    scene->addChild(layer);
    layer->menuContext = MenuContext::create(layer, "menu");
    scene->addChild(layer->menuContext);
    return scene;
}


std::vector<std::string> ScrollableGameMapScene::split(std::string s, char delim)
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


void ScrollableGameMapScene::addGreyLayer() {
    if(!_greyLayer) {
        //later customize and add image
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _greyLayer = LayerGradient::create(Color4B(0, 0, 0, 100), Color4B(15, 15, 15, 100));
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, 3);
        
        Node* animationNode = CSLoader::createNode("loading/animation_4.csb");
        animationNode->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
        animationNode->setAnchorPoint(Vec2(0.5,0.5));
        _greyLayer->addChild(animationNode,1);
        
        cocostudio::timeline::ActionTimeline * _animationTimeLine = CSLoader::createTimeline("loading/animation_4.csb");
        animationNode->runAction(_animationTimeLine);
        _animationTimeLine->gotoFrameAndPlay(0);
        

        auto _listener = EventListenerTouchOneByOne::create();
        _listener->setSwallowTouches(true);
        _listener->onTouchBegan = CC_CALLBACK_2(ScrollableGameMapScene::greyLayerTouched, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _greyLayer);
        
    }
}


bool ScrollableGameMapScene::greyLayerTouched(Touch *touch, Event *event)
{
    return true;
}


void ScrollableGameMapScene::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    CCLOG("ScrollableGameMapScene::onExitTransitionDidStart");
    if(_greyLayer != NULL) {
        Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_greyLayer);
    }

}


bool ScrollableGameMapScene::init(std::string subGameMenuName) {
    if(!Node::init())
    {
        return false;
    }
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    if(!subGameMenuName.empty()) {
        _subGameMenuToNavigate = subGameMenuName;
    }
    

//    auto spriteCache = SpriteFrameCache::getInstance();
//    spriteCache->addSpriteFramesWithFile("gamemap/gamemap/gamemap.plist");
    
    std::string mainMenuHomeSelectedItem;
    localStorageGetItem("mainMenuHomeSelectedItem", &mainMenuHomeSelectedItem);

    if(!mainMenuHomeSelectedItem.empty()) {
        _subGameMenuToNavigate = mainMenuHomeSelectedItem;
    }
    
    std::string configDir = "config/";
    std::string gameMapJsonFile = _subGameMenuToNavigate + "_game_map.json";
    configDir.append(gameMapJsonFile);
    
    std::string contents = "";
    
    if(FileUtils::getInstance()->isFileExist(configDir)) {
        contents = FileUtils::getInstance()->getStringFromFile(configDir);
    } else {
        contents = FileUtils::getInstance()->getStringFromFile("config/game_map.json");
    }
    
    
    std::string backGroundMap = "backgoundmap/backgoundmap_background.csb";
    std::string mainGroundMap = "backgoundmap/backgoundmap_mainground.csb";
    std::string foreGroundMap = "backgoundmap/backgoundmap_foreground.csb";
    std::string frontGroundMap = "backgoundmap/backgoundmap_frontground.csb";

    
    std::string tBackGroundMap  = _subGameMenuToNavigate + "/" + _subGameMenuToNavigate + "_background.csb";
    std::string tMainGroundMap  = _subGameMenuToNavigate + "/" + _subGameMenuToNavigate + "_mainground.csb";
    std::string tForeGroundMap  = _subGameMenuToNavigate + "/" + _subGameMenuToNavigate + "_foreground.csb";
    std::string tFrontGroundMap  = _subGameMenuToNavigate + "/" + _subGameMenuToNavigate + "_frontground.csb";
    
    
    if(FileUtils::getInstance()->isFileExist(tBackGroundMap)) {
        backGroundMap = tBackGroundMap;
    }
    if(FileUtils::getInstance()->isFileExist(tMainGroundMap)) {
        mainGroundMap = tMainGroundMap;
    }
    if(FileUtils::getInstance()->isFileExist(tForeGroundMap)) {
        foreGroundMap = tForeGroundMap;
    }
    if(FileUtils::getInstance()->isFileExist(tFrontGroundMap)) {
        frontGroundMap = tFrontGroundMap;
    }

    cocos2d::ui::Button* backButton = createBackButton();
    
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {

        const int numRows = NUMBER_OF_BUTTONS_ROWS;
        const int numCols = NUMBER_OF_BUTTONS_COLS;
        
        const int numberOfPages = ceil((float) (d.Size()) / (numRows * numCols));

        std::string unlockedGamesStr;
        localStorageGetItem("unlockedGames", &unlockedGamesStr);
        rapidjson::Document doc;
        doc.Parse(unlockedGamesStr.c_str());

        std::string unlockStr;
        localStorageGetItem(".unlock", &unlockStr);
        bool lockAll = false;
        if (unlockStr.empty() || unlockStr == "1") {
            lockAll = true;
        }
        std::vector<int> orderedGameIndexes;
        int unlockPosition = 0;
        for (int dIndex = 0; dIndex < d.Size(); dIndex++) {
            const rapidjson::Value& game = d[dIndex];
            auto gameName = game["name"].GetString();
            if((game.HasMember("unlock") && game["unlock"].GetBool()) || (doc.IsObject() && doc.HasMember(gameName))) {
                orderedGameIndexes.insert(orderedGameIndexes.begin() + unlockPosition, dIndex);
                unlockPosition++;
            } else {
                orderedGameIndexes.push_back(dIndex);
            }
        }
        _pageView = ui::PageView::create();
        addChild(_pageView);

        _parallax = ParallaxNode::create();
        _parallax->setContentSize(Size(visibleSize.width * 3, visibleSize.height));
        auto node = CSLoader::createNode(backGroundMap);
        _parallax->addChild(node, -4, Vec2(0.2, 0.2), Vec2::ZERO);
        node = CSLoader::createNode(mainGroundMap);
        _parallax->addChild(node, -3, Vec2(0.4, 0.4), Vec2::ZERO);
        node = CSLoader::createNode(foreGroundMap);
        _parallax->addChild(node, -2, Vec2(0.6, 0.6), Vec2::ZERO);
        node = CSLoader::createNode(frontGroundMap);
        _parallax->addChild(node, -1, Vec2(0.8, 0.8), Vec2::ZERO);
        _pageView->addChild(_parallax);
        
        auto topBarGames = getTopBarGames();
        topBarGames.insert(topBarGames.begin(), "story-catalogue");
        std::map<std::string, int> topBarGamesIndexes = {{"story-catalogue", 0}};
        int index = 0;
        int yOffset = 50;
        
        for(int k = 0; k < numberOfPages; k++) {
            auto page = ui::Widget::create();
            page->setContentSize(visibleSize);
            _pageView->addPage(page);
//            Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("black_concrete.png");
//            Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
//            texture->setTexParameters(&tp);
//            Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width, visibleSize.height));
//            backgroundSpriteMapTile->setPosition(Vec2( visibleSize.width/2, visibleSize.height/2 ));
//            page->addChild(backgroundSpriteMapTile);
            
//            auto node = CSLoader::createNode("gamemap/gamemap_bg.csb");
//            page->addChild(node);
            
            
            if(k == 0) {
                
                backButton->setPosition(Vec2((0.5) * visibleSize.width / numCols, visibleSize.height + 50 - (0.5) * (visibleSize.height + 50) / (NUMBER_OF_BUTTONS_ROWS + 1)));
                page->addChild(backButton);
            }
            
            for (int i = 0; i < numRows; i++) {
                for (int j = 0; j < numCols; j++) {
                    if(index < orderedGameIndexes.size()) {
                        int dIndex = orderedGameIndexes[index];
                        const rapidjson::Value& game = d[dIndex];
                        auto gameName = game["name"].GetString();
                        bool active = !lockAll ||  (game.HasMember("unlock") && game["unlock"].GetBool()) || (doc.IsObject() && doc.HasMember(gameName));
                        auto button = createButton(game, active);
                        if(button != nullptr) {
                            button->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i + 1.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
                            
                            page->addChild(button);
                            if(std::find(topBarGames.begin(), topBarGames.end(), gameName) != topBarGames.end()) {
                                topBarGamesIndexes[gameName] = dIndex;
                            }
                        }
                    }
                    index++;
                }
            }
            
            
        }
        
        

//        for (auto it = topBarGames.begin() ; it != topBarGames.end(); ++it) {
//            const rapidjson::Value& game = d[topBarGamesIndexes[*it]];
//            auto gameName = game["name"].GetString();
//            bool active = !lockAll ||  (game.HasMember("unlock") && game["unlock"].GetBool()) || (doc.IsObject() && doc.HasMember(gameName));
//            auto topBarButton = createButton(game, active);
//            auto index = std::distance(topBarGames.begin(), it);
//            topBarButton->setPosition(Vec2((index + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (0 + 0.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
//            addChild(topBarButton);
//        }

        _pageView->setContentSize(visibleSize);
        _pageView->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
        _pageView->setInnerContainerSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
    }
    return true;
}


cocos2d::ui::Button* ScrollableGameMapScene::createBackButton() {

    std::string buttonNormalIcon = "menu/back.png";
    std::string buttonPressedIcon = buttonNormalIcon;
    cocos2d::ui::Button* button = ui::Button::create();
    std::string buttonDisabledIcon = buttonNormalIcon;
    if(buttonDisabledIcon.find(".png") != std::string::npos) {
        buttonDisabledIcon = buttonDisabledIcon.insert(buttonDisabledIcon.find(".png"), "_disabled");
    }
    
    button->loadTextureNormal(buttonNormalIcon);
    button->loadTexturePressed(buttonPressedIcon);
    button->loadTextureDisabled(buttonDisabledIcon);
    button->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::backButtonPressed, this));

    return button;
}

void ScrollableGameMapScene::backButtonPressed(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    Director::getInstance()->replaceScene(MainMenuHome::createScene());
}




cocos2d::ui::Button* ScrollableGameMapScene::createButton(const rapidjson::Value& gameJson, bool active) {
    std::string ICONS = ICON_FOLDER;
    std::string gameName = gameJson["name"].GetString();
    if(gameName != "dummy") {
        std::string buttonNormalIcon = gameJson["icon"].GetString();
        std::string buttonPressedIcon = gameJson["cIcon"].GetString();
        cocos2d::ui::Button* button = ui::Button::create();
        std::string buttonDisabledIcon = buttonNormalIcon;
        if(buttonDisabledIcon.find(".png") != std::string::npos) {
            buttonDisabledIcon = buttonDisabledIcon.insert(buttonDisabledIcon.find(".png"), "_disabled");
        }
        if(active) {
            button->loadTextureNormal(buttonNormalIcon);
            button->loadTexturePressed(buttonPressedIcon);
            button->loadTextureDisabled(buttonDisabledIcon);
            button->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::gameSelected, this));
        } else {
            button->loadTextureNormal(buttonDisabledIcon);
            button->loadTexturePressed(buttonPressedIcon);
            button->loadTextureDisabled(buttonNormalIcon);
            button->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::disabledGameSelected, this));
        }
        
        button->setName(gameJson["name"].GetString());
        button->setTitleText(LangUtil::getInstance()->translateString(gameJson["title"].GetString()));
        button->setTitleAlignment(TextHAlignment::CENTER, TextVAlignment::BOTTOM);
        button->setTitleFontName("fonts/Roboto-Regular.ttf");
        auto titleColor = Color3B(0xFF, 0xF2, 0x00);
        if(!_subGameMenuToNavigate.empty()) {
            auto it = BUTTON_TEXT_COLOR_MAP.find(_subGameMenuToNavigate);
            if (it != BUTTON_TEXT_COLOR_MAP.end()) {
                titleColor = BUTTON_TEXT_COLOR_MAP.at(_subGameMenuToNavigate);
            }
        }
        button->setTitleColor(titleColor);
        button->setTitleFontSize(72);
        auto label = button->getTitleRenderer();
        label->setPosition(Vec2(label->getPositionX(), label->getPositionY()- 300));
        button->setScale(0.5);
        return button;
    }
    return nullptr;
}

void ScrollableGameMapScene::gameSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
            break;
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {            
            addGreyLayer();
            clickedButton->setEnabled(false);
            _gameNameToNavigate = clickedButton->getName();
            this->scheduleOnce(schedule_selector(ScrollableGameMapScene::transition), 1.5);
            
            break;
        }

        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

void ScrollableGameMapScene::disabledGameSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::ENDED:
        {
            auto shake = FShake::actionWithDuration(1.0f, 10.0f);
            clickedButton->runAction(shake);
            auto soundStr = LangUtil::getInstance()->getLang() + "/audio/disabled_game_help.ogg";
            CocosDenshion::SimpleAudioEngine::getInstance()->playEffect(soundStr.c_str(), false);
            break;
        }
        default:
            break;
    }
    
}


void ScrollableGameMapScene::transition(float dt) {
    nagivateToGame(_gameNameToNavigate);
}

std::string ScrollableGameMapScene::parseGameConfig(std::string gameConfigStr) {
    rapidjson::Document gameConfig;
    std::string scriptName = "";
    if (false == gameConfig.Parse<0>(gameConfigStr.c_str()).HasParseError()) {
        // document is ok
        printf("name = %s\n", gameConfig["name"].GetString());
        printf("cIcon = %s\n", gameConfig["cIcon"].GetString());
        printf("multiPlayer = %d\n", gameConfig["multiPlayer"].GetBool());
        printf("isJSGame = %d\n", gameConfig["isJSGame"].GetBool());
        printf("script = %s\n", gameConfig["script"].GetString());
        localStorageSetItem("currentLaunchGameName", gameConfig["name"].GetString());
        scriptName = gameConfig["script"].GetString();
        
    }else{
        // error
    }
    
    return scriptName;

}

std::map<std::string, std::string> ScrollableGameMapScene::parseGameConfigToMap(std::string gameConfigStr) {
    rapidjson::Document gameConfig;
    std::map<std::string, std::string> returnMap;
    if (false == gameConfig.Parse<0>(gameConfigStr.c_str()).HasParseError()) {
        // document is ok
        returnMap["name"] = gameConfig["name"].GetString();
        returnMap["cIcon"] = gameConfig["cIcon"].GetString();
        returnMap["icon"] = gameConfig["icon"].GetString();
        returnMap["title"] = LangUtil::getInstance()->translateString(gameConfig["title"].GetString());
        if(gameConfig.HasMember("unlock") && gameConfig["unlock"].GetBool()) {
            returnMap["unlock"] = "true";
        } else {
            returnMap["unlock"] = "false";
        }
    }else{
        // error
    }
    return returnMap;
}

std::vector<std::string> ScrollableGameMapScene::getTopBarGames() {
    std::vector<std::string> topBarGames;
    std::string firstGame;
    localStorageGetItem("topBarGame.1", &firstGame);
    if(!firstGame.empty()) {
        topBarGames.push_back(firstGame);
    }
    std::string secondGame;
    localStorageGetItem("topBarGame.2", &secondGame);
    if(!secondGame.empty()) {
        topBarGames.push_back(secondGame);
    }
    std::string thirdGame;
    localStorageGetItem("topBarGame.3", &thirdGame);
    if(!thirdGame.empty()) {
        topBarGames.push_back(thirdGame);
    }
    return topBarGames;
}

void ScrollableGameMapScene::pushTopBarGame(std::string game) {
    if(game == "story-catalogue") {
        return;
    }
    auto topBarGames = getTopBarGames();
    auto shiftedGame = game;
    bool shouldInsert = true;
    for (auto it = topBarGames.begin(); it != topBarGames.end(); ++it) {
        auto temp = *it;
        *it = shiftedGame;
        shiftedGame = temp;
        if(game == shiftedGame) {
            shouldInsert = false;
            break;
        }
    }
    if(topBarGames.size() < 3 && shouldInsert) {
        topBarGames.push_back(shiftedGame);
    }
    if(topBarGames.size() >= 1)
        localStorageSetItem("topBarGame.1", topBarGames[0]);
    if(topBarGames.size() >= 2)
        localStorageSetItem("topBarGame.2", topBarGames[1]);
    if(topBarGames.size() >= 3)
        localStorageSetItem("topBarGame.3", topBarGames[2]);
}


void ScrollableGameMapScene::nagivateToGame(std::string gameName) {
    pushTopBarGame(gameName);
    std::string gameConfig;
    localStorageGetItem(gameName, &gameConfig);
    CCLOG("gameConfig %s", gameConfig.c_str());
    CCLOG("gameName %s", gameName.c_str());
    std::string script = parseGameConfig(gameConfig);
    localStorageSetItem("currentGame", gameName);
    if(gameName == "show_bluetoothPeers")
    {
//        ScriptingCore::getInstance()->runScript("src/start/showBluetoothPeers.js");
    }
    else if(gameName == "choose_character")
    {
//        ScriptingCore::getInstance()->runScript("src/start/characterConfigure.js");
    }
    else if(gameName == "story-telling")
    {
//        ScriptingCore::getInstance()->runScript("src/start/storytelling.js");
    }
    else if(gameName == "map")
    {
        Director::getInstance()->replaceScene(MapScene::createScene());
    }
    else if(gameName == "story-catalogue")
    {
        Director::getInstance()->replaceScene(LevelHelpScene::createScene(gameName));
    }
    else
    {
        //                ScriptingCore::getInstance()->runScript("src/start/menu.js");
        Director::getInstance()->replaceScene(LevelMenu::createScene(gameName));
    }
    
    
}
