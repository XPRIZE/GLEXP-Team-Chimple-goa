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
    if(!ScrollView::init())
    {
        return false;
    }
    
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    std::string ICONS = ICON_FOLDER;
    
    auto spriteCache = SpriteFrameCache::getInstance();
    spriteCache->addSpriteFramesWithFile("gamemap/gamemap/gamemap.plist");
    
    std::string gameNamesStr;
    localStorageGetItem("gameNames", &gameNamesStr);
    CCLOG("gameNamesStr %s", gameNamesStr.c_str());
    std::vector<std::string> games = split(gameNamesStr, ',');
    
    
//    std::vector<std::string> games = StartMenu::getGameNames();
    const int numRows = NUMBER_OF_BUTTONS_ROWS;
    const int numCols = NUMBER_OF_BUTTONS_COLS;
    
    const int numberOfPages = ceil((float) games.size() / (numRows * numCols));

    
    Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("black_concrete.png");
    Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
    texture->setTexParameters(&tp);
    Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * numberOfPages, visibleSize.height));
    backgroundSpriteMapTile->setPosition(Vec2( numberOfPages * visibleSize.width/2, visibleSize.height/2 ));
    addChild(backgroundSpriteMapTile);
    
//    Sprite* backgroundSpriteMap = Sprite::createWithSpriteFrameName("gamemap/gamemap/gamemap.png");
//    backgroundSpriteMap->setPosition(Vec2(numberOfPages * visibleSize.width/2, visibleSize.height/2));
//    addChild(backgroundSpriteMap);
    
    for (int i = 0; i < numberOfPages; i++) {
        auto node = CSLoader::createNode("gamemap/gamemap_bg.csb");
        node->setPosition(Vec2(visibleSize.width * i, 0));
        addChild(node);
    }
    
//    Sprite* backgroundSpriteSideLeft = Sprite::createWithSpriteFrameName("gamemap/side.png");
//    backgroundSpriteSideLeft->setAnchorPoint(Vec2(0,0.5));
//    backgroundSpriteSideLeft->setPosition(Vec2(0,visibleSize.height/2));
//    addChild(backgroundSpriteSideLeft);
    

    _layer = Layer::create();
    
    
//    Sprite* backgroundSpriteSideRight = Sprite::createWithSpriteFrameName("gamemap/side.png");
//    backgroundSpriteSideRight->setScaleX(-1.0f);
//    backgroundSpriteSideRight->setAnchorPoint(Vec2(1,0.5));
//    backgroundSpriteSideRight->setPosition(Vec2((visibleSize.width - backgroundSpriteSideRight->getBoundingBox().size.width/2) * numberOfPages,visibleSize.height/2));
//    addChild(backgroundSpriteSideRight);

    
    
    int index = 0;
    int initialYOffSet = 1;
    
    for(int k = 0; k < numberOfPages; k++) {
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                if(index < games.size()) {
                    std::string gameName = games.at(index);
                    std::string gameConfig;
                    localStorageGetItem(gameName, &gameConfig);
                    auto gameMap = parseGameConfigToMap(gameConfig);
                    std::string buttonNormalIcon = gameMap["icon"];
                    std::string buttonPressedIcon = gameMap["cIcon"];
                    std::string buttonDisabledIcon = ICONS + "/" + games.at(index)+"_disabled.png";
                    cocos2d::ui::Button* button = ui::Button::create(buttonNormalIcon, buttonPressedIcon, buttonDisabledIcon);
                    button->setName(games.at(index));
                    button->setPosition(Vec2(k * visibleSize.width + (j + 0.5) * visibleSize.width / numCols, visibleSize.height - (2 * i + initialYOffSet) * (visibleSize.height / numCols) - 30));
                    button->setTitleText(LangUtil::getInstance()->translateString(gameMap["title"]));
                    button->setTitleAlignment(TextHAlignment::CENTER, TextVAlignment::BOTTOM);
                    button->setTitleFontName("Arial");
                    button->setTitleColor(Color3B(0xFF, 0xF2, 0x00));
                    button->setTitleFontSize(48);
                    button->addTouchEventListener(CC_CALLBACK_2(ScrollableGameMapScene::gameSelected, this));
                    auto label = button->getTitleRenderer();
                    label->setPosition(Vec2(label->getPositionX(), label->getPositionY()-256));
                    _layer->addChild(button);
                    
                    
                }
                index++;
            }
        }
    }
    
    _layer->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
    _layer->setPosition(Vec2(0, 0));
    addChild(_layer);
    setContentSize(visibleSize);
    setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
    setInnerContainerSize(_layer->getContentSize());
    setBackGroundColorType(cocos2d::ui::Layout::BackGroundColorType::GRADIENT);
    setBackGroundColor(Color3B(255, 159, 0), Color3B::WHITE);
    return true;
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
            else if(clickedButton->getName() == "story-teller")
            {
                ScriptingCore::getInstance()->runScript("src/start/storytelling.js");
            }
            else if(clickedButton->getName() == "story-play")
            {
                ScriptingCore::getInstance()->runScript("src/start/storyPlay.js");
            }
            else
            {
                ScriptingCore::getInstance()->runScript("src/start/menu.js");
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
    }else{
        // error
    }
    return returnMap;
}


void ScrollableGameMapScene::nagivateToGame(std::string gameName) {
    
}
