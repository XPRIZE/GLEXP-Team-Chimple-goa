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

static const std::string DUEL_SCENE = "DuelScene";
static const std::string ALPHAMON_COMBAT = "AlphamonCombat";
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
static const std::string BAJA = "Baja";

class StartMenu : public cocos2d::LayerGradient {
public:
    static cocos2d::Scene* createScene();
    static void startScene(std::string gameName, std::string firstParam = "", std::string secondParam = "", std::string thirdParam = "");
    static cocos2d::MenuItem* createMenu(std::string name);
    CREATE_FUNC(StartMenu);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    StartMenu();
    virtual ~StartMenu();
    
};

#endif /* StartMenuScene_h */
