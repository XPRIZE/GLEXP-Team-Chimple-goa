//
//  StartMenuScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 14/07/16.
//
//

#include "StartMenuScene.h"
#include "../hero/HelloWorldScene.h"
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
#include "../mini_games/BlastLetter.h"
#include "../mini_games/Door.h"
#include "../mini_games/TreasureHunt.h"
#include "../mini_games/Line.h"
#include "../mini_games/Units.h"
#include "../mini_games/Shop.h"
#include "../mini_games/Item.h"
#include "../mini_games/ChocolateFactory.h"
#include "../mini_games/spot.h"
#include "../mini_games/Balloon.h"
#include "../mini_games/PopCount.h"
#include "../mini_games/SortIt.h"


#include "storage/local-storage/LocalStorage.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"


USING_NS_CC;

StartMenu::StartMenu(){
}

StartMenu::~StartMenu() {
    
}

std::string StartMenu::parseGameConfig(std::string gameConfigStr) {
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

const std::vector<std::string> StartMenu::getGameNames() {
    std::vector<std::string> gameNames;

	gameNames.push_back(BASICMULTIPLICATION);
	gameNames.push_back(ALPHAPHONICS);
	gameNames.push_back(DECOMON);
	gameNames.push_back(POPCOUNT);
	gameNames.push_back(PILLAR);
	gameNames.push_back(OWL); 
	gameNames.push_back(BLASTLETTER);
	gameNames.push_back(PINATA);
	gameNames.push_back(ORDER);
	gameNames.push_back(BALLONHERO);
	gameNames.push_back(MEMORY);
	gameNames.push_back(SORT_IT);
	gameNames.push_back(WEMBLEY);
	gameNames.push_back(BUBBLE);
	gameNames.push_back(BAJA);
	gameNames.push_back(ENDLESS_RUNNER);
	gameNames.push_back(KUNG_FU_ALPHA);
	gameNames.push_back(CROSS_THE_BRIDGE);
	gameNames.push_back(CHAIN);
	gameNames.push_back(POP);
	gameNames.push_back(BINGO);
    gameNames.push_back(CAT);
	gameNames.push_back(ALPHAMOLE);
	gameNames.push_back(JUMP_ON_WORDS);
    gameNames.push_back(ALPHAMON_COMBAT);   
    gameNames.push_back(JAZZ);
    gameNames.push_back(JASMINE);
    gameNames.push_back(PATCH_THE_WALL);
    gameNames.push_back(SMASH_THE_ROCK);
    gameNames.push_back(CANNON_BALL);
    gameNames.push_back(ALPHAMON_FEED);
    gameNames.push_back(TRAIN);
    gameNames.push_back(TALK);
	gameNames.push_back(STACK);
	gameNames.push_back(DASH);
	gameNames.push_back(TREASUREHUNT);
	gameNames.push_back(LINE);
	gameNames.push_back(UNITS);
	gameNames.push_back(SHOP);
	gameNames.push_back(CHOCOLATEFACTORY);
	gameNames.push_back(ITEM);
	gameNames.push_back(SPOT);
	gameNames.push_back(BALLOON);
	gameNames.push_back(MATHLEARNING);
	gameNames.push_back(BASICLETTERCASE);
    return gameNames;

}

const std::vector<std::string> StartMenu::multiPlayerGameNames() {
    std::vector<std::string> multiPlayerGameNames;
    multiPlayerGameNames.push_back(CAT);
    return multiPlayerGameNames;
    
}





void StartMenu::startScene(std::string gameName, std::string firstParam, std::string secondParam, std::string thirdParam) {
    
    std::string gameConfig;
    localStorageGetItem(gameName, &gameConfig);
    CCLOG("gameConfig %s", gameConfig.c_str());
    std::string script = parseGameConfig(gameConfig);
//    ScriptingCore::getInstance()->runScript(script);
    
//    if(gameName == ALPHAMON_COMBAT) {
//        Director::getInstance()->replaceScene(SelectAlphamon::createScene());
//    } else if(gameName == DUEL_SCENE) {
//        std::u16string firstParamUTF16;
//        StringUtils::UTF8ToUTF16(firstParam, firstParamUTF16);
//
//        std::u16string secondParamUTF16;
//        StringUtils::UTF8ToUTF16(secondParam, secondParamUTF16);
//
//        Director::getInstance()->replaceScene(DuelScene::createScene(firstParamUTF16.at(0), secondParamUTF16.at(0)));
//    }
//    else if(gameName == PATCH_THE_WALL) {
//        Director::getInstance()->replaceScene(PatchTheWall::createScene());
//    } else if(gameName == CROSS_THE_BRIDGE) {
//        Director::getInstance()->replaceScene(CrossTheBridge::createScene());
//    } else if(gameName == PATCH_THE_WALL) {
//        Director::getInstance()->replaceScene(PatchTheWall::createScene());
//    } else if(gameName == SMASH_THE_ROCK) {
//        Director::getInstance()->replaceScene(SmashTheRock::createScene());
//    } else if(gameName == CANNON_BALL) {
//        Director::getInstance()->replaceScene(MainGame::createScene());
//    } else if(gameName == ENDLESS_RUNNER) {
//        Director::getInstance()->replaceScene(EndlessRunner::createScene());
//    } else if(gameName == KUNG_FU_ALPHA) {
//        Director::getInstance()->replaceScene(Trace::createScene(0));
//    } else if(gameName == ALPHAMON_FEED) {
//        Director::getInstance()->replaceScene(AlphamonFeed::createScene());
//    } else if(gameName == BAJA) {
//        Director::getInstance()->replaceScene(BajaWordScene::createScene());
//    } else if(gameName == JASMINE) {
//        Director::getInstance()->replaceScene(Jasmin_Mainfile::createScene());
//    } else if(gameName == WEMBLEY) {
//		Director::getInstance()->replaceScene(Wembley::createScene());
//    } else if(gameName == JAZZ) {
//        Director::getInstance()->replaceScene(jazz::createScene());
//    } else if(gameName == CHAIN) {
//        Director::getInstance()->replaceScene(Chain::createScene());
//    }else if (gameName == CAT) {
//		Director::getInstance()->replaceScene(CatGame::createScene());
//    } else if (gameName == TRAIN) {
//        ScriptingCore::getInstance()->runScript("src/start/train.js");
//    } else if (gameName == POP) {
//        ScriptingCore::getInstance()->runScript("src/start/pop.js");
//    } else if (gameName == STORY_TELLING) {
//        ScriptingCore::getInstance()->runScript("start/storytelling.js");
//    } else if (gameName == ALPHAMOLE) {
//		Director::getInstance()->replaceScene(Alphamole::createScene());
//    } else if (gameName == WORD_BOARD) {
//        Director::getInstance()->replaceScene(WordBoard::createScene());
//    } else if (gameName == PEG) {
//        Director::getInstance()->replaceScene(PegWord::createScene());
//	} else if (gameName == JUMP_ON_WORDS) {
//		ScriptingCore::getInstance()->runScript("src/start/jump.js");
//	} else if (gameName == POP) {
//		ScriptingCore::getInstance()->runScript("src/start/pop.js");
//	}else if (gameName == CIRCLE) {
//		Director::getInstance()->replaceScene(Circle::createScene());
//	}else if (gameName == BUBBLE) {
//		ScriptingCore::getInstance()->runScript("src/start/BubbleShooter.js");
////        ScriptingCore::getInstance()->runScript("src/start/dots.js");
//	}else if (gameName == PINATA) {
//		ScriptingCore::getInstance()->runScript("src/start/pinata.js");
//	}
//	else if (gameName == STACK) {
//		Director::getInstance()->replaceScene(Stack::createScene());
//	}
//	else if (gameName == TALK) {
//		Director::getInstance()->replaceScene(Talk::createScene());
//	}
//	else if (gameName == BINGO) {
//		Director::getInstance()->replaceScene(Bingo::createScene());
//	}
//	else if (gameName == DROP) {
//		Director::getInstance()->replaceScene(Drop::createScene());
//	}
//	else if (gameName == OWL) {
//		Director::getInstance()->replaceScene(Owl::createScene());
//	}
//	else if (gameName == DASH) {
//		Director::getInstance()->replaceScene(Dash::createScene());
//	}
//	else if (gameName == DECOMON) {
//		Director::getInstance()->replaceScene(Decomon::createScene());
//	}
//	else if (gameName == ORDER) {
//		Director::getInstance()->replaceScene(Order::createScene());
//	}
//	else if (gameName == PILLAR) {
//		Director::getInstance()->replaceScene(Pillar::createScene());
//	}
//	else if (gameName == MEMORY) {
//		int numberPicker = RandomHelper::random_int(0, 2);
//		switch (numberPicker) {
//		case 0: Director::getInstance()->replaceScene(MemoryJungle::createScene());  break;
//		case 1: Director::getInstance()->replaceScene(MemoryHero::createScene());  break;
//		case 2: Director::getInstance()->replaceScene(Memory::createScene());  break;
//		}
//	}
//	else{
//        CCLOG("Failed starting scene: %s", gameName.c_str());
//    }
}




