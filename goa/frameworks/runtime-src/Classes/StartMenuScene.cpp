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
#include "puzzle/WordBoard.h"
#include "puzzle/PegWord.h"
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
#include "mini_games/AlphamoleLevel.h"
#include "mini_games/Memory.h"
#include "mini_games/MemoryHero.h"
#include "mini_games/MemoryJungle.h"
#include "mini_games/Circle.h"
#include "mini_games/Stack.h"
#include "mini_games/Talk.h"
#include "mini_games/BalloonHero.h"


USING_NS_CC;


StartMenu::StartMenu(){
}

StartMenu::~StartMenu() {
    
}

const std::vector<std::string> StartMenu::getGameNames() {
    std::vector<std::string> gameNames;
	gameNames.push_back(SORT_IT);
	gameNames.push_back(ALPHAMOLE);
	gameNames.push_back(BUBBLE);
	gameNames.push_back(POP);
	gameNames.push_back(JUMP_ON_WORDS);
    gameNames.push_back(ALPHAMON_COMBAT);
    gameNames.push_back(BAJA);
    gameNames.push_back(CHAIN);
    gameNames.push_back(WEMBLEY);
    gameNames.push_back(JAZZ);
    gameNames.push_back(JASMINE);
    gameNames.push_back(CAT);
    gameNames.push_back(PATCH_THE_WALL);
    gameNames.push_back(CROSS_THE_BRIDGE);
    gameNames.push_back(SMASH_THE_ROCK);
    gameNames.push_back(CANNON_BALL);
    gameNames.push_back(ENDLESS_RUNNER);
    gameNames.push_back(KUNG_FU_ALPHA);
    gameNames.push_back(ALPHAMON_FEED);
    gameNames.push_back(TRAIN);
	gameNames.push_back(CIRCLE);
//    gameNames.push_back(STORY_TELLING);
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
		/*
		int numberPicker = RandomHelper::random_int(0, 2);
		switch (numberPicker) {

		case 0: Director::getInstance()->replaceScene(MemoryJungle::createScene());  break;
		case 1: Director::getInstance()->replaceScene(MemoryHero::createScene());  break;
		case 2: Director::getInstance()->replaceScene(Memory::createScene());  break;

		}*/
		Director::getInstance()->replaceScene(BalloonHero::createScene());
    } else if(gameName == JAZZ) {
        Director::getInstance()->replaceScene(jazz::createScene());
    } else if(gameName == CHAIN) {
        Director::getInstance()->replaceScene(Chain::createScene());
    }else if (gameName == CAT) {
		Director::getInstance()->replaceScene(CatGame::createScene());
    } else if (gameName == TRAIN) {
        ScriptingCore::getInstance()->runScript("src/start/train.js");
    } else if (gameName == POP) {
        ScriptingCore::getInstance()->runScript("src/start/pop.js");
    } else if (gameName == STORY_TELLING) {
        ScriptingCore::getInstance()->runScript("start/storytelling.js");
    } else if (gameName == ALPHAMOLE) {
		Director::getInstance()->replaceScene(AlphamoleLevel::createScene());
    } else if (gameName == WORD_BOARD) {
        Director::getInstance()->replaceScene(WordBoard::createScene());
    } else if (gameName == PEG) {
        Director::getInstance()->replaceScene(PegWord::createScene());
	} else if (gameName == JUMP_ON_WORDS) {
		ScriptingCore::getInstance()->runScript("src/start/jump.js");
	} else if (gameName == POP) {
		ScriptingCore::getInstance()->runScript("src/start/pop.js");
	}else if (gameName == CIRCLE) {
		Director::getInstance()->replaceScene(Circle::createScene());
	}else if (gameName == BUBBLE) {
		ScriptingCore::getInstance()->runScript("src/start/BubbleShooter.js");
//        ScriptingCore::getInstance()->runScript("src/start/dots.js");
	}else if (gameName == PINATA) {
		ScriptingCore::getInstance()->runScript("src/start/pinata.js");
	}
	else if (gameName == STACK) {
		Director::getInstance()->replaceScene(Stack::createScene());
	}
	else if (gameName == TALK) {
		Director::getInstance()->replaceScene(Talk::createScene());
	}
	else{
        CCLOG("Failed starting scene: %s", gameName.c_str());
    }
}

