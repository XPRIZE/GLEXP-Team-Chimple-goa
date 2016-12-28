//
//  ScrollableGameMapScene.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 11/08/16.
//
//

#include <map>

#include "scripting/js-bindings/manual/ScriptingCore.h"

#include "ScrollableGameMapScene.hpp"
#include "menu/LevelMenu.h"
#include "alphamon/SelectAlphamonScene.h"
#include "puzzle/DuelScene.h"
#include "puzzle/WordScene.h"
#include "puzzle/PegWord.h"
#include "puzzle/DuelScene.h"
#include "puzzle/WordBoard.h"
#include "mini_games/PatchTheWallScene.h"
#include "mini_games/CrossTheBridgeScene.h"
#include "mini_games/SmashTheRockScene.h"
#include "mini_games/EndlessRunner.h"
#include "mini_games/Cannon_Ball_Main.h"
#include "mini_games/Jasmin_Mainfile.h"
#include "mini_games/jazz.h"
#include "mini_games/TraceScene.h"
#include "mini_games/AlphamonFeedScene.h"
#include "mini_games/jazz.h"
#include "StartMenuScene.h"
#include "mini_games/Baja.h"
#include "mini_games/Chain.h"
#include "mini_games/Wembley.h"
#include "mini_games/BajaWordScene.h"
#include "mini_games/CatGameScene.h"
#include "mini_games/Spirograph.h"
#include "mini_games/Train.h"
#include "mini_games/Pop.h"
#include "mini_games/AlphamoleLevel.h"
#include "mini_games/Bingo.h"
#include "mini_games/Memory.h"
#include "mini_games/Dash.h"
#include "mini_games/Stack.h"
#include "mini_games/Circle.h"
#include "mini_games/Decomon.h"
#include "mini_games/MemoryHero.h"
#include "mini_games/MemoryJungle.h"
#include "mini_games/Talk.h"
#include "mini_games/BalloonHero.h"
#include "mini_games/Drop.h"
#include "mini_games/Owl.h"
#include "mini_games/Order.h"
#include "mini_games/Pillar.h"
#include "mini_games/Line.h"
#include "mini_games/Item.h"
#include "mini_games/ChocolateFactory.h"

#include "storage/local-storage/LocalStorage.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"


USING_NS_CC;

ScrollableGameMapScene::ScrollableGameMapScene()
{
}

ScrollableGameMapScene::~ScrollableGameMapScene() {
    
}

