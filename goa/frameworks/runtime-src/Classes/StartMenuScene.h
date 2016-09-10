//
//  StartMenuScene.h
//  safari
//
//  Created by Srikanth Talapadi on 14/07/16.
//
//

#ifndef StartMenuScene_h
#define StartMenuScene_h

#include "cocos2d.h"

static const std::string DUEL_SCENE = "book";
static const std::string ALPHAMON_COMBAT = "book";
static const std::string CAMP = "camp";
static const std::string FARM_HOUSE = "farmhouse";
static const std::string MINING_BG = "miningbg";
static const std::string PATCH_THE_WALL = "Patch The Wall";
static const std::string CROSS_THE_BRIDGE = "Cross The Bridge";
static const std::string SMASH_THE_ROCK = "Smash The Rock";
static const std::string CANNON_BALL = "Cannon Ball";
static const std::string ENDLESS_RUNNER = "EndlessRunner";
static const std::string KUNG_FU_ALPHA = "Kung Fu Alpha";
static const std::string ALPHAMON_FEED = "Alphamon Feed";
static const std::string BAJA = "baja";
static const std::string CHAIN = "chain";
static const std::string WEMBLEY = "wembley";
static const std::string JAZZ = "jazz";
static const std::string JASMINE = "jasmine";
static const std::string CAT = "cat";
static const std::string TRAIN = "train";
static const std::string ALPHAMOLE = "alphamole";
static const std::string JUMP = "jump";
static const std::string STORY_TELLING = "book";



class StartMenu {
public:
    static void startScene(std::string gameName, std::string firstParam = "", std::string secondParam = "", std::string thirdParam = "");
    static const std::vector<std::string> getGameNames();
    
    
CC_CONSTRUCTOR_ACCESS:
    StartMenu();
    virtual ~StartMenu();    
};

#endif /* StartMenuScene_h */
