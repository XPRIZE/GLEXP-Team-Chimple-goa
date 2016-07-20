//
//  StartMenuScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 14/07/16.
//
//

#include "StartMenuScene.h"
#include "HelloWorldScene.h"
#include "alphamon/SelectAlphamonScene.h"
#include "puzzle/DuelScene.h"
#include "mini_games/PatchTheWallScene.h"
#include "mini_games/CrossTheBridgeScene.h"
#include "mini_games/SmashTheRockLevelScene.h"
#include "mini_games/EndlessRunner.h"
#include "mini_games/Cannon_Ball_Main.h"
#include "mini_games/TraceScene.h"
#include "mini_games/AlphamonFeedLevelScene.h"

USING_NS_CC;

static const std::string DUEL_SCENE = "DuelScene";
static const std::string ALPHAMON_COMBAT = "AlphamonCombat";
static const std::string CAMP = "Camp";
static const std::string PATCH_THE_WALL = "Patch The Wall";
static const std::string CROSS_THE_BRIDGE = "Cross The Bridge";
static const std::string SMASH_THE_ROCK = "Smash The Rock";
static const std::string CANNON_BALL = "Cannon Ball";
static const std::string ENDLESS_RUNNER = "EndlessRunner";
static const std::string KUNG_FU_ALPHA = "Kung Fu Alpha";
static const std::string ALPHAMON_FEED = "Alphamon Feed";


StartMenu::StartMenu(){
    
}

StartMenu::~StartMenu() {
    
}

Scene *StartMenu::createScene() {
    auto scene = Scene::create();
    auto layer = StartMenu::create();
    scene->addChild(layer);
    return scene;
}

bool StartMenu::init() {
    if (!LayerGradient::initWithColor(Color4B(255, 159, 0, 255), Color4B::BLUE)){
        return false;
    }
	auto menu = Menu::create(createMenu(CAMP),
                             createMenu(ALPHAMON_COMBAT),
                             createMenu(PATCH_THE_WALL),
                             createMenu(CROSS_THE_BRIDGE),
                             createMenu(SMASH_THE_ROCK),
                             createMenu(CANNON_BALL),
                             createMenu(ENDLESS_RUNNER),
                             createMenu(KUNG_FU_ALPHA),
							 createMenu(ALPHAMON_FEED)
                             NULL);
    menu->alignItemsVertically();
    
    addChild(menu);
    
    return true;
}

void StartMenu::startScene(std::string gameName, std::string firstParam, std::string secondParam, std::string thirdParam) {
    if(gameName == ALPHAMON_COMBAT) {
        Director::getInstance()->replaceScene(SelectAlphamon::createScene());
    } else if(gameName == DUEL_SCENE) {
        Director::getInstance()->replaceScene(DuelScene::createScene(firstParam.at(0), secondParam.at(0)));
    } else if(gameName == CAMP) {
        Director::getInstance()->replaceScene(HelloWorld::createScene("camp","",""));
    } else if(gameName == PATCH_THE_WALL) {
        Director::getInstance()->replaceScene(PatchTheWall::createScene());
    } else if(gameName == CROSS_THE_BRIDGE) {
        Director::getInstance()->replaceScene(CrossTheBridge::createScene());
    } else if(gameName == PATCH_THE_WALL) {
        Director::getInstance()->replaceScene(PatchTheWall::createScene());
    } else if(gameName == SMASH_THE_ROCK) {
        Director::getInstance()->replaceScene(SmashTheRockLevelScene::createScene());
    } else if(gameName == CANNON_BALL) {
        Director::getInstance()->replaceScene(MainGame::createScene());
    } else if(gameName == ENDLESS_RUNNER) {
        Director::getInstance()->replaceScene(EndlessRunner::createScene());
    } else if(gameName == KUNG_FU_ALPHA) {
        Director::getInstance()->replaceScene(Trace::createScene('a'));
    } else if(gameName == ALPHAMON_FEED) {
        Director::getInstance()->replaceScene(AlphamonFeedLevelScene::createScene());
    } else {
        CCLOG("Failed starting scene: %s", gameName.c_str());
    }
}

MenuItem* StartMenu::createMenu(std::string name) {
    return MenuItemLabel::create(Label::createWithTTF(name, "fonts/arial.ttf", 100),
                          [&](Ref *sender) {
                              auto labelName = (static_cast<cocos2d::MenuItemLabel*>(sender))->getString();
                              startScene(labelName);
                          });
}