Scene* ScrollableGameMapScene::createScene() {
    auto scene = Scene::create();    
    auto layer = ScrollableGameMapScene::create();
    scene->addChild(layer);
    layer->menuContext = MenuContext::create(layer);
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

bool ScrollableGameMapScene::init() {
    if(!Node::init())
    {
        return false;
    }
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    auto spriteCache = SpriteFrameCache::getInstance();
    spriteCache->addSpriteFramesWithFile("gamemap/gamemap/gamemap.plist");
    
    std::string contents = FileUtils::getInstance()->getStringFromFile("config/game_map.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {

        const int numRows = NUMBER_OF_BUTTONS_ROWS;
        const int numCols = NUMBER_OF_BUTTONS_COLS;
        
        const int numberOfPages = ceil((float) d.Size() / (numRows * numCols));

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
        for (int dIndex = 1; dIndex < d.Size(); dIndex++) {
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

        auto topBarGames = getTopBarGames();
        topBarGames.insert(topBarGames.begin(), "story-play");
        std::map<std::string, int> topBarGamesIndexes = {{"story-play", 0}};
        int index = 0;
        int yOffset = 50;
        
        for(int k = 0; k < numberOfPages; k++) {
            auto page = ui::Widget::create();
            page->setContentSize(visibleSize);
            _pageView->addPage(page);
            Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("black_concrete.png");
            Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
            texture->setTexParameters(&tp);
            Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width, visibleSize.height));
            backgroundSpriteMapTile->setPosition(Vec2( visibleSize.width/2, visibleSize.height/2 ));
            page->addChild(backgroundSpriteMapTile);
            
            auto node = CSLoader::createNode("gamemap/gamemap_bg.csb");
            page->addChild(node);
            
            
            for (int i = 0; i < numRows; i++) {
                for (int j = 0; j < numCols; j++) {
                    if(index < orderedGameIndexes.size()) {
                        int dIndex = orderedGameIndexes[index];
                        const rapidjson::Value& game = d[dIndex];
                        auto button = createButton(game);
                        if(button != nullptr) {
                            button->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i + 1.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
                            auto gameName = game["name"].GetString();
                            if(!lockAll ||  (game.HasMember("unlock") && game["unlock"].GetBool()) || (doc.IsObject() && doc.HasMember(gameName))) {
                                button->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::gameSelected, this));
                            } else {
                                button->setBright(false);
                            }
                            
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

        for (auto it = topBarGames.begin() ; it != topBarGames.end(); ++it) {
            const rapidjson::Value& game = d[topBarGamesIndexes[*it]];
            auto topBarButton = createButton(game);
            auto index = std::distance(topBarGames.begin(), it);
            topBarButton->setPosition(Vec2((index + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (0 + 0.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
            auto gameName = game["name"].GetString();
            if(!lockAll ||  (game.HasMember("unlock") && game["unlock"].GetBool()) || (doc.IsObject() && doc.HasMember(gameName))) {
                topBarButton->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::gameSelected, this));
            } else {
                topBarButton->setBright(false);
            }
            addChild(topBarButton);
        }

        _pageView->setContentSize(visibleSize);
        _pageView->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
        _pageView->setInnerContainerSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
    }
    return true;
}

cocos2d::ui::Button* ScrollableGameMapScene::createButton(const rapidjson::Value& gameJson) {
    std::string ICONS = ICON_FOLDER;
    std::string gameName = gameJson["name"].GetString();
    if(gameName != "dummy") {
        std::string buttonNormalIcon = gameJson["icon"].GetString();
        std::string buttonPressedIcon = gameJson["cIcon"].GetString();
        std::string buttonDisabledIcon = ICONS + "/" + gameJson["name"].GetString() + "_disabled.png";
        cocos2d::ui::Button* button = ui::Button::create();
        button->loadTextureNormal(buttonNormalIcon);
        button->loadTexturePressed(buttonPressedIcon);
        button->setName(gameJson["name"].GetString());
        button->setTitleText(LangUtil::getInstance()->translateString(gameJson["title"].GetString()));
        button->setTitleAlignment(TextHAlignment::CENTER, TextVAlignment::BOTTOM);
        button->setTitleFontName("Arial");
        button->setTitleColor(Color3B(0xFF, 0xF2, 0x00));
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
            clickedButton->setEnabled(false);
            pushTopBarGame(clickedButton->getName());
            std::string gameConfig;
            localStorageGetItem(clickedButton->getName(), &gameConfig);
            CCLOG("gameConfig %s", gameConfig.c_str());
            CCLOG("clickedButton->getName() %s", clickedButton->getName().c_str());
            std::string script = parseGameConfig(gameConfig);
            localStorageSetItem("currentGame", clickedButton->getName());
            if(clickedButton->getName() == "show_bluetoothPeers")
            {
                ScriptingCore::getInstance()->runScript("src/start/showBluetoothPeers.js");
            }
            else if(clickedButton->getName() == "choose_character")
            {
                ScriptingCore::getInstance()->runScript("src/start/characterConfigure.js");
            }
            else if(clickedButton->getName() == "story-telling")
            {
                ScriptingCore::getInstance()->runScript("src/start/storytelling.js");
            }
            else if(clickedButton->getName() == "story-play")
            {
                ScriptingCore::getInstance()->runScript("src/start/storyPlay.js");
            }
            else
            {
//                ScriptingCore::getInstance()->runScript("src/start/menu.js");
                Director::getInstance()->replaceScene(LevelMenu::createScene(clickedButton->getName()));
            }
            
            
            break;
        }

        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
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
    if(game == "story-play") {
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
    
}
