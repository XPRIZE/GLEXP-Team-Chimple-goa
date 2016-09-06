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
#include "mini_games/SmashTheRockScene.h"
#include "mini_games/EndlessRunner.h"
#include "mini_games/Cannon_Ball_Main.h"
#include "mini_games/TraceScene.h"
#include "mini_games/AlphamonFeedScene.h"
#include "mini_games/BajaWordScene.h"
#include "mini_games/Jasmin_Mainfile.h"
#include "mini_games/jazz.h"
#include "mini_games/Chain.h"
#include "mini_games/Wembley.h"
#include "mini_games/CatGameScene.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"


USING_NS_CC;


StartMenu::StartMenu(){
}

StartMenu::~StartMenu() {
    
}

const std::vector<std::string> StartMenu::getGameNames() {
    std::vector<std::string> gameNames;
    gameNames.push_back(BAJA);
    gameNames.push_back(CHAIN);
    gameNames.push_back(WEMBLEY);
    gameNames.push_back(JAZZ);
    gameNames.push_back(JASMINE);
    gameNames.push_back(CAT);
    gameNames.push_back(ALPHAMON_COMBAT);
    gameNames.push_back(PATCH_THE_WALL);
    gameNames.push_back(CROSS_THE_BRIDGE);
    gameNames.push_back(SMASH_THE_ROCK);
    gameNames.push_back(CANNON_BALL);
    gameNames.push_back(ENDLESS_RUNNER);
    gameNames.push_back(KUNG_FU_ALPHA);
    gameNames.push_back(ALPHAMON_FEED);
    gameNames.push_back(TRAIN);
	gameNames.push_back(ALPHAMOLE);
    return gameNames;

}


void StartMenu::startScene(std::string gameName, std::string firstParam, std::string secondParam, std::string thirdParam) {
    if(gameName == ALPHAMON_COMBAT) {
        Director::getInstance()->replaceScene(SelectAlphamon::createScene());
    } else if(gameName == DUEL_SCENE) {
        std::u16string firstParamUTF16;
        StringUtils::UTF8ToUTF16(firstParam, firstParamUTF16);

        std::u16string secondParamUTF16;
        StringUtils::UTF8ToUTF16(secondParam, secondParamUTF16);

        Director::getInstance()->replaceScene(DuelScene::createScene(firstParamUTF16.at(0), secondParamUTF16.at(0)));
    }
    else if(gameName == PATCH_THE_WALL) {
        Director::getInstance()->replaceScene(PatchTheWall::createScene());
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
        Director::getInstance()->replaceScene(Trace::createScene(0));
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
        ScriptingCore::getInstance()->runScript("start/train.js");
    }
    else {
        CCLOG("Failed starting scene: %s", gameName.c_str());
    }
}

