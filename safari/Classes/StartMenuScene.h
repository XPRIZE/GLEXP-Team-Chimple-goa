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
